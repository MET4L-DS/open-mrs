# AIIMS OpenMRS 3.x Development Rules

These rules govern all engineering, form creation, and record keeping in this workspace.

## 1. Relational Concept Integrity
- When registering or modifying OpenMRS concepts, any concept with `datatype_id = 1` (`Numeric`) **must** have a corresponding `concept_numeric` record (`allow_decimal`, `low_absolute`, `hi_absolute`, `units`).
- Always run `npm run validate:concepts` before closing tasks to confirm all concepts are active and have numeric definitions.

## 2. AMPATH Form Schema Standards
- Every clinical form in `FORM_REGISTRY` must have a corresponding JSON schema in `forms/` and be published via `scripts/publish_aiims_form.py`.
- Form questions and sections must never use non-ASCII Unicode dashes (`–`, `—`); always use standard ASCII hyphens `-`.
- Always run `npm run validate:forms` to confirm backend schema availability and question concept validity.

## 3. Single-SPA Route Synchronization
- `src/routes.json` and `src/generated-form-extensions.ts` are single-sourced and auto-generated from `src/config/form-registry.ts`.
- Never edit `src/routes.json` or `src/generated-form-extensions.ts` manually; always run `npm run generate-routes`.

## 4. Daily Record Keeping & Project Memory
- After completing tasks, features, or bugfixes, update or create the date-wise record in `docs/records/YYYY-MM-DD/`:
  - `summary.md`: Engineering summary, post-mortems, and metrics.
  - `presentation_notes.md`: Slide-ready clinical workflow notes and diagrams.
- Update `docs/records/README.md` with the new milestone row.
- Synchronize `PROJECT_MEMORY.md` (form UUIDs, implemented form summaries, roadmap checkoffs, and health counts) to prevent long-term memory drift.

## 5. Pre-Deployment Sanity Check
- Before running the full `deploy:local` pipeline, use `npm run pre-flight` to assert schema
  validity, concept relational integrity, i18n completeness, and TypeScript correctness in ~10s.
- `pre-flight` runs: `validate:forms` → `validate:concepts` → `audit:i18n` → `tsc --noEmit`.
