import argparse
import json
import os
import subprocess
import sys
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
    {
        "name": "AIIMS Visit: Male Factor",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Male Factor Infertility Diagnostic Sheet",
        "schema_path": "forms/aiims_male_factor.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d885",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Previous OI and IUI",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Previous OI and IUI Sheet",
        "schema_path": "forms/aiims_prev_oi_iui.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d887",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Previous Surgery",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Previous Surgery Sheet",
        "schema_path": "forms/aiims_prev_surgery.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d888",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Male Hormone and Surgery",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Male Hormone and Surgery Sheet",
        "schema_path": "forms/aiims_male_hormone_surgery.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d886",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Past Medical History",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Past Medical History Sheet",
        "schema_path": "forms/aiims_past_medical_history.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d889",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Family History",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Family History Sheet",
        "schema_path": "forms/aiims_family_history.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d88a",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Tuberculosis History",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Tuberculosis History Sheet",
        "schema_path": "forms/aiims_tuberculosis_history.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d88b",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Investigation Ultrasound",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Investigation Ultrasound Sheet",
        "schema_path": "forms/aiims_investigation_ultrasound.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d88c",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Investigation Female Blood Hormone",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Investigation Female Blood Hormone Sheet",
        "schema_path": "forms/aiims_female_blood_hormone.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d88d",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Investigation Female Surgical Procedure",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Investigation Female Surgical Procedure Sheet",
        "schema_path": "forms/aiims_female_surgical_procedure.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d88e",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Procedure Embryo Transfer",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Procedure Embryo Transfer Sheet",
        "schema_path": "forms/aiims_procedure_embryo_transfer.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d88f",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Investigation Female Procedure Biopsy",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Investigation Female Procedure Biopsy Sheet",
        "schema_path": "forms/aiims_investigation_female_procedure_biopsy.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d890",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Investigation Male Semen",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Investigation Male Semen Sheet",
        "schema_path": "forms/aiims_investigation_male_semen.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d891",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Trigger Details",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Trigger Details Sheet",
        "schema_path": "forms/aiims_trigger_details.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d892",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Ovum Pick Up Details",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Ovum Pick Up Details Sheet",
        "schema_path": "forms/aiims_ovum_pick_up_details.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d893",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Lab Procedure of Insemination",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Lab Procedure of Insemination Sheet",
        "schema_path": "forms/aiims_lab_procedure_insemination.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d894",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Procedure",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Procedure Sheet",
        "schema_path": "forms/aiims_procedure.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d895",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Sperm Quality Assessment",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Sperm Quality Assessment Sheet",
        "schema_path": "forms/aiims_sperm_quality_assessment.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d896",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Type of Ovarian Stimulation Protocol",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Type of Ovarian Stimulation Protocol Sheet",
        "schema_path": "forms/aiims_ovarian_stimulation_protocol.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d897",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Dose of Drugs",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Dose of Drugs Sheet",
        "schema_path": "forms/aiims_dose_of_drugs.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d898",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Adjuvant Drug",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Adjuvant Drug Sheet",
        "schema_path": "forms/aiims_adjuvant_drug.json",
        "uuid": "80930653-7e80-4bfd-9e29-ec37c334d899",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
    {
        "name": "AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst",
        "version": "1.0",
        "description": "AIIMS Reproductive Medicine & IVF Assessment of Fertilization, Embryo & Blastocyst Sheet",
        "schema_path": "forms/aiims_embryo_assessment.json",
        "uuid": "37e59734-dac9-4332-ba27-f1053d189089",
        "encounter_type": "dd528487-82a5-4082-9c72-ed246bd49591",  # Consultation
    },
]

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

def run_sql(sql_commands):
    db_container = get_db_container()
    full_cmd = f"docker exec -i {db_container} mariadb --default-character-set=utf8mb4 -uopenmrs -popenmrs openmrs"
    proc = subprocess.run(
        full_cmd,
        shell=True,
        input=sql_commands,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
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
    existing_name = None
    for f in forms:
        if desired_uuid and f["uuid"] == desired_uuid:
            form_uuid = f["uuid"]
            existing_name = f["name"]
            break
        elif f["name"] == form_name:
            form_uuid = f["uuid"]
            existing_name = f["name"]
            break

    if form_uuid and existing_name != form_name:
        print(f"Updating form name from '{existing_name}' to '{form_name}'...")
        r_up = requests.post(
            f"http://localhost/openmrs/ws/rest/v1/form/{form_uuid}",
            auth=("admin", "Admin123"),
            json={"name": form_name, "description": cfg["description"]}
        )
        if r_up.status_code not in (200, 201):
            # Fallback to direct DB update if REST endpoint has constraints
            run_sql(f"UPDATE form SET name = '{form_name}', description = '{cfg['description']}' WHERE uuid = '{form_uuid}';")
            print("Updated form name via direct DB update.")

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
    parser = argparse.ArgumentParser(description="Publish AIIMS AMPATH form schemas to OpenMRS")
    parser.add_argument(
        "--form",
        type=str,
        default=None,
        help="Target form key, name, schema filename, or UUID to publish (e.g., 'aiims-personal-information' or '80930653-...'). If omitted, all forms are published."
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Publish all registered forms."
    )
    args = parser.parse_args()

    target = args.form.lower() if args.form else None

    forms_to_run = []
    if target:
        for cfg in FORMS_TO_PUBLISH:
            cfg_name = cfg["name"].lower()
            cfg_uuid = cfg["uuid"].lower()
            cfg_schema = cfg["schema_path"].lower()
            # Match by uuid, filename without path, or fuzzy name match
            if (
                target == cfg_uuid
                or target in cfg_schema
                or target.replace("-", "_") in cfg_schema
                or target.replace("_", "-") in cfg_schema
                or target in cfg_name
            ):
                forms_to_run.append(cfg)

        if not forms_to_run:
            print(f"[ERROR] No form matching '{args.form}' found in FORMS_TO_PUBLISH.")
            print("Available forms:")
            for cfg in FORMS_TO_PUBLISH:
                print(f"  - {cfg['name']} ({cfg['schema_path']}, {cfg['uuid']})")
            sys.exit(1)
    else:
        forms_to_run = FORMS_TO_PUBLISH

    print(f"Publishing {len(forms_to_run)} form(s)...")
    for form_cfg in forms_to_run:
        publish_form(form_cfg)
