---
name: form-engine-debug
description: >
  Runtime diagnostic checklist for OpenMRS 3.x React Form Engine failures. Activate when:
  a form field isn't saving, a conditional section won't show/hide, an expression fails
  silently, the form shows a white screen, the browser console has uncaught JS errors,
  or HTTP 500 occurs on encounter save. Do NOT use for normal form authoring — use
  'ampath-form-schema-guide' for that.
---

# Form Engine Debug Skill

Identify your failure category and follow the matching checklist.

---

## Failure 1: HTTP 500 on Encounter Save
**Symptom**: Clicking Save in the form workspace returns HTTP 500 from the backend.
**Cause**: A numeric concept is missing its `concept_numeric` row in MariaDB.
**Fix**:
1. Check browser Network tab → inspect the failing POST to `/openmrs/ws/rest/v1/encounter`.
2. Note which concept UUID the 500 is linked to.
3. In `scripts/setup_aiims_concepts.py`, add `is_numeric=True, units=..., allow_decimal=..., low_abs=..., hi_abs=...` to that concept's `add_concept_sql` call.
4. Re-run `python scripts/setup_aiims_concepts.py`.
5. Verify: `npm run validate:concepts`.

---

## Failure 2: Conditional Section Not Showing (First Click)
**Symptom**: Clicking Yes/No on a pristine radio does nothing. The conditional section only appears after clicking the alternate option.
**Cause**: Section-level `hideWhenExpression` fails to re-evaluate on null → first-click transition.
**Fix**: Move `hideWhenExpression` from the section container to each individual question within the conditional section. Add a null guard:
```json
"hide": { "hideWhenExpression": "!triggerField || triggerField !== 'target-uuid'" }
```
See `ampath-form-schema-guide §4` for the full pattern.

---

## Failure 3: Expression Always True / Always False (Silent Failure)
**Symptom**: `hideWhenExpression` or `failsWhenExpression` has no visible effect.
**Common Causes**:
- Used `return` keyword: `"return myField === 'x'"` — remove it; engine wraps expressions automatically.
- Comparing numeric field to string: `myNumberField === "5"` → fix to `myNumberField === 5`.
- Referenced wrong question `id` (typo or case mismatch) → cross-check `"id"` values in the schema.
- Circular dependency: Field A expression depends on Field B, Field B depends on Field A → breaks silently as infinite loop. Restructure to use a single one-way dependency.

---

## Failure 4: `obsGroup` Child Questions Not Saving
**Symptom**: Group data disappears after save; backend shows no child observations.
**Checklist**:
1. Verify child questions are nested inside `obsGroup.questions`, not at the root page/section level.
2. Confirm the `obsGroup` parent has `"type": "obsGroup"` and `"rendering": "group"`.
3. Confirm each child has `"type": "obs"` and a valid `questionOptions.concept` UUID.
4. Inspect the POST payload in browser Network tab — if child obs are absent from the JSON body, the nesting hierarchy is wrong in the schema JSON.

---

## Failure 5: White Screen / Dashboard Not Mounting
**Symptom**: The AIIMS dashboard panel renders blank; browser console shows JS errors.
**Checklist**:
1. Run `npm run test:e2e -- --form=aiims-<form-key>` to capture the full console error.
2. Check browser console for `Cannot read properties of undefined` — usually a missing translation key or a `getOptionalObsValue` call returning `undefined` on an unchecked path.
3. Run `npm run audit:i18n` — confirm 0 missing keys.
4. Verify the bundle is hot-deployed: `http://localhost/openmrs/spa/importmap.json` must reference the current bundle version. If stale, run `npm run deploy:local`.
5. Check `src/index.ts` `FORM_MODULES` map — confirm the new form-key is registered.

---

## General Debug Toolkit
```bash
# 1. Validate concept dictionary & numeric metadata
npm run validate:concepts

# 2. Validate all form schemas against backend
npm run validate:forms

# 3. Fast full sanity check (schema + concepts + i18n + tsc)
npm run pre-flight

# 4. Check live bundle deployment
curl -s http://localhost/openmrs/spa/importmap.json | python -m json.tool | grep aiims
```
