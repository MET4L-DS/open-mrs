# Daily Engineering Record: 2026-09-28

## 1. Executive Summary
- **Main Goal**: Configure Docker stack stability, solve OpenMRS REST encounter query limitations, and deliver baseline clinical intake forms 2 through 5.
- **Outcome**: Established robust client-side encounter filtering, registered 45+ new concepts in MariaDB, fixed critical Docker user permissions, and successfully delivered Forms 2, 3, 4 (with multi-level skip logic), and 5.

---

## 2. Completed Tasks & Forms Delivered

1. **Form 2: Type of Infertility (`aiims-infertility-type`)**
   - **Commit**: `8a5c0c5` (2026-09-28 11:13:45 +0530)
   - **Schema**: `forms/aiims_infertility_type.json` (UUID: `80930653-7e80-4bfd-9e29-ec37c334d881`)
   - **Features**: Diagnostic distinction between Primary and Secondary Infertility, duration of marriage (years), and duration of active trying (years).
   - **Components**: `InfertilityCard`, `InfertilityTypeDashboard`, and unit tests.

2. **Form 3: Obstetric History (`aiims-obstetric-history`)**
   - **Commit**: `4d07134` (2026-09-28 11:37:29 +0530)
   - **Schema**: `forms/aiims_obstetric_history.json` (UUID: `80930653-7e80-4bfd-9e29-ec37c334d882`)
   - **Features**: Gravida, Parity, Living children, Abortions, and Ectopic pregnancies.
   - **Components**: `ObstetricHistoryCard`, `ObstetricHistoryDashboard`, and full test suite.

3. **Form 4: Menstrual History (`aiims-menstrual-history`)**
   - **Commits**: `0ab01fb` (2026-09-28 11:57:17 +0530), `687bb74` (2026-09-28 12:15:50 +0530)
   - **Schema**: `forms/aiims_menstrual_history.json` (UUID: `80930653-7e80-4bfd-9e29-ec37c334d883`)
   - **Features**: LMP date, cycle regularity, and menstrual flow characteristics with SNOMED CT mappings.
   - **Multi-Level Skip Logic**: Conditionally renders nested sub-questions using AMPATH `hideWhenExpression`:
     - *Irregular Cycle* $\rightarrow$ Oligomenorrhea vs. Polymenorrhea.
     - *Flow Amenorrhoea* $\rightarrow$ Primary vs. Secondary Amenorrhoea.

4. **Form 5: Female Factor Infertility (`aiims-female-factor`)**
   - **Commit**: `d17b616` (2026-09-28 12:34:58 +0530)
   - **Schema**: `forms/aiims_female_factor.json` (UUID: `80930653-7e80-4bfd-9e29-ec37c334d884`)
   - **Features**: 9 question concepts and 36 answer concepts registered in MariaDB.
   - **Complex Skip Logic**:
     - *Tubal Factor*: Unilateral/bilateral block, hydrosalpinx, hematosalpinx, ectopic.
     - *Diminished Ovarian Reserve*: POSEIDON groups (1a, 1b, 2a, 2b, 3, 4).
     - *Endometriosis*: ASRM staging and Endometriosis Fertility Index (EFI).
     - *PCOS*: Rotterdam diagnostic phenotypes (A, B, C, D).
     - *Uterine Factors*: Adenomyosis, fibroids, polyps, Asherman's syndrome, septate/unicornuate uterus.
     - Other etiologies and free-text clinical notes.

---

## 3. Post-Mortem & Bug Resolutions

1. **OpenMRS REST API Encounter Query Limitations**
   - **Commit**: `a7dffb3` (2026-09-28 00:49:30 +0530)
   - **Issue**: `/ws/rest/v1/encounter?patient=...&form=...` silently ignored the `form` parameter, returning all patient encounters and resulting in arbitrary form observations being overwritten or displaying stale data.
   - **Fix**: Implemented client-side filtering by form UUID and deterministic descending sorting by `encounterDatetime` in `useFormEncounter`.
   - **Workspace Contract**: Fixed flat `workspaceProps` parameter passing required by OpenMRS `patient-form-entry-workspace`.

2. **Docker Volume UID 1001 File Ownership**
   - **Commit**: `a0e2d79` (2026-09-28 10:36:21 +0530)
   - **Issue**: Root-owned files created during local build tasks in `openmrs-data` volume caused the OpenMRS backend container to fail on startup with permissions errors.
   - **Fix**: Documented and applied volume permission remediation (`chown -R 1001:root`) in `PROJECT_MEMORY.md`.

---

## 4. Architectural & Tooling Enhancements
- **Auto-Versioned Deployments**: Enhanced `scripts/deploy_demographics.py` with timestamped bundle versioning to bust stale browser Single-SPA microfrontend caches during active development.
- **Form Publisher Script (`scripts/publish_aiims_form.py`)**: Automated creation and publishing of AMPATH form schemas into OpenMRS MySQL/MariaDB database.

---

## 5. Quality & Health Metrics
- **Forms Published**: 5 forms (Demographics, Infertility Type, Obstetric History, Menstrual History, Female Factor)
- **Concept Dictionary**: Over 60 concepts registered and mapped in MariaDB
- **Test Suite**: Unit test suites added for all cards (`infertility-card`, `obstetric-history-card`, `menstrual-history-card`, `female-factor-card`)
- **Git Commits**: 7 commits executed
