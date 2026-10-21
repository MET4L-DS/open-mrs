# Daily Engineering Record & Decision Journal: 2026-10-21

## 1. Executive Summary & Daily Mission
- **Mission Goal**: Execute 11 structural adjustments and clinical refactoring tasks across 10 clinical intake forms and their corresponding frontend observation cards/dashboards:
  1. *Married for years*: Transferred from *Type of Infertility* into *Patient Information (Demographics)* under wife demographics.
  2. *OVI & IUI*: Pruned obsolete "Previous ART Treatment Clinical Notes"; separated "Multiple OVI check option" into an independent question outside the "Previous Ovulation Induction" group.
  3. *Previous Surgery (Form 9)*: Renamed to **"Previous Fertility Enhancing Surgery"** across backend schemas, `form-registry.ts`, `form-uuids.ts`, translations, and frontend card headers, maintaining single-SPA route path `aiims-previous-surgery` intact per ADR-014.
  4. *Previous Surgery Hysteroscopy Dimensions*: Relocated `prev_hysteroscopy_dimensions` from general surgery observations into the "Operative Hysteroscopy" section.
  5. *Female Factor*: Refactored POSEIDON classification into a structured two-tiered nested hierarchy (Tier 1: Groups 1–4, Tier 2: 1a/1b for Group 1, 2a/2b for Group 2).
  6. *Male Hormone*: Renamed "Testicular Biopsy Report / Surgical Notes" to **"Testicular Biopsy Findings"**.
  7. *Tuberculosis History*: Refactored free-text/numeric duration into structured dropdown selections for Year (`att_duration_years`) and Month (`att_duration_months`).
  8. *Procedure Embryo Transfer*: Removed obsolete "Procedure Remarks" field and dashboard row.
  9. *Investigation Female Transvaginal Ultrasound*: Nested "3D" and "4D" options conditionally under "Endometrial Cavity - Normal"; renamed "Septate Angle" to **"Endometrial Cavity Septate Angle"** and "Length of Septum" to **"Endometrial Cavity Length of Septum"**.
  10. *Investigation Female Procedure Biopsy*: Added nested clinical sub-questions for "Endometrial Hyperplasia" (with/without atypia) and "Granuloma" (Present/Absent).
  11. *Investigation Male Semen*: Pruned "Semen Analysis Remarks / Notes" (`male_semen_remarks`) from schema, resource parser, and dashboard card.
- **Operational Status**: All 10 schemas published and registered in MariaDB. All 102/102 Vitest unit tests passing across 39 test suites. Strict TypeScript check (`tsc --noEmit`) passing with 0 errors. Full 9-stage deployment pipeline completed cleanly in 122.27s. Production bundle `1.0.99` live on Docker frontend.

---

## 2. Tasks Completed & Deliverables (The "What")

### 2.1 Schema Refactoring Across 10 Clinical Forms
- **`forms/aiims_infertility_type.json`**: Removed `married_for_years` field.
- **`forms/aiims_personal_information.json`**: Integrated `married_for_years` numeric field into Wife Demographics section.
- **`forms/aiims_prev_oi_iui.json`**:
  - Removed `previous_art_notes`.
  - Extracted `multiple_ovi` from the inner `previous_ovulation_induction` obsGroup to stand as an independent clinical observation.
- **`forms/aiims_prev_surgery.json`**:
  - Renamed form display title to **"AIIMS Visit: Previous Fertility Enhancing Surgery"**.
  - Relocated `prev_hysteroscopy_dimensions` into the Operative Hysteroscopy section.
- **`forms/aiims_female_factor.json`**:
  - Restructured POSEIDON classification to present Tier 1 (Groups 1–4) and nested Tier 2 (1a/1b conditional on Group 1, 2a/2b conditional on Group 2).
- **`forms/aiims_male_hormone_surgery.json`**:
  - Updated label of `testicular_biopsy_report` to **"Testicular Biopsy Findings"**.
- **`forms/aiims_tuberculosis_history.json`**:
  - Replaced single `att_duration` question with structured `att_duration_years` and `att_duration_months` dropdown selectors.
- **`forms/aiims_procedure_embryo_transfer.json`**:
  - Removed `procedure_embryo_transfer_remarks`.
- **`forms/aiims_investigation_ultrasound.json`**:
  - Nested `tvs_endometrial_cavity_normal_type` (3D / 4D) under Normal endometrial cavity.
  - Renamed labels to **"Endometrial Cavity Septate Angle"** and **"Endometrial Cavity Length of Septum"**.
- **`forms/aiims_investigation_female_procedure_biopsy.json`**:
  - Nested `eahpe_hyperplasia_type` (with/without atypia) under Endometrial Hyperplasia.
  - Nested `eahpe_granuloma_status` (Present/Absent) under Granuloma.
- **`forms/aiims_investigation_male_semen.json`**:
  - Removed `investigation_male_semen_remarks`.

### 2.2 Backend Schema Publishing
- Executed `scripts/publish_aiims_form.py` across all modified forms.
- Verified 0 schema errors; all forms successfully published and linked to their target concept and encounter types in OpenMRS.

### 2.3 Frontend Application Adjustments (`@aiims/esm-demographics-app`)
- **Demographics Module**:
  - `src/demographics/demographics.resource.ts`: Added `marriedForYears` extraction from patient encounter data.
  - `src/demographics/patient-card.component.tsx`: Added Married for Years display row.
- **Infertility Type Module**:
  - `src/infertility-type/infertility-card.component.tsx`: Pruned `marriedForYears` display row.
  - `src/infertility-type/infertility-card.component.test.tsx`: Updated test fixtures and assertions.
- **Previous OVI & IUI Module**:
  - `src/previous-oi-iui/previous-oi-iui-card.component.tsx`: Pruned `previousArtNotes`.
  - `src/previous-oi-iui/previous-oi-iui-card.component.test.tsx`: Updated test assertions.
- **Previous Surgery Module**:
  - `src/config/form-registry.ts` & `src/config/form-uuids.ts`: Updated display title to "Previous Fertility Enhancing Surgery" while preserving route `aiims-previous-surgery`.
  - `src/previous-surgery/previous-surgery-card.component.tsx`: Updated title and field labels.
  - `src/previous-surgery/previous-surgery-card.component.test.tsx` & `previous-surgery.resource.test.ts`: Updated test assertions.
- **Male Hormone & Surgery Module**:
  - `src/male-hormone-surgery/male-hormone-surgery-card.component.tsx`: Updated label fallback to "Testicular Biopsy Findings".
  - `src/male-hormone-surgery/male-hormone-surgery-card.component.test.tsx`: Updated test assertions.
- **Tuberculosis History Module**:
  - `src/tuberculosis-history/tuberculosis-history.resource.ts`: Updated hook to collect both year and month duration observations.
- **Procedure Embryo Transfer Module**:
  - `src/procedure-embryo-transfer/procedure-embryo-transfer-card.component.tsx`: Removed `procedureEmbryoTransferRemarks` row.
  - `src/procedure-embryo-transfer/procedure-embryo-transfer-card.component.test.tsx`: Removed test assertion.
- **Investigation Male Semen Module**:
  - `src/investigation-male-semen/investigation-male-semen.resource.ts`: Removed `investigationMaleSemenRemarks` from interface and parser.
  - `src/investigation-male-semen/investigation-male-semen-card.component.tsx`: Removed Remarks row.
  - `src/investigation-male-semen/investigation-male-semen-card.component.test.tsx`: Updated unit test assertions.
- **Translations (`translations/en.json`)**:
  - Updated `previousSurgery` title/labels.
  - Added full strings for `endometrialCavitySeptateAngle` and `endometrialCavityLengthOfSeptum`.
  - Updated `testicularBiopsy` fallback.

### 2.4 Verification, Automated Testing & Deployment
- `npm run typescript -- --noEmit`: Strict typing passed with 0 errors (`noImplicitAny: true` maintained).
- `npm run test`: Vitest test suite executed across all 39 test files; 102/102 unit tests passed.
- `npm run deploy:local`: All 9 stages passed cleanly:
  1. Docker Pre-flight Check: All containers active.
  2. Clinical Form Schema Verification: Passed (8.75s).
  3. Concept Dictionary Verification: Passed (6.09s).
  4. i18n Translation Health Check: Passed (5.23s).
  5. TypeScript Type Check: Passed (7.72s).
  6. Unit Test Suite (vitest): Passed (75.71s).
  7. Production Build (Rspack): Passed (15.6s).
  8. Hot-Deploy to Docker Container: Updated to version `1.0.99` (2.92s).
  9. Live Endpoint Verification Probe: HTTP 200 OK received from `http://localhost/openmrs/spa/importmap.json`.

---

## 3. Architectural Decisions & Rationale (The "Why")
- **ADR-014 (Route Stability)**: When renaming Form 9 to "Previous Fertility Enhancing Surgery", preserved the URL path `aiims-previous-surgery` and extension slot `aiims-previous-surgery-dashboard-slot` to prevent breaking existing navigation bookmarks and patient chart tab links.
- **Concept Reusability for Duration**: For `att_duration_years` and `att_duration_months`, both dropdowns bind to concept `c0010001-0000-0000-0000-000000000105` which already has distinct answer concept UUIDs for `6M`, `9M`, `1Y`, `2Y`, `3Y`. This avoided registering redundant concept rows in the database.
- **Demographics Single-Sourcing**: Relocating "Married for years" from Infertility Type to Demographics ensures marital timeline data is recorded alongside patient age, spouse name, and contact information without requiring an infertility classification visit encounter.
