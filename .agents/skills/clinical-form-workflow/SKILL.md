---
name: clinical-form-workflow
description: Guides the agent through the end-to-end 6-stage lifecycle for adding or modifying clinical intake forms in the AIIMS OpenMRS 3.x distribution. Activate whenever adding a new clinical form, modifying an existing form schema, or registering new medical concepts.
---

# Clinical Form Addition & Modification Skill

Follow this strict 6-stage lifecycle to build and register clinical forms without errors:

## Stage 1: Concept Modeling & MariaDB Registration
1. Define concepts and answers in `scripts/setup_aiims_concepts.py`.
2. **MANDATORY**: Any concept with `datatype_id = 1` (`Numeric`) **MUST** include `concept_numeric` parameters (`is_numeric=True, allow_decimal=..., low_abs=..., hi_abs=...`). Omitting this causes `ObsValidator` to throw `NullPointerException` (HTTP 500) upon observation save.
3. Run `python scripts/setup_aiims_concepts.py` to populate MariaDB and regenerate `scripts/register_aiims_concepts.sql`.
4. Add concept UUIDs to `src/config/concepts.ts`.
5. Run `npm run validate:concepts` to verify all concept UUIDs and `concept_numeric` metadata.

## Stage 2: AMPATH Form Schema Creation (`forms/`)
1. Create `forms/aiims_<form_key>.json` with pages, sections, and questions mapped to concept UUIDs.
2. Ensure rendering types match datatypes (`number`, `text`, `textarea`, `radio`, `select`, `date`).
3. Use standard ASCII hyphens `-` for section and question labels (avoid Unicode dashes `–` which break on Windows cp1252 SQL pipes).

## Stage 3: Backend Form Publishing (`publish_aiims_form.py`)
1. Register form in `FORMS_TO_PUBLISH` in `scripts/publish_aiims_form.py` with its schema path and target UUID.
2. Run `python scripts/publish_aiims_form.py`.
3. Run `npm run validate:forms` to confirm `/o3/forms/<uuid>` returns HTTP 200 with valid pages and concept references.

## Stage 4: Frontend Microfrontend Scaffolding (`create-form`)
1. Run scaffolding CLI in `aiims-esm-demographics-app`:
   ```bash
   npm run create-form -- <form-key> "<Form Display Name>" --icon=<CarbonIconName>
   ```
2. The CLI automatically registers form UUID, updates `FORM_REGISTRY`, regenerates routes and extensions, and scaffolds feature files.

## Stage 5: Frontend Customization & Localization
1. **Hook (`<form-key>.resource.ts`)**: Implement typed interface and observation extraction using `useFormEncounter` and `getOptionalObsValue`.
2. **Card (`<form-key>-card.component.tsx`)**: Implement Carbon `ObservationCard` sections with localized labels and units.
3. **Translations (`translations/en.json`)**: Add all display strings and run `npm run audit:i18n` (must achieve 0 missing, 0 empty).
4. **Unit Tests (`<form-key>.test.tsx`)**: Verify empty state, recorded observation rendering, and type contracts.

## Stage 6: Quality Gates, Deployment & Interactive E2E Verification
1. Run automated pipeline:
   ```bash
   npm run deploy:local
   ```
   *(Executes Docker pre-flight -> `validate:forms` -> `validate:concepts` -> `tsc` -> `vitest` -> Rspack build -> hot-deploy -> HTTP 200 probe)*.
2. Run E2E smoke test robot to verify live mounting in patient chart:
   ```bash
   npm run test:e2e -- --form=aiims-<form-key>
   ```
3. Open live patient chart, click **"Record"**, fill sample data, and click **"Save"** to verify complete round-trip intake.
4. Record completed tasks in `docs/records/YYYY-MM-DD/summary.md`.
