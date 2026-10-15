# Daily Engineering Record: 2026-10-14

## 1. Executive Summary
- **Main Goal**: Implement clinical intake Forms 27 through 32 covering the complete embryology laboratory and procedure pipeline (embryo assessment, fertilization details, Veeck Day 3 cleavage grading, vitrification/freezing, fresh embryo transfer, and adjuvant ART procedures), resolve form engine runtime errors (404 and 500 NPEs), and construct an automated 9-stage quality deployment pipeline.
- **Outcome**: 100% operational. Delivered 6 new clinical forms (Forms 27, 28, 29, 30, 31, 32), added Patient/Wife BMI to demographics, hardened OpenMRS MariaDB relational concept integrity, and established the 9-stage zero-downtime deployment pipeline with automated E2E smoke robot verification.

---

## 2. Completed Tasks & Forms Delivered

### Form 27: Assessment of Fertilization, Embryo & Blastocyst (`aiims-embryo-assessment`)
- **Commits**: [`14adabb`](file:///c:/Met4l.DSCode/Projects/open-mrs) (initial scaffolding & lifecycle), [`38a0968`](file:///c:/Met4l.DSCode/Projects/open-mrs) (standardized Gardner grading dropdowns).
- **Clinical Artifact**: [`forms/aiims_embryo_assessment.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_embryo_assessment.json) (UUID: `37e59734-dac9-4332-ba27-f1053d189089`).
- **Concept Modeling**: Registered 13 question concepts (`c0010001-...0248` to `0260`) and 57 coded answer concepts (`c0010002-...1050` to `1106`) across Cleavage (2PN to 10-12Cells), Morula (Morula, Compacted, Arrest), and Blastocyst Gardner Scale (`1AA`–`6CC`).
- **Frontend Architecture**: Implemented `EmbryoAssessmentCard` with 3 clinical sections (Cleavage Days 1–3, Blastocyst Days 4–6, Remarks) and localized dropdown rendering.
- **Verification**: Verified via `POST /openmrs/ws/rest/v1/encounter` (HTTP 201 Created) and headless smoke test robot.

### Demographics Enhancement: Patient (Wife) Body Mass Index (BMI)
- **Commit**: [`b1ade33`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Concept Registration**: Registered numeric concept `c0010001-0000-0000-0000-000000000012` (`Patient Body Mass Index`) with `concept_numeric` (`units='kg/m2'`, `allow_decimal=1`, `low_absolute=5`, `hi_absolute=90`).
- **AMPATH Schema Update**: Updated `forms/aiims_personal_information.json` with numeric validator (10.0–60.0 kg/m²).
- **Frontend UI**: Integrated into `PatientCard` and `DemographicsSummaryWidget`, localized in `translations/en.json`, hot-deployed in bundle `1.0.72`.

### Form 28: Fertilisation Details (`aiims-fertilisation-details`)
- **Commit**: [`69be43a`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_fertilisation_details.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_fertilisation_details.json) (UUID: `37e59734-dac9-4332-ba27-f1053d189090`).
- **Concept Modeling**: Registered 7 concepts in MariaDB (`c0010001-...0261` through `0267`), including 6 numeric concepts with full `concept_numeric` parameters (Oocytes Fertilised, Fertilisation Rate %, Embryos Cleaved Day 2, Cleavage Rate %, Embryos Cleaved Day 3, Embryos Cleaved Day 5).
- **Frontend Architecture**: Scaffolded `src/fertilisation-details/` via CLI, typed resource hook, Carbon `ObservationCard`, 3 Vitest tests passing. Hot-deployed in bundle `1.0.74`.

### Form 29: Embryo Grading Day 3 (`aiims-embryo-grading-day3`)
- **Commits**: [`476f65c`](file:///c:/Met4l.DSCode/Projects/open-mrs) (implementation), [`2f25ec6`](file:///c:/Met4l.DSCode/Projects/open-mrs) (refactor to alphanumeric freetext).
- **Clinical Specification**: [`csv/aiims_ivf_04 copy - embryo_grading_day3.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20embryo_grading_day3.csv) (Veeck / Istanbul Consensus Day 3 Cleavage Embryo Grading).
- **Concept Modeling**: Registered 5 concepts (`c0010001-...0268` through `0272`): 4 alphanumeric freetext concepts for Grade 1–4 embryo notations and 1 Day 3 remarks concept.
- **Frontend Architecture**: Scaffolded `src/embryo-grading-day3/`, typed resource hook, Carbon card, 4 Vitest unit tests passing. Hot-deployed in bundle `1.0.79`.

### Form 30: Embryos Frozen (`aiims-embryos-frozen`)
- **Commit**: [`0f0cb19`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Specification**: [`csv/aiims_ivf_04 copy - embryo frozen.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20embryo%20frozen.csv).
- **Concept Modeling**: Registered 7 concepts (`c0010001-...0273` through `0279`): 2 numeric concepts with `concept_numeric` (`units='embryos'`, range 0–100), 4 text concepts for Grade A/B/C Day 3 and Day 5 vitrified straws, and 1 remarks concept.
- **Frontend Architecture**: Scaffolded `src/embryos-frozen/`, typed resource hook, Carbon card, 4 Vitest unit tests. Hot-deployed in bundle `1.0.80`.

### Form 31: Fresh Embryo Transfer Details (`aiims-fresh-et-details`)
- **Commit**: [`63c5816`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Specification**: [`csv/aiims_ivf_04 copy - freshET_details.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20freshET_details.csv).
- **Concept Modeling**: Registered 11 question concepts (`c0010001-...0280` through `0290`) and 25 coded answer concepts (`c0010002-...1107` through `1131`), including transfer cancellation etiologies, catheter blood check, and endometrial thickness numeric parameters.
- **Frontend Architecture**: Scaffolded `src/fresh-et-details/`, implemented reactive conditional skip-logic, 4 unit tests passing. Hot-deployed in bundle `1.0.81`.

### Form 32: Additional Procedures in ART (`aiims-add-procedure-art`)
- **Commit**: [`eac50a8`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Specification**: [`csv/aiims_ivf_04 copy - add_procedure_art.csv`](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20add_procedure_art.csv).
- **Concept Modeling**: Registered 3 question concepts (`c0010001-...0291` through `0293`) and 4 answer concepts (`c0010002-...1132` through `1135`) for PRP, Endometrial Injury, G-CSF, and Embryo Glue.
- **Frontend Architecture**: Scaffolded `src/add-procedure-art/`, multi-select observation array extraction via `getObsValues`, 3 unit tests. Hot-deployed in bundle `1.0.82`.

---

## 3. Architectural Decision Records (ADRs)

### ADR-001: Self-Healing MariaDB Concept Migration vs Manual SQL Patching
- **Context**: OpenMRS throws unhandled HTTP 500 NullPointerExceptions during encounter submission (`ConceptNumeric.getAllowDecimal()`) if any concept with `datatype_id = 1` lacks a corresponding row in the relational `concept_numeric` table.
- **Decision**: Implemented automated self-healing SQL migrations inside `scripts/setup_aiims_concepts.py` and `scripts/validate_concepts.py` using `INSERT INTO concept_numeric ... WHERE NOT EXISTS`. Added `scripts/validate_forms.py` as a mandatory pre-build deployment gate.
- **Rationale**: Manual database patching is error-prone, fragile across container rebuilds, and fails to protect future form authoring. Automated validation prevents malformed forms or concepts from ever reaching production.
- **Rejected Alternatives**:
  - *Alternative A: Ad-hoc manual SQL scripts run through phpMyAdmin/CLI.* Rejected because manual execution cannot be enforced in CI/CD and causes developer environment drift.
  - *Alternative B: Alter OpenMRS Core Java `ObsValidator` to treat missing `concept_numeric` as non-decimal.* Rejected because forking upstream OpenMRS core is unmaintainable and violates modular microfrontend architecture.

### ADR-002: Hardcoded Module Extension Order (`order: 1`) vs Dynamic Order Calculation
- **Context**: In OpenMRS 3.x, `patient-chart-dashboard-slot` aggregates extensions across all installed microfrontends. Dynamic calculation (`maxOrder + 1`) resulted in AIIMS IVF forms getting assigned `order: 2`, `order: 3`, etc., causing core OpenMRS chart links (Vitals at order 2, Medications at order 3) to be interleaved directly between IVF clinical sequence forms.
- **Decision**: Enforce `order: 1` uniformly for all AIIMS clinical intake form dashboard extensions in `src/config/form-registry.ts` and lock `order: 1` generation in `scripts/create-form.ts`.
- **Rationale**: Setting `order: 1` groups all AIIMS forms contiguously before core OpenMRS clinical dashboards, maintaining uninterrupted clinical chronological progression.
- **Rejected Alternatives**:
  - *Alternative A: Dynamically computing `order: maxOrder + 1`.* Rejected because core OpenMRS extensions occupy lower integer slots, interleaving core links with specialty forms.
  - *Alternative B: Using large offset integers (e.g., `order: 1000 + i`).* Rejected because core extensions could be reconfigured in the future and large offsets make extension priority unpredictable.

### ADR-003: Question-Level vs Section-Level Skip Logic (`hideWhenExpression`)
- **Context**: When authoring `forms/aiims_fresh_et_details.json`, placing `hideWhenExpression` on parent `<section>` containers failed to trigger visibility changes when a user transitioned radio buttons from initial `null` (unselected) state to a selected value on first click in `@openmrs/esm-form-engine-lib`.
- **Decision**: Bind `hideWhenExpression` directly to individual questions within the section (`!fresh_embryo_transfer || fresh_embryo_transfer !== '...'`) rather than toggling the parent section container.
- **Rationale**: Question-level expressions reliably re-evaluate across initial null-to-value state changes and do not rely on buggy section-level visibility observers in the form engine.
- **Rejected Alternatives**:
  - *Alternative A: Wrapping conditional fields in separate form pages.* Rejected because multi-page navigation creates severe cognitive friction for clinicians completing rapid intake.
  - *Alternative B: Writing custom JavaScript event handlers in the microfrontend.* Rejected because AMPATH forms must remain declarative and portable across OpenMRS instances.

### ADR-004: 9-Stage Zero-Downtime Deployment Pipeline Armor
- **Context**: High-velocity clinical delivery caused subtle regression risks (missing translation keys leading to blank labels, uncompiled TypeScript types, unverified concept UUIDs).
- **Decision**: Orchestrated `scripts/deploy_pipeline.py` with 9 sequential quality gates: Docker Pre-flight -> Form Schema Validation -> Concept Dictionary Check -> i18n Translation Audit -> TypeScript Typecheck -> Vitest Unit Suite -> Route Generation -> Rspack Production Build -> Live HTTP Probe & E2E Smoke Test.
- **Rationale**: Creates an impenetrable quality gate ensuring zero white screens, zero runtime 404s, and zero database constraint violations.
- **Rejected Alternatives**:
  - *Alternative A: Standard manual `npm run build && docker cp`.* Rejected because developers frequently skip verification steps under release pressure.
  - *Alternative B: Relying solely on git pre-commit hooks.* Rejected because heavy integration checks (Docker, MariaDB, Playwright) slow down local git commits excessively.

---

## 4. Post-Mortems, Defect Tracking & Root Cause Analysis

### Defect 1: 404 Not Found on `/openmrs/ws/rest/v1/o3/forms/<uuid>`
- **Root Cause**: The frontend card and route were scaffolded, but the backend AMPATH form schema had not yet been published to MariaDB (`clob_datatype_storage`).
- **Resolution**: Created `forms/aiims_embryo_assessment.json`, updated `scripts/publish_aiims_form.py`, published definition (`37e59734-dac9-4332-ba27-f1053d189089`). Added `scripts/validate_forms.py` as mandatory pipeline stage.

### Defect 2: 500 Internal Server Error (`NullPointerException: ConceptNumeric.getAllowDecimal()`)
- **Root Cause**: 6 numeric Day 1–6 embryo count concepts had `datatype_id = 1` in `concept`, but lacked rows in `concept_numeric`. When submitting numeric values, OpenMRS `ObsValidator` invoked `ConceptNumeric.getAllowDecimal()`, throwing NPE.
- **Resolution**: Inserted missing `concept_numeric` records (`allow_decimal=0`, `low_absolute=0`, `hi_absolute=100`) and upgraded `scripts/validate_concepts.py` to assert relational completeness.

### Defect 3: Interleaved Sidebar Navigation Links
- **Root Cause**: `create-form.ts` computed `order = maxOrder + 1`, assigning `order: 2` and `3`. Core OpenMRS modules registered Vitals at `order: 2` and Medications at `order: 3`, interspersing core links among IVF forms.
- **Resolution**: Normalized all AIIMS clinical forms to `order: 1` in `src/config/form-registry.ts` and locked `order: 1` in `create-form.ts`.

### Defect 4: Initial Radio Transition from Null Failing to Render Conditional Section
- **Root Cause**: Section-level `hideWhenExpression` did not re-evaluate on null-to-active transition in `@openmrs/esm-form-engine-lib`.
- **Resolution**: Migrated skip-logic expressions down to question-level. Added rule to `ampath-form-schema-guide/SKILL.md`.

---

## 5. Human-in-the-Loop Directives & Review Log
- **Human Directive 1 (Form 29 Field Types)**: Lead Engineer reviewed initial Form 29 concept modeling and directed converting Grade 1–4 embryo descriptions from strict numbers to alphanumeric freetext (`2f25ec6`) to accommodate embryology notations like `4Cell-G1` or `8C-Grade2`.
- **Human Directive 2 (Form 27 Gardner Scale)**: Lead Engineer mandated replacing free-text fields in Form 27 with comprehensive standardized dropdowns (`38a0968`) containing the full Istanbul/Gardner classification scale (`1AA`–`6CC`, `Morula`, `Arrest`).
- **Human Directive 3 (Pipeline Gate Enforcement)**: Lead Engineer mandated that the automated deployment pipeline must abort immediately if any i18n translation key is missing or any concept lacks numeric parameters.

---

## 6. Daily Reflection & Standup Briefing Notes
1. **Forms 27 through 32 Delivered End-to-End**: Completely finished the core IVF laboratory and surgical journey (embryo assessment, fertilization details, Veeck cleavage grading, cryopreservation, embryo transfer, and adjuvant procedures).
2. **Platform Resiliency Armor Complete**: Established the 9-stage zero-downtime deployment pipeline and interactive Playwright smoke test robot, eliminating human deployment errors.
3. **Database Integrity Enforced**: Resolved the relational `concept_numeric` NPE defect permanently with automated self-healing migrations and deep schema validation.
