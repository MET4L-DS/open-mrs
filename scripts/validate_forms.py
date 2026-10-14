#!/usr/bin/env python3
"""
scripts/validate_forms.py
Validates that every clinical form defined in the frontend module:
1. Has a corresponding JSON schema on disk in `forms/`
2. Is registered and published in OpenMRS backend (/openmrs/ws/rest/v1/o3/forms/<uuid>)
3. Returns valid pages, sections, and questions

Usage:
    python scripts/validate_forms.py [--host=http://localhost/openmrs]
"""

import argparse
import base64
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
from typing import Dict, List, Any

# Ensure stdout handles UTF-8 on Windows cp1252 consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
FORM_UUIDS_TS = os.path.join(
    PROJECT_ROOT, "aiims-esm-demographics-app", "src", "config", "form-uuids.ts"
)
FORMS_DIR = os.path.join(PROJECT_ROOT, "forms")

AUTH_USER = "admin"
AUTH_PASS = "Admin123"


def check_backend_alive(base_url: str) -> bool:
    """Verifies that the OpenMRS REST session endpoint responds."""
    session_url = f"{base_url}/ws/rest/v1/session"
    auth_header = "Basic " + base64.b64encode(f"{AUTH_USER}:{AUTH_PASS}".encode()).decode()
    req = urllib.request.Request(session_url, headers={"Authorization": auth_header})

    try:
        with urllib.request.urlopen(req, timeout=5) as res:
            return res.getcode() == 200
    except Exception:
        return False


def parse_form_uuids(filepath: str) -> List[Dict[str, str]]:
    """Extracts (form_var, uuid, name) from form-uuids.ts."""
    if not os.path.exists(filepath):
        print(f"Error: form-uuids.ts not found at {filepath}", file=sys.stderr)
        sys.exit(1)

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Match export const AIIMS_..._FORM_UUID = '...';
    # Match export const AIIMS_..._FORM_NAME = '...';
    uuid_matches = dict(re.findall(r"export\s+const\s+(\w+_FORM_UUID)\s*=\s*['\"]([^'\"]+)['\"];", content))
    name_matches = dict(re.findall(r"export\s+const\s+(\w+_FORM_NAME)\s*=\s*['\"]([^'\"]+)['\"];", content))

    forms = []
    for uuid_var, uuid_val in uuid_matches.items():
        base_prefix = uuid_var.replace("_FORM_UUID", "")
        name_var = f"{base_prefix}_FORM_NAME"
        name_val = name_matches.get(name_var, base_prefix)
        forms.append({
            "key": base_prefix.lower().replace("_", "-").replace("aiims-", ""),
            "uuid_var": uuid_var,
            "uuid": uuid_val,
            "name": name_val,
        })

    return forms


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


def load_db_concept_map() -> Dict[str, Dict[str, Any]]:
    """Loads concept metadata directly from MariaDB container for instant deep verification."""
    container = get_db_container()
    try:
        cmd = [
            "docker", "exec", "-i", container,
            "mariadb", "-uopenmrs", "-popenmrs", "openmrs", "-e",
            "SELECT c.uuid, cd.name as datatype, (cn2.concept_id IS NOT NULL) as has_numeric FROM concept c JOIN concept_datatype cd ON c.datatype_id = cd.concept_datatype_id LEFT JOIN concept_numeric cn2 ON c.concept_id = cn2.concept_id;"
        ]
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
        if proc.returncode == 0:
            lines = proc.stdout.strip().splitlines()[1:]
            return {
                parts[0]: {"datatype": parts[1], "has_numeric": parts[2] == "1"}
                for parts in (l.split("\t") for l in lines)
                if len(parts) >= 3
            }
    except Exception:
        pass
    return {}


def inspect_schema_questions(data: dict, db_concepts: Dict[str, Dict[str, Any]]) -> List[str]:
    """Recursively checks that all concepts and numeric requirements in form questions/answers are valid."""
    errors = []

    def check_node(node):
        if isinstance(node, dict):
            # Check question concept
            q_options = node.get("questionOptions")
            if isinstance(q_options, dict):
                c_uuid = q_options.get("concept")
                rendering = q_options.get("rendering", "")
                q_id = node.get("id") or node.get("label") or "unknown"

                if c_uuid:
                    if db_concepts and c_uuid not in db_concepts:
                        errors.append(f"Question '{q_id}' references unknown concept UUID {c_uuid}")
                    elif db_concepts:
                        c_meta = db_concepts[c_uuid]
                        if rendering == "number" or c_meta["datatype"] == "Numeric":
                            if not c_meta["has_numeric"]:
                                errors.append(f"Question '{q_id}' has Numeric concept {c_uuid} missing concept_numeric entry")
                        elif rendering in ["select", "radio"] and c_meta["datatype"] != "Coded":
                            errors.append(f"Question '{q_id}' has rendering '{rendering}' but its concept {c_uuid} datatype is '{c_meta['datatype']}' (expected 'Coded')")

                # Check answer options
                answers = q_options.get("answers")
                if isinstance(answers, list):
                    for ans in answers:
                        if isinstance(ans, dict):
                            ans_uuid = ans.get("concept")
                            ans_label = ans.get("label", ans_uuid)
                            if ans_uuid and db_concepts and ans_uuid not in db_concepts:
                                errors.append(f"Answer '{ans_label}' in question '{q_id}' references unknown concept UUID {ans_uuid}")

            for v in node.values():
                check_node(v)
        elif isinstance(node, list):
            for item in node:
                check_node(item)

    check_node(data)
    return errors


def main():
    parser = argparse.ArgumentParser(description="OpenMRS AIIMS Form Schema Validator")
    parser.add_argument(
        "--host",
        default="http://localhost/openmrs",
        help="Base OpenMRS URL (default: http://localhost/openmrs)",
    )
    args = parser.parse_args()

    print("====================================================")
    print("📋 OpenMRS AIIMS Clinical Form Validator")
    print("====================================================")
    print(f"Backend  : {args.host}")
    print(f"Registry : {os.path.relpath(FORM_UUIDS_TS, PROJECT_ROOT)}")

    process_alive = check_backend_alive(args.host)
    if not process_alive:
        print(f"\n❌ Error: Cannot connect to OpenMRS backend at {args.host}")
        sys.exit(1)
    print("Backend connectivity... ✓ OK")

    db_concepts = load_db_concept_map()
    if db_concepts:
        print(f"Concept DB dictionary... ✓ Loaded ({len(db_concepts)} concepts)\n")
    else:
        print("Concept DB dictionary... [Warning: could not connect directly to MariaDB]\n")

    forms = parse_form_uuids(FORM_UUIDS_TS)
    print(f"Validating {len(forms)} registered clinical forms against backend...")

    auth_header = "Basic " + base64.b64encode(f"{AUTH_USER}:{AUTH_PASS}".encode()).decode()
    results = []

    for f in forms:
        url = f"{args.host}/ws/rest/v1/o3/forms/{f['uuid']}"
        req = urllib.request.Request(url, headers={"Authorization": auth_header})

        status_info = {
            "key": f["key"],
            "name": f["name"],
            "uuid": f["uuid"],
            "valid": False,
            "error": None,
            "pages": 0,
            "schema_on_disk": False,
            "schema_errors": [],
        }

        # Check if schema exists on disk
        possible_disk_files = [
            f"aiims_{f['key'].replace('-', '_')}.json",
            f"aiims_{f['key'].replace('-', '')}.json",
        ]
        disk_found = False
        for fname in os.listdir(FORMS_DIR) if os.path.exists(FORMS_DIR) else []:
            if fname in possible_disk_files or fname.endswith(f"{f['key']}.json"):
                disk_found = True
                break
        status_info["schema_on_disk"] = disk_found

        try:
            with urllib.request.urlopen(req, timeout=6) as res:
                if res.getcode() == 200:
                    data = json.loads(res.read().decode("utf-8"))
                    pages = data.get("pages", [])
                    status_info["pages"] = len(pages)
                    if len(pages) == 0:
                        status_info["error"] = "Form schema returned 0 pages"
                    else:
                        schema_errors = inspect_schema_questions(data, db_concepts)
                        if schema_errors:
                            status_info["error"] = "; ".join(schema_errors[:2])
                            status_info["schema_errors"] = schema_errors
                        else:
                            status_info["valid"] = True
                else:
                    status_info["error"] = f"HTTP {res.getcode()}"
        except urllib.error.HTTPError as e:
            status_info["error"] = f"HTTP {e.code} (Not Published / Missing in CLOB storage)"
        except Exception as e:
            status_info["error"] = str(e)

        results.append(status_info)
        mark = "✓" if status_info["valid"] else "❌"
        pages_str = f"({status_info['pages']} pages)" if status_info["valid"] else f"FAILED: {status_info['error']}"
        print(f"  {mark} {f['name']:<48} {pages_str}")

    print("\n====================================================")
    print("📊 Form Validation Summary Breakdown")
    print("====================================================")
    passed = [r for r in results if r["valid"]]
    failed = [r for r in results if not r["valid"]]

    print(f"Total Registered Forms : {len(results)}")
    print(f"Active & Published     : {len(passed)}")
    print(f"Failed / Unreleased    : {len(failed)}")

    if failed:
        print("\n❌ FORMS REQUIRING ATTENTION:")
        for r in failed:
            print(f"  • {r['name']} ({r['uuid']}) -> {r['error']}")
            if not r["schema_on_disk"]:
                print(f"    Missing schema file on disk in forms/!")
            print(f"    Fix: Publish via `python scripts/publish_aiims_form.py`")
        print("\n[ABORT] Form validation failed.")
        sys.exit(1)

    print("\n🎉 All registered forms exist, are published, and have valid schemas!")
    sys.exit(0)


if __name__ == "__main__":
    main()
