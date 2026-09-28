import json
import os
import subprocess
import uuid
import requests

FORMS_TO_PUBLISH = [
    {
        "name": "AIIMS Visit: Personal Information Intake",
        "version": "2.0",
        "description": "AIIMS Reproductive Medicine & IVF Personal Information Sheet",
        "schema_path": "forms/aiims_personal_information.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d880",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Type of Infertility",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Type of Infertility Sheet",
        "schema_path": "forms/aiims_infertility_type.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d881",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Obstetric History",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Obstetric History Sheet",
        "schema_path": "forms/aiims_obstetric_history.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d882",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Menstrual History",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Menstrual History Sheet",
        "schema_path": "forms/aiims_menstrual_history.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d883",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Female Factor",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Female Factor Infertility Sheet",
        "schema_path": "forms/aiims_female_factor.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d884",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
]

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

def publish_form(cfg):
    form_name = cfg["name"]
    schema_path = cfg["schema_path"]
    desired_uuid = cfg["uuid"]

    print(f"\n--- Processing: {form_name} ---")

    if not os.path.exists(schema_path):
        print(f"Error: Schema file not found: {schema_path}")
        return

    with open(schema_path, "r", encoding="utf-8") as f:
        schema_str = f.read()

    # 1. Check if form already exists
    r = requests.get(
        "http://localhost/openmrs/ws/rest/v1/form?v=custom:(uuid,name)",
        auth=("admin", "Admin123")
    )
    forms = r.json().get("results", [])
    form_uuid = None
    for f in forms:
        if f["name"] == form_name:
            form_uuid = f["uuid"]
            break

    if not form_uuid:
        print(f"Creating form '{form_name}' with UUID '{desired_uuid}'...")
        payload = {
            "name": form_name,
            "version": cfg["version"],
            "description": cfg["description"],
            "published": True,
            "encounterType": cfg["encounter_type"]
        }
        if desired_uuid:
            payload["uuid"] = desired_uuid

        r = requests.post(
            "http://localhost/openmrs/ws/rest/v1/form",
            auth=("admin", "Admin123"),
            json=payload
        )
        if r.status_code not in (200, 201):
            print(f"Failed to create form: {r.status_code} {r.text}")
            return
        form_uuid = r.json()["uuid"]
        print("Created form with UUID:", form_uuid)
    else:
        print("Found existing form with UUID:", form_uuid)

    # 2. Store schema in clob_datatype_storage and link in form_resource
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

    # 3. Verify REST endpoint
    r_res = requests.get(
        f"http://localhost/openmrs/ws/rest/v1/form/{form_uuid}/resource",
        auth=("admin", "Admin123")
    )
    resources = r_res.json().get("results", [])
    if resources:
        val_url = resources[0]["links"][0]["uri"]
        r_val = requests.get(val_url, auth=("admin", "Admin123"))
        if r_val.status_code == 200:
            val_json = r_val.json()
            print(f"Schema verified for '{form_name}'! Pages: {len(val_json.get('pages', []))}")
        else:
            print(f"Failed to download schema: {r_val.status_code}")
    else:
        print("Warning: No form resources found after SQL insert.")

if __name__ == "__main__":
    for form_cfg in FORMS_TO_PUBLISH:
        publish_form(form_cfg)
