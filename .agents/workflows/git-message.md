---
description: Generates standardized conventional Git commit messages based on staged changes, repository rules, and project memory.
---

# Git Commit Message Generation Workflow

Use this workflow whenever drafting commit messages for this repository.

## Commit Guidelines for AIIMS OpenMRS 3.x

### 1. Subject Line Format
Follow Conventional Commits: `<type>(<scope>): <short imperative description>`
- **Length**: Maximum 72 characters.
- **Tense**: Present imperative ("add", "fix", "refactor", not "added" or "fixing").
- **Types**:
  - `feat`: New clinical form, UI widget, CLI tool, or pipeline feature.
  - `fix`: Bug fix, error resolution (404, 500, NPE, race condition).
  - `refactor`: Structural reorganization, code deduplication, route generation.
  - `test`: E2E robot tests, unit tests, vitest mocks.
  - `docs`: Records (`docs/records/`), README, concept registry, or memory updates.
  - `chore`: Dependency updates, configuration tweaks.
- **Scopes**:
  - Module/Feature name: `demographics`, `infertility`, `female-factor`, `embryo-assessment`, etc.
  - Infrastructure: `pipeline`, `scaffolding`, `concepts`, `forms`, `i18n`, `records`, `e2e`.

### 2. Body Structure
Provide structured bullet points detailing:
- What was added/fixed (mentioning specific components, concept UUIDs, form UUIDs).
- Why the change was made and any bug root causes.
- Files affected across database scripts, AMPATH form schemas, and frontend.
- Quality gates passed (e.g. `validate:forms`, `validate:concepts`, `vitest`).

### 3. Example Commit Message

```text
feat(demographics): add BMI field to patient profile and summary widget

- Register new numeric concept c0010001-...-0012 (Patient Body Mass Index)
  with concept_numeric metadata (units: kg/m², range: 5–90, allow_decimal: 1).
- Add BMI question under Patient (Wife) profile in forms/aiims_personal_information.json
  with validation (10.0–60.0 kg/m²) and publish schema to OpenMRS backend.
- Update @aiims/esm-demographics-app:
  - Add patientBmi to CONCEPTS and AiimsDemographicsData extraction interface.
  - Render BMI row in PatientCard with localized units (kg/m²).
  - Add Wife's BMI item to sticky DemographicsSummaryWidget on patient chart.
  - Add i18n localization keys in translations/en.json.
- Update concept registries (aiims_concepts.csv, docs/concept_registry.md)
  and regenerate scripts/register_aiims_concepts.sql.
- Update docs/records/2026-10-14/summary.md with deliverables and metrics.
```
