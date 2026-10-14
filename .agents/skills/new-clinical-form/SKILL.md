---
name: new-clinical-form
description: >
  End-to-end guide for adding a BRAND NEW clinical intake form to the AIIMS OpenMRS 3.x distribution.
  Activate when the task involves creating a form from scratch: concept modeling, AMPATH schema
  authoring, backend publishing, microfrontend scaffolding, and deployment. Do NOT use for modifying
  existing forms — use skill 'modify-clinical-form' instead.
---

# New Clinical Form — Track A

### Stage 1: Concept Modeling & MariaDB Registration
1. Consult skill `clinical-concept-modeling` for UUID allocation rules.
2. Define question and answer concepts in `scripts/setup_aiims_concepts.py`.
3. **MANDATORY**: Any `datatype_id = 1` (Numeric) concept **MUST** include `concept_numeric`
   parameters (`is_numeric=True, allow_decimal=..., low_abs=..., hi_abs=...`).
   Omitting this causes `ObsValidator` HTTP 500 on encounter save.
4. Run `python scripts/setup_aiims_concepts.py` to populate MariaDB.
5. Add concept UUIDs to `src/config/concepts.ts`.
6. Update `configuration/concepts/aiims/aiims_concepts.csv` and `docs/concept_registry.md`.
7. Run `npm run validate:concepts`.

### Stage 2: AMPATH Form Schema Creation (`forms/`)
1. Consult skill `ampath-form-schema-guide` for syntax rules.
2. Create `forms/aiims_<form_key>.json` with ASCII-only hyphens `-` (never `–` or `—`).
3. Match rendering types to datatypes (`number`, `text`, `textarea`, `radio`, `select`, `date`).
4. **Conditional Visibility Rule**: Attach `hideWhenExpression` to each question inside a
   dependent section — never to the section container. Guard with:
   `!triggerField || triggerField !== 'target-uuid'`
   See `ampath-form-schema-guide §4` for the null-state transition failure pattern.
5. Register form in `scripts/publish_aiims_form.py` (`FORMS_TO_PUBLISH`).
6. Publish: `python scripts/publish_aiims_form.py --form=aiims_<form_key>`
7. Verify: `npm run validate:forms`

### Stage 3: Frontend Scaffolding
Run the CLI from `aiims-esm-demographics-app`:
```bash
npm run create-form -- <form-key> "<Form Display Name>" --uuid=<form_uuid> --icon=<CarbonIconName>
```
**Golden Rules**:
- Always supply `--uuid=<form_uuid>` matching Stage 2 to keep frontend/backend synchronized.
- Use `order: 1` in `patient-chart-dashboard-slot` (never increment — Vitals uses `order: 2`).
- CLI auto-generates `form-uuids.ts`, `form-registry.ts`, `routes.json`, and starter files.

### Stage 4: Frontend Implementation
1. **Resource hook** (`<form-key>.resource.ts`): typed `Aiims<Name>Data` interface, extract
   with `useFormEncounter` + `getOptionalObsValue`.
2. **Card** (`<form-key>-card.component.tsx`): Carbon `ObservationCard` with localized labels/units.
3. **Translations** (`translations/en.json`): add all keys; run `npm run audit:i18n` → 0 missing.
4. **Tests** (`<form-key>.test.tsx`): empty state, populated obs, type contracts.

### Stage 5: Deployment & Verification
```bash
npm run deploy:local
npm run test:e2e -- --form=aiims-<form-key>
```
Manually open the live patient chart → click **Record** → fill sample data → **Save**.
Record completed tasks in `docs/records/YYYY-MM-DD/summary.md`.
