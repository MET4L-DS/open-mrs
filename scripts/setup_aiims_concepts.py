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
    # Check if concept already exists by UUID
    sql = f"""
    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '{c_uuid}');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, {datatype_id}, {class_id}, 0, 1, NOW(), '{c_uuid}');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, '{name}', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
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
