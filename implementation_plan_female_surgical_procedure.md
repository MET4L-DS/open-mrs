# Implementation Plan: Investigation Female Surgical Procedure

## 1. Overview
This plan covers the implementation of the "Investigation Female Surgical Procedure" form and dashboard widget based on three provided CSV files: `hysteroscopy.csv`, `TVS_FINDING.csv`, and `ZONE.csv`. This form encompasses a comprehensive suite of surgical and transvaginal ultrasound (TVS) findings.

The form will be structured into three main sections:
1.  **Hysteroscopy Findings**
2.  **Transvaginal Ultrasound (TVS) Findings**
3.  **Endometrial Zones**

## 2. Concept Definition & Registration
We need to register numerous new concepts in OpenMRS via `scripts/setup_aiims_concepts.py`.

### A. Hysteroscopy Concepts
**Questions (Datatype: Coded):**
*   Hysteroscopy Ostia (Answers: Deep seated, Normal, Peri-ostial adhesion, Right ostia not seen, Left ostia not seen, Both ostia not seen)
*   Hysteroscopy Endometrium (Answers: Normal, Pale, Micropolyps, Thin, Congested, Fibrosis, Polypoidal)
*   Hysteroscopy Endometrial Cavity (Answers: Normal, Polyp, Septum, Adhesion, Fibroid, Subseptate, Tubular, Adequate)
*   Cervical Canal Direction (Answers: Normal, Straight, Towards left, Towards right, Adhesions, Anteverted, Retroverted)
*   Operative Hysteroscopy (Answers: Uterine Polypectomy, Metroplasty, Septal resection, Myomectomy, Adhesiolysis, Platelet Rich Plasma (PRP)/Stem cell instillation)
**Questions (Datatype: Numeric/Text):**
*   Hysteroscopy Dimensions (cm)

### B. TVS Finding Concepts
This section requires extensive concepts covering uterine size, adenomyosis, fibroids, endometrial cavity, septate, bicornuate/unicornuate uterus, polyps, AFC, endometriomas, hydrosalpinx, endometrial thickness, and various cysts (dermoid, haemorrhagic, corpus luteum, paro-ovarian).

**Numeric Concepts (Examples):**
*   Uterine size_length (cm), width (cm), transverse diameter (cm), volume (cm³)
*   Day of cycle
*   Endometrial_cavity_Septate_Angle(EC)
*   Endometrial_cavity_Length of septum(EC)
*   Number of polyps, AFC Right/Left ovary, Number of Endometrioma, Endometrial Thickness (mm)

**Coded Concepts (Examples):**
*   Adenomyosis (Globular, Asymmetrical thickening, etc.)
*   Calcifications (Yes/No)
*   Fibroids (Yes/No), Number of fibroids, Fibroids_location, Fibroid_stages(FIGO)
*   Endometrial cavity (Normal, 3D, 4D, Adhesions, Fluid in cavity)
*   Endometrial-Myometrial Junction (well defined, Ill-defined, irregular, interrupted)
*   Hydrosalpinx (Right, Left, Both)
*   Day_14-16_Endometrial_Thickness_Pattern (Trilaminar, Diffuse, Fluid)

**Text Concepts (Examples):**
*   Dimensions for Fibroids, Polyps, Ovaries, Endometriomas, Focal Adenomyoma, Hydrosalpinx, Dermoid, Cysts.

### C. Zone Concepts
**Numeric Concepts (cm):**
*   Zone 1 (Myometrium surrounding the endometrium) Dimensions
*   Zone 2 (Hyperechoic endometrial edge) Dimensions
*   Zone 3 (Internal endometrial hypoechoic zone) Dimensions
*   Zone 4 (Endometrial cavity) Dimensions

## 3. Form JSON Schema Generation
*   **Script**: Create `scripts/generate_female_surgical_procedure_form.py`
*   **Form Name**: `AIIMS Visit: Investigation Female Surgical Procedure`
*   **Form UUID**: `80930653-7e80-4bfd-9e29-ec37c334d88e`
*   **Encounter Type**: `dd528487-82a5-4082-9c72-ed246bd49591` (Consultation)
*   **Structure**: Grouped logically into Hysteroscopy, TVS Findings, and Endometrial Zones using `obsgroup` where necessary (e.g., grouping fibroid location with size/stage, or just flat if simpler).

## 4. Form Deployment
*   Update `scripts/publish_aiims_form.py` to include `forms/aiims_female_surgical_procedure.json`.

## 5. Frontend Implementation
*   **Location**: `aiims-esm-demographics-app/src/investigation-female-surgical/`
*   **Components**: 
    *   `female-surgical-procedure.resource.ts` (Data fetching hook `useFemaleSurgicalProcedure`)
    *   `female-surgical-procedure-card.component.tsx` (UI for displaying the extensive data using Tabs or multiple `ObservationCard` instances to avoid a massive wall of text)
    *   `female-surgical-procedure-dashboard.component.tsx` (Dashboard wrapper)
*   **Registry**: Update `src/constants.ts` (Form UUID, name, concepts, registry entry with `ReportData` or `Stethoscope` icon) and `src/index.ts`.
*   **Translations**: Update `translations/en.json` with all corresponding labels.
*   **Tests**: Create `female-surgical-procedure-card.component.test.tsx`.

## 6. Sync and Build
*   Run `python scripts/sync_routes.py`
*   Run `npm run test` and `npm run typescript`
*   Run `npm run build`
*   Deploy via `python scripts/deploy_demographics.py`
