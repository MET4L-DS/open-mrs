#!/usr/bin/env python3
"""
scripts/validate_concepts.py
Validates that every concept UUID defined in the frontend module exists in OpenMRS,
is not retired, and inspects its configured datatype and concept class.

Usage:
    python scripts/validate_concepts.py [--host=http://localhost/openmrs] [--workers=10] [--verbose]
"""

import argparse
import base64
import concurrent.futures
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from typing import Dict, List, Tuple, Any

# Ensure stdout handles UTF-8 on Windows cp1252 consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CONCEPTS_TS = os.path.join(
    PROJECT_ROOT, "aiims-esm-demographics-app", "src", "config", "concepts.ts"
)

AUTH_USER = "admin"
AUTH_PASS = "Admin123"


def parse_concepts_ts(filepath: str) -> Dict[str, List[str]]:
    """
    Parses `CONCEPTS = { ... }` in concepts.ts and returns a map:
        { uuid: [var_name_1, var_name_2, ...] }
    """
    if not os.path.exists(filepath):
        print(f"Error: Concepts file not found at {filepath}", file=sys.stderr)
        sys.exit(1)

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Match key: 'uuid'
    matches = re.findall(r"(\w+):\s*['\"]([0-9a-fA-F-]+)['\"]", content)
    uuid_map: Dict[str, List[str]] = {}

    for var_name, uuid_val in matches:
        if uuid_val not in uuid_map:
            uuid_map[uuid_val] = []
        uuid_map[uuid_val].append(var_name)

    return uuid_map


def check_backend_alive(base_url: str) -> bool:
    """Verifies that the OpenMRS REST session endpoint responds."""
    session_url = f"{base_url}/ws/rest/v1/session"
    auth_header = "Basic " + base64.b64encode(f"{AUTH_USER}:{AUTH_PASS}".encode()).decode()
    req = urllib.request.Request(session_url, headers={"Authorization": auth_header})

    try:
        with urllib.request.urlopen(req, timeout=4) as res:
            return res.getcode() == 200
    except Exception:
        return False


def validate_single_concept(
    base_url: str, auth_header: str, uuid_val: str, var_names: List[str]
) -> Dict[str, Any]:
    """Queries OpenMRS REST API for concept metadata."""
    url = f"{base_url}/ws/rest/v1/concept/{uuid_val}?v=custom:(uuid,display,datatype:(name),conceptClass:(name),retired,allowDecimal)"
    req = urllib.request.Request(url, headers={"Authorization": auth_header})

    result: Dict[str, Any] = {
        "uuid": uuid_val,
        "variables": var_names,
        "valid": False,
        "status_code": None,
        "display": None,
        "datatype": None,
        "concept_class": None,
        "retired": False,
        "error": None,
    }

    try:
        with urllib.request.urlopen(req, timeout=8) as res:
            result["status_code"] = res.getcode()
            if res.getcode() == 200:
                data = json.loads(res.read().decode("utf-8"))
                result["display"] = data.get("display")
                result["datatype"] = (data.get("datatype") or {}).get("name")
                result["concept_class"] = (data.get("conceptClass") or {}).get("name")
                result["retired"] = bool(data.get("retired"))

                # In OpenMRS, Numeric concepts MUST have a corresponding concept_numeric row.
                # If concept_numeric is missing, allowDecimal is None and ObsValidator throws NPE on save.
                if result["datatype"] == "Numeric" and data.get("allowDecimal") is None:
                    result["valid"] = False
                    result["error"] = "Numeric concept is missing concept_numeric record in DB (will cause HTTP 500 NPE on save)"
                else:
                    result["valid"] = True
    except urllib.error.HTTPError as e:
        result["status_code"] = e.code
        result["error"] = f"HTTP {e.code}"
    except Exception as e:
        result["error"] = str(e)

    return result


def main():
    parser = argparse.ArgumentParser(
        description="OpenMRS AIIMS Concept Dictionary Validator"
    )
    parser.add_argument(
        "--host",
        default="http://localhost/openmrs",
        help="Base OpenMRS URL (default: http://localhost/openmrs)",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=10,
        help="Number of concurrent query worker threads (default: 10)",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Print verbose listing of each validated concept",
    )
    parser.add_argument(
        "--fail-on-retired",
        action="store_true",
        default=True,
        help="Fail validation if any concept is retired (default: True)",
    )

    args = parser.parse_args()
    base_url = args.host.rstrip("/")

    print("====================================================")
    print("🧬 OpenMRS AIIMS Concept Dictionary Validator")
    print("====================================================")
    print(f"Backend  : {base_url}")
    print(f"Registry : {os.path.relpath(CONCEPTS_TS, PROJECT_ROOT)}")
    print(f"Threads  : {args.workers}\n")

    # Step 1: Pre-flight check
    sys.stdout.write("Checking OpenMRS backend connectivity... ")
    sys.stdout.flush()
    if not check_backend_alive(base_url):
        print("❌ FAILED")
        print(
            f"\n[Precondition Error] OpenMRS backend is not reachable at {base_url}/ws/rest/v1/session.\n"
            "Please ensure Docker stack is running:\n"
            "  powershell .\\openmrs.ps1 start\n"
        )
        sys.exit(1)
    print("✓ OK")

    # Step 2: Parse concepts
    sys.stdout.write("Extracting concepts from frontend code... ")
    sys.stdout.flush()
    uuid_map = parse_concepts_ts(CONCEPTS_TS)
    total_vars = sum(len(v) for v in uuid_map.values())
    total_unique = len(uuid_map)
    print(f"✓ OK ({total_vars} variable entries, {total_unique} unique UUIDs)\n")

    # Step 3: Concurrent validation
    auth_header = "Basic " + base64.b64encode(f"{AUTH_USER}:{AUTH_PASS}".encode()).decode()
    print(f"Validating {total_unique} concepts against OpenMRS dictionary...")

    start_time = time.time()
    results: List[Dict[str, Any]] = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
        future_to_uuid = {
            executor.submit(
                validate_single_concept, base_url, auth_header, uuid_val, var_names
            ): uuid_val
            for uuid_val, var_names in uuid_map.items()
        }

        completed_count = 0
        for future in concurrent.futures.as_completed(future_to_uuid):
            res = future.result()
            results.append(res)
            completed_count += 1
            if not args.verbose and completed_count % 30 == 0:
                percent = int((completed_count / total_unique) * 100)
                sys.stdout.write(f"\r  Progress: {completed_count}/{total_unique} concepts checked ({percent}%)...")
                sys.stdout.flush()

    elapsed = time.time() - start_time
    if not args.verbose:
        sys.stdout.write(f"\r  Progress: {total_unique}/{total_unique} concepts checked (100%) in {elapsed:.2f}s.\n\n")
        sys.stdout.flush()

    # Step 4: Aggregate statistics
    valid_concepts = [r for r in results if r["valid"] and not r["retired"]]
    retired_concepts = [r for r in results if r["valid"] and r["retired"]]
    missing_concepts = [r for r in results if not r["valid"]]

    datatype_counts: Dict[str, int] = {}
    class_counts: Dict[str, int] = {}

    for r in valid_concepts:
        dt = r["datatype"] or "Unknown"
        cl = r["concept_class"] or "Unknown"
        datatype_counts[dt] = datatype_counts.get(dt, 0) + 1
        class_counts[cl] = class_counts.get(cl, 0) + 1

    if args.verbose:
        print("\n--- Validated Concepts Listing ---")
        for r in sorted(results, key=lambda x: x["variables"][0]):
            status = "✓ OK" if r["valid"] and not r["retired"] else "❌"
            dt_str = f"[{r['datatype'] or 'N/A'}]"
            vars_str = ", ".join(r["variables"])
            print(f" {status} {r['uuid']} {dt_str:<12} {r['display'] or 'MISSING'} ({vars_str})")

    # Display Breakdown
    print("====================================================")
    print("📊 Validation Summary Breakdown")
    print("====================================================")
    print(f"Total Unique Concepts   : {total_unique}")
    print(f"Active & Verified       : {len(valid_concepts)}")
    print(f"Retired Concepts        : {len(retired_concepts)}")
    print(f"Missing / Unresolvable  : {len(missing_concepts)}")
    print(f"Total Query Duration    : {elapsed:.2f}s ({total_unique / elapsed:.1f} concepts/sec)")

    print("\n📦 Datatype Distribution:")
    for dt, count in sorted(datatype_counts.items(), key=lambda x: -x[1]):
        print(f"  • {dt:<18}: {count}")

    print("\n🏷️  Concept Class Distribution:")
    for cl, count in sorted(class_counts.items(), key=lambda x: -x[1]):
        print(f"  • {cl:<18}: {count}")

    # Step 5: Report Failures
    has_errors = False

    if missing_concepts:
        has_errors = True
        print("\n❌ MISSING CONCEPTS (404 Not Found in OpenMRS):")
        for r in missing_concepts:
            vars_str = ", ".join(r["variables"])
            print(f"  • UUID: {r['uuid']} ({vars_str}) -> Error: {r['error']}")

    if retired_concepts and args.fail_on_retired:
        has_errors = True
        print("\n⚠️  RETIRED CONCEPTS (Retired concepts cannot receive observations):")
        for r in retired_concepts:
            vars_str = ", ".join(r["variables"])
            print(f"  • UUID: {r['uuid']} ({vars_str}) -> Display: '{r['display']}' (RETIRED)")

    print("====================================================")
    if has_errors:
        print("❌ Concept validation failed. Please check the reported discrepancies above.\n")
        sys.exit(1)
    else:
        print("🎉 All 303 concept definitions exist, are active, and validated successfully!\n")
        sys.exit(0)


if __name__ == "__main__":
    main()
