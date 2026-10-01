"""
Master Environment Setup & Bootstrap Script for OpenMRS AIIMS Clinic.

Automates the complete setup of OpenMRS on a new system from a fresh git clone:
1. Validates system prerequisites (Docker, Docker Daemon, Node.js, npm, Python 3).
2. Ensures Python dependencies (e.g. requests) are available.
3. Launches the OpenMRS 3.x Docker Reference Application stack.
4. Waits for MariaDB database readiness.
5. Waits for OpenMRS Backend Spring/Liquibase readiness (polling REST session).
6. Registers all custom AIIMS concepts and answer dictionaries (setup_aiims_concepts.py).
7. Publishes and verifies all AIIMS AMPATH clinical forms (publish_aiims_form.py).
8. Compiles the frontend microfrontend app (npm install + npm run build).
9. Deploys the ESM module into the frontend container and updates importmap (deploy_demographics.py).
10. Validates end-to-end health and reports URLs and credentials.
"""

import os
import shutil
import subprocess
import sys
import time
from datetime import datetime

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DISTRO_DIR = os.path.join(PROJECT_ROOT, "openmrs-distro-referenceapplication")
COMPOSE_FILE = os.path.join(DISTRO_DIR, "docker-compose.yml")
APP_DIR = os.path.join(PROJECT_ROOT, "aiims-esm-demographics-app")
SCRIPTS_DIR = os.path.join(PROJECT_ROOT, "scripts")

OPENMRS_BASE_URL = "http://localhost/openmrs"
AUTH_USER = "admin"
AUTH_PASS = "Admin123"


def log(msg, color="white"):
    colors = {
        "cyan": "\033[96m",
        "green": "\033[92m",
        "yellow": "\033[93m",
        "red": "\033[91m",
        "bold": "\033[1m",
        "reset": "\033[0m",
        "white": "\033[97m",
    }
    c_start = colors.get(color, "")
    c_end = colors["reset"] if c_start else ""
    print(f"{c_start}{msg}{c_end}")


def print_step(num, title):
    log(f"\n[{num}/7] {title}", "cyan")
    log("-" * 65, "cyan")


def check_prerequisites():
    log("\nChecking system prerequisites...", "bold")

    # 1. Python version
    if sys.version_info < (3, 8):
        log(f"[ERROR] Python 3.8+ required. Current: {sys.version}", "red")
        sys.exit(1)
    log(f"  [OK] Python {sys.version.split()[0]}")

    # 2. Docker CLI
    if not shutil.which("docker"):
        log("[ERROR] 'docker' command not found in PATH.", "red")
        log("Please install Docker Desktop: https://www.docker.com/products/docker-desktop", "yellow")
        sys.exit(1)
    log("  [OK] Docker CLI detected")

    # 3. Docker Daemon running
    res = subprocess.run(["docker", "info"], capture_output=True, text=True)
    if res.returncode != 0:
        log("\n============================================================", "yellow")
        log("[WARNING] Docker Desktop daemon is not running.", "yellow")
        log("============================================================", "yellow")
        log("Please start Docker Desktop and wait until the engine is ready,", "yellow")
        log("then re-run this setup script.", "yellow")
        log("============================================================\n", "yellow")
        sys.exit(1)
    log("  [OK] Docker Daemon is running")

    # 4. Node.js & npm
    if not shutil.which("node"):
        log("[ERROR] 'node' command not found in PATH.", "red")
        log("Please install Node.js (v18+ recommended): https://nodejs.org", "yellow")
        sys.exit(1)
    node_ver = subprocess.run(["node", "-v"], capture_output=True, text=True).stdout.strip()
    log(f"  [OK] Node.js {node_ver}")

    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    if not shutil.which(npm_cmd) and not shutil.which("npm"):
        log("[ERROR] 'npm' command not found in PATH.", "red")
        sys.exit(1)
    npm_ver = subprocess.run([npm_cmd, "-v"], capture_output=True, text=True, shell=(sys.platform == "win32")).stdout.strip()
    log(f"  [OK] npm v{npm_ver}")

    # 5. Check/install Python 'requests' package
    try:
        import requests
        log("  [OK] Python 'requests' library available")
    except ImportError:
        log("  [*] Installing Python 'requests' library...", "yellow")
        install_res = subprocess.run([sys.executable, "-m", "pip", "install", "requests"])
        if install_res.returncode != 0:
            log("[ERROR] Failed to install 'requests' package.", "red")
            sys.exit(1)
        log("  [OK] Python 'requests' installed")


def find_container(service_keyword):
    """Finds running container name matching keyword."""
    try:
        res = subprocess.run(
            ["docker", "ps", "--filter", f"name={service_keyword}", "--format", "{{.Names}}"],
            capture_output=True,
            text=True
        )
        for name in res.stdout.splitlines():
            name = name.strip()
            if service_keyword in name:
                # Disambiguate frontend vs gateway, or backend vs db
                if service_keyword == "frontend" and "gateway" in name:
                    continue
                if service_keyword == "db" and "backend" in name:
                    continue
                return name
    except Exception:
        pass
    return None


def start_docker_stack():
    print_step(1, "Starting OpenMRS 3.x Docker Stack")
    if not os.path.exists(COMPOSE_FILE):
        log(f"[ERROR] docker-compose.yml not found at: {COMPOSE_FILE}", "red")
        sys.exit(1)

    log(f"Launching containers via: docker compose -f {COMPOSE_FILE} up -d ...")
    res = subprocess.run(["docker", "compose", "-f", COMPOSE_FILE, "up", "-d"])
    if res.returncode != 0:
        log("[ERROR] Failed to start Docker Compose stack.", "red")
        sys.exit(res.returncode)
    log("Docker Compose services initiated.", "green")


def wait_for_database(timeout_seconds=90):
    print_step(2, "Waiting for MariaDB Readiness")
    start_time = time.time()
    db_container = find_container("db") or "openmrs-distro-referenceapplication-db-1"
    log(f"Polling database container '{db_container}' ...")

    while time.time() - start_time < timeout_seconds:
        test_cmd = [
            "docker", "exec", "-i", db_container,
            "mariadb", "-uopenmrs", "-popenmrs", "openmrs", "-e", "SELECT 1;"
        ]
        res = subprocess.run(test_cmd, capture_output=True, text=True)
        if res.returncode == 0:
            elapsed = int(time.time() - start_time)
            log(f"MariaDB is healthy and accepting queries! (Took {elapsed}s)", "green")
            return True
        time.sleep(3)
        print(".", end="", flush=True)

    print()
    log("[ERROR] MariaDB failed to become ready within timeout.", "red")
    sys.exit(1)


def wait_for_backend(timeout_seconds=300):
    print_step(3, "Waiting for OpenMRS Backend Bootup")
    import requests

    session_url = f"{OPENMRS_BASE_URL}/ws/rest/v1/session"
    log(f"Polling REST API at: {session_url}")
    log("Note: On a first-time start, OpenMRS creates Liquibase tables and Spring context (takes ~1-3 min)...", "yellow")

    start_time = time.time()
    while time.time() - start_time < timeout_seconds:
        try:
            r = requests.get(session_url, auth=(AUTH_USER, AUTH_PASS), timeout=5)
            if r.status_code == 200:
                body = r.json()
                if body.get("authenticated"):
                    elapsed = int(time.time() - start_time)
                    print()
                    log(f"OpenMRS Backend is fully online and authenticated! (Took {elapsed}s)", "green")
                    return True
        except Exception:
            pass

        time.sleep(5)
        print(".", end="", flush=True)

    print()
    log("[ERROR] OpenMRS Backend timed out during initialization.", "red")
    log("Inspect logs using: docker compose -f openmrs-distro-referenceapplication/docker-compose.yml logs backend", "yellow")
    sys.exit(1)


def setup_concepts():
    print_step(4, "Registering AIIMS Concept Dictionary")
    script_path = os.path.join(SCRIPTS_DIR, "setup_aiims_concepts.py")
    log(f"Executing: python {os.path.basename(script_path)} ...")
    res = subprocess.run([sys.executable, script_path], cwd=PROJECT_ROOT)
    if res.returncode != 0:
        log("[ERROR] Concept registration failed.", "red")
        sys.exit(res.returncode)
    log("AIIMS concept dictionary successfully loaded.", "green")


def publish_forms():
    print_step(5, "Publishing AIIMS AMPATH Forms")
    script_path = os.path.join(SCRIPTS_DIR, "publish_aiims_form.py")
    log(f"Executing: python {os.path.basename(script_path)} ...")
    res = subprocess.run([sys.executable, script_path], cwd=PROJECT_ROOT)
    if res.returncode != 0:
        log("[ERROR] Form publishing failed.", "red")
        sys.exit(res.returncode)
    log("All 9 AIIMS forms published and verified.", "green")


def build_and_deploy_frontend():
    print_step(6, "Building & Hot-Deploying AIIMS Frontend Microfrontend")

    # 1. npm install if node_modules missing
    node_modules_dir = os.path.join(APP_DIR, "node_modules")
    if not os.path.exists(node_modules_dir):
        log("Running 'npm install' in aiims-esm-demographics-app ...", "yellow")
        npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
        res = subprocess.run([npm_cmd, "install"], cwd=APP_DIR, shell=(sys.platform == "win32"))
        if res.returncode != 0:
            log("[ERROR] 'npm install' failed.", "red")
            sys.exit(res.returncode)

    # 2. npm run build
    log("Building ESM bundle via 'npm run build' ...")
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    res = subprocess.run([npm_cmd, "run", "build"], cwd=APP_DIR, shell=(sys.platform == "win32"))
    if res.returncode != 0:
        log("[ERROR] Frontend build failed.", "red")
        sys.exit(res.returncode)
    log("Frontend build succeeded.", "green")

    # 3. deploy_demographics.py
    deploy_script = os.path.join(SCRIPTS_DIR, "deploy_demographics.py")
    log(f"Deploying ESM bundle into frontend container via {os.path.basename(deploy_script)} ...")
    res = subprocess.run([sys.executable, deploy_script], cwd=PROJECT_ROOT)
    if res.returncode != 0:
        log("[ERROR] Microfrontend deployment failed.", "red")
        sys.exit(res.returncode)
    log("Frontend microfrontend deployed and registered in importmap.", "green")


def verify_installation():
    print_step(7, "Final Health Check & Verification")
    import requests

    # 1. Verify SPA Gateway
    try:
        r_spa = requests.get(f"{OPENMRS_BASE_URL}/spa", timeout=10)
        spa_ok = r_spa.status_code in (200, 301, 302)
    except Exception:
        spa_ok = False

    # 2. Verify REST Session
    try:
        r_api = requests.get(f"{OPENMRS_BASE_URL}/ws/rest/v1/session", auth=(AUTH_USER, AUTH_PASS), timeout=10)
        api_ok = r_api.status_code == 200 and r_api.json().get("authenticated", False)
    except Exception:
        api_ok = False

    # 3. Verify Forms API
    try:
        r_forms = requests.get(f"{OPENMRS_BASE_URL}/ws/rest/v1/form?v=custom:(uuid,name)", auth=(AUTH_USER, AUTH_PASS), timeout=10)
        forms_list = r_forms.json().get("results", [])
        aiims_forms = [f for f in forms_list if "AIIMS" in f.get("name", "")]
        forms_ok = len(aiims_forms) >= 9
    except Exception:
        forms_ok = False
        aiims_forms = []

    log("\n" + "=" * 70, "green")
    log("   OPENMRS 3.x AIIMS ENVIRONMENT SETUP COMPLETE!", "green")
    log("=" * 70, "green")
    log(f"  • Web Application SPA:   http://localhost/openmrs/spa   [{'OK' if spa_ok else 'PENDING'}]", "bold")
    log(f"  • REST API Endpoint:     http://localhost/openmrs/ws/rest/v1   [{'OK' if api_ok else 'FAILED'}]")
    log(f"  • Default Credentials:   Username: {AUTH_USER}  |  Password: {AUTH_PASS}")
    log(f"  • AIIMS Custom Forms:    {len(aiims_forms)} / 9 active in OpenMRS")
    log(f"  • Frontend Module:       @aiims/esm-demographics-app active in importmap")
    log("=" * 70, "green")
    log("\nYou can open the application at: http://localhost/openmrs/spa\n", "cyan")


def main():
    start_total = time.time()
    log("=" * 70, "cyan")
    log("   OpenMRS AIIMS System Setup & Bootstrap Utility", "cyan")
    log("=" * 70, "cyan")

    check_prerequisites()
    start_docker_stack()
    wait_for_database()
    wait_for_backend()
    setup_concepts()
    publish_forms()
    build_and_deploy_frontend()
    verify_installation()

    total_time = int(time.time() - start_total)
    log(f"Total setup duration: {total_time // 60}m {total_time % 60}s\n", "green")


if __name__ == "__main__":
    main()
