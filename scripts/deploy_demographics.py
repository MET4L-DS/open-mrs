"""
Deploy AIIMS Demographics ESM microfrontend to running OpenMRS Docker container.
"""

import json
import os
import subprocess
import sys

CONTAINER_NAME = "openmrs-distro-referenceapplication-frontend-1"
MODULE_DIST = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "aiims-esm-demographics-app", "dist")
)
MODULE_NAME = "@aiims/esm-demographics-app"
TARGET_SUBDIR = "openmrs-esm-aiims-demographics-app-1.0.3"
TARGET_DIR = f"/usr/share/nginx/html/{TARGET_SUBDIR}"
MAIN_JS = "openmrs-esm-aiims-esm-demographics-app.js"


def run_docker(cmd, check=True):
    full_cmd = ["docker"] + cmd
    res = subprocess.run(full_cmd, capture_output=True, text=True)
    if check and res.returncode != 0:
        print(f"Error executing {' '.join(full_cmd)}:")
        print(res.stderr)
        sys.exit(res.returncode)
    return res


def main():
    if not os.path.exists(MODULE_DIST):
        print(f"Dist directory not found: {MODULE_DIST}")
        print("Run 'npm run build' inside aiims-esm-demographics-app first.")
        sys.exit(1)

    print(f"1. Creating target directory in container: {TARGET_DIR} ...")
    run_docker(["exec", CONTAINER_NAME, "mkdir", "-p", TARGET_DIR])

    print("2. Copying dist files to container ...")
    run_docker(["cp", f"{MODULE_DIST}/.", f"{CONTAINER_NAME}:{TARGET_DIR}/"])

    print("3. Updating importmap.json ...")
    res = run_docker(["exec", CONTAINER_NAME, "cat", "/usr/share/nginx/html/importmap.json"])
    importmap = json.loads(res.stdout)
    importmap["imports"][MODULE_NAME] = f"./{TARGET_SUBDIR}/{MAIN_JS}"
    importmap_json = json.dumps(importmap, indent=2)

    # Write patched importmap.json back to container
    temp_importmap = os.path.join(os.path.dirname(__file__), "temp_importmap.json")
    with open(temp_importmap, "w", encoding="utf-8") as f:
        f.write(importmap_json)
    run_docker(["cp", temp_importmap, f"{CONTAINER_NAME}:/usr/share/nginx/html/importmap.json"])
    if os.path.exists(temp_importmap):
        os.remove(temp_importmap)

    print("4. Updating routes.registry.json ...")
    routes_file = os.path.join(MODULE_DIST, "routes.json")
    with open(routes_file, "r", encoding="utf-8") as f:
        module_routes = json.load(f)

    res = run_docker(["exec", CONTAINER_NAME, "cat", "/usr/share/nginx/html/routes.registry.json"])
    registry = json.loads(res.stdout)
    registry[MODULE_NAME] = module_routes
    registry_json = json.dumps(registry, indent=2)

    temp_registry = os.path.join(os.path.dirname(__file__), "temp_registry.json")
    with open(temp_registry, "w", encoding="utf-8") as f:
        f.write(registry_json)
    run_docker(["cp", temp_registry, f"{CONTAINER_NAME}:/usr/share/nginx/html/routes.registry.json"])
    if os.path.exists(temp_registry):
        os.remove(temp_registry)

    print("\n[SUCCESS] Deployment successful!")
    print(f"   Module: {MODULE_NAME}")
    print(f"   Bundle: {TARGET_DIR}/{MAIN_JS}")
    print("   Updated: importmap.json and routes.registry.json")
    print("   Refresh browser to see 'AIIMS Demographics' in the patient chart sidebar.\n")


if __name__ == "__main__":
    main()
