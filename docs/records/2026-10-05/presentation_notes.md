# Presentation Notes: 2026-10-05
## Topic: Medical Baseline, Pelvic Ultrasound & Sticky Patient Header Widget (Forms 10–13)

---

### Slide 1: Executive Summary & Milestone Achievement
* **Core Achievements**:
  - Implemented and published **Forms 10, 11, 12, and 13**: Form 10 (*Past Medical History*), Form 11 (*Family History*), Form 12 (*Tuberculosis History*), and Form 13 (*Investigation Ultrasound*).
  - Designed and mounted the persistent **Demographics Summary Widget** in `patient-info-slot`.
  - Resolved backend HTTP 400 validation issues on optional numeric fields and fixed deep-linking SPA routing.
* **Clinical Significance**: Provides essential systemic and familial risk stratification (including chronic diseases and tuberculosis) alongside baseline pelvic ultrasound metrics, with couple baseline data persistently visible at all times.

---

### Slide 2: Clinical Baseline & Patient Header Widget

```mermaid
flowchart TD
    subgraph Header["Persistent Patient Header (patient-info-slot)"]
        W[Demographics Summary Widget: Wife Age | Husband Name & Age | Consultant | Unit | Kuppuswamy Class]
    end
    subgraph History["Baseline History (Forms 10–12)"]
        M[Form 10: Medical Comorbidities DM / HTN / Thyroid]
        F[Form 11: Familial History Genetic & Anomaly Risks]
        T[Form 12: TB History Site, ATT Duration & Completion]
    end
    subgraph Diagnostics["Imaging Baseline (Form 13)"]
        U[Form 13: Ultrasound Antral Follicles AFC, Uterine & Ovarian Volumes]
    end
    Header --- History & Diagnostics
```

#### What Clinicians Experience:
1. **Always-Visible Couple Context**: Partner's age, name, and clinic consultant remain pinned at the top across all patient chart tabs.
2. **TB Risk Profiling**: Instant clarity on pulmonary vs genital tuberculosis history and full ATT compliance.
3. **Pelvic Reserve Dashboard**: Clear presentation of Antral Follicle Count (AFC) and endometrial thickness.

---

### Slide 3: Engineering Decisions & Post-Mortem

#### The Problems Solved:
1. **HTTP 400 Bad Request on Blank Inputs**:
   - Sanitized payload delivery to omit empty string representations `""` that triggered OpenMRS Java parser failures.
2. **SPA Deep-Link Context Loss**:
   - Fixed route assembly in the header widget to prevent navigating to blank unhydrated routes.
3. **Upstream Warning Polyfills**:
   - Patched missing OpenMRS core translation keys to preserve clean browser console telemetry.

---

### Slide 4: Key Platform Metrics

| Metric | Before Sprint | After Sprint |
|---|---|---|
| **Active Clinical Forms** | 9 forms | **13 forms active** |
| **Persistent Chart Headers** | Default single patient | **Custom Couple Demographics Widget** |
| **Numeric Form Robustness** | Crashed on empty inputs | **100% Sanitized & Validated** |
| **Git Commits Executed** | — | **7 commits** |

---

### Slide 5: Standup Talking Points for PI
1. **Forms 10 through 13 Operational**: Completed systemic comorbidities, family history, tuberculosis history, and pelvic ultrasound.
2. **Persistent Couple Demographics**: Pinned key couple baseline metadata to the top chart header widget across all 13 forms.
3. **Form Engine Resilience**: Fixed backend 400 validation errors on empty numeric inputs, establishing standard payload sanitization.
