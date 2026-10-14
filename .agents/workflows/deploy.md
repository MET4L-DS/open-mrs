---
description: Run the 9-stage automated deployment pipeline, hot-deploy the microfrontend bundle, and verify live endpoints.
---

# Deploy AIIMS Microfrontend Workflow

Use this workflow to execute a safe, zero-downtime hot deployment of `@aiims/esm-demographics-app` to the live OpenMRS Docker stack.

## Execution Steps

1. **Run Deployment Pipeline**:
   Execute the automated 9-stage pipeline from the workspace root:
   ```bash
   npm run deploy:local
   ```
   *(Or via PowerShell: `.\openmrs.ps1 deploy`)*

2. **Pipeline Quality Gates Enforced**:
   - **Gate 1**: Docker Pre-flight Check (verifies `frontend`, `backend`, `gateway`, `db` containers are active).
   - **Gate 2**: Clinical Form Schema Verification (`validate:forms` across all 28 forms).
   - **Gate 3**: Concept Dictionary Verification (`validate:concepts` for 324 concepts).
   - **Gate 4**: i18n Translation Health Check (`audit:i18n`).
   - **Gate 5**: TypeScript Compilation (`tsc` with `noImplicitAny: true`).
   - **Gate 6**: Unit Test Suite (`vitest` across all test files).
   - **Gate 7**: Single-sourced Route Generation (`generate-routes`).
   - **Gate 8**: Production Build (Rspack compilation).
   - **Gate 9**: Container Hot-Deployment, importmap.json cache-busting, and HTTP 200 live probe.

3. **Verify Active Bundle**:
   Confirm the deployed version from the terminal summary output:
   - Target bundle: `openmrs-esm-aiims-demographics-app-1.0.<patch>`
   - Status: HTTP 200 OK from `http://localhost/openmrs/spa/importmap.json`

4. **Run Live Smoke Test**:
   If a specific form was modified, immediately verify in headless browser:
   ```bash
   npm run test:e2e -- --form=aiims-<form_key>
   ```
