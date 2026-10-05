import json

investigation_ultrasound_form = {
    "name": "AIIMS Visit: Investigation Ultrasound",
    "description": "AIIMS Department of Reproductive Medicine & IVF - Investigation Ultrasound Sheet",
    "version": "1.0",
    "published": True,
    "retired": False,
    "encounter": "Consultation",
    "processor": "EncounterFormProcessor",
    "referencedForms": [],
    "pages": [
        {
            "label": "Investigation Ultrasound",
            "sections": [
                {
                    "label": "Ultrasound Assessment",
                    "isExpanded": True,
                    "questions": [
                        {
                            "label": "Total Antral Follicle Count",
                            "type": "obs",
                            "id": "total_antral_follicle_count",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000107",
                                "min": "0",
                                "max": "150"
                            }
                        },
                        {
                            "label": "Volume Right Ovary (cm³)",
                            "type": "obs",
                            "id": "volume_right_ovary",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000108",
                                "min": "0",
                                "max": "200"
                            }
                        },
                        {
                            "label": "Volume Left Ovary (cm³)",
                            "type": "obs",
                            "id": "volume_left_ovary",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000109",
                                "min": "0",
                                "max": "200"
                            }
                        },
                        {
                            "label": "Ultrasound Remarks / Notes",
                            "type": "obs",
                            "id": "ultrasound_remarks",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "textarea",
                                "concept": "c0010001-0000-0000-0000-000000000110",
                                "rows": 3,
                                "placeholder": "Specify any additional ultrasound findings, notes, or remarks..."
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

if __name__ == "__main__":
    out_path = "forms/aiims_investigation_ultrasound.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(investigation_ultrasound_form, f, indent=2)
    print(f"Generated form schema at {out_path}")
