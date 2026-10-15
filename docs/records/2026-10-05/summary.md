# Daily Engineering Record: 2026-10-05

## 1. Executive Summary
- **Main Goal**: Implement clinical intake modules for medical background (Past Medical, Family, Tuberculosis History), pelvic ultrasound diagnostic investigation, engineer a sticky Patient Demographics Summary Widget in the patient chart header, and resolve backend HTTP 400 errors on optional numeric fields.
- **Outcome**: Successfully deployed 4 new clinical forms (Forms 10, 11, 12, 13), integrated the header summary widget in `patient-info-slot`, resolved SPA route navigation bugs, and hardened numeric observation validation against blank submissions.

---

## 2. Completed Tasks & Forms Delivered

### 1. Form 10: Past Medical History (`aiims-past-medical-history`)
- **Commit**: [`0506641`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_past_medical_history.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_past_medical_history.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d889`).
- **Concept Modeling**: Modeled chronic medical comorbidities: Hypertension, Diabetes Mellitus (Type 1 / Type 2 / GDM), Thyroid Disorders (Hypo/Hyperthyroidism), Bronchial Asthma, Epilepsy, and Cardiac Disease.
- **Frontend Architecture**: Implemented `PastMedicalHistoryCard` highlighting active systemic conditions.

### 2. Form 11: Family History (`aiims-family-history`)
- **Commit**: [`22ff195`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_family_history.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_family_history.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d88a`).
- **Concept Modeling**: Modeled hereditary and genetic predispositions: Familial Diabetes, Hypertension, Congenital Anomalies, Multiple Gestations (Twins), Premature Ovarian Insufficiency, and Hereditary Cancers.
- **Frontend Architecture**: Implemented `FamilyHistoryCard` providing multi-generational risk summaries.

### 3. Form 12: Tuberculosis History (`aiims-tuberculosis-history`)
- **Commit**: [`c547f6b`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_tuberculosis_history.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_tuberculosis_history.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d88b`).
- **Concept Modeling**: Captured past exposure and active infection: Site of Infection (Pulmonary, Extrapulmonary, Genital, Abdominal), Year of Diagnosis, Anti-Tubercular Therapy (ATT) Category, Duration (months), and Completion Status.
- **Frontend Architecture**: Implemented `TuberculosisHistoryCard` with prominent clinical treatment flags.

### 4. Form 13: Investigation Ultrasound (`aiims-investigation-ultrasound`)
- **Commit**: [`63f0e37`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_investigation_ultrasound.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_investigation_ultrasound.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d88c`).
- **Concept Modeling**: Pelvic baseline ultrasound parameters: Uterine length, width, AP diameter (mm), Endometrial Thickness (mm), Right and Left Antral Follicle Count (AFC), Ovarian Volumes (mL), and Presence of Fibroids, Endometriomas, or Hydrosalpinx.
- **Frontend Architecture**: Implemented `InvestigationUltrasoundCard` with follicular reserve summaries.

### 5. Sticky Patient Demographics Summary Widget
- **Commits**: [`49d0975`](file:///c:/Met4l.DSCode/Projects/open-mrs), [`5712edf`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Extension Slot**: `patient-info-slot` (top patient chart banner).
- **Features**: Displays persistent couple demographics: Wife's Age, Husband's Name & Age, Attending Consultant, Unit/Clinic, and Socioeconomic Status (Modified Kuppuswamy Scale).
- **Navigation**: Clickable link navigating cleanly into full demographics intake without losing patient UUID context.

---

## 3. Architectural Decision Records (ADRs)

### ADR-001: Sticky Header Demographics Summary Widget in `patient-info-slot`
- **Context**: In OpenMRS 3.x, patient demographic details (such as partner's name, age, clinic unit, and socioeconomic status) are buried inside the Demographics form tab. Clinicians had to constantly switch tabs to review basic couple information.
- **Decision**: Developed `DemographicsSummaryWidget` and mounted it into the global `patient-info-slot` at the top of every patient chart.
- **Rationale**: Keeps couple baseline facts immediately visible across all 30+ form tabs, eliminating repetitive navigation clicks.
- **Rejected Alternatives**:
  - *Alternative A: Duplicating partner information at the top of every observation card.* Rejected because repeating the same UI code across 30+ components creates severe maintenance debt.
  - *Alternative B: Relying on core OpenMRS patient header.* Rejected because core OpenMRS header only displays individual patient details, not couple/partner demographics or IVF clinic unit numbers.

### ADR-002: Optional Numeric Concept Handling (Empty String vs Zero Sanitization)
- **Context**: When submitting forms where numeric fields were left blank by the user (e.g. `husband_bmi`, `oi_year`, `iui_year`), the OpenMRS REST API returned `HTTP 400 Bad Request` because `concept_numeric` constraints rejected 0 or empty string representations.
- **Decision**: Sanitized payload generation to completely omit keys with empty strings or null values rather than passing `""` or `0`. Adjusted schema `failsWhenExpression` bounds to ensure optional fields only validate when a value is populated.
- **Rationale**: Prevents form submission crashes while preserving strict numeric validation bounds when data is actually entered.
- **Rejected Alternatives**:
  - *Alternative A: Converting empty values to 0 before submission.* Rejected because a BMI or Year of 0 is medically invalid and corrupts clinical data analysis.
  - *Alternative B: Making all numeric fields mandatory.* Rejected because patients often do not remember the exact calendar year of historical procedures.

### ADR-003: Core Translation Polyfills for Missing Upstream Labels
- **Context**: OpenMRS 3.x core packages threw repetitive console warnings for unlocalized labels like 'Telephone Number'.
- **Decision**: Added localization fallback polyfills to `translations/en.json` and created `scripts/patch_translations.py` to patch upstream translation bundles inside the Docker container.
- **Rationale**: Cleans up the browser developer console, making legitimate frontend errors immediately identifiable.
- **Rejected Alternatives**:
  - *Alternative A: Ignoring console warnings.* Rejected because noisy console logs hide real JavaScript exceptions during development.

---

## 4. Post-Mortems, Defect Tracking & Root Cause Analysis

### Defect 1: HTTP 400 Validation Errors on Optional Numeric Fields
- **Root Cause**: Submitting empty optional fields passed empty strings `""` to OpenMRS numeric concept endpoints, which failed Java parser validation.
- **Resolution**: Removed hardcoded min/max boundaries from schemas for optional historical years, guarded `failsWhenExpression`, and filtered empty values prior to REST submission (`0343435`).

### Defect 2: Demographics Summary Widget Navigation to Blank Route
- **Root Cause**: Clicking the patient details link navigated to `#aiims-demographics` at root, failing to include `patientUuid` in the Single-SPA route path.
- **Resolution**: Constructed deep links using `spaBase` and current patient UUID with regex fallbacks (`5712edf`).

---

## 5. Human-in-the-Loop Directives & Review Log
- **Human Directive 1 (Summary Widget Scope)**: Lead Clinician requested that partner name and age must be persistently visible regardless of which form is open.
- **Human Directive 2 (TB Treatment Completeness)**: Lead Clinician mandated capturing ATT duration and completion status to detect multidrug-resistant or incomplete therapy histories.

---

## 6. Daily Reflection & Standup Briefing Notes
1. **Forms 10 through 13 Live**: Delivered Past Medical, Family History, Tuberculosis History, and Pelvic Ultrasound.
2. **Persistent Couple Context**: Launched the sticky Demographics Summary Widget in `patient-info-slot`, putting partner and clinic metadata permanently in view.
3. **Form Engine Stability**: Resolved HTTP 400 crashes on blank optional numeric inputs, establishing clean payload sanitization across all forms.
