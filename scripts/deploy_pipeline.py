#!/usr/bin/env python3
"""
scripts/deploy_pipeline.py
One-click deployment pipeline for AIIMS OpenMRS 3.x Frontend Microfrontends.

Pipeline steps:
1. Docker pre-flight check (verifies frontend, backend, gateway, db containers)
2. Quality gate: TypeScript type checking (tsc)
3. Quality gate: Unit tests (vitest) [skippable with --skip-tests]
4. Production build: Rspack build (auto-triggers generate-routes prebuild)
5. Container hot-deployment: invokes scripts/deploy_demographics.py
6. Live probe verification: validates HTTP 200 on /openmrs/spa/importmap.json
"""

import argparse
import os
import subprocess
import sys
import time
import urllib.request
import urllib.error

# Path configuration
WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
FRONTEND_DIR = os.path.join(WORKSPACE_ROOT, "aiims-esm-demographics-app")
DEPLOY_SCRIPT = os.path.join(WORKSPACE_ROOT, "scripts", "deploy_demographics.py")
PROBE_URL = "http://localhost/openmrs/spa/importmap.json"

REQUIRED_CONTAINERS = ["frontend", "backend", "gateway", "db"]

# Ensure UTF-8 output even on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Formatting utilities
def log(msg, color="white", bold=False):
    colors = {
        "cyan": "\033[96m",
        "green": "\033[92m",
        "yellow": "\033[93m",
        "red": "\033[91m",
        "bold": "\033[1m",
        "white": "\033[97m",
        "reset": "\033[0m",
    }
    prefix = ""
    if bold:
        prefix += colors["bold"]
    if color in colors:
        prefix += colors[color]
    reset = colors["reset"]
    try:
        print(f"{prefix}{msg}{reset}")
    except UnicodeEncodeError:
        # Fallback to ascii representation if terminal cannot display unicode
        safe_msg = msg.encode("ascii", "replace").decode("ascii")
        print(f"{prefix}{safe_msg}{reset}")

def print_step(step_num, total_steps, title):
    log(f"\n[{step_num}/{total_steps}] {title}", color="cyan", bold=True)
    log("-" * 65, color="cyan")

def check_docker_environment():
    """Verify that Docker daemon is responsive and required containers are active."""
    try:
        proc = subprocess.run(
            ["docker", "ps", "--format", "{{.Names}}\t{{.Status}}"],
            capture_output=True,
            text=True,
            check=True,
            timeout=15,
        )
    except subprocess.CalledProcessError as e:
        log(f"[ERROR] Docker check failed: {e.stderr.strip()}", "red", bold=True)
        sys.exit(1)
    except Exception as e:
        log(f"[ERROR] Could not connect to Docker daemon: {e}", "red", bold=True)
        log("Please verify Docker Desktop is running.", "yellow")
        sys.exit(1)

    running_lines = [line.strip() for line in proc.stdout.splitlines() if line.strip()]
    missing = []
    
    for req in REQUIRED_CONTAINERS:
        matched = False
        for line in running_lines:
            parts = line.split("\t")
            name = parts[0]
            status = parts[1] if len(parts) > 1 else ""
            if req in name and "Up" in status:
                matched = True
                break
        if not matched:
            missing.append(req)

    if missing:
        log(f"[ERROR] Required OpenMRS container(s) are not running: {', '.join(missing)}", "red", bold=True)
        log("Please start the OpenMRS stack first using:", "yellow")
        log("   .\\openmrs.ps1 start", "bold")
        log("   or: python scripts/setup_environment.py", "yellow")
        sys.exit(1)

    log("✓ All required containers (frontend, backend, gateway, db) are active.", "green")

def run_npm_command(cmd_args, step_name, cwd=FRONTEND_DIR):
    """Execute an npm command with streaming and duration tracking."""
    # On Windows, npm is a batch script npm.cmd
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    full_cmd = [npm_cmd] + cmd_args

    start = time.perf_counter()
    try:
        res = subprocess.run(
            full_cmd,
            cwd=cwd,
            text=True,
            check=False,
        )
    except Exception as e:
        log(f"[ERROR] Failed to execute {' '.join(full_cmd)}: {e}", "red", bold=True)
        sys.exit(1)

    duration = round(time.perf_counter() - start, 2)
    if res.returncode != 0:
        log(f"[ABORT] {step_name} failed with exit code {res.returncode} ({duration}s).", "red", bold=True)
        sys.exit(res.returncode)

    log(f"✓ {step_name} completed successfully ({duration}s).", "green")
    return duration

def run_deploy_script():
    """Invoke the existing deploy_demographics.py script."""
    start = time.perf_counter()
    res = subprocess.run(
        [sys.executable, DEPLOY_SCRIPT],
        cwd=WORKSPACE_ROOT,
        check=False,
    )
    duration = round(time.perf_counter() - start, 2)
    if res.returncode != 0:
        log(f"[ABORT] Deployment script failed with exit code {res.returncode}.", "red", bold=True)
        sys.exit(res.returncode)
    log(f"✓ Hot-deployment completed ({duration}s).", "green")
    return duration

def verify_live_probe(max_retries=3, delay_seconds=1.0):
    """Verify that /openmrs/spa/importmap.json responds with HTTP 200."""
    log(f"Probing live endpoint: {PROBE_URL} ...", "white")
    for attempt in range(1, max_retries + 1):
        try:
            req = urllib.request.Request(
                PROBE_URL,
                headers={"User-Agent": "AIIMS-Deploy-Pipeline/1.0"}
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                if response.status == 200:
                    log(f"✓ Probe verified: HTTP {response.status} OK received from {PROBE_URL}", "green", bold=True)
                    return True
                else:
                    log(f"Attempt {attempt}: Received HTTP {response.status}", "yellow")
        except urllib.error.HTTPError as e:
            log(f"Attempt {attempt}: HTTP Error {e.code}", "yellow")
        except Exception as e:
            log(f"Attempt {attempt}: Connection check failed ({e})", "yellow")

        if attempt < max_retries:
            time.sleep(delay_seconds)

    log(f"[WARNING] Could not confirm HTTP 200 on {PROBE_URL} after {max_retries} attempts.", "red", bold=True)
    sys.exit(1)

def main():
    parser = argparse.ArgumentParser(
        description="One-click deployment pipeline for AIIMS OpenMRS Microfrontends."
    )
    parser.add_argument(
        "--skip-tests",
        action="store_true",
        help="Skip unit tests (useful for quick styling iterations)",
    )
    parser.add_argument(
        "--skip-typecheck",
        action="store_true",
        help="Skip TypeScript compiler type check",
    )
    args = parser.parse_args()

    pipeline_start = time.perf_counter()
    total_steps = 5 if args.skip_tests else 6

    log("=" * 65, "cyan")
    log(" AIIMS OpenMRS 3.x Frontend Deployment Pipeline", "cyan", bold=True)
    log("=" * 65, "cyan")

    step = 1

    # Step 1: Docker pre-flight check
    print_step(step, total_steps, "Docker Pre-flight Check")
    check_docker_environment()
    step += 1

    # Step 2: Quality Gate: Type check
    if not args.skip_typecheck:
        print_step(step, total_steps, "TypeScript Type Check (tsc)")
        run_npm_command(["run", "typescript"], "TypeScript type check")
        step += 1
    else:
        log("\n[SKIPPED] TypeScript type check (--skip-typecheck)", "yellow")

    # Step 3: Quality Gate: Unit tests
    if not args.skip_tests:
        print_step(step, total_steps, "Unit Test Suite (vitest)")
        run_npm_command(["run", "test"], "Unit test suite")
        step += 1
    else:
        log("\n[SKIPPED] Unit tests (--skip-tests)", "yellow")

    # Step 4: Production build (triggers generate-routes + Rspack)
    print_step(step, total_steps, "Production Build (Rspack)")
    run_npm_command(["run", "build"], "Production build")
    step += 1

    # Step 5: Hot deploy
    print_step(step, total_steps, "Hot-Deploy to Docker Container")
    run_deploy_script()
    step += 1

    # Step 6: Verification Probe
    print_step(step, total_steps, "Live Endpoint Verification Probe")
    verify_live_probe()

    total_duration = round(time.perf_counter() - pipeline_start, 2)
    log("\n" + "=" * 65, "green")
    log(f" 🎉 Pipeline Completed Successfully in {total_duration}s!", "green", bold=True)
    log("=" * 65, "green")
    log("Endpoint: http://localhost/openmrs/spa", "white", bold=True)
    log("Bundle:   @aiims/esm-demographics-app active in importmap.json\n", "white")

if __name__ == "__main__":
    main()
