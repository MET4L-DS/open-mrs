# AIIMS Clinical Forms: Strictly Horizontal Multi-Flow Slide Deck

---

## Slide 1: Personal Information Intake
```mermaid
flowchart LR
    subgraph Flow_Unit ["Flow A: Unit Identification"]
        U1["Consultant Unit"] --> U2["Consultant Name"]
    end

    subgraph Flow_Wife ["Flow B: Wife Profile"]
        W1["Age & Phone Number"] --> W2["Education (7 levels:<br/>Illiterate to Honours)"] --> W3["Occupation (ISCO-08:<br/>10 categories)"]
    end

    subgraph Flow_Husb ["Flow C: Husband Profile"]
        H1["Name, Age & Phone"] --> H2["BMI (kg/m²)"] --> H3["Education & Occupation"]
    end

    subgraph Flow_Socio ["Flow D: Socioeconomic"]
        S1["Modified Kuppuswamy Scale:<br/>Class I (Upper) to Class V (Lower)"]
    end

    %% Enforce horizontal side-by-side ranking
    U2 ~~~ W1
    W3 ~~~ H1
    H3 ~~~ S1
```

---

## Slide 2: Type of Infertility & Chronology
```mermaid
flowchart LR
    subgraph Flow_Class ["Flow A: Infertility Classification"]
        Q_Type{"Type of Infertility"}
        Q_Type -->|"Option 1"| Prim["Primary Infertility"]
        Q_Type -->|"Option 2"| Sec["Secondary Infertility"]
    end

    subgraph Flow_Time ["Flow B: Chronology & Timeline"]
        T1["Married for (years)"] --> T2["Duration of Infertility (years)"]
    end

    %% Enforce horizontal side-by-side ranking
    Prim ~~~ T1
    Sec ~~~ T1
```

---

## Slide 3: Obstetric History (GPLAE Score)
```mermaid
flowchart LR
    subgraph Flow_G ["G"]
        G["Gravida<br/>(Total Pregnancies)"]
    end

    subgraph Flow_P ["P"]
        P["Parity<br/>(Deliveries ≥ 20-24 wks)"]
    end

    subgraph Flow_L ["L"]
        L["Living Children<br/>(Current living)"]
    end

    subgraph Flow_A ["A"]
        A["Abortion / Miscarriage<br/>(Loss < 20 wks)"]
    end

    subgraph Flow_E ["E"]
        E["Ectopic Pregnancy<br/>(Extrauterine gestations)"]
    end

    %% Enforce horizontal strip ranking
    G ~~~ P ~~~ L ~~~ A ~~~ E
```

---

## Slide 4: Menstrual History
```mermaid
flowchart LR
    subgraph Flow_Rhythm ["Flow A: Cycle Rhythm"]
        Q_Pattern{"Cycle Pattern"}
        Q_Pattern -->|"Regular"| Reg["Regular Periods"]
        Q_Pattern -->|"Irregular"| Irreg["Type of Irregular:<br/>• Oligomenorrhea<br/>• Polymenorrhea"]
    end

    subgraph Flow_LMP ["Flow B: Timeline"]
        LMP["Last Menstrual Period<br/>(LMP 1st Day Date)"]
    end

    subgraph Flow_Volume ["Flow C: Cycle Flow & Amenorrhoea"]
        Q_Flow{"Cycle Flow"}
        Q_Flow -->|"Normal / Hypo / HMB"| Flow_Norm["Normal, Hypomenorrhoea,<br/>or Heavy Menstrual Bleeding"]
        Q_Flow -->|"Amenorrhoea"| Amen["Type of Amenorrhoea:<br/>• Primary<br/>• Secondary"]
    end

    %% Enforce horizontal side-by-side ranking
    Reg ~~~ LMP
    Irreg ~~~ LMP
    LMP ~~~ Q_Flow
```

---

## Slide 5: Female Factor Infertility
```mermaid
flowchart LR
    subgraph Flow_Etiology ["Flow A: Diagnostic Categories & Sub-Classifications"]
        Cat{"Categories"}
        
        Cat -->|"Tubal"| Tubal["Tubal Details:<br/>• Unilateral / Bilateral block<br/>• Previous ectopic<br/>• Hydrosalpinx / Hematosalpinx"]
        
        Cat -->|"DOR"| DOR{"DOR"}
        DOR -->|"Borderline"| DOR_B["Borderline Reserve"]
        DOR -->|"POSEIDON"| Poseidon["POSEIDON Groups:<br/>• Group 1a, 1b<br/>• Group 2a, 2b<br/>• Group 3, 4"]
        
        Cat -->|"Endo"| Endo["Staging Scheme:<br/>• ASRM / EFI"]
        
        Cat -->|"PCOS"| PCOS["PCOS Phenotype:<br/>• Phenotype A, B, C, D"]
        
        Cat -->|"Uterine"| Uterine["Uterine Details:<br/>• Adenomyosis, Fibroids, Polyps<br/>• Asherman's, Septate, Unicornuate"]
        
        Cat -->|"Age"| AMA["Advanced Maternal Age"]
        
        Cat -->|"Other"| Other["Other Etiologies:<br/>• Hypogonadotropic hypogonadism, Oncofertility<br/>• H/O TB, Turner, Unexplained, Serodiscordant"]
    end

    subgraph Flow_Notes ["Flow B: Clinical Observations"]
        Notes["Female Factor Clinical Notes / Remarks (Textarea)"]
    end

    %% Enforce horizontal side-by-side ranking
    Cat ~~~ Notes
```

---

## Slide 6: Male Factor Infertility
```mermaid
flowchart LR
    subgraph Flow_Semen ["Flow A: Semen Parameters & Functional Disorders"]
        Semen["Diagnostic Categories (Multi-select):<br/>• Oligozoospermia / Asthenozoospermia<br/>• Teratozoospermia / OATS<br/>• Erectile / Ejaculatory Dysfunction<br/>• Retrograde Ejaculation<br/>• Unexplained Infertility"]
    end

    subgraph Flow_Azoo ["Flow B: Azoospermia Etiology"]
        Azoo_Trigger{"Azoospermia Selected?"}
        Azoo_Trigger -->|"Yes"| Azoo_Type["Azoospermia Classification:<br/>• Obstructive<br/>• Non-Obstructive"]
    end

    subgraph Flow_Notes ["Flow C: Documentation"]
        Notes["Male Factor Clinical Notes / Remarks (Textarea)"]
    end

    %% Enforce horizontal side-by-side ranking
    Semen ~~~ Azoo_Trigger
    Azoo_Type ~~~ Notes
```

---

## Slide 7: Male Hormone & Surgery
```mermaid
flowchart LR
    subgraph Flow_Endo ["Flow A: Endocrine Workup"]
        FSH["Serum FSH - Husband<br/>(mIU/mL)"] --> Testo["Serum Testosterone<br/>(ng/dL)"]
    end

    subgraph Flow_Surg ["Flow B: Testicular Histology"]
        Biopsy["Testicular Biopsy Report /<br/>Surgical Notes (Textarea)"]
    end

    %% Enforce horizontal side-by-side ranking
    Testo ~~~ Biopsy
```

---

## Slide 8: Previous OI, IUI & IVF
```mermaid
flowchart LR
    subgraph Flow_OI ["Flow A: OI Alone"]
        Q_OI{"Previous OI?"}
        Q_OI -->|"Yes"| OI_Details["OI Regimen Details:<br/>• Drugs: Letrozole, hMG, Clomiphene, Multiple<br/>• Drug Dose, Number of Cycles & Year"]
        Q_OI -->|"No"| OI_None["No Prior OI Alone"]
    end

    subgraph Flow_IUI ["Flow B: OI + IUI"]
        Q_IUI{"Previous OI + IUI?"}
        Q_IUI -->|"Yes"| IUI_Details["OI + IUI Regimen Details:<br/>• Drugs: Letrozole, hMG, Clomiphene<br/>• Drug Dose, Number of Cycles & Year"]
        Q_IUI -->|"No"| IUI_None["No Prior OI + IUI"]
    end

    subgraph Flow_IVF ["Flow C: Failed IVF"]
        Q_IVF{"Failed IVF?"}
        Q_IVF -->|"Yes"| IVF_Details["Number of Failed IVF Cycles"]
        Q_IVF -->|"No"| IVF_None["No Prior Failed IVF"]
    end

    subgraph Flow_Notes ["Flow D: Notes"]
        Notes["Previous ART Treatment Clinical Notes (Textarea)"]
    end

    %% Enforce horizontal side-by-side ranking
    OI_Details ~~~ IUI_Details
    OI_None ~~~ IUI_None
    IUI_Details ~~~ IVF_Details
    IUI_None ~~~ IVF_None
    IVF_Details ~~~ Notes
    IVF_None ~~~ Notes
```

---

## Slide 9: Previous Surgery
```mermaid
flowchart LR
    subgraph Flow_SurgHistory ["Flow A: Surgical History & Procedures"]
        PrevSurg{"Previous Surgery?"}
        
        PrevSurg -->|"Yes"| Approach["Approach & Year:<br/>• Laparoscopy / Open / Converted<br/>• Year or Date of Surgery"]
        
        Approach --> UterinePeritoneal["Uterine & Peritoneal Procedures:<br/>• Adenomyomectomy, Myomectomy, Isthmocele<br/>• Peritoneal Adhesiolysis, Peritonectomy"]
        
        UterinePeritoneal --> OrganSurgeries["Organ Procedures & Laterality (Right / Left / Bilateral):<br/>• Endometriosis: Cystectomy, Ablation, APC, Drainage, Sclero, Oophorectomy<br/>• Ovarian: Dermoid, Simple/Paraovarian Cyst, Aspiration, Cystectomy<br/>• Tubal: Chromopertubation, Cannulation, Salpingectomy, Fimbrioplasty, Clipping, Recanalization"]
        
        PrevSurg -->|"No"| NoSurg["No Previous Surgical History"]
    end

    subgraph Flow_Remarks ["Flow B: Findings & Remarks"]
        Findings["Intra-operative Findings & Overall Remarks (Textarea)"]
    end

    %% Enforce horizontal side-by-side ranking
    Approach ~~~ Findings
    NoSurg ~~~ Findings
```
