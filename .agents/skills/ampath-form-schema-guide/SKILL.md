---
name: ampath-form-schema-guide
description: Reference manual and engineering guide for authoring valid OpenMRS 3.x AMPATH JSON form schemas, including questionOptions, obsGroups, repeating sections, conditional logic, and expression validation.
---

# AMPATH Form Schema Authoring & Engineering Guide

This guide establishes the syntax, structural constraints, and runtime patterns for authoring clinical schemas in `forms/` for the OpenMRS 3.x React Form Engine (`@openmrs/esm-form-engine-lib`).

---

## 1. Top-Level Schema Structure

Every form must adhere to the standard AMPATH form schema layout:

```json
{
  "name": "AIIMS Visit: Form Name",
  "description": "AIIMS Department of Reproductive Medicine & IVF - Form Description",
  "version": "1.0",
  "published": true,
  "retired": false,
  "encounter": "Consultation",
  "processor": "EncounterFormProcessor",
  "referencedForms": [],
  "pages": [
    {
      "label": "Page Title",
      "sections": [
        {
          "label": "Section Title",
          "isExpanded": true,
          "questions": []
        }
      ]
    }
  ]
}
```

### Critical Text Formatting Rule
- **ASCII Only**: Never use Unicode en-dashes (`–`, `\u2013`) or em-dashes (`—`, `\u2014`) in labels, names, or IDs.
- Always use standard ASCII hyphens `-`. Unicode dashes cause encoding failures when piped through Windows command lines or MariaDB cp1252/utf8mb4 interfaces.

---

## 2. Question Types & Renderings

| Clinical Input Type | `type` | `rendering` in `questionOptions` | Mandatory Elements |
|:---|:---|:---|:---|
| **Numeric Value** | `"obs"` | `"number"` | `"concept"`, optional `"min"`, `"max"` |
| **Short Text** | `"obs"` | `"text"` | `"concept"` |
| **Long Text / Notes** | `"obs"` | `"textarea"` | `"concept"`, `"rows"` |
| **Single Select Dropdown** | `"obs"` | `"select"` | `"concept"`, `"answers": [{"concept": "...", "label": "..."}]` |
| **Radio Button Group** | `"obs"` | `"radio"` | `"concept"`, `"answers": [{"concept": "...", "label": "..."}]` |
| **Multi-Select Checkboxes** | `"obs"` | `"checkbox"` | `"concept"`, `"answers": [...]` |
| **Date Picker** | `"obs"` | `"date"` | `"concept"` |
| **Observation Group** | `"obsGroup"` | `"group"` | Parent `"concept"`, nested `"questions": [...]` |

---

## 3. Select Dropdowns & Radio Buttons (`answers`)

When authoring `"rendering": "select"` or `"rendering": "radio"`:
1. The question concept **must** be `Coded` (`datatype_id = 2`).
2. The `answers` array must explicitly provide both `concept` (UUID) and `label`:
   ```json
   {
     "label": "Protocol",
     "type": "obs",
     "id": "ovarian_stimulation_protocol",
     "required": "false",
     "questionOptions": {
       "rendering": "select",
       "concept": "c0010001-0000-0000-0000-000000000231",
       "answers": [
         { "concept": "c0010002-0000-0000-0000-000000001019", "label": "Agonist" },
         { "concept": "c0010002-0000-0000-0000-000000001020", "label": "Antagonist" }
       ]
     }
   }
   ```

---

## 4. Conditional Visibility (`hideWhenExpression`)

Conditional logic dynamically shows or hides questions based on user answers in other fields.

### Syntax Rules
1. **NEVER use the `return` keyword**: Writing `return val === 'x';` crashes the expression parser silently, leaving the field permanently visible.
2. Reference other questions directly by their unique string `id`.
3. For multi-select or coded answers, use the helper `arrayContains()`:
   ```json
   {
     "id": "tubal_factor_details",
     "label": "Tubal Factor Details",
     "type": "obs",
     "questionOptions": {
       "rendering": "select",
       "concept": "c0010001-0000-0000-0000-000000000031",
       "answers": [...]
     },
     "hide": {
       "hideWhenExpression": "!arrayContains(['c0010002-0000-0000-0000-000000000301'], female_factor)"
     }
   }
   ```
4. **Section Hiding**: In the OpenMRS 3.x form engine, `hideWhenExpression` applies to individual questions, not to `<sections>`. To hide an entire section, attach the identical `hideWhenExpression` to each question within that section.

---

## 5. Validation Rules (`validators` & `failsWhenExpression`)

To enforce clinical safety bounds:
```json
"validators": [
  {
    "type": "js_expression",
    "failsWhenExpression": "my_numeric_field !== '' && my_numeric_field !== null && (my_numeric_field < 10 || my_numeric_field > 50)",
    "message": "Value must be between 10.0 and 50.0"
  }
]
```
> **Warning**: Always guard expressions against empty strings (`!== ''`) or null inputs for optional fields; otherwise, empty fields evaluate as invalid on form submission.

---

## 6. Observation Groups (`obsGroup`)

Used for clinical panels or repeating rows where multiple discrete observations belong together:

```json
{
  "label": "Embryo Detail Group",
  "type": "obsGroup",
  "id": "embryo_detail_group",
  "questionOptions": {
    "concept": "c0010001-0000-0000-0000-000000000XXX",
    "rendering": "group"
  },
  "questions": [
    {
      "label": "Embryo Number",
      "type": "obs",
      "id": "embryo_number",
      "questionOptions": {
        "rendering": "number",
        "concept": "c0010001-0000-0000-0000-000000000YYY"
      }
    },
    {
      "label": "Embryo Grade",
      "type": "obs",
      "id": "embryo_grade",
      "questionOptions": {
        "rendering": "select",
        "concept": "c0010001-0000-0000-0000-000000000ZZZ",
        "answers": [...]
      }
    }
  ]
}
```

---

## 7. Schema Publishing & Verification

1. Place completed JSON in `forms/aiims_<form_key>.json`.
2. Publish targeting only this form:
   ```bash
   python scripts/publish_aiims_form.py --form=aiims_<form_key>
   ```
3. Run the schema integrity validator:
   ```bash
   npm run validate:forms
   ```
   *(Asserts backend HTTP 200, schema disk presence, question concepts, and `concept_numeric` records).*
