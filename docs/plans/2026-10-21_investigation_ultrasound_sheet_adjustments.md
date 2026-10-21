# Implementation Plan: Investigation Female Transvaginal Ultrasound Structural & Sequence Alignment

**Document Version**: 1.0  
**Date**: 2026-10-21  
**Target Form**: `forms/aiims_investigation_ultrasound.json` (Form 13: `80930653-7e80-4bfd-9e29-ec37c334d88c`)  
**Specification Source**: `csv/TVS_FINDING.xlsx - Sheet1.csv`  

---

## 1. Executive Summary & Objectives

The AIIMS Department of Reproductive Medicine & IVF clinical specification for the **Investigation Female Transvaginal Ultrasound** form has been updated in `csv/TVS_FINDING.xlsx - Sheet1.csv`. This plan defines the complete migration strategy to:
1. **Reorder and align 100% of the questions** to match the physiological examination sequence defined in `TVS_FINDING.xlsx - Sheet1.csv` (Uterus $\to$ Ovary $\to$ Fallopian Tube).
2. **Promote Endometrial Thickness & Pattern** immediately following Uterine Size.
3. **Model Endometrial Vascularity** (Applebaum Zones 1–4) as a coded clinical question directly after Endometrial Pattern.
4. **Relocate Focal Adenomyoma Dimensions** immediately following Adenomyosis in the Uterine section.
5. **Rename / Consolidate Ovary Volume into Ovary Dimensions** (`Right ovary dimensions`, `Left ovary dimensions`) and remove obsolete volume fields (`volume_right_ovary`, `volume_left_ovary`).
6. **Add New Clinical Observations**:
   - `Other cyst` & `Other cyst_dimensions` (under Ovary).
   - Bilateral `Hydrosalpinx dimensions` (split into `Left Hydrosalpinx dimensions` and `Right Hydrosalpinx dimensions`).
   - `Haematosalpinx` (Right, Left, Both, Absent) & `Haematosalpinx dimensions` (under Fallopian Tube).
7. **Remove Ultrasound Remarks**: Prune `ultrasound_remarks` from schema, resource parser, card component, and tests per clinical directive.
8. **Register Relational Concepts & Answers**: Add concepts in `scripts/setup_aiims_concepts.py` and execute migration against MariaDB.
9. **Update Microfrontend UI**: Update TypeScript interfaces, resource hook, localized translations (`en.json`), observation card rows, and unit test suite.
10. **Execute Quality Gates**: Run the full 9-stage deployment pipeline (`npm run deploy:local`) with zero regressions.

---

## 2. Detailed Field Sequence Specification (1:1 with `TVS_FINDING.xlsx - Sheet1.csv`)

| Step # | CSV Section | Field Label | Question ID | Rendering | Concept UUID | Conditional Expression (`hideWhenExpression`) |
|:---:|:---|:---|:---|:---:|:---:|:---|
| 1 | Header | Day of Cycle | `day_of_cycle` | number | `...0126` | Always visible |
| 2 | Uterus | Uterine size - Length (cm) | `uterine_size_length` | number | `...0122` | Always visible |
| 3 | Uterus | Uterine size - Width (cm) | `uterine_size_width` | number | `...0123` | Always visible |
| 4 | Uterus | Uterine size - Transverse Diameter (cm) | `uterine_size_transverse` | number | `...0124` | Always visible |
| 5 | Uterus | Uterine size - Volume (cm³) | `uterine_size_volume` | number | `...0125` | Always visible |
| 6 | Uterus | Day 14-16 Endometrial Thickness (mm) | `day14_16_endometrial_thickness` | number | `...0160` | Always visible |
| 7 | Uterus | Day 14-16 Endometrial Thickness Pattern | `day14_16_endometrial_pattern` | select | `...0161` | Trilaminar, Diffuse, Fluid |
| 8 | Uterus | Endometrial Vascularity | `endometrial_vascularity` | select | `...0305` | Zone 1, Zone 2, Zone 3, Zone 4 |
| 9 | Uterus | Adenomyosis | `adenomyosis` | select | `...0127` | 9 coded options |
| 10 | Uterus | Focal Adenomyoma Dimensions | `focal_adenomyoma_dimensions` | text | `...0157` | Always visible |
| 11 | Uterus | Calcifications | `calcifications` | radio | `...0128` | Yes / No |
| 12 | Uterus | Fibroids | `fibroids_present` | radio | `...0129` | Yes / No |
| 13 | Uterus | Number of Fibroids | `number_of_fibroids` | number | `...0130` | `!fibroids_present \|\| fibroids_present !== '1065...'` |
| 14 | Uterus | Fibroids Location | `fibroids_location` | select | `...0131` | `!fibroids_present \|\| fibroids_present !== '1065...'` |
| 15 | Uterus | Fibroids Size | `fibroids_size` | text | `...0132` | `!fibroids_present \|\| fibroids_present !== '1065...'` |
| 16 | Uterus | Fibroid Stages (FIGO) | `fibroid_stages_figo` | select | `...0133` | `!fibroids_present \|\| fibroids_present !== '1065...'` |
| 17 | Uterus | Endometrial Cavity | `tvs_endometrial_cavity` | select | `...0134` | Normal, Adhesions, Fluid in cavity |
| 18 | Uterus | Endometrial Cavity Normal Evaluation | `tvs_endometrial_cavity_normal_type` | radio | `...0134` | `!tvs_endometrial_cavity \|\| tvs_endometrial_cavity !== '1115...'` (3D / 4D) |
| 19 | Uterus | Endometrial-Myometrial Junction | `endometrial_myometrial_junction` | select | `...0135` | Well-defined, Ill-defined, Irregular, Interrupted |
| 20 | Uterus | Septate Finding | `septate_finding` | radio | `...0136` | Yes / No |
| 21 | Uterus | Endometrial Cavity Septate Angle (degrees) | `septate_angle` | number | `...0137` | `!septate_finding \|\| septate_finding !== '1065...'` |
| 22 | Uterus | Endometrial Cavity Length of Septum (cm) | `length_of_septum` | number | `...0138` | `!septate_finding \|\| septate_finding !== '1065...'` |
| 23 | Uterus | Bicornuate Uterus | `bicornuate_uterus` | radio | `...0139` | Yes / No |
| 24 | Uterus | Bicornuate Uterus - Right Volume (cm³) | `bicornuate_uterus_right_volume` | number | `...0140` | `!bicornuate_uterus \|\| bicornuate_uterus !== '1065...'` |
| 25 | Uterus | Bicornuate Uterus - Left Volume (cm³) | `bicornuate_uterus_left_volume` | number | `...0141` | `!bicornuate_uterus \|\| bicornuate_uterus !== '1065...'` |
| 26 | Uterus | Unicornuate Uterus | `unicornuate_uterus` | radio | `...0142` | Yes / No |
| 27 | Uterus | Unicornuate Uterus Volume (cm³) | `unicornuate_uterus_volume` | number | `...0143` | `!unicornuate_uterus \|\| unicornuate_uterus !== '1065...'` |
| 28 | Uterus | Polyp | `polyp_present` | radio | `...0144` | Present / Absent |
| 29 | Uterus | Number of Polyps | `number_of_polyps` | number | `...0145` | `!polyp_present \|\| polyp_present !== '163748...'` |
| 30 | Uterus | Dimensions of Polyps | `dimensions_of_polyps` | text | `...0146` | `!polyp_present \|\| polyp_present !== '163748...'` |
| 31 | Ovary | Antral Follicle Count - Right Ovary | `afc_right_ovary` | number | `...0147` | Always visible |
| 32 | Ovary | Antral Follicle Count - Left Ovary | `afc_left_ovary` | number | `...0148` | Always visible |
| 33 | Ovary | Total Antral Follicle Count | `total_antral_follicle_count` | number | `...0107` | Always visible |
| 34 | Ovary | Right Ovary Dimensions | `right_ovary_dimensions` | text | `...0149` | Always visible |
| 35 | Ovary | Left Ovary Dimensions | `left_ovary_dimensions` | text | `...0150` | Always visible |
| 36 | Ovary | Endometrioma | `endometrioma_present` | radio | `...0151` | Present / Absent |
| 37 | Ovary | Number of Endometrioma | `number_of_endometrioma` | number | `...0152` | `!endometrioma_present \|\| endometrioma_present !== '163748...'` |
| 38 | Ovary | Number of Follicles Accessible | `follicles_accessible` | number | `...0153` | `!endometrioma_present \|\| endometrioma_present !== '163748...'` |
| 39 | Ovary | Number of Follicles Inaccessible | `follicles_inaccessible` | number | `...0154` | `!endometrioma_present \|\| endometrioma_present !== '163748...'` |
| 40 | Ovary | Endometrioma Right Ovary Dimensions | `endometrioma_right_dimensions` | text | `...0155` | `!endometrioma_present \|\| endometrioma_present !== '163748...'` |
| 41 | Ovary | Endometrioma Left Ovary Dimensions | `endometrioma_left_dimensions` | text | `...0156` | `!endometrioma_present \|\| endometrioma_present !== '163748...'` |
| 42 | Ovary | Ovarian Dermoid | `ovarian_dermoid` | radio | `...0162` | Yes / No |
| 43 | Ovary | Right Ovary Dermoid Dimensions | `right_ovary_dermoid_dimensions` | text | `...0163` | `!ovarian_dermoid \|\| ovarian_dermoid !== '1065...'` |
| 44 | Ovary | Left Ovary Dermoid Dimensions | `left_ovary_dermoid_dimensions` | text | `...0164` | `!ovarian_dermoid \|\| ovarian_dermoid !== '1065...'` |
| 45 | Ovary | Haemorrhagic Cyst | `haemorrhagic_cyst` | radio | `...0165` | Yes / No |
| 46 | Ovary | Right Ovary Haemorrhagic Cyst Dimensions | `right_ovary_haemorrhagic_dimensions` | text | `...0166` | `!haemorrhagic_cyst \|\| haemorrhagic_cyst !== '1065...'` |
| 47 | Ovary | Left Ovary Haemorrhagic Cyst Dimensions | `left_ovary_haemorrhagic_dimensions` | text | `...0167` | `!haemorrhagic_cyst \|\| haemorrhagic_cyst !== '1065...'` |
| 48 | Ovary | Corpus Luteum | `corpus_luteum` | radio | `...0168` | Yes / No |
| 49 | Ovary | Corpus Luteum Right Ovary Dimensions | `corpus_luteum_right_dimensions` | text | `...0169` | `!corpus_luteum \|\| corpus_luteum !== '1065...'` |
| 50 | Ovary | Corpus Luteum Left Ovary Dimensions | `corpus_luteum_left_dimensions` | text | `...0170` | `!corpus_luteum \|\| corpus_luteum !== '1065...'` |
| 51 | Ovary | Paro-ovarian Cyst | `paro_ovarian_cyst` | radio | `...0171` | Yes / No |
| 52 | Ovary | Paro-ovarian Cyst Right Dimensions | `paro_ovarian_right_dimensions` | text | `...0172` | `!paro_ovarian_cyst \|\| paro_ovarian_cyst !== '1065...'` |
| 53 | Ovary | Paro-ovarian Cyst Left Dimensions | `paro_ovarian_left_dimensions` | text | `...0173` | `!paro_ovarian_cyst \|\| paro_ovarian_cyst !== '1065...'` |
| 54 | Ovary | Other Cyst | `other_ovarian_cyst` | radio | `...0306` | Yes / No *(NEW)* |
| 55 | Ovary | Other Cyst Dimensions | `other_ovarian_cyst_dimensions` | text | `...0307` | `!other_ovarian_cyst \|\| other_ovarian_cyst !== '1065...'` *(NEW)* |
| 56 | Fallopian Tube | Hydrosalpinx | `hydrosalpinx` | select | `...0158` | Right Hydrosalpinx, Left Hydrosalpinx, Both Hydrosalpinx, Absent |
| 57 | Fallopian Tube | Left Hydrosalpinx Dimensions | `hydrosalpinx_left_dimensions` | text | `...0308` | `!hydrosalpinx \|\| (hydrosalpinx !== '...0965' && hydrosalpinx !== '...0966')` *(SPLIT)* |
| 58 | Fallopian Tube | Right Hydrosalpinx Dimensions | `hydrosalpinx_right_dimensions` | text | `...0159` | `!hydrosalpinx \|\| (hydrosalpinx !== '...0964' && hydrosalpinx !== '...0966')` *(SPLIT)* |
| 59 | Fallopian Tube | Haematosalpinx | `haematosalpinx` | select | `...0309` | Right, Left, Both, Absent *(NEW)* |
| 60 | Fallopian Tube | Haematosalpinx Dimensions | `haematosalpinx_dimensions` | text | `...0310` | `!haematosalpinx \|\| haematosalpinx === '163747...'` *(NEW)* |

*(Remarks question `ultrasound_remarks` and volume questions `volume_right_ovary`, `volume_left_ovary` are completely removed).*

---

## 3. Relational Concept Registrations (`scripts/setup_aiims_concepts.py`)

New Concept UUIDs to add:
- `c0010001-0000-0000-0000-000000000305`: "Endometrial Vascularity" (datatype_id = 2, class_id = 7, Coded)
  - Answer `c0010002-0000-0000-0000-000000001158`: "Zone 1 (Myometrium surrounding the endometrium)"
  - Answer `c0010002-0000-0000-0000-000000001159`: "Zone 2 (Hyperechoic endometrial edge)"
  - Answer `c0010002-0000-0000-0000-000000001160`: "Zone 3 (Internal endometrial hypoechoic zone)"
  - Answer `c0010002-0000-0000-0000-000000001161`: "Zone 4 (Endometrial cavity)"
- `c0010001-0000-0000-0000-000000000306`: "Other Ovarian Cyst" (datatype_id = 2, class_id = 7, Coded Yes/No)
- `c0010001-0000-0000-0000-000000000307`: "Other Ovarian Cyst Dimensions" (datatype_id = 3, class_id = 7, Text)
- `c0010001-0000-0000-0000-000000000308`: "Left Hydrosalpinx Dimensions" (datatype_id = 3, class_id = 7, Text)  
  *(Concept `c0010001-0000-0000-0000-000000000159` serves as "Right Hydrosalpinx Dimensions")*
- `c0010001-0000-0000-0000-000000000309`: "Haematosalpinx Finding" (datatype_id = 2, class_id = 7, Coded)
  - Answer `c0010002-0000-0000-0000-000000001162`: "Right"
  - Answer `c0010002-0000-0000-0000-000000001163`: "Left"
  - Answer `c0010002-0000-0000-0000-000000001164`: "Both"
  - Answer `163747AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`: "Absent"
- `c0010001-0000-0000-0000-000000000310`: "Haematosalpinx Dimensions" (datatype_id = 3, class_id = 7, Text)

---

## 4. Frontend Component & Resource Updates

1. **`src/config/concepts.ts`**:
   - Add new concept keys: `endometrialVascularity`, `otherOvarianCyst`, `otherOvarianCystDimensions`, `hydrosalpinxLeftDimensions`, `hydrosalpinxRightDimensions`, `haematosalpinxFinding`, `haematosalpinxDimensions`.
   - Remove obsolete concept exports: `volumeRightOvary`, `volumeLeftOvary`, `ultrasoundRemarks`, `zone1Dimensions`, `zone2Dimensions`, `zone3Dimensions`, `zone4Dimensions`.
2. **`src/investigation-ultrasound/investigation-ultrasound.resource.ts`**:
   - Update `AiimsInvestigationUltrasoundData` interface with new attributes.
   - Remove `volumeRightOvary`, `volumeLeftOvary`, and `ultrasoundRemarks`.
   - Update `getOptionalObsValue` and `hasData` check logic.
3. **`src/investigation-ultrasound/investigation-ultrasound-card.component.tsx`**:
   - Reorder rows to match the 60 questions in Table 2.
   - Add rows for `Endometrial Vascularity`, `Other Cyst`, `Left Hydrosalpinx Dimensions`, `Right Hydrosalpinx Dimensions`, `Haematosalpinx`, and `Haematosalpinx Dimensions`.
   - Remove remarks row and ovary volume rows.
4. **`translations/en.json`**:
   - Add translation entries for all new labels and headers.
5. **`src/investigation-ultrasound/investigation-ultrasound-card.component.test.tsx`**:
   - Update fixture mock data and expect assertions to reflect new labels and pruned remarks/volume rows.

---

## 5. Execution Steps & Verification Checklist

- [ ] **Step 1**: Register concepts in `scripts/setup_aiims_concepts.py` and run via python to persist in MariaDB.
- [ ] **Step 2**: Update `forms/aiims_investigation_ultrasound.json` schema with exact sequence and conditional rules.
- [ ] **Step 3**: Re-publish schema to OpenMRS backend via `scripts/publish_aiims_form.py`.
- [ ] **Step 4**: Update frontend concepts, resource parser, observation card, and `en.json`.
- [ ] **Step 5**: Update unit tests in `investigation-ultrasound-card.component.test.tsx`.
- [ ] **Step 6**: Run verification commands:
  - `npm run validate:forms`
  - `npm run validate:concepts`
  - `npm run audit:i18n`
  - `npm run typescript -- --noEmit`
  - `npm run test`
- [ ] **Step 7**: Deploy via `npm run deploy:local` (hot-deploy bundle and live probe check).
- [ ] **Step 8**: Update `docs/records/2026-10-21/summary.md` and `PROJECT_MEMORY.md`.
