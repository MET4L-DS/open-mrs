# Daily Engineering Record: 2026-09-18

## 1. Executive Summary
- **Main Goal**: Establish the core repository structure, configure Git ignore rules for enterprise OpenMRS development, and author the container orchestration automation layer (`openmrs.ps1`) to manage the multi-service Docker stack (`gateway`, `frontend`, `backend`, `db`).
- **Outcome**: Successfully stood up the local OpenMRS 3.x distribution stack, established PowerShell developer orchestration commands, and verified container health and inter-service networking.

---

## 2. Completed Tasks & Infrastructure

### 1. Repository Initialization & Hygiene
- **Commits**: `98c1183`, [`579f672`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- Created Git repository with `.gitattributes` enforcing consistent LF line endings across operating systems.
- Configured `.gitignore` targeting Node build outputs, OpenMRS runtime logs, MariaDB database volumes, and temporary IDE files.

### 2. Multi-Service Container Orchestration (`openmrs.ps1`)
- **Commit**: [`b97f80c`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Script**: `openmrs.ps1`
- **Capabilities**:
  - Orchestrates Docker Compose multi-service topology:
    - `gateway`: Nginx reverse proxy routing traffic between frontend SPA and backend REST API.
    - `frontend`: Single-SPA application shell delivering dynamic microfrontends.
    - `backend`: OpenMRS Core Java Spring/Hibernate application server.
    - `db`: MariaDB 10.x storing relational concept dictionary, patient records, and encounters.
  - Commands for starting, stopping, restarting, log streaming, and container status monitoring.
  - Documented developer setup in root `README.md`.

---

## 3. Architectural Decision Records (ADRs)

### ADR-001: Multi-Container Microservices Architecture via Docker Compose
- **Context**: Setting up a full OpenMRS 3.x stack natively on local developer machines requires configuring Java 11/17, MySQL/MariaDB, Tomcat, Node.js, and an Nginx reverse proxy. Environment discrepancies cause severe "works on my machine" issues.
- **Decision**: Containerized the entire stack using Docker Compose with 4 distinct services (`gateway`, `frontend`, `backend`, `db`) connected through an internal Docker bridge network.
- **Rationale**: Guarantees identical runtime environments across all developer machines and staging environments, with isolated persistent volumes for database state.
- **Rejected Alternatives**:
  - *Alternative A: Native local installation of Tomcat, MySQL, and Node.* Rejected because maintaining complex cross-platform native runtime dependencies is error-prone and time-consuming.
  - *Alternative B: Cloud-hosted development server.* Rejected because local offline development is essential for rapid code-test feedback loops.

### ADR-002: PowerShell Automation Layer (`openmrs.ps1`) for Windows Development
- **Context**: Developers working on Windows frequently face shell discrepancies between Bash, cmd, and PowerShell when running multi-argument Docker Compose commands.
- **Decision**: Created `openmrs.ps1` as the primary developer CLI wrapper supporting intuitive subcommands (`start`, `stop`, `restart`, `logs`, `status`).
- **Rationale**: Provides ergonomic developer experience, abstracts long Docker commands, and standardizes container lifecycle operations.
- **Rejected Alternatives**:
  - *Alternative A: Bash shell script (`openmrs.sh`) alone.* Rejected because Windows developers without WSL or Git Bash cannot execute shell scripts natively in PowerShell.
  - *Alternative B: Pure Makefiles.* Rejected because `make` is not natively installed on standard Windows workstations.

---

## 4. Post-Mortems, Defect Tracking & Root Cause Analysis

### Defect 1: Gateway Reverse Proxy Port Collision
- **Root Cause**: Gateway Nginx configuration initially collided with local port 80.
- **Resolution**: Bound OpenMRS Gateway to external port `8080` / `80` with configurable environment variable overrides in docker-compose.

---

## 5. Human-in-the-Loop Directives & Review Log
- **Human Directive 1 (Containerized Isolation)**: Lead Engineer mandated that no service outside Node tooling should be installed natively on the host; all databases and backend engines must run strictly containerized.
- **Human Directive 2 (Reproducible Stack)**: Lead Engineer required that a fresh repository clone must be able to boot the entire stack with a single script command.

---

## 6. Daily Reflection & Standup Briefing Notes
1. **Container Infrastructure Operational**: Orchestrated OpenMRS 3.x microservices stack (Gateway, Frontend, Backend, MariaDB) with Docker Compose.
2. **Developer Ergonomics**: Shipped `openmrs.ps1` PowerShell automation script for zero-friction container lifecycle control.
3. **Foundation Ready for Microfrontend Development**: The local environment is healthy, networked, and ready for custom clinical form application development.
