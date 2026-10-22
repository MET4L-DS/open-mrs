# Daily Engineering Record & Decision Journal: 2026-10-22

## 1. Executive Summary & Daily Mission
- **Mission Goal**: Execute Phase 2 and Phase 3 clinical intake and embryology refinements across the AIIMS Reproductive Medicine platform, addressing three clinical and architectural mandates:
  1. **IVF Forms Adjustments (Batch 2 - 8 Forms)**: Reorder *Dose of Drugs* into clinical sequence; prune obsolete *Remarks* across 8 forms; swap maturity grading (*Metaphase I* before *Metaphase II*); decouple sperm preservation from surgical retrieval in *Procedure* (add *TESE* and *Micro TESE*; prune *Ejaculated*, *Frozen*, *Donor Semen*, *Husband Semen*); migrate semen sample types to *Lab Procedure of Insemination*; convert *Grade of Embryos Day 4* from rigid coded dropdown to free-text descriptive input.
  2. **Day 4 Embryo Grade Concept Bug Fix & Historical Migration**: Diagnose and rectify OpenMRS React Form Engine defect where converting concept `c0010001-...-0255` from Coded (`datatype_id=2`) to Text (`datatype_id=3`) caused existing encounters to display the concept UUID in the text input and fail to save updates due to `obs.value_coded` database conflicts.
  3. **Fertilisation Details Refactoring & "Embryos Cleavage Details" (Form 35)**: Prune remarks and extract cleavage progression parameters (Days 2, 3, 5 and Cleavage Rate) out of *Fertilisation Details* into a dedicated new clinical intake form and Single-SPA dashboard (*Embryos Cleavage Details* / Form 35), maintaining historical multi-form fallback in the consolidated IVF Summary dashboard.
  4. **IVF Forms Adjustments (Batch 3 - 6 Forms)**:
     - *Embryo Grading Day 3 (Form 29)*: Simplify field labels by removing redundant `"Embryos (Day 3)"` suffix (`"Grade 1"`, `"Grade 2"`, `"Grade 3"`, `"Grade 4"`).
     - *Embryos Frozen (Form 30)*: Deprecate and prune clinical remarks (`c0010001-...-0279`).
     - *Fresh Embryo Transfer Details (Form 31)*: Deprecate and prune clinical remarks (`c0010001-...-0290`).
     - *Additional Procedures in Assisted Reproductive Technology (Form 32)*: Realize full title expansion from `"Additional Procedures in ART"` to `"Additional Procedures in Assisted Reproductive Technology"` across registry, routing, schemas, cards, and translations.
     - *Post-InVitro Fertilisation Investigation (Form 33)*: Prune answer option `"Inconclusive"` from `"Urine Pregnancy Test (UPT)"` (`c0010001-...-0294`), restricting options to binary `"Positive"` and `"Negative"`.
     - *Examination Infant (Form 34)*: Flatten multi-section layout into a unified single section under ADR-014; convert `"Sex of Baby"` (`c0010001-...-0302`) to Text (`datatype_id=3`), proactively migrating historical MariaDB observation records from `value_coded` to `value_text` under ADR-019.
- **Operational Outcome**:
  - **35 Registered Clinical Forms**: All 35 forms published and verified active in MariaDB via `scripts/validate_forms.py` (0 failures).
  - **370 Active Relational Concepts**: 100% dictionary integrity verified in MariaDB via `scripts/validate_concepts.py` (0 missing).
  - **40 Vitest Test Suites**: 105/105 unit tests passing across all 40 test suites (100% pass rate).
  - **Strict TypeScript Check**: `tsc --noEmit` passing with 0 errors (`noImplicitAny: true` maintained).
  - **i18n Translation Health**: 751 translation keys verified via `audit:i18n` (0 missing keys).
  - **Automated Deployment Pipeline**: Full 9-stage pipeline executed cleanly (125.06s); production bundle `1.0.103` hot-deployed to Docker container and verified via live HTTP 200 OK probe.

---

## 2. Tasks Completed & Deliverables (The "What")

### 2.1 Batch 2 Clinical Form Adjustments (8 Forms)
- **Concept Dictionary & MariaDB Updates**:
  - Created question concept `c0010001-0000-0000-0000-000000000311` (**Semen Sample Type**) as Coded Finding linked to answers *Frozen* (`1014`), *Donor Semen* (`1015`), and *Husband Semen* (`1016`).
  - Created procedure answer concepts `c0010002-0000-0000-0000-000000001165` (**Testicular Sperm Extraction / TESE**) and `c0010002-0000-0000-0000-000000001166` (**Micro TESE / Microsurgical Testicular Sperm Extraction**).
  - Updated concept answers for `c0010001-0000-0000-0000-000000000225` (**Sperm Retrieval Procedure**) to PESA (`1011`), TESA (`1012`), TESE (`1165`), and Micro TESE (`1166`), removing preservation categories.
  - Migrated concept `c0010001-0000-0000-0000-000000000255` (**Grade of Embryos Day 4**) from Coded (`datatype_id=2`) to Text (`datatype_id=3`) in MariaDB.
- **AMPATH Form Schemas Updated (`forms/`)**:
  - `forms/aiims_dose_of_drugs.json`: Reordered into 10-step clinical sequence matching `csv/aiims_03 copy - dose of drugs.csv`; pruned Remarks section.
  - `forms/aiims_adjuvant_drug.json`: Pruned Remarks section.
  - `forms/aiims_trigger_details.json`: Pruned Remarks section.
  - `forms/aiims_ovum_pick_up_details.json`: Reordered maturity grading (Metaphase I before Metaphase II); pruned Remarks section.
  - `forms/aiims_procedure.json`: Pruned Ejaculated, Frozen, Donor Semen, Husband Semen; added TESE and Micro TESE; pruned Remarks section.
  - `forms/aiims_lab_procedure_insemination.json`: Added `semen_sample_type` multi-select checkbox; pruned Remarks section.
  - `forms/aiims_sperm_quality_assessment.json`: Pruned Remarks section.
  - `forms/aiims_embryo_assessment.json`: Updated `grade_embryos_day4` rendering from `select` to `text`; pruned Remarks section.
- **Frontend Observation Cards & Parsers**:
  - Pruned remarks rows and updated data interfaces across all 8 feature modules in `aiims-esm-demographics-app`.

### 2.2 Day 4 Embryo Grade Concept Bug Fix & Historical Obs Migration
- **Root Cause Diagnosis**: When converting concept `c0010001-...-0255` to Text, existing database observations had `value_coded = 4859` (Early Blastocyst). OpenMRS REST API returns `obs.value` as a concept object when `value_coded` is set, causing the Form Engine text input to display the UUID string `c0010002-0000-0000-0000-000000001072`. Furthermore, updating the observation failed because OpenMRS rejected amending an observation with conflicting `value_coded` and `value_text` payloads.
- **Remediation**:
  - Executed MariaDB data migration: copied resolved concept display names to `obs.value_text` and cleared `obs.value_coded = NULL` for all affected observations.
  - Enhanced `scripts/setup_aiims_concepts.py` to automatically migrate legacy `obs.value_coded` to `obs.value_text` whenever a concept is altered to Text (`datatype_id=3`).
  - Probed REST endpoint `GET /openmrs/ws/rest/v1/obs/<uuid>` to verify `"value": "Early Blastocyst"` returns cleanly.

### 2.3 Fertilisation Details Refactoring & "Embryos Cleavage Details" (Form 35)
- **Fertilisation Details (Form 28)**:
  - Pruned `fertilisation_details_remarks` (`0267`).
  - Separated `embryos_cleaved_day2` (`0263`), `cleavage_rate` (`0264`), `embryos_cleaved_day3` (`0265`), and `embryos_cleaved_day5` (`0266`).
  - Streamlined schema `forms/aiims_fertilisation_details.json` and card `FertilisationDetailsCard` to core fertilization metrics (`numberOocytesFertilised`, `fertilisationRate`).
- **Embryos Cleavage Details (Form 35 - New)**:
  - Authored schema `forms/aiims_embryos_cleavage_details.json` (UUID: `37e59734-dac9-4332-ba27-f1053d189095`).
  - Published via `scripts/publish_aiims_form.py`; verified 35/35 forms active in OpenMRS.
  - Scaffolded frontend module in `src/embryos-cleavage-details/`:
    - `embryos-cleavage-details.resource.ts` (typed data extraction via `useFormEncounter`)
    - `embryos-cleavage-details-card.component.tsx` (Carbon `ObservationCard` with `embryos` and `%` units)
    - `embryos-cleavage-details-dashboard.component.tsx` (`FormDashboardShell` wrapper)
    - `embryos-cleavage-details.test.tsx` (3 unit tests)
    - `index.ts` (named exports)
  - Registered in `src/config/form-uuids.ts` and `src/config/form-registry.ts` immediately after `fertilisation-details`.
  - Re-generated routes and named extensions via `npm run generate-routes` (73 total extensions generated in `src/routes.json` and `src/generated-form-extensions.ts`).
  - Updated `src/ivf-summary/ivf-summary-dashboard.component.tsx` to read `cleavageRate` with fallback across Form 35 and Form 28.
  - Added localized strings in `translations/en.json`; `audit:i18n` confirmed 100% health.

### 2.4 Batch 3 Clinical Form Adjustments (6 Forms)
- **Embryo Grading Day 3 (Form 29)**:
  - Removed `"Embryos (Day 3)"` from field labels: `"Grade 1"`, `"Grade 2"`, `"Grade 3"`, `"Grade 4"`.
  - Updated `forms/aiims_embryo_grading_day3.json`, `embryo-grading-day3-card.component.tsx`, `embryo-grading-day3.test.tsx`, and `translations/en.json`.
- **Embryos Frozen (Form 30)**:
  - Pruned `embryos_frozen_remarks` (`0279`) from schema, resource, card, and test suite.
- **Fresh Embryo Transfer Details (Form 31)**:
  - Pruned `fresh_et_remarks` (`0290`) from schema, resource, card, and test suite.
- **Additional Procedures in Assisted Reproductive Technology (Form 32)**:
  - Expanded title across `src/config/form-registry.ts`, auto-generated routes (`src/routes.json`), schema labels, card title, dashboard, test assertions, and translation keys.
- **Post-InVitro Fertilisation Investigation (Form 33)**:
  - Pruned answer option `"Inconclusive"` (`c0010002-...-1138`) from question `"Urine Pregnancy Test (UPT)"` (`c0010001-...-0294`), restricting options to `"Positive"` and `"Negative"`.
  - Deleted `concept_answer` link in MariaDB and updated `scripts/setup_aiims_concepts.py` and `docs/concept_registry.md`.
- **Examination Infant (Form 34)**:
  - Unified `"Neonatal Anthropometry"` and `"Physical Assessment & Vitality"` sections into a single `"Examination Infant"` section.
  - Converted `"Sex of Baby"` (`c0010001-...-0302`) from Coded (`datatype_id=2`) to Text (`datatype_id=3`).
  - Executed proactive MariaDB observation migration: updated `obs_id=6426` (`value_coded=5002` [Male]) to `value_text='Male'` and `value_coded=NULL` to prevent Form Engine UUID display bugs.

---

## 3. Clinical & Technical Analysis

### 3.1 Separation of Clinical Insemination vs. Cleavage Progression
- In routine IVF laboratory workflows, **Fertilization Assessment** is conducted at 16–18 hours post-insemination on Day 1 (evaluating 2PN presence and fertilisation rate).
- **Cleavage Evaluation** occurs serially on Day 2 (cleaved embryos, cleavage rate), Day 3 (cell number/symmetry), and Day 5 (blastocyst cleavage).
- Grouping these separate clinical checkpoints into a single intake sheet created artificial data entry dependencies: embryologists could not complete fertilization reporting on Day 1 without leaving cleavage fields pending.
- Splitting the parameters into **Fertilisation Details** (Day 1) and **Embryos Cleavage Details** (Days 2–5) aligns the OpenMRS forms with the true laboratory chronology.

### 3.2 Operating Theater vs. Insemination Laboratory Boundaries
- Previously, *Sperm Retrieval Procedure* in Form 22 combined theater surgical interventions (PESA, TESA) with embryology laboratory sample preservation (Frozen, Donor Semen, Husband Semen).
- This caused operational confusion between the surgical team (who document the testicular retrieval procedure in theater) and the embryologist (who prepares the frozen or donor semen sample in the IVF lab).
- By adding **TESE** and **Micro TESE** to Form 24 (*Procedure*) and moving **Semen Sample Type** to Form 25 (*Lab Procedure of Insemination*), the software enforces clear operational boundaries between surgical theater and embryology cleanroom.

### 3.3 Diagnostic Boundary: Urine Pregnancy Test (UPT) vs. Quantitative Serum Beta-hCG
- Qualitative UPT dipsticks are binary screening tools designed to detect urinary hCG above a specific threshold (e.g. $25\text{ mIU/mL}$).
- In clinical ART post-transfer monitoring, borderline or ambiguous results are not diagnosed via qualitative UPT ambiguity; they are immediately escalated to quantitative blood assays (Serum Beta-hCG, Form 33 question #2).
- Removing `"Inconclusive"` forces definitive binary recording (`Positive` / `Negative`) while preserving nuanced biochemical pregnancy evaluation in the quantitative numeric field.

### 3.4 Neonatal Sex Identification as Free-Text Variable
- Standard radio dropdowns ("Male", "Female", "Ambiguous") impose rigid categorization on neonatal intake, creating friction when documenting disorders of sex development (DSD), chromosomal intersex conditions, or delayed phenotypic determination in premature neonates.
- Transitioning `"Sex of Baby"` to free text provides clinicians the flexibility to enter standard terms or detailed clinical descriptions without schema constraints.

---

## 4. Architectural Decision Records (ADRs) (The "Why")

### ADR-017: Separation of Surgical Sperm Retrieval from Insemination Sample Source
- **Context**: Form 22 originally listed "PESA", "TESA", "Ejaculated", "Frozen", "Donor Semen", and "Husband Semen" under a single question `sperm_retrieval_procedure`.
- **Decision**: Restrict `sperm_retrieval_procedure` strictly to surgical interventions (adding `TESE` and `Micro TESE`), and create an independent coded multi-select question `semen_sample_type` in Form 25 (*Lab Procedure of Insemination*).
- **Rationale**: Reflects clinical separation between theater surgical retrieval and embryology cleanroom insemination protocol.
- **Rejected Alternatives**:
  - *Keep sample origin in Procedure form*: Rejected because embryologists selecting donor or frozen semen are not performing a surgical sperm retrieval procedure.
  - *Free-text sample notation*: Rejected because donor vs. partner semen and frozen vs. fresh status are critical audit criteria under national ART regulatory guidelines requiring structured data.

### ADR-018: Day 4 Embryo Morphology Free-Text Migration
- **Context**: Day 4 embryo grading was restricted to a coded single-select dropdown (Morula, Compacted Morula, Early Blastocyst, Arrest).
- **Decision**: Migrate concept `c0010001-...-0255` from Coded (`datatype_id=2`) to Text (`datatype_id=3`) across MariaDB, schema, and UI.
- **Rationale**: Embryo development at 96 hours post-insemination exhibits high morphological variability (e.g., partial compaction, delayed cavitation, cellular exclusion) that clinical embryologists describe via alphanumeric and free-text notations rather than static enums.
- **Rejected Alternatives**:
  - *Add more coded answer concepts*: Rejected because Istanbul consensus criteria for Day 4 are less standardized than Gardner blastocyst grading, leading to concept explosion.

### ADR-019: Proactive Historical Observation Migration on Datatype Conversion
- **Context**: When a concept is altered in MariaDB from Coded (`datatype_id=2`) to Text (`datatype_id=3`), historical rows in the `obs` table retain `value_coded` concept IDs. OpenMRS REST endpoints serialize `obs.value` as concept objects, causing React Form Engine text inputs to display UUIDs and fail on save.
- **Decision**: Always execute automated MariaDB migrations copying concept display names into `obs.value_text` and nullifying `obs.value_coded` whenever a concept is converted to Text (`datatype_id=3`).
- **Rationale**: Guarantees zero runtime regressions or UUID leakage in Form Engine inputs when modifying established concept schemas.
- **Rejected Alternatives**:
  - *Manual database patching*: Rejected as error-prone across multi-developer environments. Automated migration in `setup_aiims_concepts.py` ensures self-healing builds.

### ADR-020: Independent "Embryos Cleavage Details" Microfrontend Form
- **Context**: Fertilisation Details contained both Day 1 fertilization rates and Day 2–5 cleavage parameters.
- **Decision**: Extract Day 2, Day 3, and Day 5 cleavage parameters into a distinct clinical form and Single-SPA dashboard: `Embryos Cleavage Details` (`aiims-embryos-cleavage-details` / Form 35).
- **Rationale**: Mirrors the multi-day progression of the embryology laboratory workflow without requiring premature completion of downstream fields on Day 1.
- **Rejected Alternatives**:
  - *Keep in Fertilisation Details with a sub-section*: Rejected because user explicitly directed separation into an independent form to match paper record sheets.

### ADR-021: Neonatal Sex Identification as Free-Text Variable
- **Context**: Form 34 restricted neonatal sex to a radio dropdown (Male, Female, Ambiguous).
- **Decision**: Convert concept `c0010001-...-0302` to Text (`datatype_id=3`) and render as a free-text input.
- **Rationale**: Accommodates clinical nuances, intersex diagnoses, and regional terminological variations without rigid schema boundaries.
- **Rejected Alternatives**:
  - *Add extensive DSD/Intersex coded options*: Rejected as premature over-modeling for a high-level intake sheet.

### ADR-022: UPT Binary Diagnostic Categorization
- **Context**: Form 33 included `"Inconclusive"` as a radio option for Urine Pregnancy Test.
- **Decision**: Prune `"Inconclusive"`, restricting UPT to `"Positive"` and `"Negative"`.
- **Rationale**: Qualitative dipstick ambiguity is resolved via quantitative Serum Beta-hCG testing; recording inconclusive dipstick readings introduces diagnostic ambiguity into ART clinical registers.
- **Rejected Alternatives**:
  - *Keep Inconclusive with conditional note*: Rejected because quantitative serum testing is standard clinical protocol for indeterminate cases.

### ADR-023: Full Title Realignment for Assisted Reproductive Technology
- **Context**: Form 32 was registered and titled with the abbreviation `"Additional Procedures in ART"`.
- **Decision**: Fully expand the title to `"Additional Procedures in Assisted Reproductive Technology"` across form registry, routing, schemas, and UI components.
- **Rationale**: Conforms to institutional documentation standards and eliminates ambiguous acronyms in official medical chart exports.
- **Rejected Alternatives**:
  - *Keep abbreviated title in sidebar navigation*: Rejected for inconsistency between sidebar links and chart page headers.

---

## 5. Human-in-the-Loop (HITL) Directives & Gatekeeping
- **Clinical Sequencing Directives**: Mandated reordering *Dose of Drugs* to strictly match `csv/aiims_03 copy - dose of drugs.csv` and swapping OPU maturity grading to *Metaphase I* before *Metaphase II*.
- **Surgical Accuracy Enforcement**: Directed the removal of non-surgical semen origins from *Procedure* and explicit modeling of *TESE* and *Micro TESE*.
- **Form Decoupling Mandate**: Directed the separation of cleavage stage parameters into an independent *Embryos Cleavage Details* form.
- **Field Simplification & Remarks Removal**: Directed the removal of `"Embryos (Day 3)"` from Day 3 grades, deprecation of remarks across multiple forms, title expansion of ART procedures, pruning of UPT inconclusive option, section flattening in infant examination, and conversion of infant sex to free text.
- **Runtime Defect Reporting**: Provided visual bug capture showing the concept UUID leak on Day 4 embryo grading, guiding immediate investigation and database remediation.

---

## 6. Daily Reflection & PI Briefing Notes

### Key Technical Learnings
1. **OpenMRS Concept Datatype Migration Traps**: Altering a concept's `datatype_id` in the `concept` table from Coded (2) to Text (3) does not automatically clean existing rows in the `obs` table. Proactive database cleanup logic is essential to prevent UUID serialization bugs in the React Form Engine.
2. **Resilient Cross-Form Derivation**: When migrating fields between forms, dashboards that aggregate cross-form data (such as `ivf-summary`) must implement multi-form fallback queries (`getFormObs(FormNew, Concept) || getFormObs(FormOld, Concept)`) to ensure historical patient records continue displaying seamlessly.

### Clinical Value Delivered
- **Laboratory Workflow Efficiency**: Embryologists can now record Day 1 fertilisation without carrying unentered cleavage fields, and theater surgeons have a clean *Procedure* sheet restricted solely to surgical retrieval interventions.
- **Information Density & Chart Clarity**: Pruned redundant remarks across 11 forms, expanded official ART nomenclature, and streamlined Day 3 alphanumeric embryo grading to compact "Grade 1–4" cards.
- **Regulatory Compliance**: Structured capture of *Semen Sample Type* (Frozen, Donor Semen, Husband Semen) in the insemination record provides automated compliance reporting for national ART registries.

### 3 Concise Standup Talking Points for the Principal Investigator (PI)
1. **Clinical Decoupling & Modularization Completed**: Successfully refactored *Fertilisation Details* and launched *Embryos Cleavage Details* (Form 35), aligning OpenMRS 1:1 with the multi-day embryology lab timeline.
2. **Surgical Precision & Laboratory Refinements**: Added dedicated *TESE* and *Micro TESE* options, expanded ART procedure titles, standardized Day 3 embryo grades to "Grade 1–4", and pruned obsolete remarks across 11 forms.
3. **Flawless Quality Gate Status**: 35/35 forms verified active in backend, 370 concepts validated, 105 unit tests passing, 0 TypeScript errors, 100% translation health, and production bundle `1.0.103` hot-deployed live.
