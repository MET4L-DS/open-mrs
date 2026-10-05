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
| `c0010001-0000-0000-0000-000000000020` | Gravida | Numeric | Finding | SNOMED CT | `161732006` | Yes | Active | Total number of pregnancies |
| `c0010001-0000-0000-0000-000000000021` | Parity | Numeric | Finding | SNOMED CT | `364325004` | Yes | Active | Number of deliveries |
| `c0010001-0000-0000-0000-000000000022` | Living Children | Numeric | Finding | SNOMED CT | `161746007` | Yes | Active | Number of living children |
| `c0010001-0000-0000-0000-000000000023` | Abortion or Miscarriage | Numeric | Finding | SNOMED CT | `161733001` | Yes | Active | Number of abortions / miscarriages |
| `c0010001-0000-0000-0000-000000000024` | Ectopic Pregnancy | Numeric | Finding | SNOMED CT | `34801009` | Yes | Active | Number of ectopic pregnancies |
| `c0010001-0000-0000-0000-000000000025` | Pattern of Menstrual cycle | Coded | Finding | SNOMED CT | `302757007` | Yes | Active | Concept answers: `c0010002-...201-204, 207-208` |
| `c0010001-0000-0000-0000-000000000026` | Last menstrual period | Date | Observable entity | SNOMED CT | `21840007` | Yes | Active | 1st day of last menstrual period |
| `c0010001-0000-0000-0000-000000000027` | Flow of Menstrual cycle | Coded | Finding | SNOMED CT | `289564002` | Yes | Active | Concept answers: `c0010002-...205-210` |
| `c0010001-0000-0000-0000-000000000028` | Irregular cycle type | Coded | Finding | SNOMED CT | `80182007` | Yes | Active | Concept answers: `c0010002-...203, 204` |
| `c0010001-0000-0000-0000-000000000029` | Type of Amenorrhoea | Coded | Finding | SNOMED CT | `8943002` | Yes | Active | Concept answers: `c0010002-...207, 208` |
| `c0010001-0000-0000-0000-000000000030` | Female Infertility Factor | Coded | Finding | SNOMED CT | `6738008` | Yes | Active | Concept answers: `c0010002-...301-307` |
| `c0010001-0000-0000-0000-000000000031` | Tubal Factor Details | Coded | Finding | SNOMED CT | `237072004` | Yes | Active | Concept answers: `c0010002-...311-315` |
| `c0010001-0000-0000-0000-000000000032` | Diminished Ovarian Reserve Details | Coded | Finding | SNOMED CT | `723722002` | Yes | Active | Concept answers: `c0010002-...321, 322` |
| `c0010001-0000-0000-0000-000000000033` | POSEIDON Group | Coded | Finding | Local / POSEIDON | — | Yes | Active | Concept answers: `c0010002-...323-328` |
| `c0010001-0000-0000-0000-000000000034` | Endometriosis Classification | Coded | Finding | SNOMED CT | `129103003` | Yes | Active | Concept answers: `c0010002-...331, 332` |
| `c0010001-0000-0000-0000-000000000035` | PCOS Phenotype | Coded | Finding | SNOMED CT | `237055002` | Yes | Active | Concept answers: `c0010002-...341-344` |
| `c0010001-0000-0000-0000-000000000036` | Uterine Factor Details | Coded | Finding | SNOMED CT | `289539003` | Yes | Active | Concept answers: `c0010002-...351-356` |
| `c0010001-0000-0000-0000-000000000037` | Other Female Infertility Factors | Coded | Finding | SNOMED CT | `6738008` | Yes | Active | Concept answers: `c0010002-...361-366` |
| `c0010001-0000-0000-0000-000000000038` | Female Factor Others | Text | Misc | Local / Institutional | — | — | Active | Free-text clinical notes |
| `c0010001-0000-0000-0000-000000000086` | Medical Disease | Coded | Finding | SNOMED CT | `64572001` | Yes | Active | Concept answers: `c0010002-...701-799` |
| `c0010001-0000-0000-0000-000000000087` | Medical Diseases Others | Text | Misc | Local / Institutional | — | — | Active | Free-text / Other diseases |


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

### 2.5 Menstrual History Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000000201` | Regular periods | SNOMED CT | `302757007` | Yes | Active |
| `c0010002-0000-0000-0000-000000000202` | Irregular periods | SNOMED CT | `80182007` | Yes | Active |
| `c0010002-0000-0000-0000-000000000203` | Oligomenorrhea | SNOMED CT | `52073004` | Yes | Active |
| `c0010002-0000-0000-0000-000000000204` | Polymenorrhea | SNOMED CT | `398007005` | Yes | Active |
| `c0010002-0000-0000-0000-000000000205` | Normal | SNOMED CT | `17621005` | Yes | Active |
| `c0010002-0000-0000-0000-000000000206` | Hypomenorrhoea | SNOMED CT | `64206003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000207` | Primary Amenorrhoea | SNOMED CT | `156035003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000208` | Secondary Amenorrhoea | SNOMED CT | `156036002` | Yes | Active |
| `c0010002-0000-0000-0000-000000000209` | Heavy Menstrual Bleeding (HMB) | SNOMED CT | `16464003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000210` | Amenorrhoea | SNOMED CT | `8943002` | Yes | Active |

---

### 2.6 Female Factor Infertility Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000000301` | Tubal factor | SNOMED CT | `237072004` | Yes | Active |
| `c0010002-0000-0000-0000-000000000302` | Diminished ovarian reserve | SNOMED CT | `723722002` | Yes | Active |
| `c0010002-0000-0000-0000-000000000303` | Endometriosis | SNOMED CT | `129103003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000304` | Polycystic ovary syndrome (PCOS) | SNOMED CT | `237055002` | Yes | Active |
| `c0010002-0000-0000-0000-000000000305` | Uterine Factor | SNOMED CT | `289539003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000306` | Female infertility due to advanced maternal age | SNOMED CT | `281694009` | Yes | Active |
| `c0010002-0000-0000-0000-000000000307` | Other female factors | SNOMED CT | `6738008` | Yes | Active |
| `c0010002-0000-0000-0000-000000000311` | Tubal block unilateral | SNOMED CT | `237073009` | Yes | Active |
| `c0010002-0000-0000-0000-000000000312` | Tubal block bilateral | SNOMED CT | `237074003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000313` | Previous ectopic | SNOMED CT | `161747003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000314` | Hydrosalpinx | SNOMED CT | `398031006` | Yes | Active |
| `c0010002-0000-0000-0000-000000000315` | Hematosalpinx | SNOMED CT | `66085002` | Yes | Active |
| `c0010002-0000-0000-0000-000000000321` | Borderline Ovarian Reserve | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000000322` | Patient-Oriented Strategies Encompassing IndividualizeD Oocyte Number (POSEIDON) | Local / POSEIDON | — | — | Active |
| `c0010002-0000-0000-0000-000000000323` | POSEIDON GROUP 1a | Local / POSEIDON | — | — | Active |
| `c0010002-0000-0000-0000-000000000324` | POSEIDON GROUP 1b | Local / POSEIDON | — | — | Active |
| `c0010002-0000-0000-0000-000000000325` | POSEIDON GROUP 2a | Local / POSEIDON | — | — | Active |
| `c0010002-0000-0000-0000-000000000326` | POSEIDON GROUP 2b | Local / POSEIDON | — | — | Active |
| `c0010002-0000-0000-0000-000000000327` | POSEIDON GROUP 3 | Local / POSEIDON | — | — | Active |
| `c0010002-0000-0000-0000-000000000328` | POSEIDON GROUP 4 | Local / POSEIDON | — | — | Active |
| `c0010002-0000-0000-0000-000000000331` | American Society for Reproductive Medicine-ASRM | Local / ASRM | — | — | Active |
| `c0010002-0000-0000-0000-000000000332` | Endometriosis Fertility Index-EFI | Local / EFI | — | — | Active |
| `c0010002-0000-0000-0000-000000000341` | Phenotype A (Classic/Severe) | Rotterdam Criteria | — | — | Active |
| `c0010002-0000-0000-0000-000000000342` | Phenotype B (Classic) | Rotterdam Criteria | — | — | Active |
| `c0010002-0000-0000-0000-000000000343` | Phenotype C (Ovulatory) | Rotterdam Criteria | — | — | Active |
| `c0010002-0000-0000-0000-000000000344` | Phenotype D (Mild/Non-hyperandrogenic) | Rotterdam Criteria | — | — | Active |
| `c0010002-0000-0000-0000-000000000351` | Adenomyosis | SNOMED CT | `254840008` | Yes | Active |
| `c0010002-0000-0000-0000-000000000352` | Fibroids | SNOMED CT | `95317003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000353` | Polyps | SNOMED CT | `70160000` | Yes | Active |
| `c0010002-0000-0000-0000-000000000354` | Asherman's | SNOMED CT | `81703009` | Yes | Active |
| `c0010002-0000-0000-0000-000000000355` | Septate Uterus | SNOMED CT | `205423000` | Yes | Active |
| `c0010002-0000-0000-0000-000000000356` | Unicornuate uterus | SNOMED CT | `205422005` | Yes | Active |
| `c0010002-0000-0000-0000-000000000361` | Hypogonadotropic hypogonadism | SNOMED CT | `237667008` | Yes | Active |
| `c0010002-0000-0000-0000-000000000362` | Oncofertility | SNOMED CT | `714777002` | Yes | Active |
| `c0010002-0000-0000-0000-000000000363` | H/O Tuberculosis | SNOMED CT | `161424004` | Yes | Active |
| `c0010002-0000-0000-0000-000000000364` | Turner Mosaic | SNOMED CT | `205562002` | Yes | Active |
| `c0010002-0000-0000-0000-000000000365` | Unexplained Infertility | SNOMED CT | `237064003` | Yes | Active |
| `c0010002-0000-0000-0000-000000000366` | Serodiscordant couple | SNOMED CT | `426978007` | Yes | Active |


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
