---
description: Record daily tasks, clinical gap analyses, Architectural Decision Records (ADRs), human directives, and PI standup briefing notes into docs/records/YYYY-MM-DD/.
---

# Record Work & Decision Journal Workflow

Use this workflow to archive daily engineering tasks, clinical gap analyses, architectural decisions, and human-in-the-loop directives into `docs/records/YYYY-MM-DD/`.

## Execution Steps

1. **Identify Date & Target Directory**:
   - Determine target date in `YYYY-MM-DD` format (defaults to current date).
   - Ensure `docs/records/<YYYY-MM-DD>/` exists.

2. **Extract Git Activity & Metrics**:
   - Query Git commits for the date:
     ```bash
     git log --after="YYYY-MM-DD 00:00:00" --before="YYYY-MM-DD 23:59:59" --pretty=format:"%h - %ad : %s" --date=iso
     ```
   - Inspect diff statistics:
     ```bash
     git log --after="YYYY-MM-DD 00:00:00" --before="YYYY-MM-DD 23:59:59" --stat
     ```

3. **Synthesize Daily Decision Journal (`summary.md`)**:
   - Apply the 6-section schema:
     1. **Executive Summary & Daily Mission**: Objective and operational outcome.
     2. **Tasks Completed & Deliverables (The "What")**: Code, forms, schemas, and bug fixes linked to commit hashes.
     3. **Clinical & Technical Analysis**: Gap analyses, medical investigations, diagnostic reviews.
     4. **Architectural Decision Records (ADRs) (The "Why")**: Structured decisions capturing Context, Decision, Rationale, and **Rejected Alternatives**.
     5. **Human-in-the-Loop (HITL) Directives & Gatekeeping**: Strategic direction, design critiques, visual vetos, and database safety rules enforced by the human lead.
     6. **Daily Reflection & PI Briefing Notes**: Key technical learnings, clinical value delivered, and 3 concise standup talking points for the Principal Investigator.

4. **Synthesize Presentation Slide Deck (`presentation_notes.md`)**:
   - Generate slide-ready notes:
     - Slide 1: Executive Summary & Milestone Achievement
     - Slide 2: Clinical Workflow Impact (with Mermaid diagrams)
     - Slide 3: Engineering Architecture & Quality Gates
     - Slide 4: Key Platform & Verification Metrics

5. **Update Master Records Ledger (`docs/records/README.md`)**:
   - Add/update the row for `<YYYY-MM-DD>` in the Master Development Timeline table.
   - Verify commit counts and verified quality metrics match the date summary.

6. **Synchronize Project Memory (`PROJECT_MEMORY.md`)**:
   - Update platform totals (active forms, concepts, pipeline stages, roadmap checklist).
