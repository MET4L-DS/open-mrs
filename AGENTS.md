# AI Agent Instructions & Workspace Guidelines

Before performing any tasks in this repository, always read the project memory file:
👉 **[PROJECT_MEMORY.md](./PROJECT_MEMORY.md)**

## Golden Rules for this Codebase

1. **Architecture**:
   - The frontend module is `@aiims/esm-demographics-app` in `./aiims-esm-demographics-app`.
   - All forms must be registered via `FORM_REGISTRY` in `src/config/form-registry.ts` (accessible via `src/constants.ts` shim) and mapped in `FORM_MODULES` in `src/index.ts`.
   - `src/routes.json` is single-sourced and auto-generated via `npm run generate-routes` (executed automatically before `npm run build`). Never edit `src/routes.json` manually.
   - Never write redundant boilerplate or duplicate route synchronization logic across files.

2. **Styling & CSS**:
   - Use SCSS and Carbon Design System classes.
   - Do not duplicate CSS pseudo-class logic in JavaScript (e.g. use `:last-child` rather than JS index checks for border removal).

3. **Data Safety & Integrity**:
   - Maintain `noImplicitAny: true`.
   - Always type OpenMRS REST resources and FHIR models properly (see `src/shared/types.ts`).
   - Observations extracted from encounters must be deterministically sorted by `obsDatetime` to avoid race conditions.

4. **Localization (i18n)**:
   - All user-facing strings and units (including `'years'`, `'kg/m²'`, etc.) must be localized using `useTranslation` and stored in `translations/en.json`.
   - Use `formatDatetime` from `@openmrs/esm-framework` for locale-aware dates; do not hardcode date format strings.

5. **Deployment & Quality Gates**:
   - Always run the 7-stage automated deployment pipeline: `npm run deploy:local` (or `python scripts/deploy_pipeline.py`).
   - The pipeline enforces Docker pre-flight, `validate:forms`, `validate:concepts`, `tsc`, `vitest`, Rspack build, and live probe verification.
   - For single-form or dashboard smoke testing, run `npm run test:e2e -- --form=aiims-<key>`.

6. **Relational Concept & Form Schema Integrity**:
   - Any concept with `datatype_id = 1` (`Numeric`) **MUST** have a corresponding `concept_numeric` row (`allow_decimal`, `low_absolute`, `hi_absolute`, `units`). Never register a numeric concept without it.
   - Every clinical form must have a published AMPATH JSON schema in `forms/` registered via `scripts/publish_aiims_form.py`.
   - Never use non-ASCII Unicode dashes (`–`, `—`) in form schemas or SQL commands; use standard ASCII hyphens `-`.

7. **Record Keeping & Documentation**:
   - Document completed sessions and milestones date-wise in `docs/records/YYYY-MM-DD/` (`summary.md` and `presentation_notes.md`).
   - Keep the master index `docs/records/README.md` up to date with new deliverables and health metrics.
   - Synchronize `PROJECT_MEMORY.md` whenever new clinical forms, concept definitions, architecture patterns, or roadmap milestones are completed.
