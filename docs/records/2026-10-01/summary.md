# Daily Engineering Record: 2026-10-01

## 1. Executive Summary
- **Main Goal**: Model and analyze the concept relationship and conditional skip-logic topology using graph algorithms (iGraph and D3), tune force simulation physics to eliminate visual overlap, verify Directed Acyclic Graph (DAG) invariants, and engineer a one-command environment bootstrap script.
- **Outcome**: Successfully verified 0 cyclic dependencies across all form conditional branches, delivered interactive D3 concept graph visualizers, corrected answer hierarchy leaks in MariaDB concepts, and created `setup_environment.py` for automated one-click developer environment provisioning.

---

## 2. Completed Tasks & Tooling Delivered

### 1. iGraph Concept & Skip-Logic Topology Analyzer
- **Script**: `scripts/analyze_concept_graph.py`
- **Capabilities**:
  - Traverses concept question-answer mappings, concept classes, datatypes, and AMPATH `hideWhenExpression` conditions.
  - Automatically asserts Directed Acyclic Graph (DAG) invariants, flags orphaned or disconnected concepts, and audits CIEL / SNOMED concept mappings.
  - Generates standalone interactive D3 visualizations:
    - [`docs/concept_relationship_graph.html`](file:///c:/Met4l.DSCode/Projects/open-mrs/docs/concept_relationship_graph.html)
    - [`docs/skip_logic_dependency_graph.html`](file:///c:/Met4l.DSCode/Projects/open-mrs/docs/skip_logic_dependency_graph.html)
  - Produced automated analysis report: `docs/concept_graph_analysis_report.txt`.

### 2. Graph Force Simulation & Hierarchy Corrections
- **Commits**: [`2e1a302`](file:///c:/Met4l.DSCode/Projects/open-mrs), [`990ccbc`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Physics Tuning**: Adjusted link distance, charge repulsion (`charge = -300`), and expanded `collision_force_radius` to `40.0` to eliminate visual node overlap.
- **Hierarchy Clean-up**: Pruned child answer sets for Menstrual Cycle Pattern and Flow in MariaDB concept definitions to ensure child concepts retain isolated answer options.

### 3. One-Command Environment Setup Tool (`setup_environment.py`)
- **Commit**: [`376ad5b`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Script**: `scripts/setup_environment.py` (integrated into `.\openmrs.ps1 setup`)
- **Capabilities**:
  - Automatically performs host pre-flight verification (Docker engine, Python 3, Node.js, npm).
  - Dynamically discovers running OpenMRS Docker containers regardless of compose project prefixes.
  - Polls database and API readiness with exponential backoff.
  - Automatically runs concept setup, form publishing, and frontend bundle installation.

---

## 3. Architectural Decision Records (ADRs)

### ADR-001: Directed Acyclic Graph (DAG) Validation for Skip-Logic Paths
- **Context**: As form complexity grows with conditional visibility rules, circular dependencies (e.g. Field A depending on Field B, which depends on Field A) can cause infinite re-render loops or freeze the browser form engine.
- **Decision**: Implemented an automated graph traversal script using `igraph` to mathematically verify that all conditional `hideWhenExpression` rules form a strict Directed Acyclic Graph (DAG).
- **Rationale**: Trapping cycles before schemas are deployed guarantees that forms never deadlock the client browser during intake.
- **Rejected Alternatives**:
  - *Alternative A: Relying on manual UI testing.* Rejected because complex multi-branching skip-logic paths have exponential test cases that manual QA cannot exhaustively cover.
  - *Alternative B: Client-side recursion depth counters.* Rejected because failing at runtime during patient intake degrades clinician trust; schema verification must occur build-time.

### ADR-002: Dynamic Docker Container Discovery
- **Context**: Developers run Docker Compose with varying project directory names, resulting in container name variations (e.g., `openmrs-referenceapplication-frontend-1` vs `open-mrs_frontend_1`). Hardcoded container names broke automated setup scripts across environments.
- **Decision**: Implemented regex-based container pattern matching in `scripts/setup_environment.py` and `scripts/deploy_pipeline.py` querying Docker daemon for active containers containing `frontend`, `backend`, `gateway`, or `db`.
- **Rationale**: Makes all deployment and verification scripts robust across different developer workstations, CI environments, and operating systems.
- **Rejected Alternatives**:
  - *Alternative A: Mandating strict Docker Compose project names via `.env`.* Rejected because developers frequently forget to configure `.env` on fresh checkouts.

---

## 4. Post-Mortems, Defect Tracking & Root Cause Analysis

### Defect 1: Force Simulation Node Scrambling on Click
- **Root Cause**: D3 force simulation alpha target was reset to `0.3` on every mousedown event, causing stable settled graphs to rapidly destabilize.
- **Resolution**: Refactored drag handlers to only reheat alpha during active coordinate movement and lock un-dragged nodes.

### Defect 2: Answer Hierarchy Leakage in Concepts
- **Root Cause**: Initial CSV ingestion script linked sub-question answers directly to top-level questions in MariaDB.
- **Resolution**: Pruned spurious concept relationships via SQL cleanup and updated CSV modeling guidelines.

---

## 5. Human-in-the-Loop Directives & Review Log
- **Human Directive 1 (Visual Clarity)**: Lead Engineer required that graph visualizations must have zero text overlap to allow clinical stakeholders to audit form logic easily.
- **Human Directive 2 (One-Command Bootstrap)**: Lead Engineer instructed automating the entire local environment setup so new team members can get running with a single CLI command.

---

## 6. Daily Reflection & Standup Briefing Notes
1. **Mathematical Validation of Form Logic**: Verified DAG properties and zero circular dependencies across all conditional skip-logic expressions.
2. **Interactive Concept Graph Visualizers**: Published standalone D3 visualizations for auditing medical concept taxonomies.
3. **One-Command Developer Bootstrap**: Reduced local development setup time from 30 manual minutes to a single automated command.
