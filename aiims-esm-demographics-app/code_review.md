# Implementation Review & Fixes: Anti-Patterns, Bugs, and Issues

All identified issues have been resolved, verified, built with TypeScript/Rspack, tested with Vitest, and deployed to the running OpenMRS instance.

---

### 1. The Array Index Trap (CRITICAL BUG) - [RESOLVED]
**Locations:** 
- `forms/aiims_personal_information.json`
- `src/constants.ts`
- `src/demographics/demographics.resource.ts`

**Resolution:**
- Activated the existing dedicated concept `c0010001-0000-0000-0000-000000000013` ("Education Husband") in `forms/aiims_personal_information.json`.
- Registered `educationHusband` and `educationWife` in `src/constants.ts`.
- Updated `useAiimsDemographics` in `demographics.resource.ts` to fetch husband education by `CONCEPTS.educationHusband` with backward-compatibility fallback to `educationObsList[1]` for legacy encounters.
- Re-uploaded the form schema to OpenMRS using `publish_aiims_form.py`.

---

### 2. Nested Router Anti-Pattern (HIGH) - [RESOLVED]
**Location:** `src/shared/components/dashboard-link.component.tsx`

**Resolution:**
- Eliminated `<BrowserRouter>` and `react-router-dom` dependency.
- Integrated OpenMRS `@openmrs/esm-framework` `navigate` API for unified Single-SPA navigation.
- Added native listeners for `popstate` and `single-spa:routing-event` to dynamically calculate `isActive` state based on `window.location.pathname` without router context conflicts.

---

### 3. Stale Data via `useSWRImmutable` (MEDIUM) - [RESOLVED]
**Location:** `src/shared/hooks/useFormEncounter.ts`

**Resolution:**
- Replaced `swr/immutable` with standard `useSWR`.
- Form encounter data now automatically revalidates in the background whenever a clinician closes a workspace or switches browser tabs.

---

### 4. Missing Memoization in the Fetcher Hook (LOW / PERF) - [RESOLVED]
**Location:** `src/shared/hooks/useFormEncounter.ts`

**Resolution:**
- Encapsulated encounter filtering and date-sorting in `useMemo` dependent on `[allEncounters, formUuid]`.
- Memoized `obsByConcept` map creation dependent on `[latestEncounter]`.
- Wrapped `getObsValue` and `getObsValues` in `useCallback` dependent on `[obsByConcept]`, avoiding unnecessary child re-renders.

---

### Verification Summary
- **Typecheck (`tsc`):** Passed with 0 errors.
- **Unit Tests (`vitest`):** Passed with 0 failures.
- **Production Bundle (`rspack`):** Compiled successfully in 14.81s.
- **OpenMRS Container Deployment:** Deployed via `deploy_demographics.py` with updated `importmap.json` and `routes.registry.json`.
