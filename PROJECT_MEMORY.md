# Project Memory: AIIMS OpenMRS 3.x Platform

This file serves as the persistent project-level memory and source of truth across AI coding sessions for the AIIMS OpenMRS 3.x project.

---

## 1. Project Mission & System Overview

- **Objective**: Develop and maintain clinical intake and specialty encounter microfrontends for AIIMS on OpenMRS 3.x (O3).
- **Core Frontend Module**: `@aiims/esm-demographics-app` (located in `./aiims-esm-demographics-app`).
- **Goal**: Scalable, configuration-driven architecture supporting 32+ clinical forms with zero boilerplate for new dashboards and extension points.

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
- **Modular Config (`src/config/`)**:
  - `src/config/form-uuids.ts`: Isolated form UUIDs and display names (SRP).
  - `src/config/concepts.ts`: Concept UUID dictionary and type definitions (`KnownConceptUuid`, `ConceptUuid`).
  - `src/config/form-registry.ts`: `FORM_REGISTRY` entries and lookup helpers (`getFormRegistryEntry`, `getFormUuid`, `getFormName`).
  - `src/constants.ts`: Zero-breaking-change re-export shim preserving existing module imports.
- **Form Extension Assembly (`src/generated-form-extensions.ts` & `src/index.ts`)**:
  - `src/generated-form-extensions.ts`: Auto-generated alongside `src/routes.json` via `scripts/generate-routes.ts`. Builds lazy `FORM_MODULES` loaders, Single-SPA extension lifecycles (`createFormExtensions`), and static named exports required by Single-SPA.
  - `src/index.ts`: Slim re-export module (`export * from './generated-form-extensions'`) with zero manual per-form boilerplate.
- **Automated Route & Extension Synchronization (`scripts/generate-routes.ts`)**:
  - Single Source of Truth: `src/routes.json` and `src/generated-form-extensions.ts` are generated directly from `FORM_REGISTRY`.
  - Automated via `npm run generate-routes` and wired to the `prebuild` npm lifecycle hook. Manual editing is deprecated.
- **Form Scaffolding CLI (`scripts/create-form.ts`)**:
  - `npm run create-form -- <key> "<Form Name>" [--icon=IconName] [--keep-on-fail]`:
  - Automatically generates feature folder (`src/<key>/`) with 5 typed starter files (`resource`, `card`, `dashboard`, `test`, `index`).
  - Appends UUID to `src/config/form-uuids.ts`, entry to `src/config/form-registry.ts`, and 8 localized keys to `translations/en.json`.
  - Automatically regenerates routes and extensions via `generate-routes`.
  - Runs transactional verification (`tsc` + `vitest`) with automatic rollback on error.

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
- **Telephone Attribute Type UUID**: `14d4f066-15f5-102d-96e4-000c29c2a5d7`
- **Clinical Form UUIDs**:
  - Form 1 (`demographics`): `80930653-7e80-4bfd-9e29-ec37c334d880` (`AIIMS Visit: Personal Information Intake`)
  - Form 2 (`infertility-type`): `80930653-7e80-4bfd-9e29-ec37c334d881` (`AIIMS Visit: Type of Infertility`)
  - Form 3 (`obstetric-history`): `80930653-7e80-4bfd-9e29-ec37c334d882` (`AIIMS Visit: Obstetric History`)
  - Form 4 (`menstrual-history`): `80930653-7e80-4bfd-9e29-ec37c334d883` (`AIIMS Visit: Menstrual History`)
  - Form 5 (`female-factor`): `80930653-7e80-4bfd-9e29-ec37c334d884` (`AIIMS Visit: Female Factor`)
  - Form 6 (`male-factor`): `80930653-7e80-4bfd-9e29-ec37c334d885` (`AIIMS Visit: Male Factor`)
  - Form 7 (`previous-oi-iui`): `80930653-7e80-4bfd-9e29-ec37c334d887` (`AIIMS Visit: Previous OI and IUI`)
  - Form 8 (`previous-surgery`): `80930653-7e80-4bfd-9e29-ec37c334d888` (`AIIMS Visit: Previous Surgery`)
  - Form 9 (`male-hormone-surgery`): `80930653-7e80-4bfd-9e29-ec37c334d886` (`AIIMS Visit: Male Hormone and Surgery`)
  - Form 10 (`past-medical-history`): `80930653-7e80-4bfd-9e29-ec37c334d889` (`AIIMS Visit: Past Medical History`)
  - Form 11 (`family-history`): `80930653-7e80-4bfd-9e29-ec37c334d88a` (`AIIMS Visit: Family History`)
  - Form 12 (`tuberculosis-history`): `80930653-7e80-4bfd-9e29-ec37c334d88b` (`AIIMS Visit: Tuberculosis History`)
  - Form 13 (`investigation-ultrasound`): `80930653-7e80-4bfd-9e29-ec37c334d88c` (`AIIMS Visit: Investigation Ultrasound`)
  - Form 14 (`female-blood-hormone`): `80930653-7e80-4bfd-9e29-ec37c334d88d` (`AIIMS Visit: Investigation Female Blood Hormone`)
  - Form 15 (`female-surgical-procedure`): `80930653-7e80-4bfd-9e29-ec37c334d88e` (`AIIMS Visit: Investigation Female Surgical Procedure`)
  - Form 16 (`procedure-embryo-transfer`): `80930653-7e80-4bfd-9e29-ec37c334d88f` (`AIIMS Visit: Procedure Embryo Transfer`)
  - Form 17 (`investigation-female-procedure-biopsy`): `80930653-7e80-4bfd-9e29-ec37c334d890` (`AIIMS Visit: Investigation Female Procedure Biopsy`)
  - Form 18 (`investigation-male-semen`): `80930653-7e80-4bfd-9e29-ec37c334d891` (`AIIMS Visit: Investigation Male Semen`)
  - Form 19 (`ovarian-stimulation-protocol`): `80930653-7e80-4bfd-9e29-ec37c334d897` (`AIIMS Visit: Type of Ovarian Stimulation Protocol`)
  - Form 20 (`dose-of-drugs`): `80930653-7e80-4bfd-9e29-ec37c334d898` (`AIIMS Visit: Dose of Drugs`)
  - Form 21 (`adjuvant-drug`): `80930653-7e80-4bfd-9e29-ec37c334d899` (`AIIMS Visit: Adjuvant Drug`)
  - Form 22 (`trigger-details`): `80930653-7e80-4bfd-9e29-ec37c334d892` (`AIIMS Visit: Trigger Details`)
  - Form 23 (`ovum-pick-up-details`): `80930653-7e80-4bfd-9e29-ec37c334d893` (`AIIMS Visit: Ovum Pick Up Details`)
  - Form 24 (`procedure`): `80930653-7e80-4bfd-9e29-ec37c334d895` (`AIIMS Visit: Procedure`)
  - Form 25 (`lab-procedure-insemination`): `80930653-7e80-4bfd-9e29-ec37c334d894` (`AIIMS Visit: Lab Procedure of Insemination`)
  - Form 26 (`sperm-quality-assessment`): `80930653-7e80-4bfd-9e29-ec37c334d896` (`AIIMS Visit: Sperm Quality Assessment`)
  - Form 27 (`embryo-assessment`): `37e59734-dac9-4332-ba27-f1053d189089` (`AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst`)
  - Form 28 (`fertilisation-details`): `37e59734-dac9-4332-ba27-f1053d189090` (`AIIMS Visit: Fertilisation Details`)
  - Form 29 (`embryo-grading-day3`): `37e59734-dac9-4332-ba27-f1053d189091` (`AIIMS Visit: Embryo Grading Day 3`)
  - Form 30 (`embryos-frozen`): `37e59734-dac9-4332-ba27-f1053d189092` (`AIIMS Visit: Embryos Frozen`)
  - Form 31 (`fresh-et-details`): `37e59734-dac9-4332-ba27-f1053d189093` (`AIIMS Visit: Fresh Embryo Transfer Details`)
  - Form 32 (`add-procedure-art`): `37e59734-dac9-4332-ba27-f1053d189094` (`AIIMS Visit: Additional Procedures in Assisted Reproductive Technology`)
  - Form 33 (`post-ivf-investigation`): `639def6a-b768-4db5-a0b3-548452b0b8ed` (`AIIMS Visit: Post-InVitro Fertilisation Investigation`)
  - Form 34 (`examination-infant`): `1eec08ba-b346-4f61-9f17-95e65f2e6c87` (`AIIMS Visit: Examination Infant`)
  - Consolidated Dashboard (`ivf-summary`): `aiims-ivf-summary` (Order 0 anchor in patient-chart-dashboard-slot, single unified encounter view across all 34 forms)


- **Core Concept UUIDs (`src/constants.ts` & `docs/concept_registry.md`)**:

  - `consultantUnit`: `c0010001-0000-0000-0000-000000000001`
  - `consultantName`: `c0010001-0000-0000-0000-000000000002`
  - `patientAge`: `c0010001-0000-0000-0000-000000000004`
  - `husbandName`: `c0010001-0000-0000-0000-000000000007`
  - `husbandAge`: `c0010001-0000-0000-0000-000000000008`
  - `patientBmi`: `c0010001-0000-0000-0000-000000000012`
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

# Fast sanity check (verifies form schemas, concept dictionary, i18n audit, tsc in ~10s)
npm run pre-flight

# End-to-end headless smoke test robot (verifies all registered AIIMS clinical dashboards in real chart)
npm run test:e2e

# Run E2E smoke test for a single form
npm run test:e2e -- --form=aiims-add-procedure-art

# Run E2E smoke test with visible browser window
npm run test:e2e -- --headed

# Concept dictionary validation (verifies all unique clinical concept UUIDs and concept_numeric metadata)
npm run validate:concepts

# Clinical form validation (verifies all registered form schemas exist on backend and in forms/)
npm run validate:forms

# Translation completeness check (detects missing keys & empty values via i18next-parser)
npm run audit:i18n

# Build production bundle (Rspack)
npm run build

# One-Click Deploy & Verify Pipeline (docker check, validate:forms, tsc, vitest, build, deploy, & HTTP probe)
npm run deploy:local

# Fast deploy (skipping unit tests for rapid CSS/styling iterations)
npm run deploy:local:fast
```

### Hot Deployment to Running Docker Environment
```bash
# Recommended: Full automated pipeline (pre-flight + quality gates + deploy + probe)
python scripts/deploy_pipeline.py

# Low-level hot-deploy script (invoked automatically by deploy_pipeline.py)
python scripts/deploy_demographics.py
```
*What the pipeline script does:*
1. **Docker Pre-flight**: Verifies `frontend`, `backend`, `gateway`, and `db` containers are active and healthy.
2. **Quality Gate (Form Schemas)**: Runs `npm run validate:forms` ensuring every registered form has an active schema published on the backend.
3. **Quality Gate (Type Check)**: Runs `npm run typescript` (tsc), failing on any compilation error.
4. **Quality Gate (Unit Tests)**: Runs `npm run test` (Vitest), aborting if regressions occur.
5. **Production Build**: Triggers `generate-routes` (55 Single-SPA extensions into `src/routes.json`) and compiles via Rspack.
6. **Hot-Deployment**: Increments version (e.g. `1.0.x`), transfers tar bundle to frontend container, updates `importmap.json` and `routes.registry.json`, and reloads Nginx.
7. **Live Verification Probe**: Sends HTTP probe to `http://localhost/openmrs/spa/importmap.json` to confirm HTTP 200 OK.

---

### Standard End-to-End Workflow for Adding a New Clinical Form

Every clinical form in the AIIMS OpenMRS 3.x distribution consists of **two distinct subsystems**:
1. **The AMPATH Form Schema** (backend JSON schema in `forms/`, registered in `openmrs.form` and `clob_datatype_storage`, loaded by `openmrs-esm-form-engine-app` when clicking "Record" / "Update").
2. **The Microfrontend Summary Dashboard** (frontend React card in `src/<form-key>/`, Single-SPA dashboard extension in `src/routes.json`, reading encounters/obs via `useFormEncounter`).

Follow this 6-stage lifecycle to add new clinical forms without errors:

#### Stage 1: Concept Dictionary Modeling & MariaDB Registration
1. Define concepts and answers in `scripts/setup_aiims_concepts.py`.
2. **CRITICAL OpenMRS Rule**: Every concept with `datatype_id = 1` (`Numeric`) **MUST** have a corresponding entry in `concept_numeric` (`allow_decimal`, `low_absolute`, `hi_absolute`, `units`). If omitted, `ObsValidator` throws `NullPointerException` (HTTP 500) upon saving observations.
3. Run `python scripts/setup_aiims_concepts.py` to sync MariaDB and regenerate `scripts/register_aiims_concepts.sql`.
4. Add concept UUIDs to `src/config/concepts.ts`.
5. Run `npm run validate:concepts` to verify all UUIDs and `concept_numeric` metadata against the backend.

#### Stage 2: AMPATH Form Schema Creation (`forms/`)
1. Create `forms/aiims_<form_key>.json` with clinical sections, pages, and questions mapped to concept UUIDs.
2. Ensure rendering types match datatypes (`number`, `text`, `textarea`, `radio`, `select`).
3. Use standard ASCII hyphens `-` for section and question labels (avoid Unicode dashes `–` which break on Windows cp1252 SQL pipes).

#### Stage 3: Backend Form Publishing (`publish_aiims_form.py`)
1. Register the new form in `FORMS_TO_PUBLISH` in `scripts/publish_aiims_form.py` with its schema path and target UUID.
2. Run `python scripts/publish_aiims_form.py`.
3. Run `npm run validate:forms` to confirm `GET /openmrs/ws/rest/v1/o3/forms/<uuid>` returns HTTP 200 with valid pages.

#### Stage 4: Frontend Microfrontend Scaffolding (`create-form`)
1. Run scaffolding CLI:
   ```bash
   npm run create-form -- <form-key> "<Form Display Name>" --icon=<CarbonIconName>
   ```
2. The CLI automatically:
   - Registers form UUID in `src/config/form-uuids.ts`.
   - Appends entry to `FORM_REGISTRY` in `src/config/form-registry.ts`.
   - Regenerates `src/routes.json` and `src/generated-form-extensions.ts`.
   - Scaffolds `src/<form-key>/` with 5 typed starter files (`resource`, `card`, `dashboard`, `test`, `index`).
   - Appends baseline translation keys to `translations/en.json`.

#### Stage 5: Frontend Customization & Localization
1. **Hook (`<form-key>.resource.ts`)**: Implement typed data interface and extraction logic using `useFormEncounter` and `getOptionalObsValue`.
2. **Card (`<form-key>-card.component.tsx`)**: Implement Carbon `ObservationCard` sections with localized labels and units.
3. **Translations (`translations/en.json`)**: Add all display strings and run `npm run audit:i18n` to ensure 100% completeness.
4. **Unit Tests (`<form-key>.test.tsx`)**: Verify empty state, recorded observation rendering, and type contracts.

#### Stage 6: Quality Gates, Deployment & Interactive E2E Verification
1. Run automated pipeline:
   ```bash
   npm run deploy:local
   ```
   *(Executes Docker pre-flight -> `validate:forms` -> `tsc` -> `vitest` -> Rspack build -> hot-deploy -> HTTP 200 probe)*.
2. Run E2E smoke test robot to verify live mounting in patient chart:
   ```bash
   npm run test:e2e -- --form=aiims-<form-key>
   ```
3. Open live patient chart, click **"Record"**, fill sample data, and click **"Save"** to verify complete round-trip intake.


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
8. **Form 8: AIIMS Visit: Previous OVI and IUI** (`80930653-7e80-4bfd-9e29-ec37c334d887`)
   - Path: `aiims-previous-oi-iui`
   - Prior assisted reproductive technology (ART) interventions across 3 modalities:
     - Previous Ovulation Induction (OVI alone): Letrozole, hMG, Clomiphene, hMG + Clomiphene, Multiple OVI; Dose, Cycles, Year.
     - Previous Ovulation Induction & IUI (OVI + IUI): Letrozole, hMG, Clomiphene, hMG + Clomiphene; Dose, Cycles, Year.
     - Failed In Vitro Fertilization (Failed IVF): Failed cycles count, Previous IVF procedure date (`c0010001-...-0194`), Previous IVF details notes (`c0010001-...-0193`), and clinical notes textarea.
   - Dynamic AMPATH skip logic for conditional medication/cycle/IVF entry.
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
10. **Form 10: AIIMS Visit: Past Medical History** (`80930653-7e80-4bfd-9e29-ec37c334d889`)
    - Path: `aiims-past-medical-history`
    - Coded medical conditions from SNOMED CT covering 34 conditions (diabetes, hypertension, TB, endometriosis, etc.) plus unlisted/other conditions.
    - Conditional skip logic: selecting "Other medical disease" reveals `medical_diseases_others` notes/free-text.
    - Observation card with Carbon tags and detail row for other conditions.
11. **Form 11: AIIMS Visit: Family History** (`80930653-7e80-4bfd-9e29-ec37c334d88a`)
    - Path: `aiims-family-history`
    - Hereditary and familial condition tracking across 6 distinct family members: Father, Mother, Husband, Brother, Maternal Grandmother, Maternal Grandfather.
    - Uses identical 35 SNOMED-CT mapped medical disease select options as Past Medical History for each member.
    - Conditional skip logic: selecting "Other medical disease" reveals member-specific notes/textarea.
    - Observation card with `PedestrianFamily` Carbon icon, individual family member rows with teal disease tags and notes.
12. **Form 12: AIIMS Visit: Tuberculosis History** (`80930653-7e80-4bfd-9e29-ec37c334d88b`)
    - Path: `aiims-tuberculosis-history`
    - Tuberculosis diagnosis, site classification (with SNOMED-CT mapped terms for abdomen, bone, cervical lymphadenitis, eye, genital organs, pulmonary, GI tract, tuberculous abscess, and other sites), and anti-tubercular therapy (ATT) start date, count, duration, and clinical notes.
    - Observation card with `Microscope` Carbon icon, magenta tags for sites, formatted dates, and detailed regimen remarks.
13. **Form 13: AIIMS Visit: Investigation Ultrasound** (`80930653-7e80-4bfd-9e29-ec37c334d88c`)
    - Path: `aiims-investigation-ultrasound`
    - Pelvic ultrasound evaluation: Total Antral Follicle Count (AFC), Volume Right Ovary (`cm³`), Volume Left Ovary (`cm³`), and Ultrasound clinical remarks/notes.
    - Observation card with `Waveform` Carbon icon and localized metric formatting.
14. **Form 14: AIIMS Visit: Investigation Female Blood Hormone** (`80930653-7e80-4bfd-9e29-ec37c334d88d`)
    - Path: `aiims-female-blood-hormone`
    - Endocrine and ovarian reserve profile: Anti-Mullerian Hormone (AMH) in `ng/mL`, Day 2 Follicle-Stimulating Hormone (FSH) in `mIU/mL`, Day 2 Luteinizing Hormone (LH) in `mIU/mL`, Thyroid-Stimulating Hormone (TSH) in `uIU/mL`, and Serum Prolactin in `ng/mL`.
    - Observation card with `Chemistry` Carbon icon and strictly localized unit interpolation.
15. **Form 15: AIIMS Visit: Investigation Female Surgical Procedure** (`80930653-7e80-4bfd-9e29-ec37c334d88e`)
    - Path: `aiims-female-surgical-procedure`
    - Tripartite surgical & ultrasound investigation:
      - **Hysteroscopy**: Ostia (deep seated, normal, peri-ostial adhesions, ostia not seen), Endometrium (normal, pale, micropolyps, thin, congested, fibrosis, polypoidal), Endometrial Cavity (normal, polyp, septum, adhesion, fibroid, subseptate, tubular, adequate), Cervical Canal Direction (straight, left, right, adhesions, anteverted, retroverted), Dimensions, Operative Hysteroscopy (uterine polypectomy, metroplasty, septal resection, myomectomy, adhesiolysis, PRP/stem cell instillation).
      - **TVS Findings**: Uterine dimensions & volume, Day of cycle, Adenomyosis, Calcifications, Focal adenomyoma, Fibroids (presence, count, location, dimensions, FIGO 0-8 and 2-5), Endometrial cavity morphology (3D, 4D, adhesions, fluid), Endometrial-myometrial junction, Septate findings (angle in degrees, septum length in cm), Anomalies (Bicornuate right/left volumes, Unicornuate volume), Polyps (presence, count, dimensions), Antral Follicle Count (right/left), Ovary dimensions, Endometriomas (count, accessible/inaccessible follicles, dimensions), Hydrosalpinx (right/left/both/absent, dimensions), Day 14-16 Endometrial thickness (mm) & pattern (trilaminar, diffuse, fluid), and Ovarian cysts (Dermoid, Haemorrhagic, Corpus luteum, Paro-ovarian with respective dimensions).
      - **Endometrial Zones**: Zone 1 (Myometrium surrounding endometrium), Zone 2 (Hyperechoic edge), Zone 3 (Internal hypoechoic zone), Zone 4 (Endometrial cavity) in `cm`, and surgical procedure remarks.
    - Responsive grid of 7 categorized `ObservationCard`s with `Cut`, `Activity`, `ReportData`, `Scalpel`, `Events`, and `Waveform` Carbon icons.
16. **Form 16: AIIMS Visit: Procedure Embryo Transfer** (`80930653-7e80-4bfd-9e29-ec37c334d88f`)
    - Path: `aiims-procedure-embryo-transfer`
    - Procedure and trial embryo transfer evaluation:
      - **Mock Embryo Transfer**: Easy (with Cusco's, with Sim's), Difficult. Dynamic AMPATH skip logic conditionally showing speculum type when Easy.
      - **Cervical Canal Direction**: Deviated to Left, Deviated to Right, Straight, Acutely anteverted, Anteverted, Retroverted.
      - **Procedure Remarks**: Intra-procedure clinical notes / textarea.
    - Observation card with Carbon `Activity` icon, conditional display of speculum type, and standardized empty placeholder handling.
17. **Form 17: AIIMS Visit: Investigation Female Procedure Biopsy** (`80930653-7e80-4bfd-9e29-ec37c334d890`)
    - Path: `aiims-investigation-female-procedure-biopsy`
    - Endometrial biopsy & tuberculosis investigation:
      - **Endometrial Aspiration Histopathological Examination (EAHPE)**: Multi-select findings for endometrial phase and pathological signs (Atrophic, Benign, Proliferative, Disordered proliferative, Early/Mid/Late secretory, Endometrial hyperplasia with/without atypia, Epitheloid cells, Granuloma, Granuloma Present/Absent, Fragmented Endometrial Glands, Interval phase).
      - **Endometrial Aspiration Polymerase Chain Reaction (PCR)**: Positive, Negative, Not done, Not available.
      - **Endometrial Aspiration Acid Fast Bacillus (AFB)**: Positive, Negative, Not done, Not available.
      - **Biopsy Remarks**: Free-text clinical and histopathology notes.
    - Observation card with Carbon `Microscope` icon and comma-separated multi-select aggregation.
18. **Form 18: AIIMS Visit: Investigation Male Semen** (`80930653-7e80-4bfd-9e29-ec37c334d891`)
    - Path: `aiims-investigation-male-semen`
    - Diagnostic and semen analysis parameters:
      - **Husband Semen Analysis Volume**: Numeric volume in `mL`.
      - **Husband Semen Analysis Count**: Numeric sperm count in `million/mL`.
      - **Husband Semen Analysis Motility finding**: Multi-select options (`Few motile`, `Immotile`).
      - **Husband Semen Analysis Motility (Total / Progressive)**: Text / percentage detailing total and progressive motility.
      - **Sperm Morphology**: Morphology evaluation notes.
      - **Remarks**: Textarea for semen analysis clinical notes and interpretations.
    - Observation card with Carbon `Chemistry` icon and localized units (`mL`, `million/mL`).

19. **Form 19: AIIMS Visit: Type of Ovarian Stimulation Protocol** (`80930653-7e80-4bfd-9e29-ec37c334d897`)
    - Path: `aiims-ovarian-stimulation-protocol`
    - Ovarian stimulation protocol selection (Antagonist, Agonist Long, Agonist Short, Microdose Flare, Modified Natural, Mild Stimulation, PPOS, DuoStim) and clinical notes.
20. **Form 20: AIIMS Visit: Dose of Drugs** (`80930653-7e80-4bfd-9e29-ec37c334d898`)
    - Path: `aiims-dose-of-drugs`
    - Gonadotropin dosages (FSH, hMG, rLH starting and total doses in IU), downregulation days, Cetrotide start day and total dose (mg), total stimulation days, and remarks.
21. **Form 21: AIIMS Visit: Adjuvant Drug** (`80930653-7e80-4bfd-9e29-ec37c334d899`)
    - Path: `aiims-adjuvant-drug`
    - Growth hormone co-treatment (Yes/No), daily dose (IU), duration (days), and clinical notes.
22. **Form 22: AIIMS Visit: Trigger Details** (`80930653-7e80-4bfd-9e29-ec37c334d892`)
    - Path: `aiims-trigger-details`
    - Ovulation trigger agents (rhCG, urinary hCG, GnRH agonist, dual trigger), trigger dose, date and time, follicle counts on trigger day (14-22mm, 16-22mm), endometrial thickness (mm) and pattern, estradiol (pg/mL), progesterone (ng/mL).
23. **Form 23: AIIMS Visit: Ovum Pick Up Details** (`80930653-7e80-4bfd-9e29-ec37c334d893`)
    - Path: `aiims-ovum-pick-up-details`
    - Date and time of OPU, interval between trigger and OPU, total oocytes retrieved, FORT and FOI indices, oocyte-cumulus complex grades (I, II, III), maturity distribution (MII, MI, GV), abnormal oocyte count/types, and remarks.
24. **Form 24: AIIMS Visit: Procedure** (`80930653-7e80-4bfd-9e29-ec37c334d895`)
    - Path: `aiims-procedure`
    - Surgical sperm retrieval procedures (PESA, TESA, Ejaculated, Frozen, Donor Semen, Husband Semen) and additional IVF procedures (Laser Assisted Hatching LAH, PICSI, Artificial Oocyte Activation AOA) with clinical remarks.
25. **Form 25: AIIMS Visit: Lab Procedure of Insemination** (`80930653-7e80-4bfd-9e29-ec37c334d894`)
    - Path: `aiims-lab-procedure-insemination`
    - Insemination methodology (Conventional IVF, ICSI, Half IVF + Half ICSI), injection/insemination time, and remarks.
26. **Form 26: AIIMS Visit: Sperm Quality Assessment** (`80930653-7e80-4bfd-9e29-ec37c334d896`)
    - Path: `aiims-sperm-quality-assessment`
    - Post-wash semen parameters on OPU day: sperm concentration (million/mL), progressive motility (%), and clinical remarks.
27. **Form 27: AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst** (`37e59734-dac9-4332-ba27-f1053d189089`)
    - Path: `aiims-embryo-assessment`
    - Longitudinal embryology tracking from Day 1 to Day 6: 2PN fertilization count/grade, cleavage counts and Istanbul/Veeck coded grades for Days 2-3, Day 4 morula grades, and Days 5-6 blastocyst counts with standard Gardner scale coded grades (`1AA`-`6CC`).
28. **Form 28: AIIMS Visit: Fertilisation Details** (`37e59734-dac9-4332-ba27-f1053d189090`)
    - Path: `aiims-fertilisation-details`
    - Total oocytes fertilised, fertilisation rate (%), Day 2 cleaved embryos, cleavage rate (%), Day 3 cleaved embryos, Day 5 blastocyst count, and embryology notes.
29. **Form 29: AIIMS Visit: Embryo Grading Day 3** (`37e59734-dac9-4332-ba27-f1053d189091`)
    - Path: `aiims-embryo-grading-day3`
    - Day 3 cleavage stage grading breakdown for Grade 1, Grade 2, Grade 3, and Grade 4 embryos with embryology notations and laboratory remarks.
30. **Form 30: AIIMS Visit: Embryos Frozen** (`37e59734-dac9-4332-ba27-f1053d189092`)
    - Path: `aiims-embryos-frozen`
    - Cryopreservation and vitrification records: Day 3 vitrified embryos with straw/grade breakdown (Grade A, B, C), Day 5 blastocysts vitrified with Gardner grades, and vitrification notes.
31. **Form 31: AIIMS Visit: Fresh Embryo Transfer Details** (`37e59734-dac9-4332-ba27-f1053d189093`)
    - Path: `aiims-fresh-et-details`
    - Fresh ET decision (Yes/No), conditional cancellation etiology (20 clinical indications including OHSS risk, thin/thick endometrium, elevated P4) with free-text other notes, or transfer metrics (transfer date, embryo day, number of embryos, grades, endometrial thickness in mm, transfer difficulty Easy/Difficult, catheter tip blood, and clinical remarks).
32. **Form 32: AIIMS Visit: Additional Procedures in Assisted Reproductive Technology** (`37e59734-dac9-4332-ba27-f1053d189094`)
    - Path: `aiims-add-procedure-art`
    - Adjuvant and add-on procedures in ART: multi-select checkboxes for Platelet Rich Plasma (PRP), Endometrial Injury (Endo Injury), Granulocyte Colony Stimulating Factor (G-CSF), and Embryo Glue, with procedure date and clinical notes/remarks.

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
- [x] Register Form 10: Past Medical History (`past-medical-history`).
- [x] Register Form 11: Family History (`family-history`).
- [x] Register Form 12: Tuberculosis History (`tuberculosis-history`).
- [x] Register Form 13: Investigation Ultrasound (`investigation-ultrasound`).
- [x] Register Form 14: Investigation Female Blood Hormone (`female-blood-hormone`).
- [x] Register Form 15: Investigation Female Surgical Procedure (`female-surgical-procedure`).
- [x] Register Form 16: Procedure Embryo Transfer (`procedure-embryo-transfer`).
- [x] Register Form 17: Investigation Female Procedure Biopsy (`investigation-female-procedure-biopsy`).
- [x] Register Form 18: Investigation Male Semen (`investigation-male-semen`).
- [x] Register Form 19: Type of Ovarian Stimulation Protocol (`ovarian-stimulation-protocol`).
- [x] Register Form 20: Trigger Details (`trigger-details`).
- [x] Register Form 21: Ovum Pick Up Details (`ovum-pick-up-details`).
- [x] Register Form 22: Procedure (`procedure`) - Unified Sperm Retrieval & Additional IVF Procedures.
- [x] Register Form 23: Lab Procedure of Insemination (`lab-procedure-insemination`).
- [x] Register Form 24: Sperm Quality Assessment (`sperm-quality-assessment`) - Post Wash Sperm Concentration & Motility on OPU Day.
- [x] Register Form 25: Dose of Drugs (`dose-of-drugs`).
- [x] Register Form 26: Adjuvant Drug (`adjuvant-drug`).
- [x] Register Form 27: Assessment of Fertilization, Embryo & Blastocyst (`embryo-assessment`).
- [x] Register Form 28: Fertilisation Details (`fertilisation-details`).
- [x] Register Form 29: Embryo Grading Day 3 (`embryo-grading-day3`).
- [x] Register Form 30: Embryos Frozen (`embryos-frozen`).
- [x] Register Form 31: Fresh Embryo Transfer Details (`fresh-et-details`).
- [x] Register Form 32: Additional Procedures in Assisted Reproductive Technology (`add-procedure-art`).
- [x] Register Form 33: Post-InVitro Fertilisation Investigation (`post-ivf-investigation`).
- [x] Register Form 34: Examination Infant (`examination-infant`).
- [x] Implement Consolidated IVF Summary Dashboard (`aiims-ivf-summary`) with full 6-domain clinical enrichment.


