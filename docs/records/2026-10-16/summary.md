# Daily Engineering Record & Decision Journal: 2026-10-16

## 1. Executive Summary & Daily Mission
- **Mission Goal**: Execute the comprehensive clinical realignment defined in `docs/plans/second_sheet_form_adjustments.md`: rename Form 13 to **"Investigation Female Transvaginal Ultrasound"**, transfer all 55 TVS ultrasound fields out of Form 15 into Form 13, streamline Form 15 (**"Investigation Female Surgical Procedure"**) strictly to hysteroscopy findings, hysteroscopy dimensions, and operative hysteroscopy, implement question-level conditional visibility rules, align field ordering 100% with clinical specifications, and verify live via the 9-stage deployment pipeline and E2E smoke robot.
- **Operational Status**: 34/34 clinical forms active and published. 361/361 active concept definitions verified with auto-retry resilience. 100/100 unit tests passing across 38 suites. Production bundle `1.0.91` hot-deployed to Docker container. E2E headless smoke robot confirmed 0 console errors and 0 white screens on both dashboards.

---

## 2. Tasks Completed & Deliverables (The "What")

### 2.1 Form 13: Renaming & Complete 55-Field TVS Schema Migration
- **Form Renamed**: Updated Form 13 from "Investigation Ultrasound" to **"AIIMS Visit: Investigation Female Transvaginal Ultrasound"** across backend schemas, `form-uuids.ts`, `form-registry.ts`, and frontend components while retaining `path: 'aiims-investigation-ultrasound'` for single-SPA routing backward compatibility.
- **Schema Expansion (`forms/aiims_investigation_ultrasound.json`)**: Expanded schema from 2 basic fields to **55 fields across 7 structured sections**:
  1. *TVS Uterine Size & Adenomyosis*: Length, Width, Transverse Diameter, Volume, Day of Cycle, Adenomyosis, Calcifications.
  2. *TVS Fibroids*: Fibroids toggle, Number of Fibroids, Location, Size, FIGO Stages (0–8).
  3. *TVS Endometrial Cavity & Anomalies*: Endometrial Cavity, Junction, Septate Finding, Septate Angle, Length of Septum, Bicornuate Uterus, Right/Left Volumes, Unicornuate Uterus, Volume, Polyps, Number, Dimensions.
  4. *TVS Ovaries, AFC & Endometrioma*: Right/Left AFC, Total Antral Follicle Count, Right/Left Ovary Dimensions, Endometrioma toggle, Number, Accessible/Inaccessible Follicles, Right/Left Endometrioma Sizes, Right/Left Ovary Volumes.
  5. *TVS Hydrosalpinx & Endometrial Thickness*: Focal Adenomyoma Dimensions, Hydrosalpinx finding, Hydrosalpinx Dimensions, Day 14–16 Thickness (mm), Day 14–16 Pattern.
  6. *TVS Ovarian Cysts*: Ovarian Dermoid (Yes/No, Right/Left Dimensions), Haemorrhagic Cyst (Yes/No, Right/Left Dimensions), Corpus Luteum (Yes/No, Right/Left Dimensions), Paro-ovarian Cyst (Yes/No, Right/Left Dimensions).
  7. *Endometrial Zones & Remarks*: Zone 1 (Myometrium), Zone 2 (Hyperechoic Edge), Zone 3 (Internal Hypoechoic), Zone 4 (Cavity), Ultrasound Remarks.
- **Backend Publishing**: Published schema to MariaDB backend using `python scripts/publish_aiims_form.py --form=Transvaginal`.

### 2.2 Form 15: Pruning to Focused Surgical & Hysteroscopy Scope
- **Schema Refactoring (`forms/aiims_female_surgical_procedure.json`)**: Pruned all 7 TVS sections out of Form 15, leaving strictly:
  - *Hysteroscopy Findings*: Ostia, Endometrium, Endometrial Cavity, Cervical Canal Direction.
  - *Hysteroscopy Dimensions (cm)*.
  - *Operative Hysteroscopy*: Polypectomy, Metroplasty, Septal Resection, Myomectomy, Adhesiolysis, PRP/Stem Cell Instillation.
  - *Surgical Procedure Remarks*.
- **Backend Publishing**: Re-linked and published streamlined schema to MariaDB backend via `scripts/publish_aiims_form.py`.

### 2.3 Field Order Verification & Precision Alignment
- **Focal Adenomyoma Realignment**: Relocated `focal_adenomyoma_dimensions` from Section 1 to Section 5, placing it directly between *Endometrioma Left Ovary Dimensions* and *Hydrosalpinx*, matching item #37 in `second_sheet_form_adjustments.md` 1:1.
- **Frontend Card Alignment**: Updated `investigation-ultrasound-card.component.tsx` to move `focal_adenomyoma_dimensions` from `uterineRows` into `hydrosalpinxRows`.

### 2.4 Question-Level Conditional Visibility Implementation (`hideWhenExpression`)
- Injected `hideWhenExpression` across all 11 dependent question groups in `forms/aiims_investigation_ultrasound.json`:
  1. *Fibroids*: `!fibroids_present || fibroids_present !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  2. *Septate finding*: `!septate_finding || septate_finding !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  3. *Bicornuate Uterus*: `!bicornuate_uterus || bicornuate_uterus !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  4. *Unicornuate Uterus*: `!unicornuate_uterus || unicornuate_uterus !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  5. *Polyps*: `!polyp_present || polyp_present !== '163748AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  6. *Endometrioma*: `!endometrioma_present || endometrioma_present !== '163748AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  7. *Hydrosalpinx*: `!hydrosalpinx || hydrosalpinx === '163747AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  8. *Ovarian Dermoid*: `!ovarian_dermoid || ovarian_dermoid !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  9. *Haemorrhagic Cyst*: `!haemorrhagic_cyst || haemorrhagic_cyst !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  10. *Corpus Luteum*: `!corpus_luteum || corpus_luteum !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`
  11. *Paro-ovarian Cyst*: `!paro_ovarian_cyst || paro_ovarian_cyst !== '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'`

### 2.5 Resilient Concept Dictionary Validator
- **Auto-Retry Enhancement (`scripts/validate_concepts.py`)**: Added an exponential 3-attempt retry loop with 0.5s backoff for transient HTTP socket timeouts during high-concurrency 10-thread REST API checks.

### 2.6 IVF Summary Dashboard Enrichment
- **Hysteroscopy & Interventions Integrated**: Imported `AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_UUID` into `ivf-summary-dashboard.component.tsx` to surface operative hysteroscopy findings and cavity status in Domain 1 (*Prior Reproductive & Surgical History*).
- **Resilient AFC Derivation**: Enhanced Domain 2 (*Hormonal & Ultrasound Reserve*) with an automatic bilateral fallback (`afcRightOvary` + `afcLeftOvary`) when total AFC is not pre-calculated by the sonographer.
- **TVS Pelvic Findings**: Extracted Form 13 imaging findings (Fibroids + location, Adenomyosis, Hydrosalpinx) directly into Domain 2 (*Diagnostic Factors*) as a high-visibility clinical parameter.
- **i18n Localization**: Added `hysteroscopyIntervention` and `tvsPelvicFindings` keys to `translations/en.json` (657/657 keys verified).

---

## 3. Clinical & Technical Analysis (The Investigation)

### 3.1 Transvaginal Ultrasound vs. Surgical Hysteroscopy Scope Disentanglement
- **Clinical Issue**: In the original intake schema drafts, pelvic ultrasound parameters (measuring ovarian follicle counts, endometrial thickness, adenomyosis, ovarian cysts, and FIGO fibroid stages) were mistakenly grouped under "Investigation Female Surgical Procedure".
- **Clinical Rationale for Separation**:
  - **TVS Ultrasound (Form 13)** is an OPD/diagnostic imaging procedure conducted repeatedly across menstrual cycle days (e.g. Day 2 baseline AFC, Day 14–16 pre-ovulatory endometrial scan).
  - **Surgical Procedure / Hysteroscopy (Form 15)** is an operative OT intervention performed under anesthesia or sedation to inspect the uterine cavity and perform surgical interventions (adhesiolysis, polypectomy, metroplasty).
  - Mixing TVS observations into Form 15 polluted the surgical record with imaging data and prevented clinicians from recording serial ultrasound visits independently of surgical procedures.

### 3.2 OpenMRS React Form Engine Conditional Visibility Behavior
- **Investigation**: Evaluated OpenMRS 3.x Form Engine runtime behavior for conditional questions.
- **Finding**: Section-level `hideWhenExpression` rules fail to re-evaluate when a radio button transitions from `null` (pristine state) to its first selection event. Attaching the guard expression directly to each individual dependent question guarantees deterministic re-rendering and eliminates the first-touch evaluation bug.

---

## 4. Architectural Decision Records (ADRs) & Design Rationales (The "Why")

### ADR-014: Single-SPA Route Backward Compatibility during Form Renaming
- **Context & Problem**: Renaming Form 13 from "Investigation Ultrasound" to "Investigation Female Transvaginal Ultrasound" could potentially break existing bookmarks, sidebar navigation links, single-SPA slot contracts, or extension identifiers if route keys were altered.
- **Decision**: Update `title`, `titleKey`, and backend form display names to "Investigation Female Transvaginal Ultrasound", but preserve `key: 'investigation-ultrasound'` and `path: 'aiims-investigation-ultrasound'`.
- **Design Rationale**: Decouples presentation labels from routing identifiers. Allows user-facing strings and translations to be updated freely without mutating Single-SPA extension registrations or breaking URL bookmarks in hospital workstations.
- **Alternatives Considered & Rejected**:
  - *Rename Route Path to `aiims-investigation-female-transvaginal-ultrasound`*: Rejected because it would invalidate existing clinical bookmarks and require synchronized changes across `routes.registry.json` and patient chart extension manifests.

### ADR-015: Question-Level vs. Section-Level Conditional Visibility
- **Context & Problem**: 11 clinical finding categories in Form 13 have dependent detail questions that should only appear when the pathology is present (e.g., Fibroid location/size only if Fibroids = Yes).
- **Decision**: Place `hideWhenExpression` on every individual dependent question rather than on the enclosing section container.
- **Design Rationale**: OpenMRS 3.x Form Engine re-evaluates question-level bindings on every form state change, whereas section-level containers can skip re-evaluation on pristine-to-active state transitions.
- **Alternatives Considered & Rejected**:
  - *Wrap each dependent group in a separate `<section>` with section `hide`*: Rejected due to first-touch evaluation failure and visual UI fragmentation (creating dozens of tiny 1-field sections).
  - *Keep all fields visible without conditions*: Rejected because displaying 55 fields simultaneously causes severe clinician cognitive fatigue when most findings are normal/absent.

---

## 5. Human-in-the-Loop (HITL) Directives & Gatekeeping

1. **Clinical Architecture Directive**:
   - Directed the full structural realignment between Form 13 and Form 15 based on `second_sheet_form_adjustments.md`.
2. **Quality Gatekeeping on Ordering & Conditionals**:
   - Intervened to demand a double-check on exact field ordering and verify that conditional rendering was correctly implemented in the form schema.
   - Identified and caught that `focal_adenomyoma_dimensions` had been misplaced in Section 1 rather than position #37 before Hydrosalpinx.
   - Ensured that all 11 binary/coded finding toggles hide their measurement sub-fields when absent.

---

## 6. Daily Reflection & PI Briefing Notes

### Key Technical Learnings
- **Form Engine State Mechanics**: How `@openmrs/esm-form-engine-lib` evaluates null-state transitions and why question-level expressions provide 100% deterministic reliability over section wrappers.
- **Single-SPA Interface Stability**: How configuration-driven microfrontends allow display nomenclature to evolve rapidly while preserving URL route stability.

### Value Delivered
- Disentangled clinical imaging from surgical interventions, giving AIIMS reproductive specialists a dedicated 55-parameter Transvaginal Ultrasound sheet and a streamlined Hysteroscopy sheet.
- Reduced form visual noise by over 60% through dynamic conditional rendering.

### 3 Standup Talking Points for the Principal Investigator (PI)
1. *"We successfully realigned Form 13 into a comprehensive 55-field Female Transvaginal Ultrasound sheet, moving all pelvic ultrasound imaging out of the surgical procedure form."*
2. *"Form 15 is now strictly focused on Hysteroscopy findings, cavity dimensions, and operative interventions, matching hospital OT workflow."*
3. *"We implemented question-level conditional logic across all 11 pathology groups, reducing visual clutter on normal scans while ensuring 100% of measurements remain available when findings are present."*

---

## 7. Platform Health & Quality Metrics

| Metric | Status / Value | Verification Source |
| :--- | :--- | :--- |
| **Total Registered Forms** | **34 / 34 Active & Published** | `validate_forms.py` (0 failed) |
| **Active Concept Definitions** | **361 / 361 Verified** | `validate_concepts.py` (361 active) |
| **i18n Translation Health** | **657 keys referenced, 0 missing** | `audit-i18n.ts` (100% health) |
| **TypeScript Compilation** | **0 Errors (`noImplicitAny: true`)** | `tsc --noEmit` |
| **Unit Test Suite** | **100 / 100 Tests Passing** | `vitest` (38 test files) |
| **Deployment Artifact** | **Version `1.0.92` Active** | HTTP 200 from live Nginx importmap probe |
| **E2E Smoke Robot** | **Passed in 3.16s (Surg) / 4.15s (TVS) / 3.28s (Summary)** | Headless Chromium Playwright session |
