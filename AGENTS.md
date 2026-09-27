# AI Agent Instructions & Workspace Guidelines

Before performing any tasks in this repository, always read the project memory file:
👉 **[PROJECT_MEMORY.md](./PROJECT_MEMORY.md)**

## Golden Rules for this Codebase

1. **Architecture**:
   - The frontend module is `@aiims/esm-demographics-app` in `./aiims-esm-demographics-app`.
   - All forms must be registered via `FORM_REGISTRY` in `src/constants.ts` and exported using the `createFormExtensions` factory in `src/index.ts`.
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

5. **Deployment**:
   - After building with `npm run build`, hot-deploy the bundle to the Docker environment using `python scripts/deploy_demographics.py`.
   - Always verify that all tests pass (`npm run test`) and type checking succeeds (`npm run typescript`) before deploying.
