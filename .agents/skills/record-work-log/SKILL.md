---
name: record-work-log
description: Automatically documents, tallies, and archives daily development tasks, post-mortems, and presentation-ready deliverables into docs/records/YYYY-MM-DD/. Activate when the user requests a daily tally, asks to log completed tasks, or requests presentation/slide materials for completed work.
---

# Record Work Log Skill

Use this workflow to generate or update date-wise project records in `docs/records/YYYY-MM-DD/`.

## Workflow Steps

### Step 1: Determine Date & Scope via Git History
1. Identify the current date in `YYYY-MM-DD` format (or the target date requested).
2. Query Git history using precise timestamp ranges to extract all commits, authoring times, and commit messages:
   ```bash
   git log --after="YYYY-MM-DD 00:00:00" --before="YYYY-MM-DD 23:59:59" --pretty=format:"%h - %ad : %s" --date=iso
   ```
3. Inspect commit stats and diffs for granular deliverable and line-count tracking:
   ```bash
   git log --after="YYYY-MM-DD 00:00:00" --before="YYYY-MM-DD 23:59:59" --stat
   ```
4. Check the target directory: `docs/records/<YYYY-MM-DD>/`. Create it if it does not exist.

### Step 2: Generate/Update `summary.md`
Structure the summary following this exact schema, enriching entries with exact commit hashes (`%h`) and Git stats:
```markdown
# Daily Engineering Record: YYYY-MM-DD

## 1. Executive Summary
- **Main Goal**: [Concise goal of the session/day]
- **Outcome**: [Key accomplishments, operational status, commit count]

## 2. Completed Tasks & Forms Delivered
- Form additions, UI updates, and backend schema publishing.
- Include corresponding commit hashes (e.g. `commit a1b2c3d`) and AMPATH schema UUIDs for each deliverable.

## 3. Post-Mortem & Bug Resolutions
- Detail any bugs found (404, 500, type errors, race conditions), their root causes, immediate fixes, and preventive guardrails added, linking back to the resolving Git commit.

## 4. Architectural & Tooling Enhancements
- Scaffolder updates, validators, CLI flags, pipeline stages, and test suites.

## 5. Quality & Health Metrics
- Git Commits: Total count executed during the session/day.
- Forms Published: Current total active forms in OpenMRS.
- Concept Dictionary: Total concepts active in dictionary.
- Unit Tests: Tests passing across test suites.
- Deployment Status: Hot-deployed bundle version and probe result.
```

### Step 3: Generate/Update `presentation_notes.md`
Create a clean, slide-ready document:
- **Slide 1: Executive Summary & Milestone Achievement**
- **Slide 2: Clinical Workflow Impact** (with a Mermaid flowchart visualizing the clinical patient journey)
- **Slide 3: Engineering Architecture & Quality Gates**
- **Slide 4: Key Platform & Verification Metrics**

### Step 4: Update Master Index (`docs/records/README.md`)
- Add or update the row for `<YYYY-MM-DD>` in the Master Development Timeline table in `docs/records/README.md`.
- Ensure Git commit counts and verified quality metrics match the date summary.
- Ensure links to `summary.md` and `presentation_notes.md` are valid.

### Step 5: Synchronize Project Memory (`PROJECT_MEMORY.md`)
- Verify that `PROJECT_MEMORY.md` reflects all newly published form UUIDs (Section 4), updated forms implemented list (Section 5), and checked-off roadmap items (Section 7).
- Update current platform totals (e.g. total active forms, verified concepts, pipeline stages) to prevent memory drift.
