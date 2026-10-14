---
name: record-work-log
description: Automatically documents, tallies, and archives daily development tasks, post-mortems, and presentation-ready deliverables into docs/records/YYYY-MM-DD/. Activate when the user requests a daily tally, asks to log completed tasks, or requests presentation/slide materials for completed work.
---

# Record Work Log Skill

Use this workflow to generate or update date-wise project records in `docs/records/YYYY-MM-DD/`.

## Workflow Steps

### Step 1: Determine Date & Scope
1. Identify the current date in `YYYY-MM-DD` format (or the target date requested).
2. Inspect `git log` and recent file modifications to assemble the exact list of tasks completed.
3. Check the target directory: `docs/records/<YYYY-MM-DD>/`. Create it if it does not exist.

### Step 2: Generate/Update `summary.md`
Structure the summary following this exact schema:
```markdown
# Daily Engineering Record: YYYY-MM-DD

## 1. Executive Summary
- **Main Goal**: [Concise goal of the session/day]
- **Outcome**: [Key accomplishments and operational status]

## 2. Completed Tasks & Forms Delivered
- Form additions, UI updates, and backend schema publishing.

## 3. Post-Mortem & Bug Resolutions
- Detail any bugs found (404, 500, type errors, race conditions), their root causes, immediate fixes, and preventive guardrails added.

## 4. Architectural & Tooling Enhancements
- Scaffolder updates, validators, CLI flags, pipeline stages.

## 5. Quality & Health Metrics
- Forms published, concept count, unit tests passing, build duration, bundle version.
```

### Step 3: Generate/Update `presentation_notes.md`
Create a clean, slide-ready document:
- **Slide 1: Executive Summary & Milestone Achievement**
- **Slide 2: Clinical Workflow Impact** (with a Mermaid flowchart visualizing the clinical patient journey)
- **Slide 3: Engineering Architecture & Quality Gates**
- **Slide 4: Key Platform & Verification Metrics**

### Step 4: Update Master Index (`docs/records/README.md`)
- Add or update the row for `<YYYY-MM-DD>` in the Master Development Timeline table in `docs/records/README.md`.
- Ensure links to `summary.md` and `presentation_notes.md` are valid.
