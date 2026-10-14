---
description: Comprehensive end-to-end guide for implementing a brand new AIIMS clinical intake form from clinical CSV specifications to live verification.
---

# New Clinical Form Creation Workflow

Use this workflow whenever adding a brand new clinical intake form to the AIIMS OpenMRS 3.x distribution based on clinical protocols or CSV definitions.

## Stage-by-Stage Checklist

### Stage 1: Concept Modeling & Terminology Setup
1. Consult skill `clinical-concept-modeling`.
2. Inspect input fields, units, and ranges from the clinical CSV.
3. Allocate sequential question concepts (`c0010001-...-0XXX`) and answer concepts (`c0010002-...-1XXX`).
4. In `scripts/setup_aiims_concepts.py`:
   - Numeric concepts: include `is_numeric=True, units=..., allow_decimal=..., low_abs=..., hi_abs=...`.
   - Coded concepts: define answers (`datatype_id=4, class_id=11`) and link via `add_answer_sql`.
5. Run registration: `python scripts/setup_aiims_concepts.py`.
6. Add concept UUIDs to `src/config/concepts.ts` and document in `docs/concept_registry.md`.
7. Verify: `npm run validate:concepts`.

### Stage 2: AMPATH Schema Authoring (`forms/`)
1. Consult skill `ampath-form-schema-guide`.
2. Create `forms/aiims_<form_key>.json` with ASCII-only hyphens.
3. Map each question to its concept UUID and appropriate rendering (`number`, `text`, `textarea`, `select`, `radio`, `date`).
4. **Conditional Visibility Rule**: For any conditional fields triggered by radio or select inputs, always attach `hideWhenExpression` directly to **each question** inside the conditional section (never to the section container) and guard with `!trigger || trigger !== 'target-uuid'`. Section-level hiding fails on initial transition from `null`.
5. Register the new form in `scripts/publish_aiims_form.py` (`FORMS_TO_PUBLISH`).
6. Publish form:
   ```bash
   python scripts/publish_aiims_form.py --form=aiims_<form_key>
   ```
7. Verify schema: `npm run validate:forms`.

### Stage 3: Microfrontend Scaffolding
1. Scaffold feature module using the CLI:
   ```bash
   npm run create-form -- <form-key> "<Form Display Name>" --uuid=<form_uuid> --icon=<CarbonIconName>
   ```
2. **Important Rule**: Retain `order: 1` in `src/config/form-registry.ts` to keep all AIIMS forms contiguously grouped.

### Stage 4: Feature Code Implementation
1. **Resource (`src/<feature>/<feature>.resource.ts`)**:
   - Define typed interface `Aiims<Name>Data`.
   - Implement extraction with `useFormEncounter` and `getOptionalObsValue`.
2. **Card (`src/<feature>/<feature>-card.component.tsx`)**:
   - Implement `ObservationCard` sections with localized labels.
3. **Translations (`translations/en.json`)**:
   - Add all display keys.
   - Run `npm run audit:i18n` (must achieve 0 missing).
4. **Unit Tests (`src/<feature>/<feature>.test.tsx`)**:
   - Add tests for empty state, populated observations, and dashboard shell.
   - Run `npm test`.

### Stage 5: Deployment & Verification
1. Run automated pipeline:
   ```bash
   npm run deploy:local
   ```
2. Verify live mounting with smoke test robot:
   ```bash
   npm run test:e2e -- --form=aiims-<form-key>
   ```
3. Update daily engineering record: `docs/records/YYYY-MM-DD/summary.md`.
4. Synchronize `PROJECT_MEMORY.md` (add Form UUID, brief summary under Forms Implemented, and check off the roadmap item).
