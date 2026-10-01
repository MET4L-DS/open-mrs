# Project Memory: AIIMS OpenMRS 3.x Platform

This file serves as the persistent project-level memory and source of truth across AI coding sessions for the AIIMS OpenMRS 3.x project.

---

## 1. Project Mission & System Overview

- **Objective**: Develop and maintain clinical intake and specialty encounter microfrontends for AIIMS on OpenMRS 3.x (O3).
- **Core Frontend Module**: `@aiims/esm-demographics-app` (located in `./aiims-esm-demographics-app`).
- **Goal**: Scalable, configuration-driven architecture supporting 8+ clinical forms with zero boilerplate for new dashboards and extension points.

---

## 2. Infrastructure & Local Environment

### Docker Orchestration (`./openmrs-distro-referenceapplication/docker-compose.yml`)
- **`gateway`** (`nginx` on port `80`): Reverse proxy routing `/openmrs/spa` to frontend and `/openmrs` to backend.
- **`frontend`** (`nginx` on port `80`): Hosts the Single-SPA microfrontend assets (`importmap.json`, `routes.registry.json`).
- **`backend`** (`tomcat`): OpenMRS Platform running Java 21, Spring, Core REST API, and FHIR2 modules.
- **`db`** (`mariadb:10.11.7`): Persistent relational store.

### Endpoints & Credentials
- **SPA UI**: `http://localhost/openmrs/spa`
- **Legacy UI**: `http://localhost/openmrs`
- **REST API**: `http://localhost/openmrs/ws/rest/v1`
- **FHIR R4 API**: `http://localhost/openmrs/ws/fhir2/R4`
- **Credentials**: `admin` / `Admin123`
- **Helper Script**: `.\openmrs.ps1 {setup|start|stop|down|status|logs|open}` (run `setup` for complete 1-click bootstrap on a fresh system)
- **Bootstrap Script**: `python scripts/setup_environment.py` (automates docker startup, health checks, DB concept registration, form publishing, and frontend hot-deploy)

---

## 3. Frontend Architecture (`@aiims/esm-demographics-app`)

### Configuration-Driven Registry Pattern
- **Central Registry**: `FORM_REGISTRY` in `src/constants.ts` defines all form extensions:
  - `key`: Internal identifier (e.g. `'demographics'`).
  - `uuid`: OpenMRS Form UUID.
  - `name`: Human-readable form name.
  - `path`: SPA sub-route path (e.g. `'aiims-demographics'`).
  - `titleKey`: Localization key for translations (`'aiimsDemographicsTitle'`).
  - `title`: Default English title (`'AIIMS Demographics'`).
  - `slot`: Target patient chart slot.
  - `icon`: Carbon React icon component.
  - `order`: Nav order priority.
- **Extension Factory**: `createFormExtensions(entry, loadDashboard)` in `src/index.ts` automatically generates:
  - `link`: Synchronous Single-SPA lifecycle for the left navigation link.
  - `dashboard`: Asynchronous Single-SPA lifecycle for lazy-loading the form dashboard.

### Component Design System (`src/shared/components`)
- **`ObservationCard`**: Standardized Carbon `Tile` component displaying grouped clinical observations with header icons and optional actions.
- **`DataRow`**: Renders label/value pairs with fallback placeholders (`—`), i18n unit formatting, and clean CSS `:last-child` border handling.
- **`DashboardToolbar`**: Reusable header providing "Last recorded" datetime, SWR refresh trigger, and dynamic "Record" / "Update" form entry actions.
- **`EmptyState`**: Carbon-styled empty state for unrecorded encounter intake with a direct call-to-action button.
- **`useCurrentPath`**: Hook that reacts to `popstate` and OpenMRS SPA navigation events to highlight active left navigation links.

### Data Flow & Safety
- **Data Hooks**:
  - `useFormEncounter`: SWR-based hook requesting `/ws/rest/v1/encounter` filtered by `patient`, `form`, and `order=desc`. Obs items are deterministically indexed by concept UUID.
  - `usePatient`: Framework hook retrieving FHIR R4 Patient resource for fallback demographics (name, age, phone).
  - `useAiimsDemographics`: Domain resource hook unifying encounter obs and patient attributes.
- **Data Integrity**:
  - `tsconfig.json`: Enforced `noImplicitAny: true`.
  - Types: Strictly typed `PatientResource` and `PersonAttribute` interfaces in `src/shared/types.ts`.
  - Fallbacks: Safe attribute extractors in `src/shared/utils/patient-attributes.ts` (`getPatientAge`, `getPatientPhoneNumber`, `getPatientDisplayName`).

---

## 4. Key Identifiers & Concept UUIDs

- **Module Name**: `@aiims/esm-demographics-app`
- **Intake Form UUID**: `80930653-7e80-4bfd-9e29-ec37c334d880` (`AIIMS Visit: Personal Information Intake`)
- **Telephone Attribute Type UUID**: `14d4f066-15f5-102d-96e4-000c29c2a5d7`
- **Concept UUIDs (`src/constants.ts` & `docs/concept_registry.md`)**:
  - `consultantUnit`: `c0010001-0000-0000-0000-000000000001`
  - `consultantName`: `c0010001-0000-0000-0000-000000000002`
  - `patientAge`: `c0010001-0000-0000-0000-000000000004`
  - `husbandName`: `c0010001-0000-0000-0000-000000000007`
  - `husbandAge`: `c0010001-0000-0000-0000-000000000008`
  - `husbandBmi`: `1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
  - `husbandPhone`: `c0010001-0000-0000-0000-000000000011`
  - `educationHusband`: `c0010001-0000-0000-0000-000000000013`
  - `educationWife`: `1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
  - `occupationWife`: `c0010001-0000-0000-0000-000000000014`
  - `occupationHusband`: `c0010001-0000-0000-0000-000000000015`
  - `socioeconomicStatus`: `c0010001-0000-0000-0000-000000000016`

---

## 5. Development & Deployment Procedures

### Build & Test Commands (run in `./aiims-esm-demographics-app`)
```bash
# Run unit test suite (Vitest + JSDOM)
npm run test

# Type check
npm run typescript

# Build production bundle (Rspack)
npm run build
```

### Hot Deployment to Running Docker Environment (run in workspace root)
```bash
python scripts/deploy_demographics.py
```
*What this script does:*
1. Generates/uses versioned bundle directory in frontend container (`/usr/share/nginx/html/openmrs-esm-aiims-demographics-app-1.0.x/`).
2. Copies Rspack `dist/` files into container.
3. Updates `/usr/share/nginx/html/importmap.json` mapping `@aiims/esm-demographics-app` to the new bundle.
4. Updates `/usr/share/nginx/html/routes.registry.json` registering extension slots.

### Publishing Form Schemas
```bash
python scripts/publish_aiims_form.py
```

---

## 6. Established Best Practices & Anti-Patterns to Avoid

1. **CSS vs JS Presentational Logic**:
   - Never use JS index checks (`idx === len - 1`) to toggle borders. Use native CSS `:last-child`.
2. **Backend Query Caveats (Encounter Filtering & Sorting)**:
   - The OpenMRS REST API `/ws/rest/v1/encounter` does **NOT** filter by `form` parameter on the backend (the parameter is ignored), and does not guarantee sorting by `encounterDatetime` descending.
   - Client-side filtering (`e.form?.uuid === formUuid`) and sorting by `encounterDatetime` (`timeB - timeA`) in `useMemo` is **MANDATORY** to prevent picking unassociated or older encounters (such as empty encounters created with `form: null`).
3. **i18n & Localization**:
   - Never hardcode units (e.g. `'years'`, `'kg/m²'`) or string templates (`"Unit " + val`).
   - Use `t('key', fallback, { ...params })` with interpolation.
   - Use framework locale-aware formatters (`formatDatetime`) instead of hardcoding date formats.
4. **Error Handling**:
   - When consuming both FHIR and REST hooks, never ignore `error` from one hook (e.g. `usePatient`). Unify error notifications.
5. **Observation Array Order**:
   - Never assume OpenMRS REST API returns `obs` in chronological or form order without explicit sorting by `obsDatetime`.
6. **Dependencies**:
   - Keep framework packages (`@openmrs/esm-framework`, `@carbon/react`, `swr`) in `peerDependencies` to avoid bundle duplication.
   - Build-only tools like `sass` belong in `devDependencies`, not `peerDependencies`.
7. **Workspace Launching Contract**:
   - When launching `patient-form-entry-workspace` via `launchWorkspace2`, the `workspaceProps` must be passed directly at the top level, NOT wrapped in a `state` object. The workspace component `PatientFormEntryWorkspace` expects to find its props like `props.form.uuid`. Passing it flatly is correct. Ensure `form: { uuid, name, display }` is passed directly as a property of the workspace props object.
8. **Docker Volume Permissions (`openmrs-data` & UID 1001)**:
   - The OpenMRS backend container runs as non-root user `1001`. On container startup, its entrypoint copies distribution files to `/openmrs/data/configuration/...`.
   - If any files in `openmrs-data` were created/modified by root (e.g. via ad-hoc docker commands), the startup script fails with `cp: cannot create regular file ... Permission denied`, putting the backend into an immediate crash/restart loop and causing Nginx to return `502 Bad Gateway`.
   - Fix with: `docker run --rm -v openmrs-distro-referenceapplication_openmrs-data:/data alpine chown -R 1001:root /data && chmod -R u+rwX /data`.
9. **Observation & Encounter Deterministic Sorting**:
   - `useFormEncounter` sorts encounters and observations by `datetime` descending, with a fallback tie-breaker on `uuid` descending (`(b.uuid || '').localeCompare(a.uuid || '')`). This guarantees deterministic ordering even when observations share identical timestamps from the same form submission.
10. **Dashboard Shell Architecture**:
    - All clinical form dashboards must use the reusable `FormDashboardShell` component (`src/shared/components/form-dashboard-shell.component.tsx`). It unifies patient loading, encounter loading, error states, `DashboardToolbar`, `EmptyState`, and form workspace launching.
11. **Observation Value Handling & Deduplication**:
    - Use `getOptionalObsValue(conceptUuid)` instead of `getObsValue(...) || undefined` to safely handle empty vs falsy values.
    - `getObsValues` automatically deduplicates identical observation values for multi-select concepts using a `Set`.
12. **Routes & Registry Synchronization**:
    - `scripts/sync_routes.py` verifies or auto-syncs `routes.json` with `FORM_REGISTRY` in `constants.ts` to prevent extension drift.


### Forms Implemented
1. **Form 1: AIIMS Visit: Personal Information Intake** (`80930653-7e80-4bfd-9e29-ec37c334d880`)
   - Path: `aiims-demographics`
   - Clinical context, patient profile, husband profile, socioeconomic status (Kuppuswamy).
2. **Form 2: AIIMS Visit: Type of Infertility** (`80930653-7e80-4bfd-9e29-ec37c334d881`)
   - Path: `aiims-infertility-type`
   - Infertility classification (Primary / Secondary), duration of marriage, and duration of infertility.
3. **Form 3: AIIMS Visit: Obstetric History** (`80930653-7e80-4bfd-9e29-ec37c334d882`)
   - Path: `aiims-obstetric-history`
   - Obstetric indicators: Gravida (G), Parity (P), Living Children (L), Abortion/Miscarriage (A), Ectopic Pregnancy.
4. **Form 4: AIIMS Visit: Menstrual History** (`80930653-7e80-4bfd-9e29-ec37c334d883`)
   - Path: `aiims-menstrual-history`
   - Menstrual cycle pattern: Regular vs. Irregular periods.
     - Nested skip logic: selecting "Irregular periods" conditionally displays "Type of Irregular periods" (Oligomenorrhea, Polymenorrhea).
   - Last menstrual period 1st day (LMP Date).
   - Flow of Menstrual cycle: Normal, Hypomenorrhoea, Amenorrhoea, Heavy Menstrual Bleeding (HMB).
     - Nested skip logic: selecting "Amenorrhoea" conditionally displays "Type of Amenorrhoea" (Primary, Secondary).
   - Card UI dynamically presents nested sub-types when recorded.
5. **Form 5: AIIMS Visit: Female Factor** (`80930653-7e80-4bfd-9e29-ec37c334d884`)
   - Path: `aiims-female-factor`
   - Diagnostic categories: Multi-select checkboxes for Tubal factor, Diminished ovarian reserve, Endometriosis, PCOS, Uterine factor, Advanced maternal age, Others.
   - Multi-level nested skip logic:
     - Tubal factor -> Tubal block (unilateral/bilateral), Previous ectopic, Hydrosalpinx, Hematosalpinx.
     - Diminished ovarian reserve -> Borderline vs. POSEIDON criteria -> POSEIDON Groups (1a, 1b, 2a, 2b, 3, 4).
     - Endometriosis -> ASRM, EFI.
     - PCOS -> Rotterdam Phenotypes (A, B, C, D).
     - Uterine factor -> Adenomyosis, Fibroids, Polyps, Asherman's, Septate, Unicornuate.
     - Others -> Hypogonadotropic hypogonadism, Oncofertility, H/O Tuberculosis, Turner Mosaic, Unexplained, Serodiscordant.
     - Clinical notes textarea for custom remarks.
   - Observation card with Carbon tags and detail rows.
6. **Form 6: AIIMS Visit: Male Factor** (`80930653-7e80-4bfd-9e29-ec37c334d885`)
   - Path: `aiims-male-factor`
   - Diagnostic categories: Multi-select checkboxes for Azoospermia, Oligozoospermia, Asthenozoospermia, Teratozoospermia, Unexplained infertility, Erectile dysfunction, Ejaculatory Dysfunction, Retrograde Ejaculation, Oligoasthenoteratozoospermia (OATS).
   - Nested skip logic:
     - Selecting "Azoospermia" conditionally reveals Azoospermia Details (Obstructive vs. Non-Obstructive).
   - Clinical notes textarea for semen analysis parameters or surgical remarks.
   - Observation card with teal Carbon tags, detail rows, and GenderMale icon.
7. **Form 7: AIIMS Visit: Male Hormone and Surgery** (`80930653-7e80-4bfd-9e29-ec37c334d886`)
   - Path: `aiims-male-hormone-surgery`
   - Hormonal evaluation: Follicle Stimulating Hormone (FSH) in `mIU/mL`, Serum Testosterone in `ng/dL`.
   - Surgical & biopsy findings: Textarea for Testicular Biopsy report and surgical sperm retrieval notes (Micro-TESE / TESE / PESA).
   - Observation card with numeric rows, localized units, and Scalpel icon.
8. **Form 8: AIIMS Visit: Previous OI and IUI** (`80930653-7e80-4bfd-9e29-ec37c334d887`)
   - Path: `aiims-previous-oi-iui`
   - Prior assisted reproductive technology (ART) interventions across 3 modalities:
     - Previous Ovulation Induction (OI alone): Letrozole, hMG, Clomiphene, hMG + Clomiphene, Multiple OVI; Dose, Cycles, Year.
     - Previous Ovulation Induction & IUI (OI + IUI): Letrozole, hMG, Clomiphene, hMG + Clomiphene; Dose, Cycles, Year.
     - Failed In Vitro Fertilization (Failed IVF): Failed cycles count and clinical notes textarea.
   - Dynamic AMPATH skip logic for conditional medication/cycle entry.
   - Observation card with Medication icon, teal/purple Carbon tags, and localized unit interpolation.
9. **Form 9: AIIMS Visit: Previous Surgery** (`80930653-7e80-4bfd-9e29-ec37c334d888`)
   - Path: `aiims-previous-surgery`
   - Surgical history for gynecological & fertility interventions:
     - Previous Surgery Performed (Yes / No).
     - Surgical Approach: Laparoscopy, Open, Laparoscopy converted to open.
     - Year / Date of Surgery.
     - Categorized procedures with conditional laterality (Right / Left / Bilateral):
       - Uterine: Adenomyomectomy, Myomectomy, Isthmocele Repair.
       - Endometriosis (with laterality): Cystectomy, Bipolar Ablation, Argon Plasma Coagulation (APC), Drainage, Sclerotherapy, Oophorectomy.
       - Ovarian (with laterality): Dermoid/Mature Teratoma, Simple Cyst, Paraovarian Cyst, Cyst Aspiration, Oophorectomy, Cystectomy.
       - Fallopian Tube (with laterality): Chromopertubation, Tubal cannulation, Salpingectomy, Fimbrioplasty, Tubal clipping, Recanalization.
       - Peritoneal: Adhesiolysis, Peritonectomy.
     - Clinical narrative: Intra-operative findings and surgical notes textareas.
   - Observation card with `Cut` icon from Carbon React and color-coded tags displaying procedures paired with their laterality.
   - Laterality extraction: `PROCEDURE_TO_LATERALITY_MAP` maps both concept UUIDs and localized display labels to respective laterality question UUIDs, formatted cleanly as `Procedure (Right|Left|Bilateral)`.

---

## 7. Next Steps & Extension Roadmap

- [x] Register Form 1: Personal Information Intake (`demographics`).
- [x] Register Form 2: Type of Infertility Intake (`infertility-type`).
- [x] Register Form 3: Obstetric History (`obstetric-history`).
- [x] Register Form 4: Menstrual History (`menstrual-history`).
- [x] Register Form 5: Female Factor Infertility (`female-factor`).
- [x] Register Form 6: Male Factor Infertility (`male-factor`).
- [x] Register Form 7: Male Hormone & Surgery (`male-hormone-surgery`).
- [x] Register Form 8: Previous OI and IUI (`previous-oi-iui`).
- [x] Register Form 9: Previous Surgery (`previous-surgery`).
- [ ] Register Form 10: Anthropometry & Clinical Examination.
- [ ] Register Form 11: Ultrasound & Imaging.





