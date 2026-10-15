# Daily Engineering Record: 2026-09-28

## 1. Executive Summary
- **Main Goal**: Establish local container runtime permissions, bypass OpenMRS REST encounter query limitations, and implement foundational clinical intake forms (Type of Infertility, Obstetric History, Menstrual History, and Female Factor Infertility).
- **Outcome**: Successfully deployed Forms 2 through 5, registered 45+ new concepts in MariaDB, fixed critical Docker container non-root UID 1001 startup crashes, and resolved silent OpenMRS REST encounter filtering defects.

---

## 2. Completed Tasks & Forms Delivered

### 1. Form 2: Type of Infertility (`aiims-infertility-type`)
- **Commit**: [`8a5c0c5`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_infertility_type.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_infertility_type.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d881`).
- **Concept Modeling**: Primary vs Secondary Infertility classification, duration of marriage (years), and active duration of trying to conceive (years).
- **Frontend Architecture**: Implemented `InfertilityCard` and `InfertilityTypeDashboard`.

### 2. Form 3: Obstetric History (`aiims-obstetric-history`)
- **Commit**: [`4d07134`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_obstetric_history.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_obstetric_history.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d882`).
- **Concept Modeling**: GTPAL metrics: Gravida, Parity, Living Children, Spontaneous Abortions, Induced Abortions, and Ectopic Pregnancies.
- **Frontend Architecture**: Implemented `ObstetricHistoryCard` and `ObstetricHistoryDashboard`.

### 3. Form 4: Menstrual History (`aiims-menstrual-history`)
- **Commits**: [`0ab01fb`](file:///c:/Met4l.DSCode/Projects/open-mrs), [`687bb74`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_menstrual_history.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_menstrual_history.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d883`).
- **Concept Modeling**: Last Menstrual Period (LMP) date, cycle length (days), bleeding duration (days), regularity, dysmenorrhea severity, and SNOMED CT mapped terms.
- **Multi-Level Skip Logic**: Conditionally renders nested sub-questions:
  - *Irregular Cycle* $\rightarrow$ Oligomenorrhea vs Polymenorrhea.
  - *Flow Amenorrhoea* $\rightarrow$ Primary vs Secondary Amenorrhoea.

### 4. Form 5: Female Factor Infertility (`aiims-female-factor`)
- **Commit**: [`d17b616`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_female_factor.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_female_factor.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d884`).
- **Concept Modeling**: 9 question concepts and 36 answer concepts:
  - Tubal Factor: Bilateral/unilateral block, hydrosalpinx, salpingitis.
  - Ovarian Reserve: POSEIDON criteria stratification (Groups 1a, 1b, 2a, 2b, 3, 4).
  - Endometriosis: ASRM Staging (I–IV) and Endometriosis Fertility Index (EFI).
  - PCOS: Rotterdam Phenotypes (A, B, C, D).
  - Uterine Factors: Adenomyosis, fibroids, Asherman's syndrome, congenital anomalies.

---

## 3. Architectural Decision Records (ADRs)

### ADR-001: Client-Side Encounter Filtering & Deterministic Sorting
- **Context**: Querying the OpenMRS REST API with `GET /ws/rest/v1/encounter?patient=...&form=<uuid>` silently ignored the `form` parameter in OpenMRS 3.x core, returning all encounters for that patient. Display hooks extracted observations from whatever encounter happened to be first in the array, showing stale or wrong data.
- **Decision**: Implemented client-side filtering by form UUID in `useFormEncounter` and sorted encounters descending by `encounterDatetime`.
- **Rationale**: Completely shields the microfrontend application from upstream REST API filtering defects, ensuring each dashboard displays the exact observations belonging to its designated clinical form.
- **Rejected Alternatives**:
  - *Alternative A: Waiting for upstream OpenMRS Java backend patch.* Rejected because clinical development deadlines cannot wait for upstream core release cycles.
  - *Alternative B: Querying observations directly via `/obs?encounter=...`.* Rejected because encounter-level metadata (audit dates, encounter providers) is required for clinical records.

### ADR-002: Docker Non-Root UID 1001 Permissions Remediation
- **Context**: The OpenMRS backend container runs under non-root user `openmrs` (UID 1001). Local host file creation during Docker builds or volume mounts created files owned by `root`, causing the container to crash on startup with file permission denied exceptions.
- **Decision**: Enforced explicit file permissions handling in deployment scripts and documented the recovery procedure (`chown -R 1001:root openmrs-data`) in workspace laws.
- **Rationale**: Preserves non-root container security posture while guaranteeing clean container restarts.
- **Rejected Alternatives**:
  - *Alternative A: Running the backend container as `root` (`user: root`).* Rejected because running production containers as root violates healthcare application security compliance.

### ADR-003: Multi-Level Declarative Skip Logic for Complex Gynecological Phenotypes
- **Context**: Female infertility classifications require multi-tiered conditional branching (e.g. PCOS -> Phenotype A-D; DOR -> POSEIDON 1-4). Rendering all options statically overwhelms the clinician.
- **Decision**: Utilized nested AMPATH `hideWhenExpression` logic binding visibility directly to parent answers within declarative JSON schemas.
- **Rationale**: Keeps clinical forms clean and progressive while capturing deep sub-specialty classifications.
- **Rejected Alternatives**:
  - *Alternative A: Storing sub-classifications as free-text remarks.* Rejected because it prevents automated cohort filtering for reproductive clinical trials.

---

## 4. Post-Mortems, Defect Tracking & Root Cause Analysis

### Defect 1: REST Encounter Endpoint Ignoring Form Parameter
- **Root Cause**: Upstream OpenMRS REST Web Services module did not support filtering by form UUID in collection queries without custom search handlers.
- **Resolution**: Filtered encounter collections client-side in `useFormEncounter` by `encounter.form.uuid` (`a7dffb3`).

### Defect 2: Docker Backend Startup Crash on Permission Denied
- **Root Cause**: Host files created in mounted volume had root ownership, preventing the `openmrs` UID 1001 daemon from writing configuration files.
- **Resolution**: Reset ownership via `chown -R 1001:root` and integrated automated permission checks (`a0e2d79`).

---

## 5. Human-in-the-Loop Directives & Review Log
- **Human Directive 1 (POSEIDON Stratification)**: Lead Clinician requested integrating POSEIDON criteria groups (1–4) for Diminished Ovarian Reserve to categorize low prognosis patients accurately.
- **Human Directive 2 (Rotterdam Phenotypes)**: Lead Clinician mandated capturing Rotterdam phenotypes (A, B, C, D) for PCOS to distinguish hyperandrogenic from ovulatory variants.

---

## 6. Daily Reflection & Standup Briefing Notes
1. **Forms 2 through 5 Delivered**: Built Type of Infertility, Obstetric History, Menstrual History, and Female Factor Infertility.
2. **Infrastructure Resilience**: Solved upstream REST encounter query limitations and Docker UID 1001 file ownership crashes.
3. **Multi-Level Clinical Logic**: Successfully deployed nested skip-logic capturing POSEIDON, Rotterdam, and ASRM staging criteria.
