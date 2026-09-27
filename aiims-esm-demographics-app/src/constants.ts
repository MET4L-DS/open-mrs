import { Identification } from '@carbon/react/icons';
import { type FormRegistryEntry } from './shared/types';

export const moduleName = '@aiims/esm-demographics-app';

// Form UUID for AIIMS Visit: Personal Information Intake
export const AIIMS_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d880';
export const AIIMS_FORM_NAME = 'AIIMS Visit: Personal Information Intake';

// Form Registry: Centralized configuration for all current and future AIIMS forms
export const FORM_REGISTRY: FormRegistryEntry[] = [
  {
    key: 'demographics',
    uuid: AIIMS_FORM_UUID,
    name: AIIMS_FORM_NAME,
    path: 'aiims-demographics',
    titleKey: 'aiimsDemographicsTitle',
    title: 'AIIMS Demographics',
    slot: 'aiims-demographics-dashboard-slot',
    icon: Identification,
    order: 1,
  },
  // Additional forms (anthropometry, clinical history, ultrasound, etc.) will be registered here
];

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
  // Education concepts: distinct concept for husband to avoid array index ambiguity
  educationHusband: 'c0010001-0000-0000-0000-000000000013',
  educationLevel: '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  educationWife: '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
};

// Person Attribute Type UUID for Patient Telephone Number
export const TELEPHONE_ATTRIBUTE_TYPE_UUID = '14d4f066-15f5-102d-96e4-000c29c2a5d7';
