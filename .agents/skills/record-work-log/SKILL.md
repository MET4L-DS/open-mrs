---
name: record-work-log
description: Systematically documents, tallies, and archives daily development tasks, clinical gap analyses, Architectural Decision Records (ADRs), human-in-the-loop directives, and PI briefing notes into docs/records/YYYY-MM-DD/. Activate when logging work, recording daily progress, archiving technical decisions, or generating presentation and PI standup materials.
---

# Record Work Log Skill

Use this workflow to generate or update date-wise project records in `docs/records/YYYY-MM-DD/`.

This skill prevents **"Decision Amnesia"** by capturing not just *what* code was shipped, but *why* specific architectures were chosen, *which* alternatives were rejected, *how* the human lead steered the design, and *what* talking points are ready for the Principal Investigator (PI).

---

## Workflow Steps

### Step 1: Determine Date & Scope via Git History
1. Identify the current date in `YYYY-MM-DD` format (or target date requested).
2. Query Git history to extract all commits, authoring times, and commit messages for the date:
   ```bash
   git log --after="YYYY-MM-DD 00:00:00" --before="YYYY-MM-DD 23:59:59" --pretty=format:"%h - %ad : %s" --date=iso
   ```
3. Inspect commit stats and diffs for granular deliverable and line-count tracking:
   ```bash
   git log --after="YYYY-MM-DD 00:00:00" --before="YYYY-MM-DD 23:59:59" --stat
   ```
4. Check the target directory: `docs/records/<YYYY-MM-DD>/`. Create it if it does not exist.

### Step 2: Extract Human Directives & Conversational Decisions
Review the active session trajectory for:
1. **Clinical Analysis Inquiries**: Specific questions, audits, or CSV reviews initiated by the user.
2. **Design Critiques & Vetoes**: Human review feedback that redirected the implementation (e.g. rejecting visual clutter, demanding standard design tokens, pointing out missing data points).
3. **Architectural Trade-offs Evaluated**: Why one technical pattern was chosen over another.

### Step 3: Generate/Update `summary.md`
Structure the summary following this exact 6-section schema, enriching entries with exact commit hashes (`%h`) and Git stats:

```markdown
# Daily Engineering Record & Decision Journal: YYYY-MM-DD

## 1. Executive Summary & Daily Mission
- **Mission Goal**: [Concise goal of the session/day]
- **Operational Status**: [Live deployments, commit count, verified quality status]

## 2. Tasks Completed & Deliverables (The "What")
- **[Component/Feature Name]**: Detailed description of implementation, files modified, commit hash (`commit abc1234`).
- **[Schema / Concept Registration]**: List of concept UUIDs and form UUIDs published.
- **[Bug Resolutions & Post-Mortems]**: Root cause, fix applied, preventive guardrail established.

## 3. Clinical & Technical Analysis (The Investigation)
- **Problem Space & Audit**: Details of clinical gap analyses, CSV audits, or performance investigations.
- **Key Findings**: Tabulated or bulleted comparison of expected vs. actual parameters, clinical risk factors identified (e.g., POSEIDON groups, blastocyst vitrification counts, ectopic history).

## 4. Architectural Decision Records (ADRs) & Design Rationales (The "Why")
### ADR-[ID]: [Title of Decision, e.g. Single SWR Encounter Batching vs. 34 REST Calls]
- **Context & Problem**: What forces were at play (network latency, rate-limiting, hospital infrastructure, clinical workflow)?
- **Decision**: What exact technical choice was made?
- **Design Rationale**: Why was this choice made?
- **Alternatives Considered & Rejected**:
  - *Alternative 1*: Description and concrete reason for rejection.
  - *Alternative 2*: Description and concrete reason for rejection.
- **Consequences & Trade-offs**:
  - *Positive*: [Scalability, sub-second latency, zero downtime, etc.]
  - *Negative/Maintenance*: [In-memory mapping maintenance, cache invalidation considerations, etc.]

## 5. Human-in-the-Loop (HITL) Directives & Gatekeeping
- **Human Strategic Directives**: Specific clinical direction, gap audits, and scope definitions ordered by the human lead.
- **Review Critiques & Rejections**: Technical or visual proposals from the AI that were evaluated, critiqued, or rejected by the human lead (e.g., removing static blue banner in favor of clean Carbon typography).
- **Safety Invariants Enforced**: Relational database constraints (`concept_numeric` ranges, ASCII sanitization, `noImplicitAny`).

## 6. Daily Reflection & PI Briefing Notes
- **Key Learnings**: Deep technical or domain takeaways (OpenMRS Single-SPA lifecycle, SWR caching, relational medical concepts).
- **Value Delivered**: Clinical and institutional impact of the completed work.
- **Talking Points for PI / Reviewers**: 3 concise bullet points ready for a 60-second standup with the Principal Investigator or clinical director.
```

### Step 4: Generate/Update `presentation_notes.md`
Create a clean, slide-ready document for clinical and academic presentations:
- **Slide 1: Executive Summary & Milestone Achievement**
- **Slide 2: Clinical Workflow Impact** (with a Mermaid flowchart visualizing the clinical patient journey)
- **Slide 3: Engineering Architecture & Quality Gates**
- **Slide 4: Key Platform & Verification Metrics**

### Step 5: Update Master Index (`docs/records/README.md`)
- Add or update the row for `<YYYY-MM-DD>` in the Master Development Timeline table in `docs/records/README.md`.
- Ensure Git commit counts and verified quality metrics match the date summary.
- Ensure links to `summary.md` and `presentation_notes.md` are valid.

### Step 6: Synchronize Project Memory (`PROJECT_MEMORY.md`)
- Verify that `PROJECT_MEMORY.md` reflects all newly published form UUIDs (Section 4), updated forms implemented list (Section 5), and checked-off roadmap items (Section 7).
- Update current platform totals (e.g. total active forms, verified concepts, pipeline stages) to prevent memory drift.
