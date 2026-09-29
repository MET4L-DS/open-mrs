import { Identification, Events, ParentChild, Calendar, Activity } from '@carbon/react/icons';
import { type FormRegistryEntry } from './shared/types';

export const moduleName = '@aiims/esm-demographics-app';

// Form UUID for AIIMS Visit: Personal Information Intake
export const AIIMS_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d880';
export const AIIMS_FORM_NAME = 'AIIMS Visit: Personal Information Intake';

// Form UUID for AIIMS Visit: Type of Infertility
export const AIIMS_INFERTILITY_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d881';
export const AIIMS_INFERTILITY_FORM_NAME = 'AIIMS Visit: Type of Infertility';

// Form UUID for AIIMS Visit: Obstetric History
export const AIIMS_OBSTETRIC_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d882';
export const AIIMS_OBSTETRIC_FORM_NAME = 'AIIMS Visit: Obstetric History';

// Form UUID for AIIMS Visit: Menstrual History
export const AIIMS_MENSTRUAL_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d883';
export const AIIMS_MENSTRUAL_FORM_NAME = 'AIIMS Visit: Menstrual History';

// Form UUID for AIIMS Visit: Female Factor
export const AIIMS_FEMALE_FACTOR_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d884';
export const AIIMS_FEMALE_FACTOR_FORM_NAME = 'AIIMS Visit: Female Factor';

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
  {
    key: 'infertility-type',
    uuid: AIIMS_INFERTILITY_FORM_UUID,
    name: AIIMS_INFERTILITY_FORM_NAME,
    path: 'aiims-infertility-type',
    titleKey: 'aiimsInfertilityTypeTitle',
    title: 'Type of Infertility',
    slot: 'aiims-infertility-type-dashboard-slot',
    icon: Events,
    order: 1,
  },
  {
    key: 'obstetric-history',
    uuid: AIIMS_OBSTETRIC_FORM_UUID,
    name: AIIMS_OBSTETRIC_FORM_NAME,
    path: 'aiims-obstetric-history',
    titleKey: 'aiimsObstetricHistoryTitle',
    title: 'Obstetric History',
    slot: 'aiims-obstetric-history-dashboard-slot',
    icon: ParentChild,
    order: 1,
  },
  {
    key: 'menstrual-history',
    uuid: AIIMS_MENSTRUAL_FORM_UUID,
    name: AIIMS_MENSTRUAL_FORM_NAME,
    path: 'aiims-menstrual-history',
    titleKey: 'aiimsMenstrualHistoryTitle',
    title: 'Menstrual History',
    slot: 'aiims-menstrual-history-dashboard-slot',
    icon: Calendar,
    order: 1,
  },
  {
    key: 'female-factor',
    uuid: AIIMS_FEMALE_FACTOR_FORM_UUID,
    name: AIIMS_FEMALE_FACTOR_FORM_NAME,
    path: 'aiims-female-factor',
    titleKey: 'aiimsFemaleFactorTitle',
    title: 'Female Factor',
    slot: 'aiims-female-factor-dashboard-slot',
    icon: Activity,
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
  // Infertility concepts
  typeOfInfertility: 'c0010001-0000-0000-0000-000000000017',
  marriedForYears: 'c0010001-0000-0000-0000-000000000018',
  durationOfInfertility: 'c0010001-0000-0000-0000-000000000019',
  primaryInfertility: 'c0010002-0000-0000-0000-000000000101',
  secondaryInfertility: 'c0010002-0000-0000-0000-000000000102',
  // Obstetric History concepts
  gravida: 'c0010001-0000-0000-0000-000000000020',
  parity: 'c0010001-0000-0000-0000-000000000021',
  livingChildren: 'c0010001-0000-0000-0000-000000000022',
  abortionMiscarriage: 'c0010001-0000-0000-0000-000000000023',
  ectopicPregnancy: 'c0010001-0000-0000-0000-000000000024',
  // Menstrual History concepts
  patternOfMenstrualCycle: 'c0010001-0000-0000-0000-000000000025',
  lastMenstrualPeriod: 'c0010001-0000-0000-0000-000000000026',
  flowOfMenstrualCycle: 'c0010001-0000-0000-0000-000000000027',
  regularPeriods: 'c0010002-0000-0000-0000-000000000201',
  irregularPeriods: 'c0010002-0000-0000-0000-000000000202',
  oligomenorrhea: 'c0010002-0000-0000-0000-000000000203',
  polymenorrhea: 'c0010002-0000-0000-0000-000000000204',
  flowNormal: 'c0010002-0000-0000-0000-000000000205',
  hypomenorrhoea: 'c0010002-0000-0000-0000-000000000206',
  primaryAmenorrhoea: 'c0010002-0000-0000-0000-000000000207',
  secondaryAmenorrhoea: 'c0010002-0000-0000-0000-000000000208',
  heavyMenstrualBleeding: 'c0010002-0000-0000-0000-000000000209',
  amenorrhoea: 'c0010002-0000-0000-0000-000000000210',
  irregularCycleType: 'c0010001-0000-0000-0000-000000000028',
  amenorrhoeaType: 'c0010001-0000-0000-0000-000000000029',
  // Female Factor concepts
  femaleInfertilityFactor: 'c0010001-0000-0000-0000-000000000030',
  tubalFactorDetails: 'c0010001-0000-0000-0000-000000000031',
  dorDetails: 'c0010001-0000-0000-0000-000000000032',
  poseidonGroup: 'c0010001-0000-0000-0000-000000000033',
  endometriosisClassification: 'c0010001-0000-0000-0000-000000000034',
  pcosPhenotype: 'c0010001-0000-0000-0000-000000000035',
  uterineFactorDetails: 'c0010001-0000-0000-0000-000000000036',
  otherFemaleFactors: 'c0010001-0000-0000-0000-000000000037',
  femaleFactorOthers: 'c0010001-0000-0000-0000-000000000038',
};

// Person Attribute Type UUID for Patient Telephone Number
export const TELEPHONE_ATTRIBUTE_TYPE_UUID = '14d4f066-15f5-102d-96e4-000c29c2a5d7';

export type KnownConceptUuid = (typeof CONCEPTS)[keyof typeof CONCEPTS];
export type ConceptUuid = KnownConceptUuid | (string & {});

/**
 * Safely retrieve a FormRegistryEntry by its key from FORM_REGISTRY.
 */
export function getFormRegistryEntry(key: string): FormRegistryEntry {
  const entry = FORM_REGISTRY.find(e => e.key === key);
  if (!entry) {
    throw new Error(`Form configuration for key "${key}" not found in FORM_REGISTRY.`);
  }
  return entry;
}

/**
 * Safely retrieve a form's UUID by its registry key.
 */
export function getFormUuid(key: string): string {
  return getFormRegistryEntry(key).uuid;
}

/**
 * Safely retrieve a form's display name by its registry key.
 */
export function getFormName(key: string): string {
  return getFormRegistryEntry(key).name;
}

