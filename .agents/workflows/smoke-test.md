---
description: Execute headless browser smoke tests for individual clinical intake forms or the complete suite of 28 AIIMS dashboards.
---

# E2E Dashboard Smoke Testing Workflow

Use this workflow to verify that clinical intake dashboards and AMPATH form workspaces mount cleanly without white screens, uncaught errors, or missing bundle assets.

## Execution Options

### Option 1: Single-Form Smoke Test
When testing a specific feature module or form after edits:
```bash
npm run test:e2e -- --form=aiims-<form_key>
```
*Example*: `npm run test:e2e -- --form=aiims-embryo-assessment`

### Option 2: Full Suite Smoke Test
To verify all 28 registered AIIMS clinical forms across the live patient chart:
```bash
npm run test:e2e
```

### Option 3: Interactive Workspace Form Test
To verify that the form engine workspace actually opens ("Record" button click) and closes without "There was an error with this form":
```bash
npm run test:e2e -- --form=aiims-<form_key> --workspace
```

## Verification Checklist
1. Browser session authenticates successfully (`admin:Admin123`).
2. Target test patient (`1d678f66-801a-4a52-b47f-29854389c09f`) loads in SPA.
3. Extension slot mounts without rendering errors or console uncaught exceptions.
4. Total duration reported and 100% passing exit code (0).
