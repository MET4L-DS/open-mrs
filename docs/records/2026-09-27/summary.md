# Daily Engineering Record: 2026-09-27

## 1. Executive Summary
- **Main Goal**: Bootstrap the `@aiims/esm-demographics-app` microfrontend within the OpenMRS 3.x Single-SPA framework, deliver Form 1 (*Personal Information Intake*), establish configuration-driven architectural foundations, and author foundational workspace guidelines.
- **Outcome**: Successfully deployed the Demographics custom patient chart module, registered the first batch of AIIMS medical concepts (31 concepts), published the Form 1 AMPATH schema, and refactored the frontend to introduce `FORM_REGISTRY` and `PROJECT_MEMORY.md`.

---

## 2. Completed Tasks & Form 1 Delivery

### 1. Demographics Custom Patient Chart Sidebar Module
- **Commit**: [`b9f2b07`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Framework & Tooling**: Configured Single-SPA lifecycles, Rspack bundling, TypeScript (`noImplicitAny`), and Carbon Design System.
- **Form 1 Delivery (`aiims-personal-information`)**:
  - Published `forms/aiims_personal_information.json` with AMPATH JSON schema.
  - Registered 31 medical concepts in MariaDB (`scripts/register_aiims_concepts.sql`, `scripts/setup_aiims_concepts.py`).
  - Implemented Carbon card components: `ClinicalCard`, `PatientCard` (Wife), `HusbandCard`, and `SesCard` (Modified Kuppuswamy Socioeconomic Scale).
  - Registered sidebar link in `patient-chart-dashboard-slot` with custom Identification icon.
  - Authored initial deployment script `scripts/deploy_demographics.py`.

### 2. Sidebar Menu Styling Alignment
- **Commit**: [`57da854`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Fix**: Aligned `dashboard-link.component.tsx` styling, padding, and active-state highlights with OpenMRS 3.x Carbon sidebar design standards.

### 3. Core Architectural Refactoring & Project Memory Foundation
- **Commit**: [`5ae69b5`](file:///c:/Met4l.DSCode/Projects/open-mrs)
- **Configuration-Driven Pattern**: Introduced `FORM_REGISTRY` in `src/constants.ts` and extension generator factory.
- **Shared Design System**: Extracted reusable primitives into `src/shared/components/` (`ObservationCard`, `DataRow`, `DashboardToolbar`, `EmptyState`).
- **CSS Architecture**: Replaced fragile index-based CSS border hacks with native `:last-child` SCSS pseudo-classes.
- **Dependency Hygiene**: Stripped unused dependencies (`rxjs`, `react-is`) and enabled strict typechecking.
- **Workspace Memory**: Authored foundational `PROJECT_MEMORY.md` and `AGENTS.md` establishing workspace development laws.

---

## 3. Architectural Decision Records (ADRs)

### ADR-001: Single-SPA Microfrontend vs Monolithic OpenMRS OMOD Module
- **Context**: Infertility workflows require modern, responsive, and dynamic user interfaces with rapid release iterations. Traditional OpenMRS Java OMOD modules require full JVM restarts and complex JSP/GSP templates.
- **Decision**: Developed the AIIMS fertility intake system as a Single-SPA React microfrontend (`@aiims/esm-demographics-app`) running inside the OpenMRS 3.x application shell.
- **Rationale**: Enables hot-module deployment in seconds without server downtime, allows leverage of modern React ecosystems and Carbon Design System, and cleanly decouples frontend presentation from backend persistence.
- **Rejected Alternatives**:
  - *Alternative A: Traditional Java OMOD extension.* Rejected due to slow compile-deploy-restart feedback loops (5+ minutes) and outdated UI templating.
  - *Alternative B: Standalone React app outside OpenMRS.* Rejected because it would require building a separate authentication, RBAC, and patient indexing system from scratch.

### ADR-002: Configuration-Driven Architecture via `FORM_REGISTRY`
- **Context**: As the platform expands to support 30+ specialty intake forms, writing bespoke extension wrappers, routing configurations, and slot handlers for each form leads to exponential boilerplate and maintenance overhead.
- **Decision**: Established a centralized, strongly typed registry (`FORM_REGISTRY`) that maps form keys, names, icons, URLs, and UUIDs, paired with a generic extension generator factory.
- **Rationale**: Eliminates redundant Single-SPA lifecycle boilerplate and ensures that adding new forms only requires configuration registration and component implementation.
- **Rejected Alternatives**:
  - *Alternative A: Manually coding individual Single-SPA registration blocks in `index.ts`.* Rejected because repetitive registration code breeds configuration drift and subtle naming errors.

### ADR-003: Carbon Design System Adoption & Shared Component Library
- **Context**: Developing ad-hoc CSS styles produces inconsistent button sizes, uneven typography, and visual discord with upstream OpenMRS 3.x applications.
- **Decision**: Standardized on Carbon Design System (`@carbon/react`) and extracted shared domain primitives (`ObservationCard`, `DataRow`, `EmptyState`) into `src/shared/components/`.
- **Rationale**: Guarantees visual harmony with OpenMRS 3.x core, provides out-of-the-box accessibility (a11y), and drastically speeds up feature development.
- **Rejected Alternatives**:
  - *Alternative A: Tailwind CSS or Material UI.* Rejected because OpenMRS 3.x core is natively built on Carbon; mixing UI libraries causes severe CSS collisions and massive bundle bloat.

---

## 4. Post-Mortems, Defect Tracking & Root Cause Analysis

### Defect 1: Sidebar Active Menu Styling Mismatch
- **Root Cause**: Custom navigation link had hardcoded margins and background colors that clashed with the Carbon active state indicator.
- **Resolution**: Refactored `dashboard-link.component.tsx` to inherit standard Carbon classes and CSS custom properties (`57da854`).

### Defect 2: Phantom Dependencies Inflating Bundle
- **Root Cause**: Scaffolding templates pulled in unused reactive libraries (`rxjs`, `react-is`).
- **Resolution**: Purged unneeded dependencies, shrinking bundle payload and build time (`5ae69b5`).

---

## 5. Human-in-the-Loop Directives & Review Log
- **Human Directive 1 (Socioeconomic Stratification)**: Lead Clinician requested integrating the Modified Kuppuswamy Socioeconomic Scale to assess social determinants of health across IVF cohorts.
- **Human Directive 2 (Modular Architecture)**: Lead Engineer mandated that all form components must follow standard shared patterns rather than custom one-off implementations.

---

## 6. Daily Reflection & Standup Briefing Notes
1. **Microfrontend Operational**: Successfully bootstrapped `@aiims/esm-demographics-app` and hot-deployed Form 1 (Personal Information Intake) to OpenMRS 3.x.
2. **Configuration-Driven Foundation**: Introduced `FORM_REGISTRY` and shared component library, setting the template for scaling to 30+ forms.
3. **Workspace Memory Established**: Authored `PROJECT_MEMORY.md` to ensure ongoing development adherence to architectural rules.
