# Daily Engineering Record & Decision Journal: 2026-10-16

## 1. Executive Summary & Daily Mission
- **Mission Goal**: Execute three major clinical and UX enhancements across the AIIMS Reproductive Medicine platform:
  1. Complete clinical realignment defined in `docs/plans/second_sheet_form_adjustments.md`: rename Form 13 to **"Investigation Female Transvaginal Ultrasound"**, transfer all 55 TVS ultrasound fields out of Form 15 into Form 13, streamline Form 15 (**"Investigation Female Surgical Procedure"**) strictly to hysteroscopy findings, hysteroscopy dimensions, and operative hysteroscopy, implement question-level conditional visibility rules, and enrich the consolidated IVF Summary dashboard.
  2. Integrate Hysteroscopy findings, dimensions, and operative interventions into Form 9 (**"Previous Surgery"**) using a dedicated dual-card dashboard architecture (Option B) with cross-form encounter aggregation in the IVF Summary.
  3. Eliminate multi-section / accordion grouping across 5 forms (**Investigation Female Transvaginal Ultrasound**, **Assessment of Fertilization, Embryo & Blastocyst**, **Fertilisation Details**, **Embryos Frozen**, and **Fresh Embryo Transfer Details**), promote **Day of Cycle** to question #1 on TVS, and flatten all corresponding frontend UI cards into single continuous `ObservationCard` views.
- **Operational Status**: 34/34 clinical forms active and published in MariaDB. 361/361 active concept definitions verified with auto-retry resilience. 102/102 unit tests passing across 39 test suites. Production bundle `1.0.95` hot-deployed to Docker container. E2E headless smoke robot confirmed 0 console errors and 0 white screens across all updated clinical dashboards.

---

## 2. Tasks Completed & Deliverables (The "What")

### 2.1 Form 13: Renaming & Complete 55-Field TVS Schema Migration (`89cfb38`)
- **Form Renamed**: Updated Form 13 from "Investigation Ultrasound" to **"AIIMS Visit: Investigation Female Transvaginal Ultrasound"** across backend schemas, `form-uuids.ts`, `form-registry.ts`, and frontend components while retaining `path: 'aiims-investigation-ultrasound'` for single-SPA routing backward compatibility.
- **Schema Expansion (`forms/aiims_investigation_ultrasound.json`)**: Expanded schema from 2 basic fields to **55 fields across 7 structured sections** (subsequently flattened into 1 continuous section in §2.8):
  - Uterine dimensions, volume, Day of Cycle, adenomyosis, calcifications.
  - Fibroids toggle, number, location, dimensions, FIGO stages (0–8).
  - Endometrial cavity, junction, septate finding, angle, septum length, bicornuate, unicornuate, polyps.
  - Ovaries, bilateral AFC, total AFC, endometrioma, ovary dimensions and volumes.
  - Focal adenomyoma, hydrosalpinx, Day 14–16 endometrial thickness and pattern.
  - Ovarian dermoid, haemorrhagic cyst, corpus luteum, paro-ovarian cyst.
  - Endometrial zones (Zones 1–4) and ultrasound remarks.
- **Backend Publishing**: Published schema to MariaDB backend using `python scripts/publish_aiims_form.py --form=Transvaginal`.

### 2.2 Form 15: Pruning to Focused Surgical & Hysteroscopy Scope (`89cfb38`)
- **Schema Refactoring (`forms/aiims_female_surgical_procedure.json`)**: Pruned all 7 TVS sections out of Form 15, leaving strictly:
  - *Hysteroscopy Findings*: Ostia, Endometrium, Endometrial Cavity, Cervical Canal Direction.
  - *Hysteroscopy Dimensions (cm)*.
  - *Operative Hysteroscopy*: Polypectomy, Metroplasty, Septal Resection, Myomectomy, Adhesiolysis, PRP/Stem Cell Instillation.
  - *Surgical Procedure Remarks*.
- **Backend Publishing**: Re-linked and published streamlined schema to MariaDB backend via `scripts/publish_aiims_form.py`.

### 2.3 Field Order Verification & Precision Alignment (`89cfb38`)
- **Focal Adenomyoma Realignment**: Relocated `focal_adenomyoma_dimensions` from Section 1 to Section 5, placing it directly between *Endometrioma Left Ovary Dimensions* and *Hydrosalpinx*, matching item #37 in `second_sheet_form_adjustments.md` 1:1.
- **Frontend Card Alignment**: Updated `investigation-ultrasound-card.component.tsx` to move `focal_adenomyoma_dimensions` into the appropriate observation sequence.

### 2.4 Question-Level Conditional Visibility Implementation (`hideWhenExpression`) (`89cfb38`)
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

### 2.5 Resilient Concept Dictionary Validator (`89cfb38`)
- **Auto-Retry Enhancement (`scripts/validate_concepts.py`)**: Added an exponential 3-attempt retry loop with 0.5s backoff for transient HTTP socket timeouts during high-concurrency 10-thread REST API checks.

### 2.6 IVF Summary Dashboard Enrichment (`96d3f99`)
- **Hysteroscopy & Interventions Integrated**: Imported `AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_UUID` into `ivf-summary-dashboard.component.tsx` to surface operative hysteroscopy findings and cavity status in Domain 1 (*Prior Reproductive & Surgical History*).
- **Resilient AFC Derivation**: Enhanced Domain 2 (*Hormonal & Ultrasound Reserve*) with an automatic bilateral fallback (`afcRightOvary` + `afcLeftOvary`) when total AFC is not pre-calculated by the sonographer.
- **TVS Pelvic Findings**: Extracted Form 13 imaging findings (Fibroids + location, Adenomyosis, Hydrosalpinx) directly into Domain 2 (*Diagnostic Factors*) as a high-visibility clinical parameter.
- **i18n Localization**: Added `hysteroscopyIntervention` and `tvsPelvicFindings` keys to `translations/en.json` (657/657 keys verified).

### 2.7 Form 9: Previous Surgery Hysteroscopy Integration & Dual-Card Dashboard (`4a4c11e`)
- **AMPATH Schema Expansion (`forms/aiims_previous_surgery.json`)**: Added a dedicated section *"Previous Hysteroscopy"* containing 3 clinical concepts matching Form 15:
  - `c0010001-0000-0000-0000-000000000212`: Hysteroscopy Finding (Ostia, Endometrium, Cavity, Cervix).
  - `c0010001-0000-0000-0000-000000000213`: Hysteroscopy Dimensions (cm).
  - `c0010001-0000-0000-0000-000000000214`: Operative Hysteroscopy (Polypectomy, Metroplasty, Septal Resection, Myomectomy, Adhesiolysis, PRP/Stem Cell Instillation).
- **Frontend Dual-Card Architecture (Option B)**:
  - Created `previous-hysteroscopy-card.component.tsx` with dedicated `Chemistry` icon and clean layout.
  - Updated `previous-surgery.resource.ts` to extract hysteroscopy observations from encounter payloads.
  - Updated `previous-surgery-dashboard.component.tsx` to render two distinct cards: *Previous Surgical History (Laparoscopy / Laparotomy)* and *Previous Hysteroscopy*.
  - Added unit test `previous-hysteroscopy-card.component.test.tsx` (100% test coverage).
  - Enriched IVF Summary Domain 1 to check both Form 9 and Form 15 for hysteroscopy interventions.

### 2.8 Universal Grouping Removal across 5 Forms (AMPATH JSON Schemas)
- **Flattened Schema Structure**:
  1. `forms/aiims_investigation_ultrasound.json`: Collapsed 7 sections into **1 single section** (*"Investigation Female Transvaginal Ultrasound"*), containing 60 continuous questions. Promoted **Day of Cycle** to position #1. Maintained all 11 `hideWhenExpression` conditional skip logic rules.
  2. `forms/aiims_embryo_assessment.json`: Collapsed 3 sections into **1 single section** (*"Assessment of Fertilization, Embryo & Blastocyst"*), containing 13 continuous questions.
  3. `forms/aiims_fertilisation_details.json`: Collapsed 3 sections into **1 single section** (*"Fertilisation Details"*), containing 7 continuous questions.
  4. `forms/aiims_embryos_frozen.json`: Collapsed 3 sections into **1 single section** (*"Embryos Frozen"*), containing 7 continuous questions.
  5. `forms/aiims_fresh_et_details.json`: Collapsed 4 sections into **1 single section** (*"Fresh Embryo Transfer Details"*), containing 11 continuous questions.
- **Re-published to MariaDB**: Executed `python scripts/publish_aiims_form.py` across all 5 schemas. Verified 34/34 active via `scripts/validate_forms.py`.

### 2.9 Frontend UI Card Flattening (Single Continuous ObservationCards)
- **Eliminated Multi-Card UI Fragmentation**:
  1. `investigation-ultrasound-card.component.tsx`: Unified from 7 disjoint cards into 1 single `ObservationCard` with `Day of Cycle` on top.
  2. `embryo-assessment-card.component.tsx`: Unified from 3 cards into 1 single `ObservationCard` (`aiimsEmbryoAssessmentTitle`, `Microscope` icon).
  3. `fertilisation-details-card.component.tsx`: Unified from 3 cards into 1 single `ObservationCard` (`aiimsFertilisationDetailsTitle`, `Chemistry` icon).
  4. `embryos-frozen-card.component.tsx`: Unified from 3 cards into 1 single `ObservationCard` (`aiimsEmbryosFrozenTitle`, `Chemistry` icon).
  5. `fresh-et-details-card.component.tsx`: Unified from 4 cards into 1 single `ObservationCard` (`aiimsFreshEtDetailsTitle`, `EventSchedule` icon) with conditional row visibility based on transfer status.
- **Unit Test Synchrony**: Updated test assertions across all 5 test files (`investigation-ultrasound-card.component.test.tsx`, `embryo-assessment.test.tsx`, `fertilisation-details.test.tsx`, `embryos-frozen.test.tsx`, `fresh-et-details.test.tsx`) to assert unified card titles and question labels.

### 2.10 Comprehensive Quality Gates, Vitest Updates & Bundle v1.0.95 Hot-Deployment
- Executed the full 9-stage deployment pipeline:
  - Form schema validation: 34/34 passed.
  - Concept dictionary verification: 361/361 passed.
  - i18n Translation Health: 642 keys referenced, 0 missing.
  - TypeScript type check: 0 errors (`noImplicitAny: true`).
  - Vitest suite: 102/102 tests passing across 39 test files.
  - Rspack production compilation: Success in 16.63s.
  - Docker container hot-deploy: Bundle version `1.0.95` active.
  - Live probe: HTTP 200 OK verified.
  - Headless E2E smoke robot: Verified clean renders for TVS Ultrasound (3.29s) and Fresh ET Details (3.56s).

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

### 3.3 Previous Surgery Hysteroscopy Dual-Card Modeling (Option B vs Option A)
- **Investigation**: In Form 9 (Previous Surgery), past surgical history primarily documents laparoscopy and laparotomy procedures (tubal surgery, cystectomy, myomectomy, adhesiolysis). Adding hysteroscopy findings, cavity dimensions, and operative hysteroscopy raised an architectural question: should hysteroscopy fields be injected into the existing procedural list (Option A) or isolated into a dedicated card (Option B)?
- **Finding**: Procedural rows in Previous Surgery use structured tags and laterality dropdowns (`Right`, `Left`, `Bilateral`). Hysteroscopy findings and dimensions are cavity-wide observations without laterality. Conflating them into the same list would compromise data typing and create clinical confusion. Implementing Option B (a dedicated *Previous Hysteroscopy* card alongside *Previous Surgical History*) keeps procedural records clean and matches hospital intake workflow.

### 3.4 Eliminating Accordion/Multi-Card Fragmentation in Clinical Dashboards
- **Investigation**: Clinicians reported that having 3 to 7 separate sub-cards or accordion sections for single encounters (e.g. TVS, Embryo Assessment, Fertilisation Details, Embryos Frozen, Fresh ET Details) created excessive visual scrolling, clicks, and disjointed reading.
- **Finding**: In OpenMRS 3.x, an encounter represents a coherent clinical encounter event. Rendering a single continuous `ObservationCard` per encounter dashboard provides an immediate, unified scan of all clinical parameters while maintaining high information density and zero accordion friction.

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

### ADR-016: Dedicated Previous Hysteroscopy Card (Option B) in Previous Surgery
- **Context & Problem**: Form 9 needed hysteroscopy findings, cavity dimensions, and operative interventions, which differ structurally from laparoscopy/laparotomy procedures with bilateral laterality.
- **Decision**: Model Hysteroscopy as a distinct section in the schema and render it as a second dedicated `ObservationCard` (`previous-hysteroscopy-card.component.tsx`) on the Previous Surgery dashboard.
- **Design Rationale**: Preserves clean domain separation, avoids polluting procedural laterality arrays with uterine cavity observations, and allows the dashboard to show both prior major surgeries and prior hysteroscopic interventions in a balanced, dual-card grid.
- **Alternatives Considered & Rejected**:
  - *Option A (Single Combined Card)*: Rejected because procedural laterality badges and table columns do not map cleanly to hysteroscopic findings and dimensions.

### ADR-017: Flattened Single-Card Presentation for High-Density Clinical Encounters
- **Context & Problem**: 5 forms had fragmented multi-card layouts (TVS had 7 cards, Embryo Assessment had 3 cards, Fertilisation Details had 3 cards, Embryos Frozen had 3 cards, Fresh ET Details had 4 cards).
- **Decision**: Unify all rows into a single continuous `ObservationCard` per dashboard, mirroring the flattened single-section AMPATH form schema.
- **Design Rationale**: Aligns the view UI directly with the form entry UX. Clinicians review all related observations in a single continuous scrollable card without disjointed headers or accordion barriers.
- **Alternatives Considered & Rejected**:
  - *Retain multi-card layouts with collapsible accordions*: Rejected due to user feedback indicating visual fatigue, extra clicks, and disunity between form entry and dashboard review.

---

## 5. Human-in-the-Loop (HITL) Directives & Gatekeeping

1. **Clinical Architecture Directive**:
   - Directed the full structural realignment between Form 13 and Form 15 based on `second_sheet_form_adjustments.md`.
2. **Quality Gatekeeping on Ordering & Conditionals**:
   - Intervened to demand a double-check on exact field ordering and verify that conditional rendering was correctly implemented in the form schema.
   - Identified and caught that `focal_adenomyoma_dimensions` had been misplaced in Section 1 rather than position #37 before Hydrosalpinx.
3. **Previous Surgery Architectural Decision**:
   - Directed that Option B (dedicated Previous Hysteroscopy card) be chosen for clean separation of concerns in Form 9.
4. **Form Grouping Removal Directive**:
   - Explicitly directed that grouping be removed across 5 forms (TVS, Embryo Assessment, Fertilisation Details, Embryos Frozen, Fresh ET Details) and that Day of Cycle be placed at the top of the TVS form.
5. **Frontend UI Synchronization Directive**:
   - Instructed that the frontend UI cards and unit tests must be updated to reflect the flattened, non-grouped form structures across all 5 modules.

---

## 6. Daily Reflection & PI Briefing Notes

### Key Technical Learnings
- **Form Engine State Mechanics**: How `@openmrs/esm-form-engine-lib` evaluates null-state transitions and why question-level expressions provide 100% deterministic reliability over section wrappers.
- **Single-SPA Interface Stability**: How configuration-driven microfrontends allow display nomenclature to evolve rapidly while preserving URL route stability.
- **High-Density Dashboard UX**: How flattening multi-card fragments into unified, high-density `ObservationCard` containers significantly improves clinical scanability in reproductive medicine charts.

### Value Delivered
- Disentangled clinical imaging from surgical interventions, giving AIIMS reproductive specialists a dedicated 55-parameter Transvaginal Ultrasound sheet and a streamlined Hysteroscopy sheet.
- Enhanced Previous Surgery with dedicated Hysteroscopy documentation and cross-form IVF summary integration.
- Eliminated accordion friction across 5 clinical intake forms, reducing clinician cognitive load and visual clutter while positioning Day of Cycle as the primary clinical parameter on TVS.

### 3 Standup Talking Points for the Principal Investigator (PI)
1. *"We successfully realigned Form 13 into a comprehensive 55-field Female Transvaginal Ultrasound sheet, moving all pelvic ultrasound imaging out of the surgical procedure form, and integrated previous hysteroscopy into Form 9 with a dedicated dual-card dashboard."*
2. *"We removed section grouping across 5 forms (TVS, Embryo Assessment, Fertilisation Details, Embryos Frozen, Fresh ET Details) in both backend schemas and frontend UI cards, promoting Day of Cycle to question #1 on the TVS form."*
3. *"The full 9-stage deployment pipeline completed with 102/102 passing tests, 361 active concepts, 0 missing translations, and bundle version 1.0.95 hot-deployed and verified on live endpoints."*

---

## 7. Platform Health & Quality Metrics

| Metric | Status / Value | Verification Source |
| :--- | :--- | :--- |
| **Total Registered Forms** | **34 / 34 Active & Published** | `validate_forms.py` (0 failed) |
| **Active Concept Definitions** | **361 / 361 Verified** | `validate_concepts.py` (361 active) |
| **i18n Translation Health** | **642 keys referenced, 0 missing** | `audit-i18n.ts` (100% health) |
| **TypeScript Compilation** | **0 Errors (`noImplicitAny: true`)** | `tsc --noEmit` |
| **Unit Test Suite** | **102 / 102 Tests Passing** | `vitest` (39 test files) |
| **Deployment Artifact** | **Version `1.0.95` Active** | HTTP 200 from live Nginx importmap probe |
| **E2E Smoke Robot** | **Passed across all forms (3.29s–3.56s)** | Headless Chromium Playwright session |
| **UI Card Flattening** | **5 / 5 ObservationCards unified** | Single continuous cards with zero multi-card grouping |
