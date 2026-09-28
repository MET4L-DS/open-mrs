# AIIMS Reproductive Medicine & IVF — Concept Registry & SNOMED CT Migration Roadmap

> **Author**: AIIMS Project Research Team  
> **Status**: Active (Phase 2) — Temporary Placeholder Registry  
> **Target Standard**: SNOMED CT / CIEL / LOINC  
> **Purpose**: This document maintains the authoritative mapping between local placeholder concept UUIDs and standard clinical terminologies (primarily SNOMED CT, verified via ATHENA/OHDSI). Once the institutional SNOMED CT license is activated and OCL/terminology access is configured, these concepts will be migrated to standard reference terms.

---

## 1. Registry Architecture Overview

To maintain agility and avoid blocking clinical deployment pending terminology license onboarding:
1. **Local Namespaces**:
   - `c0010001-0000-0000-0000-0000000000XX`: Question concepts (Form fields)
   - `c0010002-0000-0000-0000-0000000000XX`: Occupation answer concepts (ISCO-88 / SNOMED CT)
   - `c0010003-0000-0000-0000-0000000000XX`: Modified Kuppuswamy Socioeconomic Status answer concepts
2. **Standard Concepts (Direct Adoption)**:
   - Concepts that already exist in the baseline CIEL dictionary (e.g. `1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` for Education, `1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` for BMI) are used directly.
   - Demographics and system identifiers are stored as first-class OpenMRS entities (Patient Demographics, Patient Identifier Types, Person Attributes), not encounter observations.

---

## 2. Active Concept Mapping Table

### 2.1 Question Concepts (Form Fields)

| Placeholder UUID | Internal Name | Datatype | Class | Target Standard | Target Code | ATHENA Verified | Status | Notes |
|:---|:---|:---|:---|:---|:---:|:---:|:---:|:---|
| `c0010001-0000-0000-0000-000000000001` | Consultant Unit | Text | Misc | Local / Institutional | — | — | Active | Operational metadata |
| `c0010001-0000-0000-0000-000000000002` | Consultant Name | Text | Misc | Local / Institutional | — | — | Active | Operational metadata |
| `c0010001-0000-0000-0000-000000000004` | Patient Age | Numeric | Finding | SNOMED CT | `424144002` | Yes | Active | Current chronological age |
| `c0010001-0000-0000-0000-000000000007` | Husband Name | Text | Misc | Local / Partner Obs | — | — | Active | Partner identification |
| `c0010001-0000-0000-0000-000000000008` | Husband Age | Numeric | Finding | SNOMED CT | `424144002` | Yes | Active | Partner chronological age |
| `c0010001-0000-0000-0000-000000000011` | Phone Number Husband | Text | Misc | Local / Partner Obs | — | — | Active | Partner contact number |
| `c0010001-0000-0000-0000-000000000014` | Occupation Wife | Coded | Finding | SNOMED CT | `105429006` | Yes | Active | Concept answers: `c0010002-...` |
| `c0010001-0000-0000-0000-000000000015` | Occupation Husband | Coded | Finding | SNOMED CT | `105429006` | Yes | Active | Concept answers: `c0010002-...` |
| `c0010001-0000-0000-0000-000000000016` | Socioeconomic Status | Coded | Finding | SNOMED CT | `73831000` | Yes | Active | Concept answers: `c0010003-...` |
| `c0010001-0000-0000-0000-000000000017` | Type of infertility | Coded | Finding | SNOMED CT | `275275009` | Yes | Active | Concept answers: `c0010002-...101`, `102` |
| `c0010001-0000-0000-0000-000000000018` | Married for years | Numeric | Observable entity | SNOMED CT | `224134009` | Yes | Active | Marriage duration in years |
| `c0010001-0000-0000-0000-000000000019` | Duration of infertility | Numeric | Observable entity | SNOMED CT | `6738008` | Yes | Active | Infertility duration in years |

---

### 2.2 Occupation Answer Options (`c0010002-...`)
*Categorized according to ISCO / Kuppuswamy Socioeconomic Scale occupation classification.*

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000000001` | Legislators, senior officials and managers | SNOMED CT | `224361009` | Yes | Active |
| `c0010002-0000-0000-0000-000000000002` | Professionals | SNOMED CT | `66780001` | Yes | Active |
| `c0010002-0000-0000-0000-000000000003` | Technicians and associate professionals | SNOMED CT | `159714009` | Yes | Active |
| `c0010002-0000-0000-0000-000000000004` | Clerks | SNOMED CT | `307930005` | Yes | Active |
| `c0010002-0000-0000-0000-000000000005` | Skilled workers and shop and market sale workers | SNOMED CT | `405141000` | Yes | Active |
| `c0010002-0000-0000-0000-000000000006` | Skilled agricultural and fishery workers | SNOMED CT | `106491007` | Yes | Active |
| `c0010002-0000-0000-0000-000000000007` | Craft and related trade workers | SNOMED CT | `84246000` | Yes | Active |
| `c0010002-0000-0000-0000-000000000008` | Plant and machine operators and assemblers | SNOMED CT | `159682006` | Yes | Active |
| `c0010002-0000-0000-0000-000000000009` | Elementary occupation | SNOMED CT | `160174001` | Yes | Active |
| `c0010002-0000-0000-0000-000000000010` | Unemployed | SNOMED CT | `73438004` | Yes | Active |

---

### 2.3 Infertility Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000000101` | Primary infertility | SNOMED CT | `15603001` | Yes | Active |
| `c0010002-0000-0000-0000-000000000102` | Secondary infertility | SNOMED CT | `275276005` | Yes | Active |

---

### 2.4 Socioeconomic Assessment Answer Options (`c0010003-...`)
*Modified Kuppuswamy Socioeconomic Scale classifications.*

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010003-0000-0000-0000-000000000001` | Upper (Kuppuswamy Class I) | SNOMED CT | `85483007` | Yes | Active |
| `c0010003-0000-0000-0000-000000000002` | Upper Middle (Class II) | SNOMED CT | `64818001` | Yes | Active |
| `c0010003-0000-0000-0000-000000000003` | Lower Middle (Class III) | SNOMED CT | `22575001` | Yes | Active |
| `c0010003-0000-0000-0000-000000000004` | Upper Lower (Class IV) | SNOMED CT | `38877009` | Yes | Active |
| `c0010003-0000-0000-0000-000000000005` | Lower (Class V) | SNOMED CT | `38877009` | Yes | Active |

---

## 3. Standard Dictionary Concepts Used

| Concept UUID | Name | System / Standard | Mappings | Usage in AIIMS |
|:---|:---|:---|:---|:---|
| `1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Highest level of school completed | CIEL / OpenMRS | SNOMED CT `224605001` | Wife Education & Husband Education |
| `1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Body mass index | CIEL / OpenMRS | SNOMED CT `60621009`, LOINC `39156-5` | Husband BMI |
| `14d4f066-15f5-102d-96e4-000c29c2a5d7` | Telephone Number | OpenMRS Person Attribute Type | — | Patient (Wife) Mobile Number |
| `160296AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Profession or honours | CIEL | — | Education Answer Option |
| `159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Graduate | CIEL | — | Education Answer Option |
| `159785AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Intermediate or diploma | CIEL | — | Education Answer Option |
| `1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | High school certificate | CIEL | — | Education Answer Option |
| `160297AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Middle school certificate | CIEL | — | Education Answer Option |
| `1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Primary school certificate | CIEL | — | Education Answer Option |
| `160298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Illiterate | CIEL | — | Education Answer Option |

---

## 4. Retired / Superseded Placeholder Concepts

The following placeholder concepts were defined during early prototype phases and have been superseded by first-class OpenMRS entities or standard CIEL concepts:

| Placeholder UUID | Former Name | Replaced By | Reason |
|:---|:---|:---|:---|
| `c0010001-0000-0000-0000-000000000003` | Patient Name | Native `PersonName` entity | Name is captured in Patient Demographics header |
| `c0010001-0000-0000-0000-000000000005` | Unique Health Identifier | `patient_identifier` (UHID Type) | First-class identifier for barcoding/patient search |
| `c0010001-0000-0000-0000-000000000006` | IVF Number | `patient_identifier` (IVF Number Type) | First-class department identifier |
| `c0010001-0000-0000-0000-000000000009` | Husband BMI | CIEL `1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Harmonized with standard BMI concept |
| `c0010001-0000-0000-0000-000000000010` | Phone Number Wife | Person Attribute Type `Telephone Number` | Attached directly to person record |
| `c0010001-0000-0000-0000-000000000013` | Education Husband | CIEL `1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` | Harmonized with standard Education concept |

---

## 5. SNOMED CT Migration Procedure (Post-Licensing)

When the institutional SNOMED CT license is acquired:
1. Ensure the `SNOMED CT` concept source is enabled in `concept_reference_source`.
2. For each active placeholder UUID in Section 2:
   - Create a `concept_reference_term` in OpenMRS referencing code and source `SNOMED CT`.
   - Add a `concept_reference_map` with map type `SAME-AS` between the concept and the reference term.
   - Or alternatively, if importing via OCL subscription, map the local dictionary to the official SNOMED CT release.
3. Because all observations in the database reference `concept_id` / `uuid`, adding reference mappings causes **zero disruption** to existing clinical records or forms.
