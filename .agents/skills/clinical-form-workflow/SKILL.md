---
name: clinical-form-workflow
description: Guides the agent through adding a new clinical form or modifying an existing clinical intake form in the AIIMS OpenMRS 3.x distribution. Follow Track A for new forms or Track B for field modifications.
---

# Clinical Form Addition & Modification Skill

Choose the appropriate track based on your task:
- **[Track A: Adding a Brand New Clinical Form](#track-a-adding-a-brand-new-clinical-form)** (From concept modeling to scaffolding and publishing)
- **[Track B: Modifying an Existing Form / Adding Fields](#track-b-modifying-an-existing-form--adding-fields)** (Targeted updates to schemas, components, and concepts)

---

## Track A: Adding a Brand New Clinical Form

### Stage 1: Concept Modeling & MariaDB Registration
1. Define concepts and answers in `scripts/setup_aiims_concepts.py`.
2. **MANDATORY**: Any concept with `datatype_id = 1` (`Numeric`) **MUST** include `concept_numeric` parameters (`is_numeric=True, allow_decimal=..., low_abs=..., hi_abs=...`). Omitting this causes `ObsValidator` to throw `NullPointerException` (HTTP 500) upon observation save.
3. Run `python scripts/setup_aiims_concepts.py` to populate MariaDB and regenerate `scripts/register_aiims_concepts.sql`.
4. Add concept UUIDs to `src/config/concepts.ts`.
5. Update concept registries in `configuration/concepts/aiims/aiims_concepts.csv` and `docs/concept_registry.md`.
6. Run `npm run validate:concepts` to verify all concept UUIDs and `concept_numeric` metadata.

### Stage 2: AMPATH Form Schema Creation (`forms/`)
1. Create `forms/aiims_<form_key>.json` with pages, sections, and questions mapped to concept UUIDs.
2. Ensure rendering types match datatypes (`number`, `text`, `textarea`, `radio`, `select`, `date`).
3. Use standard ASCII hyphens `-` for section and question labels (avoid Unicode dashes `–` which break on Windows cp1252 SQL pipes).

### Stage 3: Backend Form Publishing (`publish_aiims_form.py`)
1. Register form in `FORMS_TO_PUBLISH` in `scripts/publish_aiims_form.py` with its schema path and target UUID.
2. Run targeted publisher:
   ```bash
   python scripts/publish_aiims_form.py --form=aiims_<form_key>
   ```
3. Run `npm run validate:forms` to confirm `/o3/forms/<uuid>` returns HTTP 200 with valid pages and concept references.

### Stage 4: Frontend Microfrontend Scaffolding (`create-form`)
1. Run scaffolding CLI in `aiims-esm-demographics-app`:
   ```bash
   npm run create-form -- <form-key> "<Form Display Name>" --icon=<CarbonIconName>
   ```
2. The CLI automatically registers form UUID, updates `FORM_REGISTRY`, regenerates routes and extensions, and scaffolds feature files.

### Stage 5: Frontend Customization & Localization
1. **Hook (`<form-key>.resource.ts`)**: Implement typed interface and observation extraction using `useFormEncounter` and `getOptionalObsValue`.
2. **Card (`<form-key>-card.component.tsx`)**: Implement Carbon `ObservationCard` sections with localized labels and units.
3. **Translations (`translations/en.json`)**: Add all display strings and run `npm run audit:i18n` (must achieve 0 missing, 0 empty).
4. **Unit Tests (`<form-key>.test.tsx`)**: Verify empty state, recorded observation rendering, and type contracts.

### Stage 6: Quality Gates, Deployment & Interactive E2E Verification
1. Run automated deployment pipeline:
   ```bash
   npm run deploy:local
   ```
   *(Executes Docker pre-flight -> `validate:forms` -> `validate:concepts` -> `audit:i18n` -> `tsc` -> `vitest` -> Rspack build -> hot-deploy -> HTTP 200 probe)*.
2. Run E2E smoke test robot to verify live mounting in patient chart:
   ```bash
   npm run test:e2e -- --form=aiims-<form-key>
   ```
3. Open live patient chart, click **"Record"**, fill sample data, and click **"Save"** to verify complete round-trip intake.
4. Record completed tasks in `docs/records/YYYY-MM-DD/summary.md`.

---

## Track B: Modifying an Existing Form / Adding Fields

Use this track when adding new fields, modifying questions, or tuning validation logic in an existing clinical intake form:

### Step 1: Concept Verification or Creation
- If new concepts are needed:
  1. Add concept definition in `scripts/setup_aiims_concepts.py` (ensure `concept_numeric` for numeric datatypes).
  2. Run `python scripts/setup_aiims_concepts.py` to update MariaDB and `scripts/register_aiims_concepts.sql`.
  3. Add UUID to `src/config/concepts.ts`.
  4. Document in `configuration/concepts/aiims/aiims_concepts.csv` and `docs/concept_registry.md`.
  5. Run `npm run validate:concepts`.

### Step 2: Form Schema Update & Targeted Publishing
1. Edit the form schema in `forms/aiims_<form_key>.json`.
   - Add/modify the question block with concept UUID, rendering type, placeholder, and validation rules.
   - Guard `failsWhenExpression` against 0 and empty inputs for optional numeric fields.
2. Publish only the updated form schema:
   ```bash
   python scripts/publish_aiims_form.py --form=aiims_<form_key>
   ```
3. Run `npm run validate:forms` to confirm schema integrity.

### Step 3: Frontend Model & Component Update
1. **Resource Hook (`src/<feature>/<feature>.resource.ts`)**:
   - Update data interface (`Aiims<Name>Data`) with the new field.
   - Extract observation via `getObsValue(CONCEPTS.<field>)` or `getOptionalObsValue(CONCEPTS.<field>)`.
2. **Observation Card (`src/<feature>/<feature>-card.component.tsx`)**:
   - Add row in `ObservationCard` with label, value, and localized unit.
3. **Summary Widget (if applicable)**:
   - If field belongs to demographics or high-level clinical summary, update `demographics-summary-widget.component.tsx`.

### Step 4: Localization & Quality Gates
1. Add new keys in `translations/en.json`.
2. Run `npm run audit:i18n` (must achieve 0 missing, 0 empty).
3. Update unit tests if observation structures or assertions changed.
4. Run full deployment pipeline:
   ```bash
   npm run deploy:local
   ```
5. Run targeted smoke test:
   ```bash
   npm run test:e2e -- --form=aiims-<form-key>
   ```
6. Record updates in `docs/records/YYYY-MM-DD/summary.md`.
