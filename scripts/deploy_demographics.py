"""
Deploy AIIMS Demographics ESM microfrontend to running OpenMRS Docker container.
Automatically increments version to bypass browser HTTP cache (nginx expires 1y).
"""

import json
import os
import re
import subprocess
import sys

CONTAINER_NAME = "openmrs-distro-referenceapplication-frontend-1"
MODULE_DIST = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "aiims-esm-demographics-app", "dist")
)
MODULE_NAME = "@aiims/esm-demographics-app"
MAIN_JS = "openmrs-esm-aiims-esm-demographics-app.js"


def run_docker(cmd, check=True, timeout=120):
    if cmd and cmd[0] == "exec" and "-i" not in cmd and "-it" not in cmd:
        cmd = ["exec", "-i"] + cmd[1:]
    full_cmd = ["docker"] + cmd
    res = subprocess.run(
        full_cmd,
        capture_output=True,
        text=True,
        timeout=timeout,
        stdin=subprocess.DEVNULL,
    )

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

    print("1. Reading importmap.json to determine version...")
    res = run_docker(["exec", CONTAINER_NAME, "cat", "/usr/share/nginx/html/importmap.json"])
    importmap = json.loads(res.stdout)
    current_entry = importmap.get("imports", {}).get(MODULE_NAME, "")

    # Extract current patch version and increment to force browser cache invalidation
    match = re.search(r"openmrs-esm-aiims-demographics-app-1\.0\.(\d+)", current_entry)
    if match:
        next_patch = int(match.group(1)) + 1
    else:
        next_patch = 8

    target_subdir = f"openmrs-esm-aiims-demographics-app-1.0.{next_patch}"
    target_dir = f"/usr/share/nginx/html/{target_subdir}"

    print(f"2. Creating target directory in container: {target_dir} ...")
    run_docker(["exec", CONTAINER_NAME, "mkdir", "-p", target_dir])

    print("3. Copying dist files to container ...")
    run_docker(["cp", f"{MODULE_DIST}/.", f"{CONTAINER_NAME}:{target_dir}/"])

    print(f"4. Updating importmap.json with {target_subdir} ...")
    importmap["imports"][MODULE_NAME] = f"./{target_subdir}/{MAIN_JS}"
    importmap_json = json.dumps(importmap, indent=2)

    # Write patched importmap.json back to container
    temp_importmap = os.path.join(os.path.dirname(__file__), "temp_importmap.json")
    with open(temp_importmap, "w", encoding="utf-8") as f:
        f.write(importmap_json)
    run_docker(["cp", temp_importmap, f"{CONTAINER_NAME}:/usr/share/nginx/html/importmap.json"])
    if os.path.exists(temp_importmap):
        os.remove(temp_importmap)

    print("5. Updating routes.registry.json ...")
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

    print("6. Reloading Nginx in frontend container...")
    run_docker(["exec", CONTAINER_NAME, "nginx", "-s", "reload"], check=False, timeout=30)

    print("\n[SUCCESS] Deployment successful!")
    print(f"   Module: {MODULE_NAME}")
    print(f"   Bundle: {target_dir}/{MAIN_JS}")
    print("   Updated: importmap.json and routes.registry.json")
    print(f"   Cache-Busting Version: 1.0.{next_patch}\n")


if __name__ == "__main__":
    main()
