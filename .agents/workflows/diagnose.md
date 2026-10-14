---
description: Run an end-to-end diagnostic health check across Docker containers, MariaDB connectivity, schemas, concepts, translations, and tests.
---

# Comprehensive System Health Diagnostic Workflow

Use this workflow to quickly assess the operational status of the entire OpenMRS AIIMS environment.

## Execution Steps

1. **Check Docker Stack Availability**:
   Verify that all 4 required service containers are healthy and running:
   ```bash
   docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
   ```
   Required containers:
   - `openmrs-distro-referenceapplication-frontend-1`
   - `openmrs-distro-referenceapplication-backend-1`
   - `openmrs-distro-referenceapplication-gateway-1`
   - `openmrs-distro-referenceapplication-db-1`

2. **Run Form Schema Diagnostics**:
   Verify that all registered clinical forms exist on disk, are published in OpenMRS, and have valid question concepts:
   ```bash
   npm run validate:forms
   ```

3. **Run Concept Dictionary Diagnostics**:
   Verify that all registered unique clinical concepts exist, are active, and all numeric concepts have valid `concept_numeric` entries:
   ```bash
   npm run validate:concepts
   ```

4. **Run Translation Audit**:
   Verify that every user-facing string in TSX files is localized in `translations/en.json`:
   ```bash
   npm run audit:i18n
   ```

5. **Run Unit Test Suites**:
   Run all frontend Vitest suites:
   ```bash
   npm test
   ```

6. **Summary Health Matrix**:
   Output a diagnostic report summarizing:
   - Stack Health (Containers: 4/4 active)
   - Form Schema Status (N/N valid & published from `validate:forms`)
   - Concept Health (N/N active with valid `concept_numeric` from `validate:concepts`)
   - i18n Completeness (0 missing, 0 untranslated)
   - Vitest Test Results (All test suites and unit tests passing)
