import json

# Load base answers from past medical history
with open("forms/aiims_past_medical_history.json", "r", encoding="utf-8") as f:
    pmh = json.load(f)

answers = pmh["pages"][0]["sections"][0]["questions"][0]["questionOptions"]["answers"]

members = [
    {
        "key": "father",
        "label": "Father",
        "concept": "c0010001-0000-0000-0000-000000000088",
        "notes_concept": "c0010001-0000-0000-0000-000000000089",
    },
    {
        "key": "mother",
        "label": "Mother",
        "concept": "c0010001-0000-0000-0000-000000000090",
        "notes_concept": "c0010001-0000-0000-0000-000000000091",
    },
    {
        "key": "husband",
        "label": "Husband",
        "concept": "c0010001-0000-0000-0000-000000000092",
        "notes_concept": "c0010001-0000-0000-0000-000000000093",
    },
    {
        "key": "brother",
        "label": "Brother",
        "concept": "c0010001-0000-0000-0000-000000000094",
        "notes_concept": "c0010001-0000-0000-0000-000000000095",
    },
    {
        "key": "maternal_grandmother",
        "label": "Maternal Grandmother",
        "concept": "c0010001-0000-0000-0000-000000000096",
        "notes_concept": "c0010001-0000-0000-0000-000000000097",
    },
    {
        "key": "maternal_grandfather",
        "label": "Maternal Grandfather",
        "concept": "c0010001-0000-0000-0000-000000000098",
        "notes_concept": "c0010001-0000-0000-0000-000000000099",
    },
]

sections = []
for m in members:
    q_id = f"{m['key']}_medical_disease"
    notes_id = f"{m['key']}_medical_diseases_others"
    section = {
        "label": f"Family Member: {m['label']}",
        "isExpanded": True,
        "questions": [
            {
                "label": f"Medical Diseases ({m['label']})",
                "type": "obs",
                "id": q_id,
                "required": "false",
                "questionOptions": {
                    "rendering": "checkbox",
                    "concept": m["concept"],
                    "answers": answers
                }
            },
            {
                "label": f"Other Medical Diseases / Clinical Notes ({m['label']})",
                "type": "obs",
                "id": notes_id,
                "required": "false",
                "questionOptions": {
                    "rendering": "textarea",
                    "concept": m["notes_concept"],
                    "rows": 3,
                    "placeholder": f"Specify any other medical conditions, diagnoses, or notes for {m['label']}..."
                },
                "hide": {
                    "hideWhenExpression": f"!{q_id} || !{q_id}.includes('c0010002-0000-0000-0000-000000000799')"
                }
            }
        ]
    }
    sections.append(section)

family_history_form = {
    "name": "AIIMS Visit: Family History",
    "description": "AIIMS Department of Reproductive Medicine & IVF - Family History Sheet",
    "version": "1.0",
    "published": True,
    "retired": False,
    "encounter": "Consultation",
    "processor": "EncounterFormProcessor",
    "referencedForms": [],
    "pages": [
        {
            "label": "Family History",
            "sections": sections
        }
    ]
}

with open("forms/aiims_family_history.json", "w", encoding="utf-8") as f:
    json.dump(family_history_form, f, indent=2)

print("Successfully generated forms/aiims_family_history.json")
