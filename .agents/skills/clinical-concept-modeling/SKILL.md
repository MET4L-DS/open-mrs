---
name: clinical-concept-modeling
description: Authoritative guide and standard procedures for modeling, registering, validating, and migrating OpenMRS relational concepts, numeric metadata, and coded answers in the AIIMS OpenMRS 3.x distribution.
---

# Clinical Concept Modeling & Terminology Skill

This skill defines the authoritative procedure for modeling, registering, verifying, and mapping clinical concepts in the AIIMS OpenMRS 3.x distribution.

---

## 1. Concept Architecture & Namespaces

AIIMS utilizes deterministic UUID namespaces to avoid collisions with standard dictionaries (CIEL, SNOMED CT, LOINC) while allowing clean migration post-licensing:

| Namespace / UUID Pattern | Entity Type | Purpose | Datatype | Class |
|:---|:---|:---|:---|:---|
| `c0010001-0000-0000-0000-000000000XXX` | **Question Concepts** | Form fields, observations, measurements | Numeric (1), Coded (2), Text (3), Date (6) | Question (7) / Finding (6) |
| `c0010002-0000-0000-0000-000000001XXX` | **Answer Concepts** | Coded options for select dropdowns, radio, multi-select | N/A (4) | Misc (11) |
| `c0010003-0000-0000-0000-000000000XXX` | **Socioeconomic Answers** | Modified Kuppuswamy classification options | N/A (4) | Misc (11) |
| `1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`, etc. | **Core CIEL Concepts** | Standard baseline concepts (BMI, Education, Yes/No) | CIEL Definition | CIEL Definition |

---

## 2. Inviolable Modeling Rules

### Rule 1: The `concept_numeric` Relational Constraint
Any concept with `datatype_id = 1` (`Numeric`) **MUST** have an accompanying row in `concept_numeric`:
- **Parameters**: `units`, `allow_decimal` (0 or 1), `low_absolute`, `hi_absolute`, `low_critical`, `hi_critical`.
- **Reason**: When saving an encounter, OpenMRS `ObsValidator` invokes `ConceptNumeric.getAllowDecimal()`. If the concept has `datatype_id = 1` but no `concept_numeric` record, OpenMRS throws a `NullPointerException` (HTTP 500) and aborts the transaction.

### Rule 2: Coded Question & Answer Linkage
- Every question with `"rendering": "select"` or `"rendering": "radio"` **MUST** have `datatype_id = 2` (`Coded`).
- Answer options **MUST** have `datatype_id = 4` (`N/A`) and `class_id = 11` (`Misc`).
- Every answer concept **MUST** be explicitly linked to the question concept via `concept_answer`:
  ```sql
  INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
  VALUES (@q_id, @a_id, 1, NOW(), UUID());
  ```

### Rule 3: Reusing Baseline CIEL Concepts (No Duplicates)
Before generating a placeholder UUID, check if standard OpenMRS/CIEL concepts exist:
- **Education**: `1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` (Highest level of school completed)
- **Body Mass Index**: `1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` (Body mass index)
- **Yes**: `1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
- **No**: `1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
- **Positive**: `703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
- **Negative**: `664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`
- **Not Done**: `1118AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`

---

## 3. Step-by-Step Concept Registration Workflow

### Step 1: Allocate Sequential UUIDs
1. Check the highest existing question UUID in `scripts/setup_aiims_concepts.py` and `docs/concept_registry.md`.
2. Check the highest existing answer UUID (currently starting in the `c0010002-...1050`+ range).
3. Reserve consecutive numbers without leaving arbitrary gaps.

### Step 2: Implement in `scripts/setup_aiims_concepts.py`
1. For numeric concepts:
   ```python
   full_script.append(add_concept_sql(
       "c0010001-0000-0000-0000-000000000XXX",
       "Concept Name",
       datatype_id=1,
       class_id=7,
       is_numeric=True,
       units="IU",
       allow_decimal=1,
       low_abs=0,
       hi_abs=100
   ))
   ```

   > ⚠️ **Pre-Registration Checklist for Numeric Concepts**:
   > - [ ] `is_numeric=True` is explicitly passed.
   > - [ ] `units` is a non-empty string with valid units (e.g. `"IU"`, `"days"`, `"mm"`).
   > - [ ] `allow_decimal` is integer `0` or `1` (never pass Python booleans `True`/`False`, which can map inappropriately in raw SQL generation).
   > - [ ] `low_abs` and `hi_abs` are set to valid absolute numbers (never leave as `None`).
   > *Omitting any of the above causes `ObsValidator` HTTP 500 NullPointerException during form submission.*

2. For coded dropdown questions and answers:
   ```python
   my_feature_answers = [
       ("c0010002-0000-0000-0000-000000001XXX", "Option Label 1"),
       ("c0010002-0000-0000-0000-000000001XXY", "Option Label 2"),
   ]
   # Register answers
   for u, name in my_feature_answers:
       full_script.append(add_concept_sql(u, name, datatype_id=4, class_id=11))

   # Register question as Coded (datatype_id=2)
   full_script.append(add_concept_sql("c0010001-0000-0000-0000-000000000XXX", "Question Label", datatype_id=2, class_id=7))

   # Link question to answers
   for ans_uuid, _ in my_feature_answers:
       full_script.append(add_answer_sql("c0010001-0000-0000-0000-000000000XXX", ans_uuid))
   ```

### Step 3: Populate MariaDB
Execute the script to apply changes to the live MariaDB container:
```bash
python scripts/setup_aiims_concepts.py
```

### Step 4: Synchronize Frontend Constants
Add the concept UUIDs to `aiims-esm-demographics-app/src/config/concepts.ts`:
```typescript
export const CONCEPTS = {
  // ...
  myConceptName: 'c0010001-0000-0000-0000-000000000XXX',
} as const;
```

### Step 5: Document in Concept Registry
1. Add rows to `docs/concept_registry.md`:
   - Include Internal Name, Datatype, Class, Target Standard (SNOMED CT, LOINC, CIEL), and Target Code.
2. If applicable, update `configuration/concepts/aiims/aiims_concepts.csv`.

### Step 6: Validate Dictionary Integrity
Run the concept validator to assert that all 324+ concepts are active and numeric metadata is verified:
```bash
npm run validate:concepts
```
