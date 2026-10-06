import json

female_blood_hormone_form = {
    "name": "AIIMS Visit: Investigation Female Blood Hormone",
    "description": "AIIMS Department of Reproductive Medicine & IVF - Investigation Female Blood Hormone Sheet",
    "version": "1.0",
    "published": True,
    "retired": False,
    "encounter": "Consultation",
    "processor": "EncounterFormProcessor",
    "referencedForms": [],
    "pages": [
        {
            "label": "Investigation Female Blood Hormone",
            "sections": [
                {
                    "label": "Female Blood Hormone Profile",
                    "isExpanded": True,
                    "questions": [
                        {
                            "label": "Anti-Mullerian Hormone (AMH)",
                            "type": "obs",
                            "id": "anti_mullerian_hormone",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000111"
                            }
                        },
                        {
                            "label": "Day 2 Follicle-Stimulating Hormone (FSH)",
                            "type": "obs",
                            "id": "day2_follicle_stimulating_hormone",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000112"
                            }
                        },
                        {
                            "label": "Day 2 Luteinizing Hormone (LH)",
                            "type": "obs",
                            "id": "day2_luteinizing_hormone",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000113"
                            }
                        },
                        {
                            "label": "Thyroid-Stimulating Hormone (TSH)",
                            "type": "obs",
                            "id": "thyroid_stimulating_hormone",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000114"
                            }
                        },
                        {
                            "label": "Serum Prolactin",
                            "type": "obs",
                            "id": "serum_prolactin",
                            "required": "false",
                            "questionOptions": {
                                "rendering": "number",
                                "concept": "c0010001-0000-0000-0000-000000000115"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

if __name__ == "__main__":
    out_path = "forms/aiims_female_blood_hormone.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(female_blood_hormone_form, f, indent=2)
    print(f"Generated form schema at {out_path}")
