# Daily Engineering Record: 2026-09-29

## 1. Executive Summary
- **Main Goal**: Implement male factor infertility diagnostic intake, male endocrine evaluation, prior surgical interventions, ovulation induction history, and eliminate structural frontend anti-patterns.
- **Outcome**: Successfully delivered Forms 6, 7, 8, and 9, built the reusable `FormDashboardShell`, resolved race conditions in observation processing with secondary UUID sorting, and fixed HTML entity unit encoding.

---

## 2. Completed Tasks & Forms Delivered

### 1. Form 6: Male Factor Infertility (`aiims-male-factor`)
- **Commit**: [`32ee032`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_male_factor.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_male_factor.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d885`).
- **Concept Modeling**: Modeled male diagnostic categories (Azoospermia, Oligozoospermia, Asthenozoospermia, Teratozoospermia, Erectile Dysfunction) with conditional Obstructive vs Non-Obstructive azoospermia sub-classifications.
- **Frontend Architecture**: Implemented `MaleFactorCard` and `MaleFactorDashboard`.

### 2. Form 7: Male Hormone and Surgery (`aiims-male-hormone-surgery`)
- **Commit**: [`760cab4`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_male_hormone_surgery.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_male_hormone_surgery.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d886`).
- **Concept Modeling**: Endocrine parameters (Serum Testosterone in ng/dL, FSH, LH, Prolactin in ng/mL) and surgical interventions (Varicocelectomy, Orchidopexy, Testicular Biopsy).
- **Frontend Architecture**: Implemented `MaleHormoneSurgeryCard` and dashboard.

### 3. Form 8: Previous OI and IUI (`aiims-previous-oi-iui`)
- **Commit**: [`9361c7b`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_prev_oi_iui.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_prev_oi_iui.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d887`).
- **Concept Modeling**: Prior Ovulation Induction (OI) and Intrauterine Insemination (IUI) attempt counts, ovulation induction medications (Clomiphene Citrate, Letrozole, Gonadotropins), and cycle outcomes.
- **Frontend Architecture**: Implemented `PreviousOiIuiCard` and dashboard.

### 4. Form 9: Previous Surgery (`aiims-previous-surgery`)
- **Commit**: [`08086ac`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Clinical Artifact**: [`forms/aiims_prev_surgery.json`](file:///c:/Met4l.DSCode/Projects/open-mrs/forms/aiims_prev_surgery.json) (UUID: `80930653-7e80-4bfd-9e29-ec37c334d888`).
- **Concept Modeling**: Surgical history across pelvic, abdominal, and gynecological procedures with anatomical laterality (Unilateral, Bilateral, Left, Right).
- **Frontend Architecture**: Implemented `PreviousSurgeryCard` and dashboard.

---

## 3. Architectural Decision Records (ADRs)

### ADR-001: Component Architecture: Reusable `FormDashboardShell`
- **Context**: Each clinical form dashboard required identical layout chrome: Carbon loading skeleton, error notification state, card title bar, "Record / Update" action buttons, and empty state illustrations. Copy-pasting this layout across dashboards introduced ~400 lines of redundant code and high risk of UI drift.
- **Decision**: Extracted shared chrome into a single generic container component `FormDashboardShell` (`src/shared/components/form-dashboard-shell.component.tsx`).
- **Rationale**: Enforces 100% consistent styling across all clinical dashboards, ensures standard keyboard navigation and ARIA landmarks, and centralizes error/loading state handling.
- **Rejected Alternatives**:
  - *Alternative A: Individual bespoke dashboard components for every form.* Rejected due to massive code duplication and inconsistent margin/padding across tabs.
  - *Alternative B: Higher-Order Component (HOC) wrapper.* Rejected because React render-props and composition children patterns provide superior TypeScript typing and easier JSX readability.

### ADR-002: Deterministic Multi-Observation Ordering with Secondary UUID Sorting
- **Context**: In OpenMRS REST API responses, multiple observations recorded in the same encounter frequently share identical `obsDatetime` timestamps down to the second. Depending on database index scan order, observations rendered in non-deterministic order, causing flickering lists on page re-renders.
- **Decision**: Implemented deterministic sorting in `useFormEncounter` sorting primary by `obsDatetime DESC`, with secondary tie-breaking by `obs.uuid ASC`.
- **Rationale**: Guarantees identical render order on every render cycle, preventing UI jitter and flaky unit test assertions.
- **Rejected Alternatives**:
  - *Alternative A: Sorting solely by client receipt order.* Rejected because network array serialization does not guarantee stable order across browser sessions.

### ADR-003: Disabling HTML Entity Escaping in Unit Strings
- **Context**: Observation units containing slashes (e.g., `mIU/mL`, `kg/m²`) rendered in Carbon `DataRow` as `&#x2F;` due to `i18next` default XSS escaping of interpolated values.
- **Decision**: Set `interpolation: { escapeValue: false }` for medical units and added defensive `decodeHtmlEntities()` sanitization in `DataRow`.
- **Rationale**: React automatically sanitizes JSX strings, making secondary HTML escaping by the translation engine redundant and visually disruptive to clinical units.
- **Rejected Alternatives**:
  - *Alternative A: Replacing slashes with words (e.g. "mIU per mL").* Rejected because clinicians expect standard international medical notation.

---

## 4. Post-Mortems, Defect Tracking & Root Cause Analysis

### Defect 1: HTML Entity Escaping in Observation Units
- **Root Cause**: Translation library escaped forward slashes `/` into `&#x2F;` during parameter interpolation.
- **Resolution**: Disabled `escapeValue` and sanitized values with decoding utility (`3117305`).

### Defect 2: Race Condition in Observation Timestamps
- **Root Cause**: When an encounter contained multiple observations recorded simultaneously, JavaScript `sort()` without a secondary key had non-deterministic results across browsers.
- **Resolution**: Added secondary UUID tie-breaker sorting (`5b920f5`).

---

## 5. Human-in-the-Loop Directives & Review Log
- **Human Directive 1 (Obstructive vs Non-Obstructive Azoospermia)**: Lead Andrologist required immediate sub-typing of azoospermia into obstructive vs non-obstructive to guide referral for testicular sperm extraction (TESE).
- **Human Directive 2 (Surgical Laterality)**: Lead Gynecologist required laterality flags (Left, Right, Bilateral) on all prior ovarian and tubal surgeries.

---

## 6. Daily Reflection & Standup Briefing Notes
1. **Forms 6 through 9 Delivered**: Completed Male Factor Infertility, Male Hormones/Surgery, Previous OI/IUI, and Previous Surgery.
2. **Architecture Streamlined**: Eliminated 400+ lines of duplicate layout boilerplate by deploying `FormDashboardShell`.
3. **Data Display Reliability**: Fixed observation race conditions and solved HTML entity escaping for clinical units.
