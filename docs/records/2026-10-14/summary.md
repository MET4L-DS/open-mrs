# Daily Engineering Record: 2026-10-14

## 1. Executive Summary
- **Main Goal**: Resolve form engine loading (404) and encounter saving (500) errors for Form 27 (Assessment of Fertilization, Embryo & Blastocyst), audit all potential system edge cases, and integrate automated quality gates into the deployment pipeline.
- **Outcome**: 100% operational. Form 27 is completely published, verified, and live. All 27 clinical forms and 316 concepts pass deep schema and database integrity validation.

---

## 2. Completed Tasks & Forms Delivered

### Form 27: Assessment of Fertilization, Embryo & Blastocyst
- **AMPATH Form Schema**: Created `forms/aiims_embryo_assessment.json` with 3 clinical sections (Fertilization & Cleavage Stage Days 1–3, Blastocyst Progression Days 4–6, Remarks).
- **Backend Publishing**: Added to `FORMS_TO_PUBLISH` in `scripts/publish_aiims_form.py` and published to `openmrs.form` and `clob_datatype_storage` (UUID: `37e59734-dac9-4332-ba27-f1053d189089`).
- **Encounter Round-Trip Verification**: Verified encounter submission via REST API (`POST /openmrs/ws/rest/v1/encounter` -> HTTP 201 Created).

### Form 1: Patient (Wife) Body Mass Index (BMI) Field Addition
- **Concept Registration**: Registered new numeric concept `c0010001-0000-0000-0000-000000000012` (`Patient Body Mass Index`) with `concept_numeric` (`units='kg/m2'`, `allow_decimal=1`, `low_absolute=5`, `hi_absolute=90`).
- **AMPATH Schema Update**: Updated `forms/aiims_personal_information.json` to include Body Mass Index (BMI) under the Patient (Wife) section with numeric validator (10.0 - 60.0 kg/m²). Published schema to backend.
- **Frontend UI & Components**:
  - Added `patientBmi` to `AiimsDemographicsData` interface and extraction in `demographics.resource.ts`.
  - Added BMI row to `PatientCard` (`patient-card.component.tsx`).
  - Added `Wife's BMI` item to `DemographicsSummaryWidget` (`demographics-summary-widget.component.tsx`).
  - Added localized strings (`patientBmi: "BMI"`, `wifeBmi: "Wife's BMI"`) in `translations/en.json` (verified via `audit:i18n`).
  - Hot-deployed bundle `openmrs-esm-aiims-demographics-app-1.0.72` via `deploy:local`.

### Form 28: Fertilisation Details
- **Concept Modeling**: Registered 7 concepts in MariaDB (`c0010001-0000-0000-0000-000000000261` through `0267`), including 6 numeric concepts with full `concept_numeric` parameters (Oocytes Fertilised, Fertilisation Rate %, Embryos Cleaved Day 2, Cleavage Rate %, Embryos Cleaved Day 3, Embryos Cleaved Day 5) and clinical notes remarks.
- **AMPATH Schema**: Created `forms/aiims_fertilisation_details.json` and published to OpenMRS backend (`37e59734-dac9-4332-ba27-f1053d189090`).
- **Frontend Architecture**:
  - Scaffolded feature module `src/fertilisation-details/` via `npm run create-form`.
  - Implemented typed resource hook (`fertilisation-details.resource.ts`) extracting all 7 observation concepts.
  - Implemented Carbon `ObservationCard` component (`fertilisation-details-card.component.tsx`) with 3 structured sections: Fertilisation & Insemination Outcome, Cleavage Stage Assessment, and Laboratory Remarks.
  - Added full i18n localization keys in `translations/en.json` (verified via `audit:i18n` with 0 missing keys).
  - Added unit test suite in `fertilisation-details.test.tsx` (all 3 tests passing).
  - Verified via 9-stage deployment pipeline (`npm run deploy:local`) and E2E smoke test robot (`npm run test:e2e -- --form=aiims-fertilisation-details`). Hot-deployed bundle `openmrs-esm-aiims-demographics-app-1.0.74`.


---

## 3. Post-Mortem & Bug Resolutions

### Bug 1: 404 Not Found on `/openmrs/ws/rest/v1/o3/forms/<uuid>`
- **Root Cause**: The frontend card and route had been scaffolded, but the backend AMPATH form schema had not yet been created in `forms/` or published to MariaDB.
- **Fix**: Created `forms/aiims_embryo_assessment.json`, updated `scripts/publish_aiims_form.py`, and published the form definition.
- **Permanent Guardrail**: Built `scripts/validate_forms.py` and added `Clinical Form Schema Verification` as Quality Gate #2 in `scripts/deploy_pipeline.py`.

### Bug 2: 500 Internal Server Error (`NullPointerException: ConceptNumeric.getAllowDecimal()`)
- **Root Cause**: The 6 numeric Day 1–6 embryo count concepts had `datatype_id = 1` (`Numeric`) in `concept`, but were missing entries in `concept_numeric`. When submitting numeric values, OpenMRS `ObsValidator` called `ConceptNumeric.getAllowDecimal()`, throwing an NPE.
- **Fix**: Populated `concept_numeric` for concepts 4816, 4818, 4820, 4822, 4824, 4826 (`allow_decimal=0`, `low_absolute=0`, `hi_absolute=100`).
- **Permanent Guardrail**: 
  1. Enhanced `scripts/validate_concepts.py` to query `allowDecimal` and fail immediately if any numeric concept lacks `concept_numeric`.
  2. Made `scripts/setup_aiims_concepts.py` self-healing on existing concepts via `IF NOT EXISTS (SELECT 1 FROM concept_numeric ...)`.

### Bug 3: Interleaved Sidebar Navigation Links (Core OpenMRS Links Injected Between IVF Forms)
- **Root Cause**: In `scripts/create-form.ts`, newly scaffolded forms computed `order = maxOrder + 1`, assigning `order: 2` to `embryo-assessment` and `order: 3` to `fertilisation-details`. In OpenMRS 3.x, `patient-chart-dashboard-slot` orders extensions numerically across *all* installed modules (core modules define Vitals at order 2 and Medications at order 3). Consequently, core links were interleaved directly between the AIIMS IVF forms.
- **Fix**: Changed `order` to `1` for all AIIMS clinical intake forms in `src/config/form-registry.ts` and locked `order: 1` in `scripts/create-form.ts`.
- **Permanent Guardrail**: Hardcoded `order: 1` in the CLI scaffolder and updated `src/routes.json` via `generate-routes`. All 28 AIIMS clinical forms now remain strictly grouped in contiguous clinical sequence.

---

## 4. Architectural & Tooling Enhancements

### 1. Clinical Form Validator (`scripts/validate_forms.py`)
- Automatically validates all 27 forms registered in `src/config/form-uuids.ts`.
- Deeply inspects every question and answer concept against the live MariaDB dictionary (4,828 concepts).
- Verifies that numeric questions have valid `concept_numeric` database records.
- Available via `npm run validate:forms`.

### 2. Nine-Stage Deployment Pipeline (`scripts/deploy_pipeline.py`)
Upgraded deployment pipeline to run 9 sequential quality gates with zero downtime:
1. Docker Pre-flight Check
2. Clinical Form Schema Verification (`validate:forms`)
3. Concept Dictionary Verification (`validate:concepts` with dynamic count reporting)
4. Localization Key Audit (`audit:i18n` to prevent runtime missing strings; toggleable via `--skip-i18n-audit`)
5. TypeScript Type Check (`tsc` with `noImplicitAny: true`)
6. Unit Test Suite (`vitest` - 74 tests across 30 files)
7. Single-sourced Route Generation (`generate-routes`)
8. Production Microfrontend Build (Rspack optimized bundle)
9. Hot-Deployment & Live Probe (`/openmrs/spa/importmap.json` HTTP 200 verification)

### 3. Targeted Single-Form Publishing (`scripts/publish_aiims_form.py`)
- Added CLI argument parser supporting `--form=<name_or_key_or_uuid>` and `--all`.
- Allows instant sub-second publishing of individual updated forms without reprocessing all 27 forms.

### 4. Workflow & Skill Optimization
- **`clinical-form-workflow` Bifurcation**: Partitioned into **Track A** (Adding a Brand New Clinical Form, 6 stages) and **Track B** (Modifying Existing Form / Adding Fields, 4 stages) for rapid iterations.
- **Git Commit Workflow**: Populated `.agents/workflows/git-message.md` with conventional commit standards, scopes, and OpenMRS examples.

### 5. Interactive Smoke Test Robot (`aiims-esm-demographics-app/e2e/smoke-test.ts`)
- Added interactive form workspace testing (`--workspace` flag or automatically when `--form` is passed).
- Clicks the primary action button ("Record" / "Update"), asserts that the form workspace opens without "There was an error with this form", and gracefully closes the workspace.

---

## 5. Quality & Health Metrics

| Metric | Target | Result | Status |
|---|---|---|---|
| Registered Clinical Forms | 28 | 28 Published & Active | ✓ 100% |
| Unique Concept Definitions | 324 | 324 Active & Verified | ✓ 100% |
| Numeric Concepts with `concept_numeric` | 91 | 91 Verified | ✓ 100% |
| Unit Test Suite | 77 | 77 Passing (31 files) | ✓ 100% |
| i18n Translation Health | 100% | 0 Missing Keys (`audit:i18n`) | ✓ Clean |
| TypeScript Compiler Errors | 0 | 0 Errors | ✓ Clean |
| Active Frontend Bundle | — | `openmrs-esm-aiims-demographics-app-1.0.74` | ✓ Active |
