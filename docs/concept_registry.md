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
| `c0010001-0000-0000-0000-000000000012` | Patient Body Mass Index | Numeric | Observable entity | SNOMED CT | `60621009` | Yes | Active | Patient (Wife) Body Mass Index (kg/m²) |
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
| `c0010001-0000-0000-0000-000000000107` | Total Antral Follicle Count | Numeric | Finding | Local / Ultrasound | — | — | Active | Form 13: Total AFC count |
| `c0010001-0000-0000-0000-000000000108` | Volume Right Ovary | Numeric | Finding | Local / Ultrasound | — | — | Active | Form 13: Right ovary volume (cm³) |
| `c0010001-0000-0000-0000-000000000109` | Volume Left Ovary | Numeric | Finding | Local / Ultrasound | — | — | Active | Form 13: Left ovary volume (cm³) |
| `c0010001-0000-0000-0000-000000000110` | Ultrasound Remarks | Text | Misc | Local / Ultrasound | — | — | Active | Form 13: Clinical ultrasound notes |
| `c0010001-0000-0000-0000-000000000111` | Anti-Mullerian Hormone | Numeric | Finding | LOINC | `38476-8` | Yes | Active | Form 14: AMH (ng/mL) |
| `c0010001-0000-0000-0000-000000000112` | Day 2 Follicle-Stimulating Hormone | Numeric | Finding | LOINC | `15067-2` | Yes | Active | Form 14: Day 2 FSH (mIU/mL) |
| `c0010001-0000-0000-0000-000000000113` | Day 2 Luteinizing Hormone | Numeric | Finding | LOINC | `10501-5` | Yes | Active | Form 14: Day 2 LH (mIU/mL) |
| `c0010001-0000-0000-0000-000000000114` | Thyroid-Stimulating Hormone | Numeric | Finding | LOINC | `3016-3` | Yes | Active | Form 14: TSH (uIU/mL) |
| `c0010001-0000-0000-0000-000000000115` | Serum Prolactin | Numeric | Finding | LOINC | `2842-3` | Yes | Active | Form 14: Prolactin (ng/mL) |
| `c0010001-0000-0000-0000-000000000116` | Hysteroscopy Ostia | Coded | Finding | Local / Hysteroscopy | — | — | Active | Form 15: Deep seated, normal, adhesions, not seen |
| `c0010001-0000-0000-0000-000000000117` | Hysteroscopy Endometrium | Coded | Finding | Local / Hysteroscopy | — | — | Active | Form 15: Normal, pale, micropolyps, thin, congested, etc. |
| `c0010001-0000-0000-0000-000000000118` | Hysteroscopy Endometrial Cavity | Coded | Finding | Local / Hysteroscopy | — | — | Active | Form 15: Normal, polyp, septum, adhesion, fibroid, etc. |
| `c0010001-0000-0000-0000-000000000119` | Hysteroscopy Cervical Canal Direction | Coded | Finding | Local / Hysteroscopy | — | — | Active | Form 15: Direction & cervical adhesions |
| `c0010001-0000-0000-0000-000000000120` | Hysteroscopy Dimensions | Text | Finding | Local / Hysteroscopy | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000121` | Operative Hysteroscopy | Coded | Procedure | Local / Hysteroscopy | — | — | Active | Form 15: Polypectomy, metroplasty, adhesiolysis, etc. |
| `c0010001-0000-0000-0000-000000000122` | Uterine Size Length | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Uterine length (cm) |
| `c0010001-0000-0000-0000-000000000123` | Uterine Size Width | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Uterine width (cm) |
| `c0010001-0000-0000-0000-000000000124` | Uterine Size Transverse Diameter | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Transverse diameter (cm) |
| `c0010001-0000-0000-0000-000000000125` | Uterine Size Volume | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Volume (cm³) |
| `c0010001-0000-0000-0000-000000000126` | Day of Cycle | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Cycle day of examination |
| `c0010001-0000-0000-0000-000000000127` | Adenomyosis TVS Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Globular, asymmetrical, cysts, islands, etc. |
| `c0010001-0000-0000-0000-000000000128` | Uterine Calcifications | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000129` | Fibroids Present | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000130` | Number of Fibroids | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Count |
| `c0010001-0000-0000-0000-000000000131` | Fibroids Location | Coded | Finding | Local / TVS | — | — | Active | Form 15: Anterior, posterior, fundal, etc. |
| `c0010001-0000-0000-0000-000000000132` | Fibroids Size | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000133` | Fibroid Stages FIGO | Coded | Finding | FIGO Classification | — | — | Active | Form 15: FIGO 0 through 8, 2-5 |
| `c0010001-0000-0000-0000-000000000134` | TVS Endometrial Cavity | Coded | Finding | Local / TVS | — | — | Active | Form 15: Normal, 3D, 4D, adhesions, fluid |
| `c0010001-0000-0000-0000-000000000135` | Endometrial-Myometrial Junction | Coded | Finding | Local / TVS | — | — | Active | Form 15: Well-defined, ill-defined, irregular, interrupted |
| `c0010001-0000-0000-0000-000000000136` | Septate Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000137` | Endometrial Cavity Septate Angle | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Degrees |
| `c0010001-0000-0000-0000-000000000138` | Endometrial Cavity Length of Septum | Numeric | Finding | Local / TVS | — | — | Active | Form 15: cm |
| `c0010001-0000-0000-0000-000000000139` | Bicornuate Uterus | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000140` | Bicornuate Uterus Right Volume | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Right horn volume (cm³) |
| `c0010001-0000-0000-0000-000000000141` | Bicornuate Uterus Left Volume | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Left horn volume (cm³) |
| `c0010001-0000-0000-0000-000000000142` | Unicornuate Uterus | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000143` | Unicornuate Uterus Volume | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Volume (cm³) |
| `c0010001-0000-0000-0000-000000000144` | Polyp Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Present/Absent |
| `c0010001-0000-0000-0000-000000000145` | Number of Polyps | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Count |
| `c0010001-0000-0000-0000-000000000146` | Dimensions of Polyps | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000147` | Antral Follicle Count Right Ovary | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Count |
| `c0010001-0000-0000-0000-000000000148` | Antral Follicle Count Left Ovary | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Count |
| `c0010001-0000-0000-0000-000000000149` | Right Ovary Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000150` | Left Ovary Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000151` | Endometrioma Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Present/Absent |
| `c0010001-0000-0000-0000-000000000152` | Number of Endometriomas | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Count |
| `c0010001-0000-0000-0000-000000000153` | Number of Follicles Accessible | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Count |
| `c0010001-0000-0000-0000-000000000154` | Number of Follicles Inaccessible | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Count |
| `c0010001-0000-0000-0000-000000000155` | Endometrioma Right Ovary Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000156` | Endometrioma Left Ovary Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000157` | Focal Adenomyoma Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000158` | Hydrosalpinx Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Right, left, both, absent |
| `c0010001-0000-0000-0000-000000000159` | Hydrosalpinx Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000160` | Day 14-16 Endometrial Thickness Measurements | Numeric | Finding | Local / TVS | — | — | Active | Form 15: Thickness (mm) |
| `c0010001-0000-0000-0000-000000000161` | Day 14-16 Endometrial Thickness Pattern | Coded | Finding | Local / TVS | — | — | Active | Form 15: Trilaminar, diffuse, fluid |
| `c0010001-0000-0000-0000-000000000162` | Ovarian Dermoid Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000163` | Right Ovary Dermoid Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000164` | Left Ovary Dermoid Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000165` | Haemorrhagic Cyst Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000166` | Right Ovary Haemorrhagic Cyst Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000167` | Left Ovary Haemorrhagic Cyst Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000168` | Corpus Luteum Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000169` | Right Ovary Corpus Luteum Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000170` | Left Ovary Corpus Luteum Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000171` | Paro-ovarian Cyst Finding | Coded | Finding | Local / TVS | — | — | Active | Form 15: Yes/No |
| `c0010001-0000-0000-0000-000000000172` | Right Paro-ovarian Cyst Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000173` | Left Paro-ovarian Cyst Dimensions | Text | Finding | Local / TVS | — | — | Active | Form 15: Dimensions in cm |
| `c0010001-0000-0000-0000-000000000174` | Zone 1 Myometrium Dimensions | Numeric | Finding | Local / Zone | — | — | Active | Form 15: Zone 1 dimensions (cm) |
| `c0010001-0000-0000-0000-000000000175` | Zone 2 Hyperechoic Endometrial Edge Dimensions | Numeric | Finding | Local / Zone | — | — | Active | Form 15: Zone 2 dimensions (cm) |
| `c0010001-0000-0000-0000-000000000176` | Zone 3 Internal Endometrial Hypoechoic Zone Dimensions | Numeric | Finding | Local / Zone | — | — | Active | Form 15: Zone 3 dimensions (cm) |
| `c0010001-0000-0000-0000-000000000177` | Zone 4 Endometrial Cavity Dimensions | Numeric | Finding | Local / Zone | — | — | Active | Form 15: Zone 4 dimensions (cm) |
| `c0010001-0000-0000-0000-000000000178` | Female Surgical Procedure Remarks | Text | Misc | Local / Surgical | — | — | Active | Form 15: Procedure remarks & notes |
| `c0010001-0000-0000-0000-000000000179` | Mock Embryo Transfer | Coded | Finding | Local / Procedure | — | — | Active | Form 16: Easy, Difficult |
| `c0010001-0000-0000-0000-000000000180` | Mock Embryo Transfer Speculum | Coded | Finding | Local / Procedure | — | — | Active | Form 16: With Cusco's, With Sim's |
| `c0010001-0000-0000-0000-000000000181` | Embryo Transfer Cervical Canal Direction | Coded | Finding | Local / Procedure | — | — | Active | Form 16: Direction |
| `c0010001-0000-0000-0000-000000000182` | Procedure Embryo Transfer Remarks | Text | Misc | Local / Procedure | — | — | Active | Form 16: Remarks & notes |
| `c0010001-0000-0000-0000-000000000183` | Endometrial Aspiration Histopathological Examination | Coded | Finding | Local / Biopsy | — | — | Active | Form 17: EAHPE findings |
| `c0010001-0000-0000-0000-000000000184` | Endometrial Aspiration Polymerase Chain Reaction | Coded | Finding | Local / Biopsy | — | — | Active | Form 17: Positive, Negative, Not done, Not available |
| `c0010001-0000-0000-0000-000000000185` | Endometrial Aspiration Acid Fast Bacillus | Coded | Finding | Local / Biopsy | — | — | Active | Form 17: Positive, Negative, Not done, Not available |
| `c0010001-0000-0000-0000-000000000186` | Investigation Female Procedure Biopsy Remarks | Text | Misc | Local / Biopsy | — | — | Active | Form 17: Remarks & notes |
| `c0010001-0000-0000-0000-000000000187` | Husband Semen Analysis Volume | Numeric | Finding | Local / HSA | — | — | Active | Form 18: Volume in mL |
| `c0010001-0000-0000-0000-000000000188` | Husband Semen Analysis Count in million | Numeric | Finding | Local / HSA | — | — | Active | Form 18: Count in million/mL |
| `c0010001-0000-0000-0000-000000000189` | Husband Semen Analysis Motility finding | Coded | Finding | Local / HSA | — | — | Active | Form 18: Few motile, Immotile |
| `c0010001-0000-0000-0000-000000000190` | Husband Semen Analysis Motility (total/progressive) | Text | Finding | Local / HSA | — | — | Active | Form 18: Motility details |
| `c0010001-0000-0000-0000-000000000191` | Sperm Morphology | Text | Finding | Local / HSA | — | — | Active | Form 18: Morphology details |
| `c0010001-0000-0000-0000-000000000192` | Investigation Male Semen Remarks | Text | Misc | Local / HSA | — | — | Active | Form 18: Remarks & notes |
| `c0010001-0000-0000-0000-000000000193` | Prev In-Vitro Fertilization details | Text | Finding | Local / ART | — | — | Active | Form 8: Prior IVF clinical details |
| `c0010001-0000-0000-0000-000000000194` | Prev In-Vitro Fertilization details Date | Date | Finding | Local / ART | — | — | Active | Form 8: Prior IVF procedure date |
| `c0010001-0000-0000-0000-000000000195` | Number of Follicles on trigger day 14 to 22 mm | Numeric | Finding | Local / Trigger | — | — | Active | Form 19: Count (14-22mm) |
| `c0010001-0000-0000-0000-000000000196` | Number of Follicles on trigger day 16 to 22 mm | Numeric | Finding | Local / Trigger | — | — | Active | Form 19: Count (16-22mm) |
| `c0010001-0000-0000-0000-000000000197` | Endometrial thickness on trigger day | Numeric | Finding | Local / Trigger | mm | — | Active | Form 19: Thickness (mm) |
| `c0010001-0000-0000-0000-000000000198` | Endometrial thickness on trigger day Pattern | Coded | Finding | Local / Trigger | — | — | Active | Form 19: Endometrial pattern |
| `c0010001-0000-0000-0000-000000000199` | Estradiol on Trigger Day | Numeric | Finding | Local / Trigger | pg/mL | — | Active | Form 19: E2 level |
| `c0010001-0000-0000-0000-000000000200` | Progesterone on Trigger Day | Numeric | Finding | Local / Trigger | ng/mL | — | Active | Form 19: P4 level |
| `c0010001-0000-0000-0000-000000000201` | Ovulation trigger | Coded | Finding | Local / Trigger | — | — | Active | Form 19: Trigger drug |
| `c0010001-0000-0000-0000-000000000202` | Ovulation trigger dose | Text | Finding | Local / Trigger | — | — | Active | Form 19: Trigger dose |
| `c0010001-0000-0000-0000-000000000203` | Date of trigger | Date | Finding | Local / Trigger | — | — | Active | Form 19: Trigger date |
| `c0010001-0000-0000-0000-000000000204` | Time of trigger | Text | Finding | Local / Trigger | — | — | Active | Form 19: Trigger time |
| `c0010001-0000-0000-0000-000000000205` | Trigger Details Remarks | Text | Misc | Local / Trigger | — | — | Active | Form 19: Remarks & notes |
| `c0010001-0000-0000-0000-000000000206` | Date of Ovum Pick Up | Date | Finding | Local / OPU | — | — | Active | Form 20: OPU date |
| `c0010001-0000-0000-0000-000000000207` | Time of Ovum Pick Up | Text | Finding | Local / OPU | — | — | Active | Form 20: OPU time |
| `c0010001-0000-0000-0000-000000000208` | Interval between Trigger and Ovum Pick Up | Text | Finding | Local / OPU | — | — | Active | Form 20: Trigger-OPU interval |
| `c0010001-0000-0000-0000-000000000209` | Number of Oocytes Retrieved | Numeric | Finding | Local / OPU | — | — | Active | Form 20: Total oocytes |
| `c0010001-0000-0000-0000-000000000210` | Number of Oocytes Retrieved comments | Text | Finding | Local / OPU | — | — | Active | Form 20: Oocytes comments |
| `c0010001-0000-0000-0000-000000000211` | Fort Follicular Output Rate FORT | Numeric | Finding | Local / OPU | % | — | Active | Form 20: FORT index |
| `c0010001-0000-0000-0000-000000000212` | Follicle to Oocyte Index | Numeric | Finding | Local / OPU | % | — | Active | Form 20: FOI index |
| `c0010001-0000-0000-0000-000000000213` | Oocyte-Cumulus Complex Grade-I | Numeric | Finding | Local / OPU | — | — | Active | Form 20: Grade-I count |
| `c0010001-0000-0000-0000-000000000214` | Oocyte-Cumulus Complex Grade-II | Numeric | Finding | Local / OPU | — | — | Active | Form 20: Grade-II count |
| `c0010001-0000-0000-0000-000000000215` | Oocyte-Cumulus Complex Grade-III | Numeric | Finding | Local / OPU | — | — | Active | Form 20: Grade-III count |
| `c0010001-0000-0000-0000-000000000216` | Metaphase II | Numeric | Finding | Local / OPU | — | — | Active | Form 20: MII oocytes count |
| `c0010001-0000-0000-0000-000000000217` | Metaphase I | Numeric | Finding | Local / OPU | — | — | Active | Form 20: MI oocytes count |
| `c0010001-0000-0000-0000-000000000218` | Germinal Vesicle | Numeric | Finding | Local / OPU | — | — | Active | Form 20: GV count |
| `c0010001-0000-0000-0000-000000000219` | Abnormal oocytes number | Numeric | Finding | Local / OPU | — | — | Active | Form 20: Abnormal oocytes count |
| `c0010001-0000-0000-0000-000000000220` | Abnormal oocytes | Coded | Finding | Local / OPU | — | — | Active | Form 20: Morphology abnormalities |
| `c0010001-0000-0000-0000-000000000221` | Ovum Pick Up Details Remarks | Text | Misc | Local / OPU | — | — | Active | Form 20: Remarks & notes |
| `c0010001-0000-0000-0000-000000000222` | Method of Insemination | Coded | Finding | Local / Insemination | — | — | Active | Form 21: IVF, AOA, ICSI, PICSI |
| `c0010001-0000-0000-0000-000000000223` | Time of Insemination or Injection | Text | Finding | Local / Insemination | — | — | Active | Form 21: Injection time |
| `c0010001-0000-0000-0000-000000000224` | Lab Procedure of Insemination Remarks | Text | Misc | Local / Insemination | — | — | Active | Form 21: Remarks & notes |
| `c0010001-0000-0000-0000-000000000225` | Sperm Retrieval Procedure | Coded | Finding | Local / Procedure | — | — | Active | Form 22: PESA, TESA, Ejaculated, Frozen, Donor Semen, Husband Semen |
| `c0010001-0000-0000-0000-000000000226` | Procedure Remarks | Text | Misc | Local / Procedure | — | — | Active | Form 22: Remarks & notes |
| `c0010001-0000-0000-0000-000000000227` | Additional IVF Procedures | Coded | Finding | Local / Procedure | — | — | Active | Form 22: LAH, PICSI, AOA |
| `c0010001-0000-0000-0000-000000000228` | Post wash Sperm concentration on Ovum Pick Up Day | Numeric | Finding | Local / Sperm Quality | million/mL | — | Active | Form 23: Post wash sperm concentration |
| `c0010001-0000-0000-0000-000000000229` | Sperm motility on Ovum Pick Up Day | Numeric | Finding | Local / Sperm Quality | % | — | Active | Form 23: Sperm motility percentage |
| `c0010001-0000-0000-0000-000000000230` | Sperm Quality Assessment Remarks | Text | Misc | Local / Sperm Quality | — | — | Active | Form 23: Remarks & notes |
| `c0010001-0000-0000-0000-000000000231` | Type of Ovarian Stimulation Protocol | Coded | Finding | Local / Stimulation | — | — | Active | Form 19: Agonist, Antagonist, Duo-stim, etc. |
| `c0010001-0000-0000-0000-000000000232` | Ovarian Stimulation Protocol Remarks | Text | Misc | Local / Stimulation | — | — | Active | Form 19: Remarks & notes |
| `c0010001-0000-0000-0000-000000000233` | Total days of Leuprolide downregulation | Numeric | Finding | Local / Dose of Drugs | days | — | Active | Form 20: Downregulation days |
| `c0010001-0000-0000-0000-000000000234` | Starting dose Follicle-Stimulating Hormone | Numeric | Finding | Local / Dose of Drugs | IU | — | Active | Form 20: Starting FSH dose |
| `c0010001-0000-0000-0000-000000000235` | Starting dose Human Menopausal Gonadotropin | Numeric | Finding | Local / Dose of Drugs | IU | — | Active | Form 20: Starting HMG dose |
| `c0010001-0000-0000-0000-000000000236` | Starting dose Recombinant Luteinizing Hormone | Numeric | Finding | Local / Dose of Drugs | IU | — | Active | Form 20: Starting rLH dose |
| `c0010001-0000-0000-0000-000000000237` | Total dose Follicle-Stimulating Hormone | Numeric | Finding | Local / Dose of Drugs | IU | — | Active | Form 20: Total FSH dose |
| `c0010001-0000-0000-0000-000000000238` | Total dose Human Menopausal Gonadotropin | Numeric | Finding | Local / Dose of Drugs | IU | — | Active | Form 20: Total HMG dose |
| `c0010001-0000-0000-0000-000000000239` | Total dose Recombinant Luteinizing Hormone | Numeric | Finding | Local / Dose of Drugs | IU | — | Active | Form 20: Total rLH dose |
| `c0010001-0000-0000-0000-000000000240` | Total Cetrotide dose | Numeric | Finding | Local / Dose of Drugs | mg | — | Active | Form 20: Total Cetrotide dose |
| `c0010001-0000-0000-0000-000000000241` | Day of start of Cetrotide | Coded | Finding | Local / Dose of Drugs | — | — | Active | Form 20: Start Day 1 to Day 16 |
| `c0010001-0000-0000-0000-000000000242` | Total days of stimulation | Numeric | Finding | Local / Dose of Drugs | days | — | Active | Form 20: Stimulation duration |
| `c0010001-0000-0000-0000-000000000243` | Dose of Drugs Remarks | Text | Misc | Local / Dose of Drugs | — | — | Active | Form 20: Remarks & notes |
| `c0010001-0000-0000-0000-000000000244` | Growth hormone | Coded | Finding | Local / Adjuvant Drug | — | — | Active | Form 21: Yes / No |
| `c0010001-0000-0000-0000-000000000245` | Growth hormone dose | Numeric | Finding | Local / Adjuvant Drug | IU | — | Active | Form 21: Growth hormone dose |
| `c0010001-0000-0000-0000-000000000246` | Growth hormone duration | Numeric | Finding | Local / Adjuvant Drug | days | — | Active | Form 21: Growth hormone duration |
| `c0010001-0000-0000-0000-000000000247` | Adjuvant Drug Remarks | Text | Misc | Local / Adjuvant Drug | — | — | Active | Form 21: Remarks & notes |
| `c0010001-0000-0000-0000-000000000248` | Number of Embryos Day 1 (2PN) | Numeric | Finding | Local / Embryo Assessment | embryos | — | Active | Form 27: 2PN count |
| `c0010001-0000-0000-0000-000000000249` | Grade of Embryos Day 1 (2PN) | Text | Finding | Local / Embryo Assessment | — | — | Active | Form 27: Day 1 grade |
| `c0010001-0000-0000-0000-000000000250` | Number of Embryos Day 2 | Numeric | Finding | Local / Embryo Assessment | embryos | — | Active | Form 27: Day 2 count |
| `c0010001-0000-0000-0000-000000000251` | Grade of Embryos Day 2 | Coded | Finding | Local / Embryo Assessment | — | — | Active | Form 27: Day 2 grade (Cleavage answers) |
| `c0010001-0000-0000-0000-000000000252` | Number of Embryos Day 3 | Numeric | Finding | Local / Embryo Assessment | embryos | — | Active | Form 27: Day 3 count |
| `c0010001-0000-0000-0000-000000000253` | Grade of Embryos Day 3 | Coded | Finding | Local / Embryo Assessment | — | — | Active | Form 27: Day 3 grade (Cleavage answers) |
| `c0010001-0000-0000-0000-000000000254` | Number of Embryos Day 4 | Numeric | Finding | Local / Embryo Assessment | embryos | — | Active | Form 27: Day 4 count |
| `c0010001-0000-0000-0000-000000000255` | Grade of Embryos Day 4 | Coded | Finding | Local / Embryo Assessment | — | — | Active | Form 27: Day 4 grade (Morula answers) |
| `c0010001-0000-0000-0000-000000000256` | Number of Embryos Day 5 | Numeric | Finding | Local / Embryo Assessment | embryos | — | Active | Form 27: Day 5 count |
| `c0010001-0000-0000-0000-000000000257` | Grade of Embryos Day 5 | Coded | Finding | Local / Embryo Assessment | — | — | Active | Form 27: Day 5 grade (Blastocyst answers) |
| `c0010001-0000-0000-0000-000000000258` | Number of Embryos Day 6 | Numeric | Finding | Local / Embryo Assessment | embryos | — | Active | Form 27: Day 6 count |
| `c0010001-0000-0000-0000-000000000259` | Grade of Embryos Day 6 | Coded | Finding | Local / Embryo Assessment | — | — | Active | Form 27: Day 6 grade (Blastocyst answers) |
| `c0010001-0000-0000-0000-000000000260` | Embryo Assessment Remarks | Text | Misc | Local / Embryo Assessment | — | — | Active | Form 27: Remarks & notes |
| `c0010001-0000-0000-0000-000000000261` | Number of Oocytes Fertilised | Numeric | Finding | Local / Fertilisation Details | oocytes | — | Active | Form 28: Count of fertilized oocytes |
| `c0010001-0000-0000-0000-000000000262` | Fertilisation Rate | Numeric | Finding | Local / Fertilisation Details | % | — | Active | Form 28: Fertilisation rate % |
| `c0010001-0000-0000-0000-000000000263` | Embryos Cleaved on Day 2 | Numeric | Finding | Local / Fertilisation Details | embryos | — | Active | Form 28: Day 2 cleaved embryos |
| `c0010001-0000-0000-0000-000000000264` | Cleavage Rate | Numeric | Finding | Local / Fertilisation Details | % | — | Active | Form 28: Cleavage rate % |
| `c0010001-0000-0000-0000-000000000265` | Embryos Cleaved on Day 3 | Numeric | Finding | Local / Fertilisation Details | embryos | — | Active | Form 28: Day 3 cleaved embryos |
| `c0010001-0000-0000-0000-000000000266` | Number of Embryos Cleaved on Day 5 | Numeric | Finding | Local / Fertilisation Details | embryos | — | Active | Form 28: Day 5 cleaved embryos |
| `c0010001-0000-0000-0000-000000000267` | Fertilisation Details Remarks | Text | Misc | Local / Fertilisation Details | — | — | Active | Form 28: Clinical notes & remarks |

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

### 2.7 Investigation Male Semen Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000000995` | Few motile | Local / HSA | — | — | Active |
| `c0010002-0000-0000-0000-000000000996` | Immotile | Local / HSA | — | — | Active |

---

### 2.8 Trigger Details Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000000967` | Trilaminar | Local / Ultrasound | — | — | Active |
| `c0010002-0000-0000-0000-000000000997` | Endometrial polyp | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000000998` | Early diffuse | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000000959` | Fluid in cavity | Local / Ultrasound | — | — | Active |
| `c0010002-0000-0000-0000-000000000999` | Minimal fluid | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001000` | Leuprolide | SNOMED CT / RxNorm | — | — | Active |
| `c0010002-0000-0000-0000-000000001001` | Ovitrelle | SNOMED CT / RxNorm | — | — | Active |

---

### 2.9 Ovum Pick Up Details Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000001002` | Giant oocyte | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001003` | Degenerated oocyte | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001004` | Dysmorphic oocytes | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001005` | Small size | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001006` | Dark cumulus | SNOMED CT / Local | — | — | Active |

---

### 2.10 Procedure & Insemination Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000001007` | In Vitro Fertilization (IVF) | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001008` | Intracytoplasmic Sperm Injection (ICSI) | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001009` | Artificial Oocyte Activation (AOA) | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001010` | Physiological Intracytoplasmic Sperm Injection (PICSI) | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001011` | Percutaneous Epididymal Sperm Aspiration (PESA) | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001012` | Testicular Sperm Aspiration (TESA) | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001013` | Ejaculated | Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001014` | Frozen | Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001015` | Donor Semen | Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001016` | Husband Semen | Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001017` | Laser Assisted Hatching (LAH) | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001018` | Artificial Oocyte Activation (AOA) | SNOMED CT / Local | — | — | Active |

---

### 2.11 Ovarian Stimulation Protocol Answer Options (`c0010002-...`)

| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000001019` | Agonist | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001020` | Antagonist | SNOMED CT / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001021` | Dual-stimulation | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001022` | Human Menopausal Gonadotropin(HMG)-only stimulation | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001023` | Letrozole based Antagonist protocol | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001024` | Luteal Duo-stimulation | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001025` | Microdose flare protocol | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001026` | Progestin-primed ovarian stimulation | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001027` | Random start protocol | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001028` | Stop agonist | Local / Clinical | — | — | Active |

---

### 2.12 Embryo & Blastocyst Assessment Answer Options (`c0010002-...`)

#### Cleavage Stage (Days 2 & 3)
| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000001050` | 2PN-arrest | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001051` | 2C/A | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001052` | 2C/B | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001053` | 2C/C | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001054` | 3C/A | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001055` | 3C/B | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001056` | 3C/C | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001057` | 4C/A | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001058` | 4C/B | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001059` | 4C/C | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001060` | 5C/A | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001061` | 5C/B | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001062` | 5C/C | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001063` | 6C/A | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001064` | 6C/B | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001065` | 6C/C | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001066` | 8C/A | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001067` | 8C/B | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001068` | 8C/C | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001069` | 10-12Cells | Local / Clinical | — | — | Active |

#### Day 4 (Morula Stage)
| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000001070` | Morula | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001071` | Compacted Morula | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001072` | Early Blastocyst | Local / Clinical | — | — | Active |
| `c0010002-0000-0000-0000-000000001073` | Arrest | Local / Clinical | — | — | Active |

#### Blastocyst Stage (Days 5 & 6)
| Placeholder UUID | Display Name | Target Standard | Target Code | ATHENA Verified | Status |
|:---|:---|:---|:---:|:---:|:---:|
| `c0010002-0000-0000-0000-000000001074` | Morula | Gardner / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001075` | Arrest | Gardner / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001076` | Pre-blast | Gardner / Local | — | — | Active |
| `c0010002-0000-0000-0000-000000001077` | 1AA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001078` | 1AB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001079` | 1BA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001080` | 1BB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001081` | 1BC | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001082` | 2AA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001083` | 2AB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001084` | 2BA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001085` | 2BB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001086` | 2BC | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001087` | 3AA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001088` | 3AB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001089` | 3BA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001090` | 3BB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001091` | 3BC | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001092` | 4AA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001093` | 4AB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001094` | 4BA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001095` | 4BB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001096` | 4BC | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001097` | 4CA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001098` | 4CB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001099` | 4CC | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001100` | 5AA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001101` | 5AB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001102` | 5BA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001103` | 5BB | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001104` | 5BC | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001105` | 6AA | Gardner scale | — | — | Active |
| `c0010002-0000-0000-0000-000000001106` | 6CC | Gardner scale | — | — | Active |

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
