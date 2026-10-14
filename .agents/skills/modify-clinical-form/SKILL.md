---
name: modify-clinical-form
description: >
  Guide for modifying an EXISTING clinical intake form in the AIIMS OpenMRS 3.x distribution.
  Activate for: adding new fields to an existing form (Sub-Track B1), or converting existing
  free-text/numeric fields to coded select/radio dropdowns (Sub-Track B2).
  Do NOT use for creating new forms from scratch — use skill 'new-clinical-form' instead.
---

# Modify Clinical Form — Track B

Choose the relevant sub-track:
- **Sub-Track B1**: Adding new clinical fields to an existing form.
- **Sub-Track B2**: Converting an existing field to a coded dropdown (`select`/`radio`).

---

## Sub-Track B1: Adding New Clinical Fields

### Step 1: Concept Modeling
1. Define the new concept in `scripts/setup_aiims_concepts.py`.
   - Numeric concepts **MUST** include `concept_numeric` parameters.
2. Run `python scripts/setup_aiims_concepts.py`.
3. Add UUID to `src/config/concepts.ts`.
4. Document in `configuration/concepts/aiims/aiims_concepts.csv` and `docs/concept_registry.md`.
5. Run `npm run validate:concepts`.

### Step 2: Schema Update & Publishing
1. Edit `forms/aiims_<form_key>.json`:
   - Add question block with concept UUID, rendering type, placeholder, validators.
   - Guard `failsWhenExpression` against empty/null for optional numeric fields.
2. `python scripts/publish_aiims_form.py --form=aiims_<form_key>`
3. `npm run validate:forms`

### Step 3: Frontend Update
1. **Resource hook**: add new field to `Aiims<Name>Data` interface; extract via `getOptionalObsValue`.
2. **Card**: add `ObservationCard` row with localized label and unit.
3. **Summary widget** (if applicable): update `demographics-summary-widget.component.tsx`.

### Step 4: Quality Gates
1. Add keys to `translations/en.json` → `npm run audit:i18n` → 0 missing.
2. Update unit tests if obs structure changed.
3. `npm run deploy:local`
4. `npm run test:e2e -- --form=aiims-<form-key>`
5. Record in `docs/records/YYYY-MM-DD/summary.md` and synchronize `PROJECT_MEMORY.md` if form capabilities or core concepts changed.

---

## Sub-Track B2: Converting to Coded Dropdown (`select`/`radio`)

### Step 1: Answer Modeling & Datatype Migration
1. In `scripts/setup_aiims_concepts.py`:
   - Define answer array: `[("<uuid>", "<Label>"), ...]` with `datatype_id=4, class_id=11`.
   - Change question concept to `datatype_id=2` (Coded).
   - Link answers via `add_answer_sql(question_uuid, answer_uuid)`.
2. `python scripts/setup_aiims_concepts.py`
3. Update `docs/concept_registry.md` (question datatype → Coded, new answers section).
4. `npm run validate:concepts`.

### Step 2: Schema Update
In `forms/aiims_<form_key>.json`:
- Change `"rendering": "text"` (or `"number"`) → `"rendering": "select"` (or `"radio"`).
- Add `"answers"` array in `questionOptions`:
  ```json
  { "concept": "<q-uuid>", "answers": [{ "concept": "<a-uuid>", "label": "Option" }] }
  ```
- `python scripts/publish_aiims_form.py --form=aiims_<form_key>`
- `npm run validate:forms`

### Step 3: Frontend & Deployment
1. Verify card displays coded answer labels cleanly (auto-resolved by `useFormEncounter`).
2. `npm test` → `npm run deploy:local` → `npm run test:e2e -- --form=aiims-<form-key>`
3. Record in `docs/records/YYYY-MM-DD/summary.md` and synchronize `PROJECT_MEMORY.md`.
