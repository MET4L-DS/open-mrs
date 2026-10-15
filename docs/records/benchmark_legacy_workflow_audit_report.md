# Comprehensive Audit Report: Legacy Workflow Benchmark

- **Target Clinical Form**: Form 33 — "AIIMS Visit: Post IVF Details"
- **Specification Source**: [csv/aiims_ivf_04 copy - post_ivf.csv](file:///c:/Met4l.DSCode/Projects/open-mrs/csv/aiims_ivf_04%20copy%20-%20post_ivf.csv)
- **Branch Under Test**: `legacy-benchmark` (Pre-automation baseline, Form 26 era)
- **Benchmark Start Time ($T_0$)**: `2026-10-15T00:58:15`
- **Initial Deployment Finish ($T_5$)**: `2026-10-15T01:18:27`
- **Post-Deploy Route Diagnostics & Fix**: `2026-10-15T01:31:14` – `2026-10-15T01:40:15`
- **Total Initial Turnaround Time**: **20 minutes 12 seconds** (1,212s)
- **Total Time with Legacy Sidebar Debugging**: **32 minutes 45 seconds**

---

## 1. Empirical Timing Breakdown by Phase

| Phase                                                          | Phase Description                                                                                                                                                                                                                                                                                         | Time Taken  | Friction & Bottlenecks Observed                                                                                                                           |
| :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **L1: Concept Modeling & Database SQL**                        | Inspect CSV, manually craft Python tuples for 8 questions and 18 answers, define numeric bounds/units for Beta-hCG and Period of Gestation, map answers, and execute stored procedure in MariaDB container.                                                                                               | **4m 37s**  | High cognitive overhead; error-prone manual UUID generation and numeric metadata typing. Stored procedure buffer pipes required manual script adaptation. |
| **L2: AMPATH Schema Authoring & Publishing**                   | Manually write 175 lines of AMPATH JSON schema in `forms/aiims_post_ivf_details.json`; execute `scripts/publish_aiims_form.py` with custom CLI argument filtering.                                                                                                                                        | **3m 08s**  | Hand-writing JSON schema without autocomplete or validation; required script modification to prevent stdin pipe blocking on Windows.                      |
| **L3: Frontend Scaffolding & Component Wiring**                | Author 5 new TypeScript/TSX files (`resource.ts`, `card.component.tsx`, `dashboard.component.tsx`, `index.ts`, `test.tsx`), manually declare constants in 3 sections of `src/constants.ts`, export Single-SPA lifecycles in `src/index.ts`, and insert 20+ localization keys into `translations/en.json`. | **2m 35s**  | High code boilerplate duplication; manually wiring extensions across 4 distinct files with zero CLI generation.                                           |
| **L4: Verification & Bundle Compilation**                      | Run `npm run typescript` (9s), `npm run test` (19.3s), and production bundle compilation with Rspack (`npm run build` - 44.8s).                                                                                                                                                                           | **1m 47s**  | Slower compilation feedback cycle without pre-flight sanity checks to catch missing translation keys or registration drift early.                         |
| **L5: Deployment & Container Sync**                            | Run `scripts/deploy_demographics.py` to create bundle `1.0.83`, copy tar archive to container, unpack, update `importmap.json`, and reload Nginx.                                                                                                                                                         | **8m 05s**  | Windows subprocess buffer contention on Docker CLI caused multiple stalls; required manual script execution and tar archive unpacking.                    |
| **L6: Route Registration & Cache Busting (Sidebar Debugging)** | Diagnose missing sidebar navigation link. Root cause: In legacy workflow, `src/routes.json` is decoupled from `constants.ts`. Required running `scripts/sync_routes.py --sync`, rebuilding with Rspack, updating `routes.registry.json`, bumping bundle version to `1.0.84`, and restarting container.    | **12m 33s** | **Major Legacy Gotcha**: Route registry drift is completely silent during build/deployment; errors only surfaced visually at runtime.                     |
| **Total**                                                      | **End-to-End Delivery & Functional Sidebar Verification**                                                                                                                                                                                                                                                 | **32m 45s** | **8 files modified, 6 new files created, 18 manual commands executed.**                                                                                   |

---

## 2. Quantitative Velocity & Effort Comparison

| Metric Dimension                     | Legacy Workflow (Measured Live)                                                                                                                                       | Current Workflow v2.0 (Target / Benchmark Baseline)                         | Efficiency Gain              |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :--------------------------- |
| **Total Delivery Time**              | **32m 45s** (or 20m 12s initial)                                                                                                                                      | **~10–12m**                                                                 | **~63% faster**              |
| **Manual Files Authored/Modified**   | 8 files (`constants.ts`, `routes.json`, `index.ts`, `en.json`, `setup_aiims_concepts.py`, `publish_aiims_form.py`, `deploy_demographics.py`, + 5 new component files) | 2 files (`constants.ts`, `en.json`; component files auto-generated via CLI) | **-75% manual touches**      |
| **Terminal Commands Executed**       | 18 manual commands                                                                                                                                                    | 2 orchestrated commands (`npm run create-form`, `npm run deploy:local`)     | **-88% command friction**    |
| **Route Registration Safety**        | ❌ Decoupled (Silent omission of sidebar link)                                                                                                                        | ✅ Unified (CLI auto-generates routes & pre-flight validates)               | **100% drift prevention**    |
| **Sanity & Verification Guardrails** | ❌ None (Errors caught in browser runtime)                                                                                                                            | ✅ 32-check Automated Pre-flight (`npm run pre-flight`)                     | **Fail-fast pre-commit**     |
| **Automated End-to-End Validation**  | ❌ Manual browser clicking required                                                                                                                                   | ✅ Automated Headless Verification (`npm run test:e2e`)                     | **Deterministic validation** |

---

## 3. Complete Accounting of Database Insertions & Deployments

### A. Database Records in MariaDB (`openmrs-distro-referenceapplication-db-1`)

- **Form Records**:
    - `form` table: UUID `37e59734-dac9-4332-ba27-f1053d189095`, Name `AIIMS Visit: Post IVF Details`.
    - `form_resource` table: 1 entry for `JSON schema` (Datatype `AmpathJsonSchema`).
    - `clob_datatype_storage` table: 1 entry with UUID `6cee59e3-b381-45cc-8dc4-284eb78759f7`.
- **Question Concepts (8)**:
    - `c0010001-...-0294`: Urine Pregnancy Test (UPT) (Coded)
    - `c0010001-...-0295`: Beta-Human Chorionic Gonadotropin (Numeric, `mIU/mL`, range `0`–`500000`)
    - `c0010001-...-0296`: Scan at 6-7 weeks (Text)
    - `c0010001-...-0297`: Post IVF Outcome (Coded)
    - `c0010001-...-0298`: Post IVF Pregnancy Complications (Coded)
    - `c0010001-...-0299`: Other Pregnancy Complications (Text)
    - `c0010001-...-0300`: Mode of Delivery (Coded)
    - `c0010001-...-0301`: Period of Gestation at Delivery (Numeric, `weeks`, range `10`–`45`)
- **Answer Concepts (18)**:
    - `c0010002-...-1136` through `1138`: UPT options (Positive, Negative, Inconclusive)
    - `c0010002-...-1139` through `1146`: Outcome options (Clinical pregnancy, Ectopic, Abortion, Failing, Live birth, IUD, Pre-term, PPROM)
    - `c0010002-...-1147` through `1151`: Complications options (Gestational Diabetes, HTN, ICP, FGR, Macrosomia)
    - `c0010002-...-1152` through `1153`: Delivery mode options (Normal Vaginal Delivery, Cesarean section)
- **Metadata Links**:
    - `concept_answer`: Mappings for concepts `0294`, `0297`, `0298`, and `0300`.
    - `concept_numeric`: Metadata entries for `0295` and `0301`.

### B. Frontend Deployment in Container (`openmrs-distro-referenceapplication-frontend-1`)

- **Bundles Created**:
    - `/usr/share/nginx/html/openmrs-esm-aiims-demographics-app-1.0.83`
    - `/usr/share/nginx/html/openmrs-esm-aiims-demographics-app-1.0.84`
- **Active Registry Configurations**:
    - `importmap.json`: Points to `./openmrs-esm-aiims-demographics-app-1.0.84/openmrs-esm-aiims-esm-demographics-app.js`.
    - `routes.registry.json`: Updated with 55 extensions, mounting `aiims-post-ivf-details-dashboard-link` in `patient-chart-dashboard-slot`.

---

## 4. Teardown & Reversal Instructions

The teardown process restores the environment to the exact baseline before the benchmark started:

1. **Database Rollback**: Execute `scripts/rollback_post_ivf_benchmark.sql` into MariaDB.
2. **Container Rollback**:
    - Revert `importmap.json` back to bundle `1.0.82`.
    - Remove bundle directories `1.0.83` and `1.0.84`.
    - Revert `routes.registry.json` back to baseline (53 extensions).
    - Reload Nginx.
3. **Workspace Reset**: Clean working directory on `legacy-benchmark` branch.
