#!/usr/bin/env python3
"""
sync_routes.py

Validates and synchronizes `src/routes.json` with `FORM_REGISTRY` in `src/constants.ts`.
Ensures that adding a new form entry to FORM_REGISTRY can automatically propagate
or be verified against `routes.json` to prevent manual registration drift.

Usage:
  python scripts/sync_routes.py          # Validate consistency
  python scripts/sync_routes.py --sync   # Auto-update routes.json from FORM_REGISTRY
"""

import json
import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONSTANTS_FILE = os.path.join(BASE_DIR, "aiims-esm-demographics-app", "src", "constants.ts")
ROUTES_FILE = os.path.join(BASE_DIR, "aiims-esm-demographics-app", "src", "routes.json")

def kebab_to_camel(s: str) -> str:
    parts = s.split('-')
    return parts[0] + ''.join(p.capitalize() for p in parts[1:])

def parse_form_registry(constants_content: str):
    # Extract entries from FORM_REGISTRY = [ ... ]
    match = re.search(r"export const FORM_REGISTRY: FormRegistryEntry\[\] = \[(.*?)\];", constants_content, re.DOTALL)
    if not match:
        raise ValueError("Could not find FORM_REGISTRY in constants.ts")

    registry_block = match.group(1)
    # Parse individual object blocks { ... }
    entry_blocks = re.findall(r"\{([^}]+)\}", registry_block)
    entries = []
    for block in entry_blocks:
        key_m = re.search(r"key:\s*'([^']+)'", block)
        path_m = re.search(r"path:\s*'([^']+)'", block)
        title_m = re.search(r"title:\s*'([^']+)'", block)
        slot_m = re.search(r"slot:\s*'([^']+)'", block)
        order_m = re.search(r"order:\s*(\d+)", block)

        if key_m and path_m and title_m and slot_m:
            entries.append({
                "key": key_m.group(1),
                "path": path_m.group(1),
                "title": title_m.group(1),
                "slot": slot_m.group(1),
                "order": int(order_m.group(1)) if order_m else 1,
            })
    return entries

def generate_routes(entries):
    extensions = []
    for entry in entries:
        key = entry["key"]
        camel_key = kebab_to_camel(key)
        # Dashboard link extension
        link_ext = {
            "name": f"aiims-{key}-dashboard-link",
            "component": f"aiims{camel_key[0].upper()}{camel_key[1:]}DashboardLink",
            "slot": "patient-chart-dashboard-slot",
            "order": entry["order"],
            "meta": {
                "slot": entry["slot"],
                "path": entry["path"],
                "title": entry["title"],
            },
            "online": True,
            "offline": True,
        }
        # Dashboard component extension
        dash_ext = {
            "name": f"aiims-{key}-dashboard",
            "component": f"aiims{camel_key[0].upper()}{camel_key[1:]}Dashboard",
            "slot": entry["slot"],
            "online": True,
            "offline": True,
        }
        extensions.append(link_ext)
        extensions.append(dash_ext)

    return {
        "$schema": "https://json.openmrs.org/routes.schema.json",
        "extensions": extensions,
    }

def main():
    sync_mode = "--sync" in sys.argv or "--fix" in sys.argv

    if not os.path.exists(CONSTANTS_FILE):
        print(f"Error: {CONSTANTS_FILE} not found.", file=sys.stderr)
        sys.exit(1)

    with open(CONSTANTS_FILE, "r", encoding="utf-8") as f:
        constants_content = f.read()

    entries = parse_form_registry(constants_content)
    expected_routes = generate_routes(entries)
    expected_json_str = json.dumps(expected_routes, indent=2) + "\n"

    if sync_mode:
        with open(ROUTES_FILE, "w", encoding="utf-8") as f:
            f.write(expected_json_str)
        print(f"Successfully synced {len(entries)} form modules ({len(expected_routes['extensions'])} extensions) to {ROUTES_FILE}")
        sys.exit(0)

    # Validation mode
    if not os.path.exists(ROUTES_FILE):
        print(f"Error: {ROUTES_FILE} does not exist. Run with --sync to generate.", file=sys.stderr)
        sys.exit(1)

    with open(ROUTES_FILE, "r", encoding="utf-8") as f:
        actual_routes = json.load(f)

    actual_json_str = json.dumps(actual_routes, indent=2) + "\n"

    if expected_json_str == actual_json_str:
        print(f"Routes verification passed: {len(entries)} forms in FORM_REGISTRY are in perfect sync with routes.json.")
        sys.exit(0)
    else:
        print("Discrepancy detected between FORM_REGISTRY and routes.json!", file=sys.stderr)
        print("Run `python scripts/sync_routes.py --sync` to regenerate routes.json.", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
