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

### Form 27 Fix: Assessment of Fertilization, Embryo & Blastocyst (Grading Dropdowns)
- **Concept Modeling**: Converted Days 2, 3, 4, 5, 6 question concepts (`0251`, `0253`, `0255`, `0257`, `0259`) from free text (`datatype_id=3`) to coded questions (`datatype_id=2`).
- **Answer Concepts Registered**:
  - Cleavage stage answers (`c0010002-...1050` to `1069`): 20 clinical options (`2PN-arrest`, `2C/A`–`8C/C`, `10-12Cells`). Linked to Days 2 & 3.
  - Day 4 morula stage answers (`c0010002-...1070` to `1073`): 4 clinical options (`Morula`, `Compacted Morula`, `Early Blastocyst`, `Arrest`). Linked to Day 4.
  - Blastocyst stage answers (`c0010002-...1074` to `1106`): 33 clinical Gardner scale options (`1AA`–`6CC`, `Morula`, `Arrest`, `Pre-blast`). Linked to Days 5 & 6.
- **AMPATH Form Schema**: Updated `forms/aiims_embryo_assessment.json` to `"rendering": "select"` with embedded `answers` arrays for Days 2, 3, 4, 5, and 6. Re-published to OpenMRS backend via `scripts/publish_aiims_form.py`.
- **Quality Gates**: Verified with `npm run validate:forms`, `npm run validate:concepts`, 31 Vitest suites (77 tests passing), automated deployment pipeline (bundle `1.0.76`), and headless E2E dashboard smoke test robot.


### Form 29: Embryo Grading Day 3
- **Clinical CSV Specification**: [`csv/aiims_ivf_04 copy - embryo_grading_day3.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20embryo_grading_day3.csv) (Veeck / Istanbul Day 3 Cleavage Embryo Grading).
- **Concept Modeling**: Registered 5 concepts in MariaDB (`c0010001-0000-0000-0000-000000000268` through `0272`):
  - 4 Text concepts for Grade 1, Grade 2, Grade 3, and Grade 4 embryo descriptions (alphanumeric freetext for embryology notations).
  - 1 Text concept for Day 3 Laboratory Remarks.
- **AMPATH Schema**: Authored `forms/aiims_embryo_grading_day3.json` with `"rendering": "text"` for Grade 1–4 and published to OpenMRS backend (`37e59734-dac9-4332-ba27-f1053d189091`).
- **Frontend Architecture**:
  - Scaffolded feature module `src/embryo-grading-day3/` with `order: 1` and `Microscope` icon.
  - Implemented typed resource hook (`embryo-grading-day3.resource.ts`) extracting alphanumeric values for Grade 1–4 and remarks.
  - Implemented Carbon `ObservationCard` component (`embryo-grading-day3-card.component.tsx`) with 2 structured sections: Day 3 Cleavage Stage Embryo Grading and Laboratory Notes & Remarks.
  - Added full i18n localization keys in `translations/en.json` (verified via `audit:i18n` with 0 missing keys).
  - Implemented unit test suite in `embryo-grading-day3.test.tsx` (4 tests passing).
  - Verified via 9-stage deployment pipeline (`npm run deploy:local`) and E2E smoke test robot (`npm run test:e2e`). Hot-deployed bundle `openmrs-esm-aiims-demographics-app-1.0.79`.

### Form 30: Embryos Frozen
- **Clinical CSV Specification**: [`csv/aiims_ivf_04 copy - embryo frozen.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20embryo%20frozen.csv) (Day 3 & Day 5 Embryo Vitrification and Cryopreservation).
- **Concept Modeling**: Registered 7 concepts in MariaDB (`c0010001-0000-0000-0000-000000000273` through `0279`):
  - 2 Numeric concepts with complete `concept_numeric` metadata (`units='embryos'`, `allow_decimal=0`, range 0-100) for Number of Day 3 Embryos Vitrified and Number of Day 5 Embryos Vitrified.
  - 4 Text concepts for Grade A, Grade B, Grade C Day 3 Embryos Vitrified, and Grade of Day 5 Embryos Vitrified (alphanumeric freetext for straw numbers, cell counts, and Gardner grades).
  - 1 Text concept for Embryos Frozen Remarks.
- **AMPATH Schema**: Authored `forms/aiims_embryos_frozen.json` with 3 clinical sections (Day 3 Vitrification, Day 5 Vitrification, Remarks) and published to OpenMRS backend (`37e59734-dac9-4332-ba27-f1053d189092`).
- **Frontend Architecture**:
  - Scaffolded feature module `src/embryos-frozen/` with `order: 1` and `Chemistry` icon.
  - Implemented typed resource hook (`embryos-frozen.resource.ts`) extracting all 7 observation concepts.
  - Implemented Carbon `ObservationCard` component (`embryos-frozen-card.component.tsx`) with 3 structured sections: Day 3 Embryo Vitrification (Cleavage Stage), Day 5 Blastocyst Vitrification, and Cryopreservation Notes & Remarks.
  - Added full i18n localization keys in `translations/en.json` (verified via `audit:i18n` with 0 missing keys).
  - Implemented unit test suite in `embryos-frozen.test.tsx` (4 tests passing).
  - Verified via 9-stage deployment pipeline (`npm run deploy:local`) and E2E smoke test robot (`npm run test:e2e`). Hot-deployed bundle `openmrs-esm-aiims-demographics-app-1.0.80`.

### Form 31: Fresh Embryo Transfer Details
- **Clinical CSV Specification**: [`csv/aiims_ivf_04 copy - freshET_details.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20freshET_details.csv) (Fresh Embryo Transfer procedure, cancellation reasons, and embryo metrics).
- **Concept Modeling**: Registered 11 question concepts in MariaDB (`c0010001-0000-0000-0000-000000000280` through `0290`) and 25 answer concepts (`c0010002-...1107` through `1131`):
  - `0280`: Fresh Embryo Transfer Performed (Coded: Yes/No)
  - `0281`: Reason Fresh Embryo Transfer Not Performed (Coded: 20 clinical etiologies)
  - `0282`: Other Reason Fresh Embryo Transfer Not Performed (Text)
  - `0283`: Number of Fresh Embryos Transferred (Numeric with `concept_numeric`: `units='embryos'`, `allow_decimal=0`, range 0-10)
  - `0284`: Grade of Fresh Embryos Transferred (Text)
  - `0285`: Day of Fresh Embryo Transfer (Coded: Day 2 to Day 6)
  - `0286`: Fresh Embryo Transfer Endometrial Thickness (Numeric with `concept_numeric`: `units='mm'`, `allow_decimal=1`, range 1.0-30.0)
  - `0287`: Fresh Embryo Transfer Difficulty (Coded: Easy/Difficult)
  - `0288`: Blood on Tip of Catheter (Coded: Yes/No)
  - `0289`: Fresh Embryo Transfer Date (Date)
  - `0290`: Fresh Embryo Transfer Remarks (Text)
- **AMPATH Schema**: Authored `forms/aiims_fresh_et_details.json` with conditional skip logic:
  - If Fresh ET = No: Reveals cancellation dropdown and custom free-text notes.
  - If Fresh ET = Yes: Reveals transfer date, day, count, grade, endometrial thickness, difficulty, and catheter blood status.
  - Published to OpenMRS backend (`37e59734-dac9-4332-ba27-f1053d189093`).
- **Frontend Architecture**:
  - Scaffolded feature module `src/fresh-et-details/` with `order: 1` and `EventSchedule` icon.
  - Implemented typed resource hook (`fresh-et-details.resource.ts`) extracting all 11 observation concepts.
  - Implemented Carbon `ObservationCard` component (`fresh-et-details-card.component.tsx`) with 4 structured sections: Clinical Decision, Cancellation Rationale, Procedure Details, and Remarks.
  - Added full i18n localization keys in `translations/en.json` (verified via `audit:i18n` with 0 missing keys).
  - Implemented unit test suite in `fresh-et-details.test.tsx` (4 tests passing).
  - Verified via 9-stage deployment pipeline (`npm run deploy:local`) and E2E smoke test robot (`npm run test:e2e`). Hot-deployed bundle `openmrs-esm-aiims-demographics-app-1.0.81`.

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
- **Permanent Guardrail**: Hardcoded `order: 1` in the CLI scaffolder and updated `src/routes.json` via `generate-routes`. All 29 AIIMS clinical forms now remain strictly grouped in contiguous clinical sequence.

### Bug 4: Initial Radio Button Transition from Null State Failing to Render Conditional Section
- **Root Cause**: In `forms/aiims_fresh_et_details.json`, `hideWhenExpression` was placed directly on the `<section>` elements ("Reason Fresh Embryo Transfer Not Done", "Fresh Embryo Transfer Procedure Details") rather than on the questions themselves. In OpenMRS 3.x `@openmrs/esm-form-engine-lib`, section-level visibility observers do not re-evaluate when a radio button in a separate section transitions from `null` / unselected to a selected value on the first click. Only subsequent transitions (e.g. Yes -> No) forced a dirty re-render.
- **Fix**: Re-structured `forms/aiims_fresh_et_details.json` so all conditional questions reside in the active section and have individual `hideWhenExpression` expressions (`!fresh_embryo_transfer || fresh_embryo_transfer !== '...'`).
- **Permanent Guardrail**: Documented and verified via `SKILL.md` (ampath-form-schema-guide Section 4 Rule 4): Always attach `hideWhenExpression` to questions rather than section objects. Published updated schema to MariaDB backend and verified live via headless E2E workspace robot.


---

## 4. Architectural & Tooling Enhancements

### 1. Clinical Form Validator (`scripts/validate_forms.py`)
- Automatically validates all 31 forms registered in `src/config/form-uuids.ts`.
- Deeply inspects every question and answer concept against the live MariaDB dictionary (4,941 concepts).
- Verifies that numeric questions have valid `concept_numeric` database records.
- Available via `npm run validate:forms`.

### 2. Nine-Stage Deployment Pipeline (`scripts/deploy_pipeline.py`)
Upgraded deployment pipeline to run 9 sequential quality gates with zero downtime:
1. Docker Pre-flight Check
2. Clinical Form Schema Verification (`validate:forms`)
3. Concept Dictionary Verification (`validate:concepts` with dynamic count reporting)
4. Localization Key Audit (`audit:i18n` to prevent runtime missing strings; toggleable via `--skip-i18n-audit`)
5. TypeScript Type Check (`tsc` with `noImplicitAny: true`)
6. Unit Test Suite (`vitest` - 89 tests across 34 files)
7. Single-sourced Route Generation (`generate-routes`)
8. Production Microfrontend Build (Rspack optimized bundle)
9. Hot-Deployment & Live Probe (`/openmrs/spa/importmap.json` HTTP 200 verification)

### 3. Targeted Single-Form Publishing (`scripts/publish_aiims_form.py`)
- Added CLI argument parser supporting `--form=<name_or_key_or_uuid>` and `--all`.
- Allows instant sub-second publishing of individual updated forms without reprocessing all forms.

### 4. Workflow & Skill Optimization
- **`clinical-form-workflow` Bifurcation**: Partitioned into **Track A** (Adding a Brand New Clinical Form, 6 stages) and **Track B** (Modifying Existing Form / Adding Fields, 4 stages) for rapid iterations.
- **Git Commit Workflow**: Populated `.agents/workflows/git-message.md` with conventional commit standards, scopes, and OpenMRS examples.

### 5. Interactive Smoke Test Robot (`aiims-esm-demographics-app/e2e/smoke-test.ts`)
- Added interactive form workspace testing (`--workspace` flag or automatically when `--form` is passed).
- Clicks the primary action button ("Record" / "Update"), asserts that the form workspace opens without "There was an error with this form", and gracefully closes the workspace.

### Form 32: Additional Procedures in Assisted Reproductive Technology
- **Clinical CSV Specification**: [`csv/aiims_ivf_04 copy - add_procedure_art.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20add_procedure_art.csv) (Adjuvant ART procedures).
- **Concept Modeling**: Registered 3 question concepts (`c0010001-0000-0000-0000-000000000291` through `0293`) and 4 answer concepts (`c0010002-...1132` through `1135`):
  - `0291`: Additional Procedures in Assisted Reproductive Technology (Coded checkbox: Platelet Rich Plasma (PRP), Endometrial Injury, G-CSF, Embryo Glue)
  - `0292`: Date of Additional Procedures in Assisted Reproductive Technology (Date)
  - `0293`: Additional Procedures in Assisted Reproductive Technology Remarks (Text)
- **AMPATH Schema**: Authored `forms/aiims_add_procedure_art.json` with multi-select checkboxes, date of procedure, and clinical remarks textarea. Published to OpenMRS backend (`37e59734-dac9-4332-ba27-f1053d189094`).
- **Frontend Architecture**:
  - Scaffolded feature module `src/add-procedure-art/` with `order: 1` and `Activity` icon.
  - Implemented typed resource hook (`add-procedure-art.resource.ts`) extracting multi-select observations via `getObsValues`.
  - Implemented Carbon `ObservationCard` component (`add-procedure-art-card.component.tsx`) with 2 structured sections: Additional Procedures in ART and Clinical Notes & Remarks.
  - Added full i18n localization keys in `translations/en.json` (verified via `audit:i18n` with 0 missing keys).
  - Implemented unit test suite in `add-procedure-art.test.tsx` (3 tests passing).
  - Verified via 9-stage deployment pipeline (`npm run deploy:local`) and E2E smoke test robot (`npm run test:e2e -- --form=aiims-add-procedure-art`). Hot-deployed bundle `openmrs-esm-aiims-demographics-app-1.0.82`.

---

## 5. Quality & Health Metrics

| Metric | Target | Result | Status |
|---|---|---|---|
| Registered Clinical Forms | 32 | 32 Published & Active | ✓ 100% |
| Unique Concept Definitions | 350 | 350 Active & Verified | ✓ 100% |
| Numeric Concepts with `concept_numeric` | 95 | 95 Verified | ✓ 100% |
| Unit Test Suite | 92 | 92 Passing (35 files) | ✓ 100% |
| i18n Translation Health | 100% | 0 Missing Keys (`audit:i18n`) | ✓ Clean |
| TypeScript Compiler Errors | 0 | 0 Errors | ✓ Clean |
| Active Frontend Bundle | — | `openmrs-esm-aiims-demographics-app-1.0.82` | ✓ Active |

