import subprocess
import sys
import uuid

# Database connection details
DB_CONTAINER = "openmrs-distro-referenceapplication-db-1"
DB_USER = "openmrs"
DB_PASS = "openmrs"
DB_NAME = "openmrs"

def run_sql(sql_commands):
    full_cmd = f"docker exec -i {DB_CONTAINER} mariadb -u{DB_USER} -p{DB_PASS} {DB_NAME}"
    proc = subprocess.run(
        full_cmd,
        shell=True,
        input=sql_commands,
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
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000049", "Year of Previous Ovulation Induction", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=1970, hi_abs=2100))

# Previous OI and IUI (Yes/No)
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000050", "Previous OI and IUI", datatype_id=2, class_id=7))
# Ovulation Induction Drugs IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000051", "Ovulation Induction Drugs IUI", datatype_id=2, class_id=7))
# Dose of drugs in OI and IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000052", "Dose of drugs in OI and IUI", datatype_id=3, class_id=7))
# Number of Previous OI and IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000053", "Number of Previous OI and IUI", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=0, hi_abs=50))
# Year of Previous OI and IUI
full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000054", "Year of Previous OI and IUI", datatype_id=1, class_id=7, is_numeric=True, allow_decimal=0, low_abs=1970, hi_abs=2100))

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
