Created aiims_forms_presentation_outline.md

Here are the consolidated, uncluttered horizontal flowcharts (`flowchart LR`) for each of the 9 clinical forms. These are streamlined for executive slides and presentation directly to your PI, and saved at:
👉 **[aiims_forms_presentation_outline.md](file:///C:/Users/Ayanshu/.gemini/antigravity-ide/brain/3667440e-419b-4aa3-a2f8-225c59a2395c/aiims_forms_presentation_outline.md)**

---

### Slide 1: Personal Information Intake
```mermaid
flowchart LR
    Start([Start]) --> Unit["Unit Identification:<br/>• Consultant Unit<br/>• Consultant Name"]
    Unit --> Wife["Wife Profile:<br/>• Age & Phone Number<br/>• Education (7 levels: Illiterate to Honours)<br/>• Occupation (ISCO-08: 10 categories)"]
    Wife --> Husb["Husband Profile:<br/>• Name, Age & Phone<br/>• BMI (kg/m²)<br/>• Education & Occupation"]
    Husb --> Socio["Socioeconomic Status:<br/>• Modified Kuppuswamy Scale<br/>  (Class I to Class V)"]
    Socio --> End([Form Completed])
```

---

### Slide 2: Type of Infertility & Chronology
```mermaid
flowchart LR
    Start([Start]) --> Type{"Type of Infertility:<br/>• Primary Infertility<br/>• Secondary Infertility"}
    Type --> Timeline["Chronology Metrics:<br/>• Married for (years)<br/>• Duration of Infertility (years)"]
    Timeline --> End([Form Completed])
```

---

### Slide 3: Obstetric History (GPLAE)
```mermaid
flowchart LR
    Start([Start]) --> GPLAE["Obstetric History (GPLAE Score):<br/>• G: Gravida (Total Pregnancies)<br/>• P: Parity (Deliveries ≥ 20-24 weeks)<br/>• L: Living Children<br/>• A: Abortion / Miscarriage (< 20 weeks)<br/>• E: Ectopic Pregnancy"]
    GPLAE --> End([Form Completed])
```

---

### Slide 4: Menstrual History
```mermaid
flowchart LR
    Start([Start]) --> Pattern{"Cycle Pattern"}
    Pattern -->|"Regular"| LMP["LMP Date<br/>(1st Day)"]
    Pattern -->|"Irregular"| Irreg["Type of Irregular:<br/>• Oligomenorrhea<br/>• Polymenorrhea"] --> LMP
    
    LMP --> Flow{"Cycle Flow"}
    Flow -->|"Normal / Hypo / HMB"| End([Form Completed])
    Flow -->|"Amenorrhoea"| Amen["Type of Amenorrhoea:<br/>• Primary<br/>• Secondary"] --> End
```

---

### Slide 5: Female Factor Infertility
```mermaid
flowchart LR
    Start([Start]) --> Categories{"Diagnostic Categories (Multi-select)"}
    
    Categories -->|"Tubal Factor"| Tubal["Tubal Details:<br/>• Unilateral / Bilateral block<br/>• Previous ectopic<br/>• Hydrosalpinx / Hematosalpinx"]
    
    Categories -->|"Diminished Reserve"| DOR{"DOR Details"}
    DOR -->|"Borderline"| Notes["Clinical Notes / Remarks"]
    DOR -->|"POSEIDON"| Poseidon["POSEIDON Groups:<br/>• Group 1a, 1b<br/>• Group 2a, 2b<br/>• Group 3, 4"]
    
    Categories -->|"Endometriosis"| Endo["Staging Classification:<br/>• ASRM<br/>• EFI"]
    
    Categories -->|"PCOS"| PCOS["PCOS Phenotype:<br/>• Phenotype A (Classic/Severe)<br/>• Phenotype B (Classic)<br/>• Phenotype C (Ovulatory)<br/>• Phenotype D (Mild)"]
    
    Categories -->|"Uterine Factor"| Uterine["Uterine Details:<br/>• Adenomyosis, Fibroids, Polyps<br/>• Asherman's, Septate, Unicornuate"]
    
    Categories -->|"Advanced Maternal Age"| AMA["Advanced Maternal Age"]
    
    Categories -->|"Other Factors"| Other["Other Etiologies:<br/>• Hypogonadotropic hypogonadism<br/>• Oncofertility, H/O TB, Turner<br/>• Unexplained, Serodiscordant"]
    
    Tubal & Poseidon & Endo & PCOS & Uterine & AMA & Other --> Notes
    Notes --> End([Form Completed])
```

---

### Slide 6: Male Factor Infertility
```mermaid
flowchart LR
    Start([Start]) --> Semen{"Male Infertility Factors (Multi-select):<br/>• Oligozoospermia / Asthenozoospermia<br/>• Teratozoospermia / OATS<br/>• Erectile / Ejaculatory Dysfunction<br/>• Retrograde Ejaculation<br/>• Unexplained Infertility"}
    
    Semen -->|"Azoospermia"| Azoo{"Azoospermia Classification:<br/>• Obstructive<br/>• Non-Obstructive"}
    
    Semen -->|"Other Factors"| Notes["Clinical Notes / Remarks"]
    Azoo --> Notes
    Notes --> End([Form Completed])
```

---

### Slide 7: Male Hormone & Surgery
```mermaid
flowchart LR
    Start([Start]) --> Hormones["Endocrine Workup:<br/>• Serum FSH (mIU/mL)<br/>• Serum Testosterone (ng/dL)"]
    Hormones --> Biopsy["Testicular Surgery / Histology:<br/>• Biopsy Report & Surgical Notes"]
    Biopsy --> End([Form Completed])
```

---

### Slide 8: Previous OI, IUI & IVF
```mermaid
flowchart LR
    Start([Start]) --> Q_OI{"Previous OI alone?"}
    
    Q_OI -->|"Yes"| OI_Block["OI Regimen:<br/>• Drugs: Letrozole, hMG, Clomiphene, Multiple<br/>• Dose, Number of Cycles & Year"]
    Q_OI -->|"No"| Q_IUI{"Previous OI + IUI?"}
    OI_Block --> Q_IUI
    
    Q_IUI -->|"Yes"| IUI_Block["OI + IUI Regimen:<br/>• Drugs: Letrozole, hMG, Clomiphene<br/>• Dose, Number of Cycles & Year"]
    Q_IUI -->|"No"| Q_IVF{"Failed IVF History?"}
    IUI_Block --> Q_IVF
    
    Q_IVF -->|"Yes"| IVF_Block["Failed IVF Cycles:<br/>• Total cycle count"]
    Q_IVF -->|"No"| Notes["Previous ART Treatment Notes"]
    IVF_Block --> Notes
    Notes --> End([Form Completed])
```

---

### Slide 9: Previous Surgery
```mermaid
flowchart LR
    Start([Start]) --> PrevSurg{"Previous Surgery?"}
    
    PrevSurg -->|"No"| Remarks["Intra-operative Findings & Remarks"]
    
    PrevSurg -->|"Yes"| Approach["Approach & Year:<br/>• Laparoscopy / Open / Converted<br/>• Year or Date of Surgery"]
    
    Approach --> UterinePeritoneal["Uterine & Peritoneal Procedures:<br/>• Adenomyomectomy, Myomectomy, Isthmocele<br/>• Peritoneal Adhesiolysis, Peritonectomy"]
    
    UterinePeritoneal --> OrganSurgeries["Organ Procedures & Laterality (Right / Left / Bilateral):<br/>• Endometriosis: Cystectomy, Ablation, APC, Drainage, Sclero, Oophorectomy<br/>• Ovarian: Dermoid, Simple/Paraovarian Cyst, Aspiration, Cystectomy<br/>• Tubal: Chromopertubation, Cannulation, Salpingectomy, Fimbrioplasty, Clipping, Recanalization"]
    
    OrganSurgeries --> Remarks
    Remarks --> End([Form Completed])
```