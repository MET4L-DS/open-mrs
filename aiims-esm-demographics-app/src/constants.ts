export const moduleName = '@aiims/esm-demographics-app';

// Form UUID for AIIMS Visit: Personal Information Intake
export const AIIMS_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d880';
export const AIIMS_FORM_NAME = 'AIIMS Visit: Personal Information Intake';

// Concept UUIDs matching concept_registry.md and AIIMS form
export const CONCEPTS = {
  consultantUnit: 'c0010001-0000-0000-0000-000000000001',
  consultantName: 'c0010001-0000-0000-0000-000000000002',
  patientAge: 'c0010001-0000-0000-0000-000000000004',
  husbandName: 'c0010001-0000-0000-0000-000000000007',
  husbandAge: 'c0010001-0000-0000-0000-000000000008',
  husbandBmi: '1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  husbandPhone: 'c0010001-0000-0000-0000-000000000011',
  occupationWife: 'c0010001-0000-0000-0000-000000000014',
  occupationHusband: 'c0010001-0000-0000-0000-000000000015',
  socioeconomicStatus: 'c0010001-0000-0000-0000-000000000016',
  // Standard CIEL concept used for education (wife and husband)
  educationLevel: '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
};

// Person Attribute Type UUID for Patient Telephone Number
export const TELEPHONE_ATTRIBUTE_TYPE_UUID = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
