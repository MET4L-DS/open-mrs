import json
import subprocess
import uuid
import requests

def run_sql(sql_commands):
    full_cmd = "docker exec -i openmrs-distro-referenceapplication-db-1 mariadb --default-character-set=utf8mb4 -uopenmrs -popenmrs openmrs"
    proc = subprocess.run(
        full_cmd,
        shell=True,
        input=sql_commands,
        capture_output=True,
        text=True
    )
    if proc.returncode != 0:
        print("SQL Error:", proc.stderr)
        raise Exception(proc.stderr)
    return proc.stdout

# 1. Read schema
with open("forms/aiims_personal_information.json", "r", encoding="utf-8") as f:
    schema_str = f.read()

# 2. Check if form already exists
r = requests.get(
    "http://localhost/openmrs/ws/rest/v1/form?v=custom:(uuid,name)",
    auth=("admin", "Admin123")
)
forms = r.json().get("results", [])
form_uuid = None
for f in forms:
    if f["name"] == "AIIMS Visit: Personal Information Intake":
        form_uuid = f["uuid"]
        break

if not form_uuid:
    print("Creating form in OpenMRS...")
    r = requests.post(
        "http://localhost/openmrs/ws/rest/v1/form",
        auth=("admin", "Admin123"),
        json={
            "name": "AIIMS Visit: Personal Information Intake",
            "version": "2.0",
            "description": "AIIMS Reproductive Medicine & IVF Personal Information Sheet",
            "published": True,
            "encounterType": "dd528487-82a5-4082-9c72-ed246bd49591"  # Consultation
        }
    )
    form_uuid = r.json()["uuid"]
    print("Created form with UUID:", form_uuid)
else:
    print("Found existing form with UUID:", form_uuid)

# 3. Store schema in clob_datatype_storage and link in form_resource
clob_uuid = str(uuid.uuid4())
resource_uuid = str(uuid.uuid4())

# Escape single quotes and backslashes for MariaDB
escaped_schema = schema_str.replace("\\", "\\\\").replace("'", "''")

sql = f"""
SET @form_id = (SELECT form_id FROM form WHERE uuid = '{form_uuid}');

INSERT INTO clob_datatype_storage (uuid, value)
VALUES ('{clob_uuid}', '{escaped_schema}');

-- Delete any existing JSON schema resource for this form
DELETE FROM form_resource WHERE form_id = @form_id AND name = 'JSON schema';

INSERT INTO form_resource (form_id, name, value_reference, datatype, uuid)
VALUES (@form_id, 'JSON schema', '{clob_uuid}', 'AmpathJsonSchema', '{resource_uuid}');
"""

run_sql(sql)
print(f"Successfully linked form schema CLOB {clob_uuid} to form {form_uuid}")

# 4. Verify REST endpoint
r_res = requests.get(
    f"http://localhost/openmrs/ws/rest/v1/form/{form_uuid}/resource",
    auth=("admin", "Admin123")
)
resources = r_res.json().get("results", [])
print("Form resources:", resources)

if resources:
    val_url = resources[0]["links"][0]["uri"]
    r_val = requests.get(val_url, auth=("admin", "Admin123"))
    print("Schema download status:", r_val.status_code)
    if r_val.status_code == 200:
        val_json = r_val.json()
        print("Schema verified! Form Name:", val_json.get("name"))
        print("Page label:", val_json["pages"][0]["label"])
        print("Sections:", [s["label"] for s in val_json["pages"][0]["sections"]])
