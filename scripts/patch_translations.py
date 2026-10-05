"""
Patch missing core translations in OpenMRS microfrontends.
Specifically patches 'Telephone Number' in coreTranslations dictionary to prevent:
"O3 Core Translations does not provide key 'Telephone Number'. The key itself is being rendered as text."
"""

import os
import subprocess
import sys

def get_frontend_container():
    try:
        proc = subprocess.run(["docker", "ps", "--filter", "name=frontend", "--format", "{{.Names}}"], capture_output=True, text=True)
        for name in proc.stdout.splitlines():
            name = name.strip()
            if "frontend" in name and "gateway" not in name:
                return name
    except Exception:
        pass
    return "openmrs-distro-referenceapplication-frontend-1"

CONTAINER_NAME = get_frontend_container()

TARGET_FILES = [
    "/usr/share/nginx/html/openmrs-esm-patient-banner-app-12.3.4/2569.js",
    "/usr/share/nginx/html/55096a56216de17c.js",
]

def patch_file_in_container(container_path):
    print(f"Checking {container_path}...")
    temp_orig = os.path.join(os.path.dirname(__file__), "temp_check.js")
    res_cp = subprocess.run(["docker", "cp", f"{CONTAINER_NAME}:{container_path}", temp_orig], capture_output=True)
    if res_cp.returncode != 0:
        print(f"Failed to copy {container_path} from container")
        return False

    with open(temp_orig, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Check if already patched
    if '"Telephone Number":"Telephone Number"' in content:
        print(f"Already patched: {container_path}")
        if os.path.exists(temp_orig):
            os.remove(temp_orig)
        return True

    # Search for coreTranslations pattern
    old_pattern = 'yearsAbbreviation:"yrs"}'
    new_pattern = 'yearsAbbreviation:"yrs","Telephone Number":"Telephone Number"}'

    if old_pattern not in content:
        print(f"Pattern '{old_pattern}' not found in {container_path}")
        if os.path.exists(temp_orig):
            os.remove(temp_orig)
        return False

    count = content.count(old_pattern)
    print(f"Found {count} occurrence(s) in {container_path}. Patching...")
    patched_content = content.replace(old_pattern, new_pattern)

    with open(temp_orig, "w", encoding="utf-8") as f:
        f.write(patched_content)

    res_write = subprocess.run(["docker", "cp", temp_orig, f"{CONTAINER_NAME}:{container_path}"], capture_output=True)
    if os.path.exists(temp_orig):
        os.remove(temp_orig)

    if res_write.returncode == 0:
        print(f"Successfully patched {container_path}")
        return True
    else:
        print(f"Failed to copy patched file to {container_path}: {res_write.stderr.decode('utf-8')}")
        return False

def main():
    print(f"Target container: {CONTAINER_NAME}")
    success = True
    for f in TARGET_FILES:
        ok = patch_file_in_container(f)
        if not ok:
            success = False

    subprocess.run(["docker", "exec", CONTAINER_NAME, "nginx", "-s", "reload"])
    print("Nginx reloaded.")
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
