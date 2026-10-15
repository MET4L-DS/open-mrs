import subprocess
import sys
import uuid

def get_db_container():
    try:
        proc = subprocess.run(["docker", "ps", "--filter", "name=db", "--format", "{{.Names}}"], capture_output=True, text=True)
        for name in proc.stdout.splitlines():
            name = name.strip()
            if "db" in name and "backend" not in name:
                return name
    except Exception:
        pass
    return "openmrs-distro-referenceapplication-db-1"

# Database connection details
DB_CONTAINER = get_db_container()
DB_USER = "openmrs"
DB_PASS = "openmrs"
DB_NAME = "openmrs"

def run_sql(sql_commands):
    with open("scripts/temp_exec.sql", "w", encoding="utf-8") as f:
        f.write(sql_commands)
    subprocess.run(["docker", "cp", "scripts/temp_exec.sql", f"{DB_CONTAINER}:/tmp/temp_exec.sql"], check=True)
    proc = subprocess.run(
        ["docker", "exec", DB_CONTAINER, "mariadb", "--default-character-set=utf8mb4", f"-u{DB_USER}", f"-p{DB_PASS}", DB_NAME, "-e", "source /tmp/temp_exec.sql;"],
        capture_output=True,
        text=True
    )
    if proc.returncode != 0:
        print("SQL Error:", proc.stderr)
        sys.exit(1)
    return proc.stdout



# Check database connection
print("Checking MariaDB connection...")
res = run_sql("SELECT DATABASE();")
print("Connected to:", res.strip())

sql_statements = []

def add_concept_sql(c_uuid, name, datatype_id, class_id=7, is_numeric=False, units=None, allow_decimal=0, low_abs=None, hi_abs=None):
    is_numeric = is_numeric or (datatype_id == 1)
    safe_name = name.replace("'", "''")
    # Check if concept already exists by UUID
    sql = f"""
    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '{c_uuid}');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, {datatype_id}, {class_id}, 0, 1, NOW(), '{c_uuid}');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, '{safe_name}', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        {"INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, " + (f"'{units}'" if units else "NULL") + f", {allow_decimal}, " + (str(low_abs) if low_abs is not None else "NULL") + f", " + (str(hi_abs) if hi_abs is not None else "NULL") + ");" if is_numeric else ""}
    ELSE
        SET @new_id = @existing_id;
        UPDATE concept SET datatype_id = {datatype_id}, class_id = {class_id} WHERE concept_id = @existing_id;
        {"IF NOT EXISTS (SELECT 1 FROM concept_numeric WHERE concept_id = @existing_id) THEN INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@existing_id, " + (f"'{units}'" if units else "NULL") + f", {allow_decimal}, " + (str(low_abs) if low_abs is not None else "NULL") + f", " + (str(hi_abs) if hi_abs is not None else "NULL") + "); END IF;" if is_numeric else "DELETE FROM concept_numeric WHERE concept_id = @existing_id;"}
    END IF;
    """
    return sql

def add_answer_sql(question_uuid, answer_uuid):
    sql = f"""
    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '{question_uuid}');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '{answer_uuid}');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    """
    return sql

def add_snomed_map_sql(c_uuid, snomed_code, term_name=""):
    safe_name = term_name.replace("'", "''")
    sql = f"""
    SET @c_id = (SELECT concept_id FROM concept WHERE uuid = '{c_uuid}');
    SET @source_id = (SELECT concept_source_id FROM concept_reference_source WHERE name = 'SNOMED CT' LIMIT 1);
    IF @c_id IS NOT NULL AND @source_id IS NOT NULL THEN
        SET @term_id = (SELECT concept_reference_term_id FROM concept_reference_term WHERE concept_source_id = @source_id AND code = '{snomed_code}' LIMIT 1);
        IF @term_id IS NULL THEN
            INSERT INTO concept_reference_term (concept_source_id, name, code, creator, date_created, retired, uuid)
            VALUES (@source_id, '{safe_name}', '{snomed_code}', 1, NOW(), 0, UUID());
            SET @term_id = LAST_INSERT_ID();
        END IF;
        IF NOT EXISTS (SELECT 1 FROM concept_reference_map WHERE concept_id = @c_id AND concept_reference_term_id = @term_id) THEN
            INSERT INTO concept_reference_map (concept_reference_term_id, concept_map_type_id, creator, date_created, concept_id, uuid)
            VALUES (@term_id, 1, 1, NOW(), @c_id, UUID());
        END IF;
    END IF;
    """
    return sql


# Define all concepts
education_answers = [
    ("160296AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "Profession or honours"),
    ("159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "Graduate"),
    ("159785AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "Intermediate or diploma"),
    ("1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "High school certificate"),
    ("160297AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "Middle school certificate"),
    ("1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "Primary school certificate"),
    ("160298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "Illiterate"),
]

occupation_answers = [
    ("c0010002-0000-0000-0000-000000000001", "Legislators, senior officials and managers"),
    ("c0010002-0000-0000-0000-000000000002", "Professionals"),
    ("c0010002-0000-0000-0000-000000000003", "Technicians and associate professionals"),
    ("c0010002-0000-0000-0000-000000000004", "Clerks"),
    ("c0010002-0000-0000-0000-000000000005", "Skilled workers and shop and market sale workers"),
    ("c0010002-0000-0000-0000-000000000006", "Skilled agricultural and fishery workers"),
    ("c0010002-0000-0000-0000-000000000007", "Craft and related trade workers"),
    ("c0010002-0000-0000-0000-000000000008", "Plant and machine operators and assemblers"),
    ("c0010002-0000-0000-0000-000000000009", "Elementary occupation"),
    ("c0010002-0000-0000-0000-000000000010", "Unemployed"),
]

ses_answers = [
    ("c0010003-0000-0000-0000-000000000001", "Upper (I)"),
    ("c0010003-0000-0000-0000-000000000002", "Upper Middle (II)"),
    ("c0010003-0000-0000-0000-000000000003", "Lower Middle (III)"),
    ("c0010003-0000-0000-0000-000000000004", "Upper Lower (IV)"),
    ("c0010003-0000-0000-0000-000000000005", "Lower (V)"),
]

infertility_answers = [
    ("c0010002-0000-0000-0000-000000000101", "Primary infertility"),
    ("c0010002-0000-0000-0000-000000000102", "Secondary infertility"),
]

menstrual_answers = [
    ("c0010002-0000-0000-0000-000000000201", "Regular periods"),
    ("c0010002-0000-0000-0000-000000000202", "Irregular periods"),
    ("c0010002-0000-0000-0000-000000000203", "Oligomenorrhea"),
    ("c0010002-0000-0000-0000-000000000204", "Polymenorrhea"),
    ("c0010002-0000-0000-0000-000000000205", "Normal"),
    ("c0010002-0000-0000-0000-000000000206", "Hypomenorrhoea"),
    ("c0010002-0000-0000-0000-000000000207", "Primary Amenorrhoea"),
    ("c0010002-0000-0000-0000-000000000208", "Secondary Amenorrhoea"),
    ("c0010002-0000-0000-0000-000000000209", "Heavy Menstrual Bleeding (HMB)"),
    ("c0010002-0000-0000-0000-000000000210", "Amenorrhoea"),
]

female_factor_answers = [
    # Primary categories
    ("c0010002-0000-0000-0000-000000000301", "Tubal factor"),
    ("c0010002-0000-0000-0000-000000000302", "Diminished ovarian reserve"),
    ("c0010002-0000-0000-0000-000000000303", "Endometriosis"),
    ("c0010002-0000-0000-0000-000000000304", "Polycystic ovary syndrome (PCOS)"),
    ("c0010002-0000-0000-0000-000000000305", "Uterine Factor"),
    ("c0010002-0000-0000-0000-000000000306", "Female infertility due to advanced maternal age"),
    ("c0010002-0000-0000-0000-000000000307", "Other female factors"),
    # Tubal factor details
    ("c0010002-0000-0000-0000-000000000311", "Tubal block unilateral"),
    ("c0010002-0000-0000-0000-000000000312", "Tubal block bilateral"),
    ("c0010002-0000-0000-0000-000000000313", "Previous ectopic"),
    ("c0010002-0000-0000-0000-000000000314", "Hydrosalpinx"),
    ("c0010002-0000-0000-0000-000000000315", "Hematosalpinx"),
    # Diminished ovarian reserve details
    ("c0010002-0000-0000-0000-000000000321", "Borderline Ovarian Reserve"),
    ("c0010002-0000-0000-0000-000000000322", "Patient-Oriented Strategies Encompassing IndividualizeD Oocyte Number (POSEIDON)"),
    ("c0010002-0000-0000-0000-000000000323", "POSEIDON GROUP 1a"),
    ("c0010002-0000-0000-0000-000000000324", "POSEIDON GROUP 1b"),
    ("c0010002-0000-0000-0000-000000000325", "POSEIDON GROUP 2a"),
    ("c0010002-0000-0000-0000-000000000326", "POSEIDON GROUP 2b"),
    ("c0010002-0000-0000-0000-000000000327", "POSEIDON GROUP 3"),
    ("c0010002-0000-0000-0000-000000000328", "POSEIDON GROUP 4"),
    # Endometriosis classification
    ("c0010002-0000-0000-0000-000000000331", "American Society for Reproductive Medicine-ASRM"),
    ("c0010002-0000-0000-0000-000000000332", "Endometriosis Fertility Index-EFI"),
    # PCOS phenotypes
    ("c0010002-0000-0000-0000-000000000341", "Phenotype A (Classic/Severe)"),
    ("c0010002-0000-0000-0000-000000000342", "Phenotype B (Classic)"),
    ("c0010002-0000-0000-0000-000000000343", "Phenotype C (Ovulatory)"),
    ("c0010002-0000-0000-0000-000000000344", "Phenotype D (Mild/Non-hyperandrogenic)"),
    # Uterine factor details
    ("c0010002-0000-0000-0000-000000000351", "Adenomyosis"),
    ("c0010002-0000-0000-0000-000000000352", "Fibroids"),
    ("c0010002-0000-0000-0000-000000000353", "Polyps"),
    ("c0010002-0000-0000-0000-000000000354", "Asherman's"),
    ("c0010002-0000-0000-0000-000000000355", "Septate Uterus"),
    ("c0010002-0000-0000-0000-000000000356", "Unicornuate uterus"),
    # Other female factors
    ("c0010002-0000-0000-0000-000000000361", "Hypogonadotropic hypogonadism"),
    ("c0010002-0000-0000-0000-000000000362", "Oncofertility"),
    ("c0010002-0000-0000-0000-000000000363", "H/O Tuberculosis"),
    ("c0010002-0000-0000-0000-000000000364", "Turner Mosaic"),
    ("c0010002-0000-0000-0000-000000000365", "Unexplained Infertility"),
    ("c0010002-0000-0000-0000-000000000366", "Serodiscordant couple"),
    # Male Factor answers
    ("c0010002-0000-0000-0000-000000000401", "Azoospermia"),
    ("c0010002-0000-0000-0000-000000000402", "Oligozoospermia"),
    ("c0010002-0000-0000-0000-000000000403", "Asthenozoospermia"),
    ("c0010002-0000-0000-0000-000000000404", "Teratozoospermia"),
    ("c0010002-0000-0000-0000-000000000405", "Unexplained Infertility (Male)"),
    ("c0010002-0000-0000-0000-000000000406", "Erectile dysfunction"),
    ("c0010002-0000-0000-0000-000000000407", "Ejaculatory Dysfunction"),
    ("c0010002-0000-0000-0000-000000000408", "Retrograde Ejaculation"),
    ("c0010002-0000-0000-0000-000000000409", "Oligoasthenoteratozoospermia (OATS)"),
    ("c0010002-0000-0000-0000-000000000411", "Obstructive Azoospermia"),
    ("c0010002-0000-0000-0000-000000000412", "Non-Obstructive Azoospermia"),
    # Previous OI & IUI drug answers
    ("c0010002-0000-0000-0000-000000000501", "Letrozole"),
    ("c0010002-0000-0000-0000-000000000502", "Human menopausal gonadotropin"),
    ("c0010002-0000-0000-0000-000000000503", "Clomiphene citrate"),
    ("c0010002-0000-0000-0000-000000000504", "Human menopausal gonadotropin + Clomiphene citrate"),
    ("c0010002-0000-0000-0000-000000000505", "Multiple OVI"),
    # Previous Surgery answers (Group 600)
    ("c0010002-0000-0000-0000-000000000601", "Right"),
    ("c0010002-0000-0000-0000-000000000602", "Left"),
    ("c0010002-0000-0000-0000-000000000603", "Bilateral"),
    ("c0010002-0000-0000-0000-000000000611", "Laparoscopy"),
    ("c0010002-0000-0000-0000-000000000612", "Open"),
    ("c0010002-0000-0000-0000-000000000613", "Laparoscopy converted to open"),
    ("c0010002-0000-0000-0000-000000000621", "Uterine Adenomyomectomy"),
    ("c0010002-0000-0000-0000-000000000622", "Uterine Myomectomy"),
    ("c0010002-0000-0000-0000-000000000623", "Uterine Isthmocele Repair"),
    ("c0010002-0000-0000-0000-000000000631", "Endometriotic Cystectomy"),
    ("c0010002-0000-0000-0000-000000000632", "Endometriotic Bipolar Ablation"),
    ("c0010002-0000-0000-0000-000000000633", "Endometriotic Argon Plasma Coagulation"),
    ("c0010002-0000-0000-0000-000000000634", "Endometriotic Drainage"),
    ("c0010002-0000-0000-0000-000000000635", "Endometriotic Sclerotherapy"),
    ("c0010002-0000-0000-0000-000000000636", "Endometriosis Oophorectomy"),
    ("c0010002-0000-0000-0000-000000000641", "Ovarian Dermoid/Mature Teratoma"),
    ("c0010002-0000-0000-0000-000000000642", "Simple Ovarian Cyst"),
    ("c0010002-0000-0000-0000-000000000643", "Paraovarian Cyst"),
    ("c0010002-0000-0000-0000-000000000644", "Ovarian Cyst Aspiration"),
    ("c0010002-0000-0000-0000-000000000645", "Oophorectomy"),
    ("c0010002-0000-0000-0000-000000000646", "Ovarian Cystectomy"),
    ("c0010002-0000-0000-0000-000000000651", "Chromopertubation of Fallopian tubes"),
    ("c0010002-0000-0000-0000-000000000652", "Tubal cannulation"),
    ("c0010002-0000-0000-0000-000000000653", "Salpingectomy of Fallopian tubes"),
    ("c0010002-0000-0000-0000-000000000654", "Fimbrioplasty of Fallopian tubes"),
    ("c0010002-0000-0000-0000-000000000655", "Tubal clipping of Fallopian tubes"),
    ("c0010002-0000-0000-0000-000000000656", "Recanalization of Fallopian tubes"),
    ("c0010002-0000-0000-0000-000000000661", "Peritoneal Adhesiolysis"),
    ("c0010002-0000-0000-0000-000000000662", "Peritonectomy"),
]

medical_disease_answers = [
    # Form 10: Past Medical History answers (Group 700)
    ("c0010002-0000-0000-0000-000000000701", "B-cell lymphoma"),
    ("c0010002-0000-0000-0000-000000000702", "Bell's palsy"),
    ("c0010002-0000-0000-0000-000000000703", "Intervertebral disc prolapse"),
    ("c0010002-0000-0000-0000-000000000704", "Bipolar disorder"),
    ("c0010002-0000-0000-0000-000000000705", "Carcinoma of breast"),
    ("c0010002-0000-0000-0000-000000000706", "Carcinoma"),
    ("c0010002-0000-0000-0000-000000000707", "Cervical tuberculous lymphadenitis"),
    ("c0010002-0000-0000-0000-000000000708", "Ventricular septal defect"),
    ("c0010002-0000-0000-0000-000000000709", "Ductal carcinoma in situ of breast"),
    ("c0010002-0000-0000-0000-000000000710", "Epilepsy"),
    ("c0010002-0000-0000-0000-000000000711", "Tuberculosis of female genital organs"),
    ("c0010002-0000-0000-0000-000000000712", "TB - (tuberculosis) chemotherapy"),
    ("c0010002-0000-0000-0000-000000000713", "Graves' disease"),
    ("c0010002-0000-0000-0000-000000000714", "History of tuberculosis drug therapy"),
    ("c0010002-0000-0000-0000-000000000715", "Genital tuberculosis"),
    ("c0010002-0000-0000-0000-000000000716", "Hyperprolactinemia"),
    ("c0010002-0000-0000-0000-000000000717", "Trichobezoar"),
    ("c0010002-0000-0000-0000-000000000718", "Ectopic pregnancy"),
    ("c0010002-0000-0000-0000-000000000719", "Primary mucinous adenocarcinoma of appendix"),
    ("c0010002-0000-0000-0000-000000000720", "Pseudomyxoma peritonei"),
    ("c0010002-0000-0000-0000-000000000721", "Hidradenitis suppurativa"),
    ("c0010002-0000-0000-0000-000000000722", "Hodgkin's disease"),
    ("c0010002-0000-0000-0000-000000000723", "Entire tibia"),
    ("c0010002-0000-0000-0000-000000000724", "Hypertensive disorder"),
    ("c0010002-0000-0000-0000-000000000725", "Amlodipine"),
    ("c0010002-0000-0000-0000-000000000726", "Type 2 diabetes mellitus"),
    ("c0010002-0000-0000-0000-000000000727", "Hypothyroidism"),
    ("c0010002-0000-0000-0000-000000000728", "Tuberculosis of abdomen"),
    ("c0010002-0000-0000-0000-000000000729", "Endometrioma of left ovary"),
    ("c0010002-0000-0000-0000-000000000730", "Endometriosis"),
    ("c0010002-0000-0000-0000-000000000731", "Vasopressin-related polyuria"),
    ("c0010002-0000-0000-0000-000000000732", "Psychiatric"),
    ("c0010002-0000-0000-0000-000000000733", "Pulmonary tuberculosis"),
    ("c0010002-0000-0000-0000-000000000734", "Systemic lupus erythematosus"),
    ("c0010002-0000-0000-0000-000000000799", "Other medical disease"),
]

tb_site_answers = [
    # Form 12: Tuberculosis History answers (Group 800)
    ("c0010002-0000-0000-0000-000000000801", "Tuberculosis of abdomen", "447330002"),
    ("c0010002-0000-0000-0000-000000000802", "Tuberculosis of bone", "38279006"),
    ("c0010002-0000-0000-0000-000000000803", "Cervical tuberculous lymphadenitis", "54084005"),
    ("c0010002-0000-0000-0000-000000000804", "Tuberculosis of eye", "49107007"),
    ("c0010002-0000-0000-0000-000000000805", "Tuberculosis of female genital organs", "74181004"),
    ("c0010002-0000-0000-0000-000000000806", "Genital tuberculosis", "281623008"),
    ("c0010002-0000-0000-0000-000000000807", "Pulmonary tuberculosis", "154283005"),
    ("c0010002-0000-0000-0000-000000000808", "Tuberculosis of gastrointestinal tract", "240376003"),
    ("c0010002-0000-0000-0000-000000000809", "Tuberculous abscess", "40486464"),
    ("c0010002-0000-0000-0000-000000000810", "Other site of tuberculosis", None),
]

att_duration_answers = [
    ("c0010002-0000-0000-0000-000000000821", "6 Months"),
    ("c0010002-0000-0000-0000-000000000822", "9 Months"),
    ("c0010002-0000-0000-0000-000000000823", "1 Year"),
    ("c0010002-0000-0000-0000-000000000824", "2 Year"),
    ("c0010002-0000-0000-0000-000000000825", "3 Year"),
    ("c0010002-0000-0000-0000-000000000826", "Month"),
    ("c0010002-0000-0000-0000-000000000827", "Year"),
    ("c0010002-0000-0000-0000-000000000828", "Other duration"),
]

# Form 15: Investigation Female Surgical Procedure answers (Group 900)
female_surgical_answers = [
    # Hysteroscopy Ostia
    ("c0010002-0000-0000-0000-000000000901", "Deep seated"),
    ("c0010002-0000-0000-0000-000000000902", "Peri-ostial adhesion"),
    ("c0010002-0000-0000-0000-000000000903", "Right ostia not seen"),
    ("c0010002-0000-0000-0000-000000000904", "Left ostia not seen"),
    ("c0010002-0000-0000-0000-000000000905", "Both ostia not seen"),
    # Hysteroscopy Endometrium
    ("c0010002-0000-0000-0000-000000000906", "Pale endometrium"),
    ("c0010002-0000-0000-0000-000000000907", "Micropolyps"),
    ("c0010002-0000-0000-0000-000000000908", "Thin endometrium"),
    ("c0010002-0000-0000-0000-000000000909", "Congested endometrium"),
    ("c0010002-0000-0000-0000-000000000910", "Endometrial fibrosis"),
    ("c0010002-0000-0000-0000-000000000911", "Polypoidal endometrium"),
    # Hysteroscopy Endometrial Cavity
    ("c0010002-0000-0000-0000-000000000912", "Polyp"),
    ("c0010002-0000-0000-0000-000000000913", "Septum"),
    ("c0010002-0000-0000-0000-000000000914", "Adhesion"),
    ("c0010002-0000-0000-0000-000000000915", "Fibroid"),
    ("c0010002-0000-0000-0000-000000000916", "Subseptate"),
    ("c0010002-0000-0000-0000-000000000917", "Tubular"),
    ("c0010002-0000-0000-0000-000000000918", "Adequate"),
    # Cervical Canal Direction
    ("c0010002-0000-0000-0000-000000000919", "Straight cervical canal"),
    ("c0010002-0000-0000-0000-000000000920", "Towards left"),
    ("c0010002-0000-0000-0000-000000000921", "Towards right"),
    ("c0010002-0000-0000-0000-000000000922", "Cervical adhesions"),
    ("c0010002-0000-0000-0000-000000000923", "Anteverted"),
    ("c0010002-0000-0000-0000-000000000924", "Retroverted"),
    # Operative Hysteroscopy
    ("c0010002-0000-0000-0000-000000000925", "Uterine Polypectomy"),
    ("c0010002-0000-0000-0000-000000000926", "Metroplasty"),
    ("c0010002-0000-0000-0000-000000000927", "Septal resection"),
    ("c0010002-0000-0000-0000-000000000928", "Myomectomy"),
    ("c0010002-0000-0000-0000-000000000929", "Adhesiolysis"),
    ("c0010002-0000-0000-0000-000000000930", "Platelet Rich Plasma (PRP)/Stem cell instillation"),
    # TVS Adenomyosis
    ("c0010002-0000-0000-0000-000000000931", "Globular"),
    ("c0010002-0000-0000-0000-000000000932", "Asymmetrical thickening"),
    ("c0010002-0000-0000-0000-000000000933", "Cysts"),
    ("c0010002-0000-0000-0000-000000000934", "Hyperechoic islands"),
    ("c0010002-0000-0000-0000-000000000935", "Fan-shaped shadowing"),
    ("c0010002-0000-0000-0000-000000000936", "Echogenic subendometrial lines and buds"),
    ("c0010002-0000-0000-0000-000000000937", "Translesional Vascularity"),
    ("c0010002-0000-0000-0000-000000000938", "Irregular junctional zone"),
    ("c0010002-0000-0000-0000-000000000939", "Interrupted junctional zone"),
    # TVS Fibroid Locations
    ("c0010002-0000-0000-0000-000000000940", "Anterior wall"),
    ("c0010002-0000-0000-0000-000000000941", "Posterior wall"),
    ("c0010002-0000-0000-0000-000000000942", "Fundal"),
    ("c0010002-0000-0000-0000-000000000943", "Right lateral"),
    ("c0010002-0000-0000-0000-000000000944", "Left lateral"),
    ("c0010002-0000-0000-0000-000000000945", "Cervical"),
    # TVS Fibroid Stages FIGO
    ("c0010002-0000-0000-0000-000000000946", "FIGO 0"),
    ("c0010002-0000-0000-0000-000000000947", "FIGO 1"),
    ("c0010002-0000-0000-0000-000000000948", "FIGO 2"),
    ("c0010002-0000-0000-0000-000000000949", "FIGO 3"),
    ("c0010002-0000-0000-0000-000000000950", "FIGO 4"),
    ("c0010002-0000-0000-0000-000000000951", "FIGO 5"),
    ("c0010002-0000-0000-0000-000000000952", "FIGO 6"),
    ("c0010002-0000-0000-0000-000000000953", "FIGO 7"),
    ("c0010002-0000-0000-0000-000000000954", "FIGO 8"),
    ("c0010002-0000-0000-0000-000000000955", "FIGO 2-5"),
    # TVS Endometrial Cavity
    ("c0010002-0000-0000-0000-000000000956", "3D"),
    ("c0010002-0000-0000-0000-000000000957", "4D"),
    ("c0010002-0000-0000-0000-000000000958", "Endometrial Cavity Adhesions"),
    ("c0010002-0000-0000-0000-000000000959", "Fluid in cavity"),
    # TVS Endometrial-Myometrial Junction
    ("c0010002-0000-0000-0000-000000000960", "Well-defined"),
    ("c0010002-0000-0000-0000-000000000961", "Ill-defined"),
    ("c0010002-0000-0000-0000-000000000962", "Irregular"),
    ("c0010002-0000-0000-0000-000000000963", "Interrupted"),
    # TVS Hydrosalpinx
    ("c0010002-0000-0000-0000-000000000964", "Right Hydrosalpinx"),
    ("c0010002-0000-0000-0000-000000000965", "Left Hydrosalpinx"),
    ("c0010002-0000-0000-0000-000000000966", "Both Hydrosalpinx"),
    # TVS Endometrial Thickness Pattern
    ("c0010002-0000-0000-0000-000000000967", "Trilaminar"),
    ("c0010002-0000-0000-0000-000000000968", "Diffuse"),
    ("c0010002-0000-0000-0000-000000000969", "Fluid pattern"),
]

procedure_embryo_transfer_answers = [
    ("c0010002-0000-0000-0000-000000000970", "Easy"),
    ("c0010002-0000-0000-0000-000000000971", "Difficult"),
    ("c0010002-0000-0000-0000-000000000972", "With Cusco's"),
    ("c0010002-0000-0000-0000-000000000973", "With Sim's"),
    ("c0010002-0000-0000-0000-000000000974", "Deviated to Left"),
    ("c0010002-0000-0000-0000-000000000975", "Deviated to Right"),
    ("c0010002-0000-0000-0000-000000000976", "Straight"),
    ("c0010002-0000-0000-0000-000000000977", "Acutely anteverted"),
]

female_procedure_biopsy_answers = [
    ("c0010002-0000-0000-0000-000000000978", "Not available"),
    ("c0010002-0000-0000-0000-000000000979", "Atrophic endometrium"),
    ("c0010002-0000-0000-0000-000000000980", "Benign endometrium"),
    ("c0010002-0000-0000-0000-000000000981", "Proliferative endometrium"),
    ("c0010002-0000-0000-0000-000000000982", "Disordered proliferative endometrium"),
    ("c0010002-0000-0000-0000-000000000983", "Early secretory endometrium"),
    ("c0010002-0000-0000-0000-000000000984", "Mid secretory endometrium"),
    ("c0010002-0000-0000-0000-000000000985", "Late secretory endometrium"),
    ("c0010002-0000-0000-0000-000000000986", "Endometrial hyperplasia"),
    ("c0010002-0000-0000-0000-000000000987", "Endometrial hyperplasia with atypia"),
    ("c0010002-0000-0000-0000-000000000988", "Endometrial hyperplasia without atypia"),
    ("c0010002-0000-0000-0000-000000000989", "Epitheloid cells"),
    ("c0010002-0000-0000-0000-000000000990", "Granuloma"),
    ("c0010002-0000-0000-0000-000000000991", "Granuloma Present"),
    ("c0010002-0000-0000-0000-000000000992", "Granuloma Absent"),
    ("c0010002-0000-0000-0000-000000000993", "Fragmented Endometrial Glands"),
    ("c0010002-0000-0000-0000-000000000994", "Interval phase endometrium"),
]

investigation_male_semen_answers = [
    ("c0010002-0000-0000-0000-000000000995", "Few motile"),
    ("c0010002-0000-0000-0000-000000000996", "Immotile"),
]

trigger_details_answers = [
    ("c0010002-0000-0000-0000-000000000997", "Endometrial polyp"),
    ("c0010002-0000-0000-0000-000000000998", "Early diffuse"),
    ("c0010002-0000-0000-0000-000000000999", "Minimal fluid"),
    ("c0010002-0000-0000-0000-000000001000", "Leuprolide"),
    ("c0010002-0000-0000-0000-000000001001", "Ovitrelle"),
]

ovum_pick_up_answers = [
    ("c0010002-0000-0000-0000-000000001002", "Giant oocyte"),
    ("c0010002-0000-0000-0000-000000001003", "Degenerated oocyte"),
    ("c0010002-0000-0000-0000-000000001004", "Dysmorphic oocytes"),
    ("c0010002-0000-0000-0000-000000001005", "Small size"),
    ("c0010002-0000-0000-0000-000000001006", "Dark cumulus"),
]

lab_procedure_insemination_answers = [
    ("c0010002-0000-0000-0000-000000001007", "In vitro Fertilisation (IVF)"),
    ("c0010002-0000-0000-0000-000000001008", "Assisted Oocyte Activation (AOA)"),
    ("c0010002-0000-0000-0000-000000001009", "IntraCytoplasmic Sperm Injection (ICSI)"),
    ("c0010002-0000-0000-0000-000000001010", "Physiological Intracytoplasmic Sperm Injection (PICSI)"),
]

sperm_quality_assessment_answers = [
    ("c0010002-0000-0000-0000-000000001011", "Percutaneous Epididymal Sperm Aspiration (PESA)"),
    ("c0010002-0000-0000-0000-000000001012", "Testicular Sperm Aspiration (TESA)"),
    ("c0010002-0000-0000-0000-000000001013", "Ejaculated"),
    ("c0010002-0000-0000-0000-000000001014", "Frozen"),
    ("c0010002-0000-0000-0000-000000001015", "Donor Semen"),
    ("c0010002-0000-0000-0000-000000001016", "Husband Semen (HS)"),
]

additional_ivf_procedures_answers = [
    ("c0010002-0000-0000-0000-000000001017", "Laser Assisted Hatching (LAH)"),
    ("c0010002-0000-0000-0000-000000001018", "Artificial Oocyte Activation (AOA)"),
]

ovarian_stimulation_protocol_answers = [
    ("c0010002-0000-0000-0000-000000001019", "Agonist"),
    ("c0010002-0000-0000-0000-000000001020", "Antagonist"),
    ("c0010002-0000-0000-0000-000000001021", "Dual-stimulation"),
    ("c0010002-0000-0000-0000-000000001022", "Human Menopausal Gonadotropin(HMG)-only stimulation"),
    ("c0010002-0000-0000-0000-000000001023", "Letrozole based Antagonist protocol"),
    ("c0010002-0000-0000-0000-000000001024", "Luteal Duo-stimulation"),
    ("c0010002-0000-0000-0000-000000001025", "Microdose flare protocol"),
    ("c0010002-0000-0000-0000-000000001026", "Progestin-primed ovarian stimulation"),
    ("c0010002-0000-0000-0000-000000001027", "Random start protocol"),
    ("c0010002-0000-0000-0000-000000001028", "Stop agonist"),
]

cetrotide_start_day_answers = [
    ("c0010002-0000-0000-0000-000000001029", "Day 1"),
    ("c0010002-0000-0000-0000-000000001030", "Day 2"),
    ("c0010002-0000-0000-0000-000000001031", "Day 3"),
    ("c0010002-0000-0000-0000-000000001032", "Day 4"),
    ("c0010002-0000-0000-0000-000000001033", "Day 5"),
    ("c0010002-0000-0000-0000-000000001034", "Day 6"),
    ("c0010002-0000-0000-0000-000000001035", "Day 7"),
    ("c0010002-0000-0000-0000-000000001036", "Day 8"),
    ("c0010002-0000-0000-0000-000000001037", "Day 9"),
    ("c0010002-0000-0000-0000-000000001038", "Day 10"),
    ("c0010002-0000-0000-0000-000000001039", "Day 11"),
    ("c0010002-0000-0000-0000-000000001040", "Day 12"),
    ("c0010002-0000-0000-0000-000000001041", "Day 13"),
    ("c0010002-0000-0000-0000-000000001042", "Day 14"),
    ("c0010002-0000-0000-0000-000000001043", "Day 15"),
    ("c0010002-0000-0000-0000-000000001044", "Day 16"),
]

# Form 27: Assessment of Fertilization, Embryo & Blastocyst - Grade Answers
cleavage_embryo_grade_answers = [
    ("c0010002-0000-0000-0000-000000001050", "2PN-arrest"),
    ("c0010002-0000-0000-0000-000000001051", "2C/A"),
    ("c0010002-0000-0000-0000-000000001052", "2C/B"),
    ("c0010002-0000-0000-0000-000000001053", "2C/C"),
    ("c0010002-0000-0000-0000-000000001054", "3C/A"),
    ("c0010002-0000-0000-0000-000000001055", "3C/B"),
    ("c0010002-0000-0000-0000-000000001056", "3C/C"),
    ("c0010002-0000-0000-0000-000000001057", "4C/A"),
    ("c0010002-0000-0000-0000-000000001058", "4C/B"),
    ("c0010002-0000-0000-0000-000000001059", "4C/C"),
    ("c0010002-0000-0000-0000-000000001060", "5C/A"),
    ("c0010002-0000-0000-0000-000000001061", "5C/B"),
    ("c0010002-0000-0000-0000-000000001062", "5C/C"),
    ("c0010002-0000-0000-0000-000000001063", "6C/A"),
    ("c0010002-0000-0000-0000-000000001064", "6C/B"),
    ("c0010002-0000-0000-0000-000000001065", "6C/C"),
    ("c0010002-0000-0000-0000-000000001066", "8C/A"),
    ("c0010002-0000-0000-0000-000000001067", "8C/B"),
    ("c0010002-0000-0000-0000-000000001068", "8C/C"),
    ("c0010002-0000-0000-0000-000000001069", "10-12Cells"),
]

day4_embryo_grade_answers = [
    ("c0010002-0000-0000-0000-000000001070", "Morula"),
    ("c0010002-0000-0000-0000-000000001071", "Compacted Morula"),
    ("c0010002-0000-0000-0000-000000001072", "Early Blastocyst"),
    ("c0010002-0000-0000-0000-000000001073", "Arrest"),
]

blastocyst_embryo_grade_answers = [
    ("c0010002-0000-0000-0000-000000001074", "Morula"),
    ("c0010002-0000-0000-0000-000000001075", "Arrest"),
    ("c0010002-0000-0000-0000-000000001076", "Pre-blast"),
    ("c0010002-0000-0000-0000-000000001077", "1AA"),
    ("c0010002-0000-0000-0000-000000001078", "1AB"),
    ("c0010002-0000-0000-0000-000000001079", "1BA"),
    ("c0010002-0000-0000-0000-000000001080", "1BB"),
    ("c0010002-0000-0000-0000-000000001081", "1BC"),
    ("c0010002-0000-0000-0000-000000001082", "2AA"),
    ("c0010002-0000-0000-0000-000000001083", "2AB"),
    ("c0010002-0000-0000-0000-000000001084", "2BA"),
    ("c0010002-0000-0000-0000-000000001085", "2BB"),
    ("c0010002-0000-0000-0000-000000001086", "2BC"),
    ("c0010002-0000-0000-0000-000000001087", "3AA"),
    ("c0010002-0000-0000-0000-000000001088", "3AB"),
    ("c0010002-0000-0000-0000-000000001089", "3BA"),
    ("c0010002-0000-0000-0000-000000001090", "3BB"),
    ("c0010002-0000-0000-0000-000000001091", "3BC"),
    ("c0010002-0000-0000-0000-000000001092", "4AA"),
    ("c0010002-0000-0000-0000-000000001093", "4AB"),
    ("c0010002-0000-0000-0000-000000001094", "4BA"),
    ("c0010002-0000-0000-0000-000000001095", "4BB"),
    ("c0010002-0000-0000-0000-000000001096", "4BC"),
    ("c0010002-0000-0000-0000-000000001097", "4CA"),
    ("c0010002-0000-0000-0000-000000001098", "4CB"),
    ("c0010002-0000-0000-0000-000000001099", "4CC"),
    ("c0010002-0000-0000-0000-000000001100", "5AA"),
    ("c0010002-0000-0000-0000-000000001101", "5AB"),
    ("c0010002-0000-0000-0000-000000001102", "5BA"),
    ("c0010002-0000-0000-0000-000000001103", "5BB"),
    ("c0010002-0000-0000-0000-000000001104", "5BC"),
    ("c0010002-0000-0000-0000-000000001105", "6AA"),
    ("c0010002-0000-0000-0000-000000001106", "6CC"),
]

fresh_et_cancellation_reason_answers = [
    ("c0010002-0000-0000-0000-000000001107", "Risk of Ovarian Hyperstimulation"),
    ("c0010002-0000-0000-0000-000000001108", "Thick Endometrium"),
    ("c0010002-0000-0000-0000-000000001109", "Thin Endometrium"),
    ("c0010002-0000-0000-0000-000000001110", "Difficult Endometrium"),
    ("c0010002-0000-0000-0000-000000001111", "Fluid in Endometrial cavity"),
    ("c0010002-0000-0000-0000-000000001112", "Uterine Bleeding"),
    ("c0010002-0000-0000-0000-000000001113", "Dual stimulation"),
    ("c0010002-0000-0000-0000-000000001114", "Fibroid"),
    ("c0010002-0000-0000-0000-000000001115", "Adenomyosis"),
    ("c0010002-0000-0000-0000-000000001116", "Oocyte freezing"),
    ("c0010002-0000-0000-0000-000000001117", "Hydrosalpinx"),
    ("c0010002-0000-0000-0000-000000001118", "Endometriosis"),
    ("c0010002-0000-0000-0000-000000001119", "Oncofertility"),
    ("c0010002-0000-0000-0000-000000001120", "Fever"),
    ("c0010002-0000-0000-0000-000000001121", "Elevated progesterone"),
    ("c0010002-0000-0000-0000-000000001122", "Agonist trigger"),
    ("c0010002-0000-0000-0000-000000001123", "Polyp"),
    ("c0010002-0000-0000-0000-000000001124", "Prolonged stimulation"),
    ("c0010002-0000-0000-0000-000000001125", "Ovarian Hyperstimulation"),
    ("c0010002-0000-0000-0000-000000001126", "Elective"),
]

fresh_et_day_answers = [
    ("c0010002-0000-0000-0000-000000001127", "Day 2"),
    ("c0010002-0000-0000-0000-000000001128", "Day 3"),
    ("c0010002-0000-0000-0000-000000001129", "Day 4"),
    ("c0010002-0000-0000-0000-000000001130", "Day 5"),
    ("c0010002-0000-0000-0000-000000001131", "Day 6"),
]

additional_art_procedure_answers = [
    ("c0010002-0000-0000-0000-000000001132", "Platelet Rich Plasma (PRP)"),
    ("c0010002-0000-0000-0000-000000001133", "Endometrial Injury (Endo Injury)"),
    ("c0010002-0000-0000-0000-000000001134", "Granulocyte Colony Stimulating Factor (G-CSF)"),
    ("c0010002-0000-0000-0000-000000001135", "Embryo Glue"),
]

upt_result_answers = [
    ("c0010002-0000-0000-0000-000000001136", "Positive"),
    ("c0010002-0000-0000-0000-000000001137", "Negative"),
    ("c0010002-0000-0000-0000-000000001138", "Inconclusive"),
]

post_ivf_outcome_answers = [
    ("c0010002-0000-0000-0000-000000001139", "Clinical pregnancy"),
    ("c0010002-0000-0000-0000-000000001140", "Ectopic pregnancy"),
    ("c0010002-0000-0000-0000-000000001141", "Abortion"),
    ("c0010002-0000-0000-0000-000000001142", "Failing pregnancy"),
    ("c0010002-0000-0000-0000-000000001143", "Live birth"),
    ("c0010002-0000-0000-0000-000000001144", "Intra-Uterine death"),
    ("c0010002-0000-0000-0000-000000001145", "Pre-term"),
    ("c0010002-0000-0000-0000-000000001146", "Preterm Premature Rupture of Membranes (PPROM)"),
]

post_ivf_complications_answers = [
    ("c0010002-0000-0000-0000-000000001147", "Diabetes (Gestational)"),
    ("c0010002-0000-0000-0000-000000001148", "Hypertension"),
    ("c0010002-0000-0000-0000-000000001149", "Intrahepatic Cholestasis of Pregnancy"),
    ("c0010002-0000-0000-0000-000000001150", "Fetal growth restriction"),
    ("c0010002-0000-0000-0000-000000001151", "Macrosomia"),
    ("c0010002-0000-0000-0000-000000001152", "Other"),
]

mode_of_delivery_answers = [
    ("c0010002-0000-0000-0000-000000001153", "Normal Vaginal Delivery"),
    ("c0010002-0000-0000-0000-000000001154", "Cesarean section"),
]





# We assemble the migration script wrapped in a stored procedure for IF/ELSE control flow
full_script = [
    "DELIMITER $$",
    "DROP PROCEDURE IF EXISTS register_aiims_concepts$$",
    "CREATE PROCEDURE register_aiims_concepts()",
    "BEGIN",
]

# 1. Answer concepts (datatype 4 = N/A, class 11 = Misc)
for u, name in education_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in occupation_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in ses_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in infertility_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in menstrual_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in female_factor_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in medical_disease_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name, _ in tb_site_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in att_duration_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in female_surgical_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in procedure_embryo_transfer_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in female_procedure_biopsy_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in investigation_male_semen_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in trigger_details_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in ovum_pick_up_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in lab_procedure_insemination_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in sperm_quality_assessment_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in additional_ivf_procedures_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in ovarian_stimulation_protocol_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in cetrotide_start_day_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in cleavage_embryo_grade_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in day4_embryo_grade_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in blastocyst_embryo_grade_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in fresh_et_cancellation_reason_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in fresh_et_day_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in additional_art_procedure_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in upt_result_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in post_ivf_outcome_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in post_ivf_complications_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

for u, name in mode_of_delivery_answers:
    full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))


# 2. Question concepts
# Consultant Unit
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000001", "Consultant Unit", datatype_id=3, class_id=7))
# Consultant Name
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000002", "Consultant Name", datatype_id=3, class_id=7))
# Patient Name
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000003", "Patient Name", datatype_id=3, class_id=7))
# Patient Age
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000004", "Patient Age", datatype_id=1, class_id=7, is_numeric=True, units="years", allow_decimal=0, low_abs=0, hi_abs=130))
# UHID
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000005", "Unique Health Identifier", datatype_id=3, class_id=7))
# IVF Number
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000006", "In-Vitro-Fertilization Number", datatype_id=3, class_id=7))
# Husband Name
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000007", "Husband Name", datatype_id=3, class_id=7))
# Husband Age
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000008", "Husband Age", datatype_id=1, class_id=7, is_numeric=True, units="years", allow_decimal=0, low_abs=0, hi_abs=130))
# Husband BMI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000009", "Husband Body Mass Index", datatype_id=1, class_id=7, is_numeric=True, units="kg/m2", allow_decimal=1, low_abs=5, hi_abs=90))
# Phone Wife
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000010", "Phone Number Wife", datatype_id=3, class_id=7))
# Phone Husband
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000011", "Phone Number Husband", datatype_id=3, class_id=7))
# Patient (Wife) BMI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000012", "Patient Body Mass Index", datatype_id=1, class_id=7, is_numeric=True, units="kg/m2", allow_decimal=1, low_abs=5, hi_abs=90))

# Education Wife: 1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
full_script.append(add_concept_sql("1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "Education Wife", datatype_id=2, class_id=7))
# Education Husband
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000013", "Education Husband", datatype_id=2, class_id=7))

# Occupation Wife
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000014", "Occupation Wife", datatype_id=2, class_id=7))
# Occupation Husband
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000015", "Occupation Husband", datatype_id=2, class_id=7))

# Socioeconomic Status
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000016", "Socioeconomic Status", datatype_id=2, class_id=7))

# Type of Infertility
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000017", "Type of infertility", datatype_id=2, class_id=7))
# Married for years
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000018", "Married for years", datatype_id=1, class_id=7, is_numeric=True, units="years", allow_decimal=0, low_abs=0, hi_abs=80))
# Duration of infertility
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000019", "Duration of infertility", datatype_id=1, class_id=7, is_numeric=True, units="years", allow_decimal=0, low_abs=0, hi_abs=80))

# Obstetric History Concepts
# Gravida
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000020", "Gravida", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=30))
# Parity
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000021", "Parity", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=30))
# Living Children
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000022", "Living Children", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=30))
# Abortion / Miscarriage
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000023", "Abortion or Miscarriage", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=30))
# Ectopic Pregnancy
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000024", "Ectopic Pregnancy", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=30))

# Menstrual History Concepts
# Pattern of Menstrual cycle
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000025", "Pattern of Menstrual cycle", datatype_id=2, class_id=7))
# Last menstrual period
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000026", "Last menstrual period", datatype_id=6, class_id=7))
# Flow of Menstrual cycle
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000027", "Flow of Menstrual cycle", datatype_id=2, class_id=7))
# Irregular cycle type
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000028", "Irregular cycle type", datatype_id=2, class_id=7))
# Type of Amenorrhoea
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000029", "Type of Amenorrhoea", datatype_id=2, class_id=7))

# Female Factor Concepts
# Female Infertility Factor
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000030", "Female Infertility Factor", datatype_id=2, class_id=7))
# Tubal Factor Details
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000031", "Tubal Factor Details", datatype_id=2, class_id=7))
# Diminished Ovarian Reserve Details
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000032", "Diminished Ovarian Reserve Details", datatype_id=2, class_id=7))
# POSEIDON Group
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000033", "POSEIDON Group", datatype_id=2, class_id=7))
# Endometriosis Classification
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000034", "Endometriosis Classification", datatype_id=2, class_id=7))
# PCOS Phenotype
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000035", "PCOS Phenotype", datatype_id=2, class_id=7))
# Uterine Factor Details
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000036", "Uterine Factor Details", datatype_id=2, class_id=7))
# Other Female Infertility Factors
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000037", "Other Female Infertility Factors", datatype_id=2, class_id=7))
# Female Factor Others
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000038", "Female Factor Others", datatype_id=3, class_id=7))

# Male Factor Concepts
# Male Infertility Factor
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000039", "Male Infertility Factor", datatype_id=2, class_id=7))
# Azoospermia Details
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000040", "Azoospermia Details", datatype_id=2, class_id=7))
# Male Factor Others
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000041", "Male Factor Others", datatype_id=3, class_id=7))

# Male Hormone & Surgery Concepts
# Follicle Stimulating Hormone Husband
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000042", "Follicle Stimulating Hormone Husband", datatype_id=1, class_id=7, is_numeric=True, units="mIU/mL", allow_decimal=1, low_abs=0, hi_abs=100))
# Testosterone Husband
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000043", "Testosterone Husband", datatype_id=1, class_id=7, is_numeric=True, units="ng/dL", allow_decimal=1, low_abs=0, hi_abs=2000))
# Testicular Biopsy
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000044", "Testicular Biopsy", datatype_id=3, class_id=7))

# Previous OI and IUI Concepts (Form 8)
# Previous Ovulation Induction (Yes/No)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000045", "Previous Ovulation Induction", datatype_id=2, class_id=7))
# Ovulation Induction Drugs OI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000046", "Ovulation Induction Drugs OI", datatype_id=2, class_id=7))
# Dose of drugs in Ovulation Induction
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000047", "Dose of drugs in Ovulation Induction", datatype_id=3, class_id=7))
# Number of Previous Ovulation Induction
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000048", "Number of Previous Ovulation Induction", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=50))
# Year of Previous Ovulation Induction
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000049", "Year of Previous Ovulation Induction", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))

# Previous OI and IUI (Yes/No)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000050", "Previous OI and IUI", datatype_id=2, class_id=7))
# Ovulation Induction Drugs IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000051", "Ovulation Induction Drugs IUI", datatype_id=2, class_id=7))
# Dose of drugs in OI and IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000052", "Dose of drugs in OI and IUI", datatype_id=3, class_id=7))
# Number of Previous OI and IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000053", "Number of Previous OI and IUI", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=50))
# Year of Previous OI and IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000054", "Year of Previous OI and IUI", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))

# Failed In vitro fertilization (Yes/No)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000055", "Failed In vitro fertilization", datatype_id=2, class_id=7))
# Number of Failed IVF Cycles
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000056", "Number of Failed IVF Cycles", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=50))
# Previous ART Treatment Clinical Notes
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000057", "Previous ART Treatment Clinical Notes", datatype_id=3, class_id=7))

# Previous Surgery Concepts (Form 9)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000058", "Previous Surgery Performed", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000059", "Surgical Approach", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000060", "Year or Date of Surgery", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000061", "Uterine Surgeries", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000062", "Endometriosis Surgeries", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000063", "Ovarian Surgeries", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000064", "Fallopian Tube Surgeries", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000065", "Peritoneal Surgeries", datatype_id=2, class_id=7))

# Laterality Question Concepts (0066-0083)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000066", "Endometriotic Cystectomy Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000067", "Endometriotic Bipolar Ablation Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000068", "Endometriotic APC Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000069", "Endometriotic Drainage Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000070", "Endometriotic Sclerotherapy Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000071", "Endometriosis Oophorectomy Laterality", datatype_id=2, class_id=7))

full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000072", "Ovarian Dermoid Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000073", "Simple Ovarian Cyst Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000074", "Paraovarian Cyst Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000075", "Ovarian Cyst Aspiration Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000076", "Oophorectomy Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000077", "Ovarian Cystectomy Laterality", datatype_id=2, class_id=7))

full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000078", "Chromopertubation Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000079", "Tubal Cannulation Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000080", "Salpingectomy Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000081", "Fimbrioplasty Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000082", "Tubal Clipping Laterality", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000083", "Recanalization Laterality", datatype_id=2, class_id=7))

# Findings and Other Notes
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000084", "Intra-operative Findings", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000085", "Previous Surgery Other Notes", datatype_id=3, class_id=7))

# Past Medical History Concepts (Form 10)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000086", "Medical Disease", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000087", "Medical Diseases Others", datatype_id=3, class_id=7))

# Family History Concepts (Form 11)
family_members_concepts = [
    ("c0010001-0000-0000-0000-000000000088", "Father Medical Disease", "c0010001-0000-0000-0000-000000000089", "Father Medical Diseases Others"),
    ("c0010001-0000-0000-0000-000000000090", "Mother Medical Disease", "c0010001-0000-0000-0000-000000000091", "Mother Medical Diseases Others"),
    ("c0010001-0000-0000-0000-000000000092", "Husband Medical Disease", "c0010001-0000-0000-0000-000000000093", "Husband Medical Diseases Others"),
    ("c0010001-0000-0000-0000-000000000094", "Brother Medical Disease", "c0010001-0000-0000-0000-000000000095", "Brother Medical Diseases Others"),
    ("c0010001-0000-0000-0000-000000000096", "Maternal Grandmother Medical Disease", "c0010001-0000-0000-0000-000000000097", "Maternal Grandmother Medical Diseases Others"),
    ("c0010001-0000-0000-0000-000000000098", "Maternal Grandfather Medical Disease", "c0010001-0000-0000-0000-000000000099", "Maternal Grandfather Medical Diseases Others"),
]
for q_uuid, q_name, note_uuid, note_name in family_members_concepts:
    full_script.append(add_concept_sql(q_uuid, q_name, datatype_id=2, class_id=7))
    full_script.append(add_concept_sql(note_uuid, note_name, datatype_id=3, class_id=7))

# Tuberculosis History Concepts (Form 12)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000100", "Tuberculosis Date of Diagnosis", datatype_id=6, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000101", "Site of Tuberculosis", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000102", "Other Site of Tuberculosis", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000103", "Anti-tubercular Therapy Start Date", datatype_id=6, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000104", "Anti-tubercular Therapy Count", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=50))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000105", "Anti-tubercular Therapy Duration", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000106", "Tuberculosis Clinical Notes", datatype_id=3, class_id=7))

# Investigation Ultrasound Concepts (Form 13)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000107", "Total Antral Follicle Count", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000108", "Volume Right Ovary", datatype_id=1, class_id=7, is_numeric=True, units="cm3", allow_decimal=2, low_abs=0, hi_abs=200))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000109", "Volume Left Ovary", datatype_id=1, class_id=7, is_numeric=True, units="cm3", allow_decimal=2, low_abs=0, hi_abs=200))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000110", "Ultrasound Remarks", datatype_id=3, class_id=7))

# Investigation Female Blood Hormone Concepts (Form 14)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000111", "Anti-Mullerian Hormone", datatype_id=1, class_id=7, is_numeric=True, units="ng/mL", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000112", "Day 2 Follicle-Stimulating Hormone", datatype_id=1, class_id=7, is_numeric=True, units="mIU/mL", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000113", "Day 2 Luteinizing Hormone", datatype_id=1, class_id=7, is_numeric=True, units="mIU/mL", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000114", "Thyroid-Stimulating Hormone", datatype_id=1, class_id=7, is_numeric=True, units="uIU/mL", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000115", "Serum Prolactin", datatype_id=1, class_id=7, is_numeric=True, units="ng/mL", allow_decimal=1))

# Investigation Female Surgical Procedure Concepts (Form 15)
# Hysteroscopy (0116-0121)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000116", "Hysteroscopy Ostia", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000117", "Hysteroscopy Endometrium", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000118", "Hysteroscopy Endometrial Cavity", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000119", "Hysteroscopy Cervical Canal Direction", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000120", "Hysteroscopy Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000121", "Operative Hysteroscopy", datatype_id=2, class_id=7))

# TVS Findings (0122-0173)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000122", "Uterine Size Length", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000123", "Uterine Size Width", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000124", "Uterine Size Transverse Diameter", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000125", "Uterine Size Volume", datatype_id=1, class_id=7, is_numeric=True, units="cm3", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000126", "Day of Cycle", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000127", "Adenomyosis TVS Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000128", "Uterine Calcifications", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000129", "Fibroids Present", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000130", "Number of Fibroids", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000131", "Fibroids Location", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000132", "Fibroids Size", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000133", "Fibroid Stages FIGO", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000134", "TVS Endometrial Cavity", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000135", "Endometrial-Myometrial Junction", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000136", "Septate Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000137", "Endometrial Cavity Septate Angle", datatype_id=1, class_id=7, is_numeric=True, units="degrees", allow_decimal=1))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000138", "Endometrial Cavity Length of Septum", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000139", "Bicornuate Uterus", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000140", "Bicornuate Uterus Right Volume", datatype_id=1, class_id=7, is_numeric=True, units="cm3", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000141", "Bicornuate Uterus Left Volume", datatype_id=1, class_id=7, is_numeric=True, units="cm3", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000142", "Unicornuate Uterus", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000143", "Unicornuate Uterus Volume", datatype_id=1, class_id=7, is_numeric=True, units="cm3", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000144", "Polyp Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000145", "Number of Polyps", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000146", "Dimensions of Polyps", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000147", "Antral Follicle Count Right Ovary", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000148", "Antral Follicle Count Left Ovary", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000149", "Right Ovary Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000150", "Left Ovary Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000151", "Endometrioma Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000152", "Number of Endometriomas", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000153", "Number of Follicles Accessible", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000154", "Number of Follicles Inaccessible", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000155", "Endometrioma Right Ovary Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000156", "Endometrioma Left Ovary Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000157", "Focal Adenomyoma Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000158", "Hydrosalpinx Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000159", "Hydrosalpinx Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000160", "Day 14-16 Endometrial Thickness Measurements", datatype_id=1, class_id=7, is_numeric=True, units="mm", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000161", "Day 14-16 Endometrial Thickness Pattern", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000162", "Ovarian Dermoid Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000163", "Right Ovary Dermoid Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000164", "Left Ovary Dermoid Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000165", "Haemorrhagic Cyst Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000166", "Right Ovary Haemorrhagic Cyst Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000167", "Left Ovary Haemorrhagic Cyst Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000168", "Corpus Luteum Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000169", "Right Ovary Corpus Luteum Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000170", "Left Ovary Corpus Luteum Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000171", "Paro-ovarian Cyst Finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000172", "Right Paro-ovarian Cyst Dimensions", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000173", "Left Paro-ovarian Cyst Dimensions", datatype_id=3, class_id=7))

# Endometrial Zones (0174-0177)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000174", "Zone 1 Myometrium Dimensions", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000175", "Zone 2 Hyperechoic Endometrial Edge Dimensions", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000176", "Zone 3 Internal Endometrial Hypoechoic Zone Dimensions", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=2))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000177", "Zone 4 Endometrial Cavity Dimensions", datatype_id=1, class_id=7, is_numeric=True, units="cm", allow_decimal=2))

# Remarks (0178)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000178", "Female Surgical Procedure Remarks", datatype_id=3, class_id=7))

# Procedure Embryo Transfer Concepts (Form 16: 0179-0182)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000179", "Mock Embryo Transfer", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000180", "Mock Embryo Transfer Speculum", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000181", "Embryo Transfer Cervical Canal Direction", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000182", "Procedure Embryo Transfer Remarks", datatype_id=3, class_id=7))

# Investigation Female Procedure Biopsy Concepts (Form 17: 0183-0186)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000183", "Endometrial Aspiration Histopathological Examination", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000184", "Endometrial Aspiration Polymerase Chain Reaction", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000185", "Endometrial Aspiration Acid Fast Bacillus", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000186", "Investigation Female Procedure Biopsy Remarks", datatype_id=3, class_id=7))

# Investigation Male Semen Concepts (Form 18: 0187-0192)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000187", "Husband Semen Analysis Volume", datatype_id=1, class_id=7, is_numeric=True, units="mL", allow_decimal=1, low_abs=0, hi_abs=20))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000188", "Husband Semen Analysis Count in million", datatype_id=1, class_id=7, is_numeric=True, units="million/mL", allow_decimal=1, low_abs=0, hi_abs=1000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000189", "Husband Semen Analysis Motility finding", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000190", "Husband Semen Analysis Motility total progressive", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000191", "Sperm Morphology", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000192", "Investigation Male Semen Remarks", datatype_id=3, class_id=7))

# Previous OVI & IUI Form Enhancements (0193-0194)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000193", "Prev In-Vitro Fertilization details", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000194", "Prev In-Vitro Fertilization details Date", datatype_id=6, class_id=7))

# Trigger Details Concepts (Form 19: 0195-0205)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000195", "Number of Follicles on trigger day 14 to 22 mm", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000196", "Number of Follicles on trigger day 16 to 22 mm", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000197", "Endometrial thickness on trigger day", datatype_id=1, class_id=7, is_numeric=True, units="mm", allow_decimal=1, low_abs=0, hi_abs=30))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000198", "Endometrial thickness on trigger day Pattern", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000199", "Estradiol on Trigger Day", datatype_id=1, class_id=7, is_numeric=True, units="pg/mL", allow_decimal=1, low_abs=0, hi_abs=20000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000200", "Progesterone on Trigger Day", datatype_id=1, class_id=7, is_numeric=True, units="ng/mL", allow_decimal=2, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000201", "Ovulation trigger", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000202", "Ovulation trigger dose", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000203", "Date of trigger", datatype_id=6, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000204", "Time of trigger", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000205", "Trigger Details Remarks", datatype_id=3, class_id=7))

# Ovum Pick Up Details Concepts (Form 20: 0206-0221)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000206", "Date of Ovum Pick Up", datatype_id=6, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000207", "Time of Ovum Pick Up", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000208", "Interval between Trigger and Ovum Pick Up", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000209", "Number of Oocytes Retrieved", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000210", "Number of Oocytes Retrieved comments", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000211", "Fort Follicular Output Rate FORT", datatype_id=1, class_id=7, is_numeric=True, units="%", allow_decimal=1, low_abs=0, hi_abs=500))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000212", "Follicle to Oocyte Index", datatype_id=1, class_id=7, is_numeric=True, units="%", allow_decimal=1, low_abs=0, hi_abs=500))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000213", "Oocyte-Cumulus Complex Grade-I", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000214", "Oocyte-Cumulus Complex Grade-II", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000215", "Oocyte-Cumulus Complex Grade-III", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000216", "Metaphase II", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000217", "Metaphase I", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000218", "Germinal Vesicle", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000219", "Abnormal oocytes number", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=150))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000220", "Abnormal oocytes", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000221", "Ovum Pick Up Details Remarks", datatype_id=3, class_id=7))

# Lab Procedure of Insemination Concepts (Form 21: 0222-0224)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000222", "Method of Insemination", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000223", "Time of Insemination or Injection", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000224", "Lab Procedure of Insemination Remarks", datatype_id=3, class_id=7))

# Procedure Concepts (Form 22: 0225-0227)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000225", "Sperm Retrieval Procedure", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000226", "Procedure Remarks", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000227", "Additional IVF Procedures", datatype_id=2, class_id=7))

# Sperm Quality Assessment Concepts (Form 23: 0228-0230)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000228", "Post wash Sperm concentration on Ovum Pick Up Day", datatype_id=1, class_id=7, is_numeric=True, units="million/mL", allow_decimal=1, low_abs=0, hi_abs=1000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000229", "Sperm motility on Ovum Pick Up Day", datatype_id=1, class_id=7, is_numeric=True, units="%", allow_decimal=1, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000230", "Sperm Quality Assessment Remarks", datatype_id=3, class_id=7))

# Type of Ovarian Stimulation Protocol Concepts (0231-0232)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000231", "Type of Ovarian Stimulation Protocol", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000232", "Ovarian Stimulation Protocol Remarks", datatype_id=3, class_id=7))

# Dose of Drugs Concepts (0233-0243)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000233", "Total days of Leuprolide downregulation", datatype_id=1, class_id=7, is_numeric=True, units="days", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000234", "Starting dose Follicle-Stimulating Hormone", datatype_id=1, class_id=7, is_numeric=True, units="IU", allow_decimal=1, low_abs=0, hi_abs=5000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000235", "Starting dose Human Menopausal Gonadotropin", datatype_id=1, class_id=7, is_numeric=True, units="IU", allow_decimal=1, low_abs=0, hi_abs=5000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000236", "Starting dose Recombinant Luteinizing Hormone", datatype_id=1, class_id=7, is_numeric=True, units="IU", allow_decimal=1, low_abs=0, hi_abs=5000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000237", "Total dose Follicle-Stimulating Hormone", datatype_id=1, class_id=7, is_numeric=True, units="IU", allow_decimal=1, low_abs=0, hi_abs=50000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000238", "Total dose Human Menopausal Gonadotropin", datatype_id=1, class_id=7, is_numeric=True, units="IU", allow_decimal=1, low_abs=0, hi_abs=50000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000239", "Total dose Recombinant Luteinizing Hormone", datatype_id=1, class_id=7, is_numeric=True, units="IU", allow_decimal=1, low_abs=0, hi_abs=50000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000240", "Total Cetrotide dose", datatype_id=1, class_id=7, is_numeric=True, units="mg", allow_decimal=2, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000241", "Day of start of Cetrotide", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000242", "Total days of stimulation", datatype_id=1, class_id=7, is_numeric=True, units="days", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000243", "Dose of Drugs Remarks", datatype_id=3, class_id=7))

# Adjuvant Drug Concepts (0244-0247)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000244", "Growth hormone", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000245", "Growth hormone dose", datatype_id=1, class_id=7, is_numeric=True, units="IU", allow_decimal=2, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000246", "Growth hormone duration", datatype_id=1, class_id=7, is_numeric=True, units="days", allow_decimal=0, low_abs=0, hi_abs=365))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000247", "Adjuvant Drug Remarks", datatype_id=3, class_id=7))

# Assessment of Fertilization, Embryo & Blastocyst Concepts (Form 27: 0248-0260)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000248", "Number of Embryos Day 1 (2PN)", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000249", "Grade of Embryos Day 1 (2PN)", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000250", "Number of Embryos Day 2", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000251", "Grade of Embryos Day 2", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000252", "Number of Embryos Day 3", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000253", "Grade of Embryos Day 3", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000254", "Number of Embryos Day 4", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000255", "Grade of Embryos Day 4", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000256", "Number of Embryos Day 5", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000257", "Grade of Embryos Day 5", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000258", "Number of Embryos Day 6", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000259", "Grade of Embryos Day 6", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000260", "Embryo Assessment Remarks", datatype_id=3, class_id=7))

# Fertilisation Details Concepts (Form 28: 0261-0267)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000261", "Number of Oocytes Fertilised", datatype_id=1, class_id=7, is_numeric=True, units="oocytes", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000262", "Fertilisation Rate", datatype_id=1, class_id=7, is_numeric=True, units="%", allow_decimal=1, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000263", "Embryos Cleaved on Day 2", datatype_id=1, class_id=7, is_numeric=True, units="embryos", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000264", "Cleavage Rate", datatype_id=1, class_id=7, is_numeric=True, units="%", allow_decimal=1, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000265", "Embryos Cleaved on Day 3", datatype_id=1, class_id=7, is_numeric=True, units="embryos", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000266", "Number of Embryos Cleaved on Day 5", datatype_id=1, class_id=7, is_numeric=True, units="embryos", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000267", "Fertilisation Details Remarks", datatype_id=3, class_id=7))

# Embryo Grading Day 3 Concepts (Form 29: 0268-0272)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000268", "Grade 1 Embryos Day 3", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000269", "Grade 2 Embryos Day 3", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000270", "Grade 3 Embryos Day 3", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000271", "Grade 4 Embryos Day 3", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000272", "Embryo Grading Day 3 Remarks", datatype_id=3, class_id=7))

# Embryos Frozen Concepts (Form 30: 0273-0279)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000273", "Number of Day 3 Embryos Vitrified", datatype_id=1, class_id=7, is_numeric=True, units="embryos", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000274", "Grade A Embryos Vitrified", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000275", "Grade B Embryos Vitrified", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000276", "Grade C Embryos Vitrified", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000277", "Number of Day 5 Embryos Vitrified", datatype_id=1, class_id=7, is_numeric=True, units="embryos", allow_decimal=0, low_abs=0, hi_abs=100))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000278", "Grade of Day 5 Embryos Vitrified", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000279", "Embryos Frozen Remarks", datatype_id=3, class_id=7))

# Fresh Embryo Transfer Details Concepts (Form 31: 0280-0290)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000280", "Fresh Embryo Transfer Performed", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000281", "Reason Fresh Embryo Transfer Not Performed", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000282", "Other Reason Fresh Embryo Transfer Not Performed", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000283", "Number of Fresh Embryos Transferred", datatype_id=1, class_id=7, is_numeric=True, units="embryos", allow_decimal=0, low_abs=0, hi_abs=10))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000284", "Grade of Fresh Embryos Transferred", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000285", "Day of Fresh Embryo Transfer", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000286", "Fresh Embryo Transfer Endometrial Thickness", datatype_id=1, class_id=7, is_numeric=True, units="mm", allow_decimal=1, low_abs=1.0, hi_abs=30.0))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000287", "Fresh Embryo Transfer Difficulty", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000288", "Blood on Tip of Catheter", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000289", "Fresh Embryo Transfer Date", datatype_id=6, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000290", "Fresh Embryo Transfer Remarks", datatype_id=3, class_id=7))

# Additional Procedures in ART Concepts (Form 32: 0291-0293)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000291", "Additional Procedures in Assisted Reproductive Technology", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000292", "Date of Additional Procedures in Assisted Reproductive Technology", datatype_id=6, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000293", "Additional Procedures in Assisted Reproductive Technology Remarks", datatype_id=3, class_id=7))

# Post-InVitro Fertilisation Investigation Concepts (Form 33: 0294-0301)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000294", "Urine Pregnancy Test (UPT)", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000295", "Beta-Human Chorionic Gonadotropin", datatype_id=1, class_id=7, is_numeric=True, units="mIU/mL", allow_decimal=1, low_abs=0, hi_abs=500000))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000296", "Scan at 6-7 weeks", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000297", "Post IVF Outcome", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000298", "Post IVF Pregnancy Complications", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000299", "Other Pregnancy Complications", datatype_id=3, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000300", "Mode of Delivery", datatype_id=2, class_id=7))
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000301", "Period of Gestation at Delivery", datatype_id=1, class_id=7, is_numeric=True, units="weeks", allow_decimal=1, low_abs=10, hi_abs=45))



# 3. Link Answers
# Education Wife answers
for u, _ in education_answers:
    full_script.append(add_answer_sql("1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", u))

# Education Husband answers
for u, _ in education_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000013", u))

# Occupation Wife answers
for u, _ in occupation_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000014", u))

# Occupation Husband answers
for u, _ in occupation_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000015", u))

# Socioeconomic status answers
for u, _ in ses_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000016", u))

# Type of infertility answers
for u, _ in infertility_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000017", u))

# Pattern of menstrual cycle answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000201",  # Regular periods
    "c0010002-0000-0000-0000-000000000202",  # Irregular periods
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000025", ans_uuid))

# Flow of menstrual cycle answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000205",  # Normal
    "c0010002-0000-0000-0000-000000000206",  # Hypomenorrhoea
    "c0010002-0000-0000-0000-000000000209",  # Heavy Menstrual Bleeding (HMB)
    "c0010002-0000-0000-0000-000000000210",  # Amenorrhoea
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000027", ans_uuid))

# Irregular cycle type answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000203",  # Oligomenorrhea
    "c0010002-0000-0000-0000-000000000204",  # Polymenorrhea
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000028", ans_uuid))

# Type of Amenorrhoea answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000207",  # Primary Amenorrhoea
    "c0010002-0000-0000-0000-000000000208",  # Secondary Amenorrhoea
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000029", ans_uuid))

# Female Infertility Factor answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000301",
    "c0010002-0000-0000-0000-000000000302",
    "c0010002-0000-0000-0000-000000000303",
    "c0010002-0000-0000-0000-000000000304",
    "c0010002-0000-0000-0000-000000000305",
    "c0010002-0000-0000-0000-000000000306",
    "c0010002-0000-0000-0000-000000000307",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000030", ans_uuid))

# Tubal Factor Details answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000311",
    "c0010002-0000-0000-0000-000000000312",
    "c0010002-0000-0000-0000-000000000313",
    "c0010002-0000-0000-0000-000000000314",
    "c0010002-0000-0000-0000-000000000315",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000031", ans_uuid))

# Diminished Ovarian Reserve Details answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000321",
    "c0010002-0000-0000-0000-000000000322",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000032", ans_uuid))

# POSEIDON Group answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000323",
    "c0010002-0000-0000-0000-000000000324",
    "c0010002-0000-0000-0000-000000000325",
    "c0010002-0000-0000-0000-000000000326",
    "c0010002-0000-0000-0000-000000000327",
    "c0010002-0000-0000-0000-000000000328",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000033", ans_uuid))

# Endometriosis Classification answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000331",
    "c0010002-0000-0000-0000-000000000332",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000034", ans_uuid))

# PCOS Phenotype answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000341",
    "c0010002-0000-0000-0000-000000000342",
    "c0010002-0000-0000-0000-000000000343",
    "c0010002-0000-0000-0000-000000000344",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000035", ans_uuid))

# Uterine Factor Details answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000351",
    "c0010002-0000-0000-0000-000000000352",
    "c0010002-0000-0000-0000-000000000353",
    "c0010002-0000-0000-0000-000000000354",
    "c0010002-0000-0000-0000-000000000355",
    "c0010002-0000-0000-0000-000000000356",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000036", ans_uuid))

# Other Female Infertility Factors answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000361",
    "c0010002-0000-0000-0000-000000000362",
    "c0010002-0000-0000-0000-000000000363",
    "c0010002-0000-0000-0000-000000000364",
    "c0010002-0000-0000-0000-000000000365",
    "c0010002-0000-0000-0000-000000000366",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000037", ans_uuid))

# Male Infertility Factor answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000401",  # Azoospermia
    "c0010002-0000-0000-0000-000000000402",  # Oligozoospermia
    "c0010002-0000-0000-0000-000000000403",  # Asthenozoospermia
    "c0010002-0000-0000-0000-000000000404",  # Teratozoospermia
    "c0010002-0000-0000-0000-000000000405",  # Unexplained Infertility (Male)
    "c0010002-0000-0000-0000-000000000406",  # Erectile dysfunction
    "c0010002-0000-0000-0000-000000000407",  # Ejaculatory Dysfunction
    "c0010002-0000-0000-0000-000000000408",  # Retrograde Ejaculation
    "c0010002-0000-0000-0000-000000000409",  # Oligoasthenoteratozoospermia (OATS)
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000039", ans_uuid))

# Azoospermia Details answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000411",  # Obstructive
    "c0010002-0000-0000-0000-000000000412",  # Non-Obstructive
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000040", ans_uuid))

# Previous OI (Yes/No) answers
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000045", "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000045", "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))

# Ovulation Induction Drugs OI answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000501",  # Letrozole
    "c0010002-0000-0000-0000-000000000502",  # Human menopausal gonadotropin
    "c0010002-0000-0000-0000-000000000503",  # Clomiphene citrate
    "c0010002-0000-0000-0000-000000000504",  # Human menopausal gonadotropin + Clomiphene citrate
    "c0010002-0000-0000-0000-000000000505",  # Multiple OVI
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000046", ans_uuid))

# Previous OI and IUI (Yes/No) answers
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000050", "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000050", "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))

# Ovulation Induction Drugs IUI answers
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000501",  # Letrozole
    "c0010002-0000-0000-0000-000000000502",  # Human menopausal gonadotropin
    "c0010002-0000-0000-0000-000000000503",  # Clomiphene citrate
    "c0010002-0000-0000-0000-000000000504",  # Human menopausal gonadotropin + Clomiphene citrate
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000051", ans_uuid))

# Failed In vitro fertilization (Yes/No) answers
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000055", "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000055", "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))

# Form 9: Previous Surgery answers
# Previous Surgery Performed (Yes/No)
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000058", "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))
full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000058", "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))

# Surgical Approach
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000611",  # Laparoscopy
    "c0010002-0000-0000-0000-000000000612",  # Open
    "c0010002-0000-0000-0000-000000000613",  # Laparoscopy converted to open
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000059", ans_uuid))

# Uterine Surgeries
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000621",  # Uterine Adenomyomectomy
    "c0010002-0000-0000-0000-000000000622",  # Uterine Myomectomy
    "c0010002-0000-0000-0000-000000000623",  # Uterine Isthmocele Repair
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000061", ans_uuid))

# Endometriosis Surgeries
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000631",  # Endometriotic Cystectomy
    "c0010002-0000-0000-0000-000000000632",  # Endometriotic Bipolar Ablation
    "c0010002-0000-0000-0000-000000000633",  # Endometriotic Argon Plasma Coagulation
    "c0010002-0000-0000-0000-000000000634",  # Endometriotic Drainage
    "c0010002-0000-0000-0000-000000000635",  # Endometriotic Sclerotherapy
    "c0010002-0000-0000-0000-000000000636",  # Endometriosis Oophorectomy
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000062", ans_uuid))

# Ovarian Surgeries
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000641",  # Ovarian Dermoid/Mature Teratoma
    "c0010002-0000-0000-0000-000000000642",  # Simple Ovarian Cyst
    "c0010002-0000-0000-0000-000000000643",  # Paraovarian Cyst
    "c0010002-0000-0000-0000-000000000644",  # Ovarian Cyst Aspiration
    "c0010002-0000-0000-0000-000000000645",  # Oophorectomy
    "c0010002-0000-0000-0000-000000000646",  # Ovarian Cystectomy
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000063", ans_uuid))

# Fallopian Tube Surgeries
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000651",  # Chromopertubation of Fallopian tubes
    "c0010002-0000-0000-0000-000000000652",  # Tubal cannulation
    "c0010002-0000-0000-0000-000000000653",  # Salpingectomy of Fallopian tubes
    "c0010002-0000-0000-0000-000000000654",  # Fimbrioplasty of Fallopian tubes
    "c0010002-0000-0000-0000-000000000655",  # Tubal clipping of Fallopian tubes
    "c0010002-0000-0000-0000-000000000656",  # Recanalization of Fallopian tubes
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000064", ans_uuid))

# Peritoneal Surgeries
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000661",  # Peritoneal Adhesiolysis
    "c0010002-0000-0000-0000-000000000662",  # Peritonectomy
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000065", ans_uuid))

# Laterality links (Right, Left, Bilateral) for each procedure with laterality (0066-0083)
laterality_answers = [
    "c0010002-0000-0000-0000-000000000601",  # Right
    "c0010002-0000-0000-0000-000000000602",  # Left
    "c0010002-0000-0000-0000-000000000603",  # Bilateral
]

for q_num in range(66, 84):
    q_uuid = f"c0010001-0000-0000-0000-{q_num:012d}"
    for ans_u in laterality_answers:
        full_script.append(add_answer_sql(q_uuid, ans_u))

# Past Medical History answers
for ans_uuid, _ in medical_disease_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000086", ans_uuid))

# Family History answers
for q_uuid, _, _, _ in family_members_concepts:
    for ans_uuid, _ in medical_disease_answers:
        full_script.append(add_answer_sql(q_uuid, ans_uuid))

# Form 12: Tuberculosis History answers and SNOMED mappings
for ans_uuid, name, snomed_code in tb_site_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000101", ans_uuid))
    if snomed_code:
        full_script.append(add_snomed_map_sql(ans_uuid, snomed_code, name))

for ans_uuid, _ in att_duration_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000105", ans_uuid))

# Form 15: Investigation Female Surgical Procedure Answer Links
# Hysteroscopy Ostia (0116)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000901",  # Deep seated
    "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Normal
    "c0010002-0000-0000-0000-000000000902",  # Peri-ostial adhesion
    "c0010002-0000-0000-0000-000000000903",  # Right ostia not seen
    "c0010002-0000-0000-0000-000000000904",  # Left ostia not seen
    "c0010002-0000-0000-0000-000000000905",  # Both ostia not seen
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000116", ans_uuid))

# Hysteroscopy Endometrium (0117)
for ans_uuid in [
    "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Normal
    "c0010002-0000-0000-0000-000000000906",  # Pale endometrium
    "c0010002-0000-0000-0000-000000000907",  # Micropolyps
    "c0010002-0000-0000-0000-000000000908",  # Thin endometrium
    "c0010002-0000-0000-0000-000000000909",  # Congested endometrium
    "c0010002-0000-0000-0000-000000000910",  # Endometrial fibrosis
    "c0010002-0000-0000-0000-000000000911",  # Polypoidal endometrium
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000117", ans_uuid))

# Hysteroscopy Endometrial Cavity (0118)
for ans_uuid in [
    "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Normal
    "c0010002-0000-0000-0000-000000000912",  # Polyp
    "c0010002-0000-0000-0000-000000000913",  # Septum
    "c0010002-0000-0000-0000-000000000914",  # Adhesion
    "c0010002-0000-0000-0000-000000000915",  # Fibroid
    "c0010002-0000-0000-0000-000000000916",  # Subseptate
    "c0010002-0000-0000-0000-000000000917",  # Tubular
    "c0010002-0000-0000-0000-000000000918",  # Adequate
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000118", ans_uuid))

# Cervical Canal Direction (0119)
for ans_uuid in [
    "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Normal
    "c0010002-0000-0000-0000-000000000919",  # Straight cervical canal
    "c0010002-0000-0000-0000-000000000920",  # Towards left
    "c0010002-0000-0000-0000-000000000921",  # Towards right
    "c0010002-0000-0000-0000-000000000922",  # Cervical adhesions
    "c0010002-0000-0000-0000-000000000923",  # Anteverted
    "c0010002-0000-0000-0000-000000000924",  # Retroverted
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000119", ans_uuid))

# Operative Hysteroscopy (0121)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000925",  # Uterine Polypectomy
    "c0010002-0000-0000-0000-000000000926",  # Metroplasty
    "c0010002-0000-0000-0000-000000000927",  # Septal resection
    "c0010002-0000-0000-0000-000000000928",  # Myomectomy
    "c0010002-0000-0000-0000-000000000929",  # Adhesiolysis
    "c0010002-0000-0000-0000-000000000930",  # PRP/Stem cell instillation
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000121", ans_uuid))

# TVS Adenomyosis (0127)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000931",  # Globular
    "c0010002-0000-0000-0000-000000000932",  # Asymmetrical thickening
    "c0010002-0000-0000-0000-000000000933",  # Cysts
    "c0010002-0000-0000-0000-000000000934",  # Hyperechoic islands
    "c0010002-0000-0000-0000-000000000935",  # Fan-shaped shadowing
    "c0010002-0000-0000-0000-000000000936",  # Echogenic subendometrial lines and buds
    "c0010002-0000-0000-0000-000000000937",  # Translesional Vascularity
    "c0010002-0000-0000-0000-000000000938",  # Irregular junctional zone
    "c0010002-0000-0000-0000-000000000939",  # Interrupted junctional zone
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000127", ans_uuid))

# Yes/No questions (Calcifications 0128, Fibroids 0129, Septate 0136, Bicornuate 0139, Unicornuate 0142, Dermoid 0162, Haemorrhagic 0165, Corpus Luteum 0168, Paro-ovarian 0171)
for q_uuid in [
    "c0010001-0000-0000-0000-000000000128",
    "c0010001-0000-0000-0000-000000000129",
    "c0010001-0000-0000-0000-000000000136",
    "c0010001-0000-0000-0000-000000000139",
    "c0010001-0000-0000-0000-000000000142",
    "c0010001-0000-0000-0000-000000000162",
    "c0010001-0000-0000-0000-000000000165",
    "c0010001-0000-0000-0000-000000000168",
    "c0010001-0000-0000-0000-000000000171",
]:
    full_script.append(add_answer_sql(q_uuid, "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))
    full_script.append(add_answer_sql(q_uuid, "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))

# Fibroids Location (0131)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000940",  # Anterior wall
    "c0010002-0000-0000-0000-000000000941",  # Posterior wall
    "c0010002-0000-0000-0000-000000000942",  # Fundal
    "c0010002-0000-0000-0000-000000000943",  # Right lateral
    "c0010002-0000-0000-0000-000000000944",  # Left lateral
    "c0010002-0000-0000-0000-000000000945",  # Cervical
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000131", ans_uuid))

# Fibroid Stages FIGO (0133)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000946",
    "c0010002-0000-0000-0000-000000000947",
    "c0010002-0000-0000-0000-000000000948",
    "c0010002-0000-0000-0000-000000000949",
    "c0010002-0000-0000-0000-000000000950",
    "c0010002-0000-0000-0000-000000000951",
    "c0010002-0000-0000-0000-000000000952",
    "c0010002-0000-0000-0000-000000000953",
    "c0010002-0000-0000-0000-000000000954",
    "c0010002-0000-0000-0000-000000000955",
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000133", ans_uuid))

# TVS Endometrial Cavity (0134)
for ans_uuid in [
    "1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Normal
    "c0010002-0000-0000-0000-000000000956",  # 3D
    "c0010002-0000-0000-0000-000000000957",  # 4D
    "c0010002-0000-0000-0000-000000000958",  # Endometrial Cavity Adhesions
    "c0010002-0000-0000-0000-000000000959",  # Fluid in cavity
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000134", ans_uuid))

# Endometrial-Myometrial Junction (0135)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000960",  # Well-defined
    "c0010002-0000-0000-0000-000000000961",  # Ill-defined
    "c0010002-0000-0000-0000-000000000962",  # Irregular
    "c0010002-0000-0000-0000-000000000963",  # Interrupted
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000135", ans_uuid))

# Present/Absent questions (Polyp 0144, Endometrioma 0151)
for q_uuid in [
    "c0010001-0000-0000-0000-000000000144",
    "c0010001-0000-0000-0000-000000000151",
]:
    full_script.append(add_answer_sql(q_uuid, "163748AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))  # Present
    full_script.append(add_answer_sql(q_uuid, "163747AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))  # Absent

# Hydrosalpinx Finding (0158)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000964",  # Right Hydrosalpinx
    "c0010002-0000-0000-0000-000000000965",  # Left Hydrosalpinx
    "c0010002-0000-0000-0000-000000000966",  # Both Hydrosalpinx
    "163747AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Absent
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000158", ans_uuid))

# Day 14-16 Endometrial Thickness Pattern (0161)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000967",  # Trilaminar
    "c0010002-0000-0000-0000-000000000968",  # Diffuse
    "c0010002-0000-0000-0000-000000000969",  # Fluid pattern
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000161", ans_uuid))

# Procedure Embryo Transfer (Form 16)
# Mock Embryo Transfer (0179)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000970",  # Easy
    "c0010002-0000-0000-0000-000000000971",  # Difficult
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000179", ans_uuid))

# Mock Embryo Transfer Speculum (0180)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000972",  # With Cusco's
    "c0010002-0000-0000-0000-000000000973",  # With Sim's
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000180", ans_uuid))

# Embryo Transfer Cervical Canal Direction (0181)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000974",  # Deviated to Left
    "c0010002-0000-0000-0000-000000000975",  # Deviated to Right
    "c0010002-0000-0000-0000-000000000976",  # Straight
    "c0010002-0000-0000-0000-000000000977",  # Acutely anteverted
    "c0010002-0000-0000-0000-000000000923",  # Anteverted
    "c0010002-0000-0000-0000-000000000924",  # Retroverted
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000181", ans_uuid))

# Investigation Female Procedure Biopsy (Form 17)
# Endometrial Aspiration Histopathological Examination (0183)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000979",  # Atrophic endometrium
    "c0010002-0000-0000-0000-000000000980",  # Benign endometrium
    "c0010002-0000-0000-0000-000000000981",  # Proliferative endometrium
    "c0010002-0000-0000-0000-000000000982",  # Disordered proliferative endometrium
    "c0010002-0000-0000-0000-000000000983",  # Early secretory endometrium
    "c0010002-0000-0000-0000-000000000984",  # Mid secretory endometrium
    "c0010002-0000-0000-0000-000000000985",  # Late secretory endometrium
    "c0010002-0000-0000-0000-000000000986",  # Endometrial hyperplasia
    "c0010002-0000-0000-0000-000000000987",  # Endometrial hyperplasia with atypia
    "c0010002-0000-0000-0000-000000000988",  # Endometrial hyperplasia without atypia
    "c0010002-0000-0000-0000-000000000989",  # Epitheloid cells
    "c0010002-0000-0000-0000-000000000990",  # Granuloma
    "c0010002-0000-0000-0000-000000000991",  # Granuloma Present
    "c0010002-0000-0000-0000-000000000992",  # Granuloma Absent
    "c0010002-0000-0000-0000-000000000993",  # Fragmented Endometrial Glands
    "c0010002-0000-0000-0000-000000000994",  # Interval phase endometrium
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000183", ans_uuid))

# Endometrial Aspiration Polymerase Chain Reaction (0184)
for ans_uuid in [
    "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",   # Positive
    "664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",   # Negative
    "1118AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Not done
    "c0010002-0000-0000-0000-000000000978",  # Not available
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000184", ans_uuid))

# Endometrial Aspiration Acid Fast Bacillus (0185)
for ans_uuid in [
    "703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",   # Positive
    "664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",   # Negative
    "1118AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Not done
    "c0010002-0000-0000-0000-000000000978",  # Not available
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000185", ans_uuid))

# Investigation Male Semen (Form 18)
# Husband Semen Analysis Motility finding (0189)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000995",  # Few motile
    "c0010002-0000-0000-0000-000000000996",  # Immotile
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000189", ans_uuid))

# Trigger Details (Form 19)
# Endometrial thickness on trigger day Pattern (0198)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000967",  # Trilaminar
    "c0010002-0000-0000-0000-000000000997",  # Endometrial polyp
    "c0010002-0000-0000-0000-000000000998",  # Early diffuse
    "c0010002-0000-0000-0000-000000000959",  # Fluid in cavity
    "c0010002-0000-0000-0000-000000000999",  # Minimal fluid
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000198", ans_uuid))

# Ovulation trigger (0201)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000001000",  # Leuprolide
    "c0010002-0000-0000-0000-000000001001",  # Ovitrelle
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000201", ans_uuid))

# Ovum Pick Up Details (Form 20)
# Abnormal oocytes (0220)
for ans_uuid, _ in ovum_pick_up_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000220", ans_uuid))

# Lab Procedure of Insemination (Form 21)
# Method of Insemination (0222)
for ans_uuid, _ in lab_procedure_insemination_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000222", ans_uuid))

# Procedure (Form 22)
# Sperm Retrieval Procedure (0225)
for ans_uuid, _ in sperm_quality_assessment_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000225", ans_uuid))

# Additional IVF Procedures (0227)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000001017",  # Laser Assisted Hatching (LAH)
    "c0010002-0000-0000-0000-000000001010",  # Physiological Intracytoplasmic Sperm Injection (PICSI)
    "c0010002-0000-0000-0000-000000001018",  # Artificial Oocyte Activation (AOA)
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000227", ans_uuid))

# Type of Ovarian Stimulation Protocol (0231)
for ans_uuid, _ in ovarian_stimulation_protocol_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000231", ans_uuid))

# Day of start of Cetrotide (0241)
for ans_uuid, _ in cetrotide_start_day_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000241", ans_uuid))

# Growth hormone (0244)
for ans_uuid in [
    "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Yes
    "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # No
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000244", ans_uuid))

# Assessment of Fertilization, Embryo & Blastocyst (Form 27)
# Ensure question concepts are updated to datatype_id = 2 (Coded) in case they already exist as Text
full_script.append("""
UPDATE concept SET datatype_id = 2 WHERE uuid IN (
    'c0010001-0000-0000-0000-000000000251',
    'c0010001-0000-0000-0000-000000000253',
    'c0010001-0000-0000-0000-000000000255',
    'c0010001-0000-0000-0000-000000000257',
    'c0010001-0000-0000-0000-000000000259'
);
""")

# Grade of Embryos Day 2 (0251)
for ans_uuid, _ in cleavage_embryo_grade_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000251", ans_uuid))

# Grade of Embryos Day 3 (0253)
for ans_uuid, _ in cleavage_embryo_grade_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000253", ans_uuid))

# Grade of Embryos Day 4 (0255)
for ans_uuid, _ in day4_embryo_grade_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000255", ans_uuid))

# Grade of Embryos Day 5 (0257)
for ans_uuid, _ in blastocyst_embryo_grade_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000257", ans_uuid))

# Grade of Embryos Day 6 (0259)
for ans_uuid, _ in blastocyst_embryo_grade_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000259", ans_uuid))

# Fresh Embryo Transfer Details (Form 31)
# Fresh Embryo Transfer Performed (0280)
for ans_uuid in [
    "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Yes
    "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # No
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000280", ans_uuid))

# Reason Fresh Embryo Transfer Not Performed (0281)
for ans_uuid, _ in fresh_et_cancellation_reason_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000281", ans_uuid))

# Day of Fresh Embryo Transfer (0285)
for ans_uuid, _ in fresh_et_day_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000285", ans_uuid))

# Fresh Embryo Transfer Difficulty (0287)
for ans_uuid in [
    "c0010002-0000-0000-0000-000000000970",  # Easy
    "c0010002-0000-0000-0000-000000000971",  # Difficult
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000287", ans_uuid))

# Blood on Tip of Catheter (0288)
for ans_uuid in [
    "1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # Yes
    "1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  # No
]:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000288", ans_uuid))

# Additional Procedures in ART (0291)
for ans_uuid, _ in additional_art_procedure_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000291", ans_uuid))

# Form 33: Post-InVitro Fertilisation Investigation Answers
# UPT Result (0294)
for ans_uuid, _ in upt_result_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000294", ans_uuid))

# Post IVF Outcome (0297)
for ans_uuid, _ in post_ivf_outcome_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000297", ans_uuid))

# Post IVF Pregnancy Complications (0298)
for ans_uuid, _ in post_ivf_complications_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000298", ans_uuid))

# Mode of Delivery (0300)
for ans_uuid, _ in mode_of_delivery_answers:
    full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000300", ans_uuid))




full_script.append("END$$")
full_script.append("DELIMITER ;")
full_script.append("CALL register_aiims_concepts();")
full_script.append("DROP PROCEDURE register_aiims_concepts;")

sql_content = "\n".join(full_script)

with open("scripts/register_aiims_concepts.sql", "w", encoding="utf-8") as f:
    f.write(sql_content)

print(f"Generated SQL script with {len(full_script)} lines.")
print("Executing SQL in MariaDB container...")
res = run_sql(sql_content)
print("Result:", res)
print("Concepts and answers successfully registered!")
