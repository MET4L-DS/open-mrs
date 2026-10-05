import { Identification, Events, ParentChild, Calendar, Activity, GenderMale, Scalpel, Medication, Cut, PedestrianFamily, Microscope, Waveform } from '@carbon/react/icons';
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

// Form UUID for AIIMS Visit: Male Factor
export const AIIMS_MALE_FACTOR_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d885';
export const AIIMS_MALE_FACTOR_FORM_NAME = 'AIIMS Visit: Male Factor';

// Form UUID for AIIMS Visit: Male Hormone and Surgery
export const AIIMS_MALE_HORMONE_SURGERY_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d886';
export const AIIMS_MALE_HORMONE_SURGERY_FORM_NAME = 'AIIMS Visit: Male Hormone and Surgery';

// Form UUID for AIIMS Visit: Previous OI and IUI
export const AIIMS_PREV_OI_IUI_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d887';
export const AIIMS_PREV_OI_IUI_FORM_NAME = 'AIIMS Visit: Previous OI and IUI';

// Form UUID for AIIMS Visit: Previous Surgery
export const AIIMS_PREV_SURGERY_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d888';
export const AIIMS_PREV_SURGERY_FORM_NAME = 'AIIMS Visit: Previous Surgery';

// Form UUID for AIIMS Visit: Past Medical History
export const AIIMS_PAST_MEDICAL_HISTORY_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d889';
export const AIIMS_PAST_MEDICAL_HISTORY_FORM_NAME = 'AIIMS Visit: Past Medical History';

// Form UUID for AIIMS Visit: Family History
export const AIIMS_FAMILY_HISTORY_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d88a';
export const AIIMS_FAMILY_HISTORY_FORM_NAME = 'AIIMS Visit: Family History';

// Form UUID for AIIMS Visit: Tuberculosis History
export const AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d88b';
export const AIIMS_TUBERCULOSIS_HISTORY_FORM_NAME = 'AIIMS Visit: Tuberculosis History';

// Form UUID for AIIMS Visit: Investigation Ultrasound
export const AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID = '80930653-7e80-4bfd-9e29-ec37c334d88c';
export const AIIMS_INVESTIGATION_ULTRASOUND_FORM_NAME = 'AIIMS Visit: Investigation Ultrasound';

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
  {
    key: 'male-factor',
    uuid: AIIMS_MALE_FACTOR_FORM_UUID,
    name: AIIMS_MALE_FACTOR_FORM_NAME,
    path: 'aiims-male-factor',
    titleKey: 'aiimsMaleFactorTitle',
    title: 'Male Factor',
    slot: 'aiims-male-factor-dashboard-slot',
    icon: GenderMale,
    order: 1,
  },
  {
    key: 'male-hormone-surgery',
    uuid: AIIMS_MALE_HORMONE_SURGERY_FORM_UUID,
    name: AIIMS_MALE_HORMONE_SURGERY_FORM_NAME,
    path: 'aiims-male-hormone-surgery',
    titleKey: 'aiimsMaleHormoneSurgeryTitle',
    title: 'Male Hormone & Surgery',
    slot: 'aiims-male-hormone-surgery-dashboard-slot',
    icon: Scalpel,
    order: 1,
  },
  {
    key: 'previous-oi-iui',
    uuid: AIIMS_PREV_OI_IUI_FORM_UUID,
    name: AIIMS_PREV_OI_IUI_FORM_NAME,
    path: 'aiims-previous-oi-iui',
    titleKey: 'aiimsPreviousOiIuiTitle',
    title: 'Previous OI & IUI',
    slot: 'aiims-previous-oi-iui-dashboard-slot',
    icon: Medication,
    order: 1,
  },
  {
    key: 'previous-surgery',
    uuid: AIIMS_PREV_SURGERY_FORM_UUID,
    name: AIIMS_PREV_SURGERY_FORM_NAME,
    path: 'aiims-previous-surgery',
    titleKey: 'aiimsPreviousSurgeryTitle',
    title: 'Previous Surgery',
    slot: 'aiims-previous-surgery-dashboard-slot',
    icon: Cut,
    order: 1,
  },
  {
    key: 'past-medical-history',
    uuid: AIIMS_PAST_MEDICAL_HISTORY_FORM_UUID,
    name: AIIMS_PAST_MEDICAL_HISTORY_FORM_NAME,
    path: 'aiims-past-medical-history',
    titleKey: 'aiimsPastMedicalHistoryTitle',
    title: 'Past Medical History',
    slot: 'aiims-past-medical-history-dashboard-slot',
    icon: Events,
    order: 1,
  },
  {
    key: 'family-history',
    uuid: AIIMS_FAMILY_HISTORY_FORM_UUID,
    name: AIIMS_FAMILY_HISTORY_FORM_NAME,
    path: 'aiims-family-history',
    titleKey: 'aiimsFamilyHistoryTitle',
    title: 'Family History',
    slot: 'aiims-family-history-dashboard-slot',
    icon: PedestrianFamily,
    order: 1,
  },
  {
    key: 'tuberculosis-history',
    uuid: AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID,
    name: AIIMS_TUBERCULOSIS_HISTORY_FORM_NAME,
    path: 'aiims-tuberculosis-history',
    titleKey: 'aiimsTuberculosisHistoryTitle',
    title: 'Tuberculosis History',
    slot: 'aiims-tuberculosis-history-dashboard-slot',
    icon: Microscope,
    order: 1,
  },
  {
    key: 'investigation-ultrasound',
    uuid: AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID,
    name: AIIMS_INVESTIGATION_ULTRASOUND_FORM_NAME,
    path: 'aiims-investigation-ultrasound',
    titleKey: 'aiimsInvestigationUltrasoundTitle',
    title: 'Investigation Ultrasound',
    slot: 'aiims-investigation-ultrasound-dashboard-slot',
    icon: Waveform,
    order: 1,
  },
  // Additional forms (anthropometry, clinical history, semen analysis, etc.) will be registered here
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
  // Male Factor concepts
  maleInfertilityFactor: 'c0010001-0000-0000-0000-000000000039',
  azoospermiaDetails: 'c0010001-0000-0000-0000-000000000040',
  maleFactorOthers: 'c0010001-0000-0000-0000-000000000041',
  // Male Factor answer concepts
  azoospermia: 'c0010002-0000-0000-0000-000000000401',
  oligozoospermia: 'c0010002-0000-0000-0000-000000000402',
  asthenozoospermia: 'c0010002-0000-0000-0000-000000000403',
  teratozoospermia: 'c0010002-0000-0000-0000-000000000404',
  unexplainedInfertilityMale: 'c0010002-0000-0000-0000-000000000405',
  erectileDysfunction: 'c0010002-0000-0000-0000-000000000406',
  ejaculatoryDysfunction: 'c0010002-0000-0000-0000-000000000407',
  retrogradeEjaculation: 'c0010002-0000-0000-0000-000000000408',
  oats: 'c0010002-0000-0000-0000-000000000409',
  obstructiveAzoospermia: 'c0010002-0000-0000-0000-000000000411',
  nonObstructiveAzoospermia: 'c0010002-0000-0000-0000-000000000412',
  // Male Hormone & Surgery concepts
  fshHusband: 'c0010001-0000-0000-0000-000000000042',
  testosteroneHusband: 'c0010001-0000-0000-0000-000000000043',
  testicularBiopsy: 'c0010001-0000-0000-0000-000000000044',
  // Previous OI and IUI concepts (Form 8)
  prevOi: 'c0010001-0000-0000-0000-000000000045',
  oiDrugs: 'c0010001-0000-0000-0000-000000000046',
  oiDose: 'c0010001-0000-0000-0000-000000000047',
  oiCycles: 'c0010001-0000-0000-0000-000000000048',
  oiYear: 'c0010001-0000-0000-0000-000000000049',
  prevOiIui: 'c0010001-0000-0000-0000-000000000050',
  iuiDrugs: 'c0010001-0000-0000-0000-000000000051',
  iuiDose: 'c0010001-0000-0000-0000-000000000052',
  iuiCycles: 'c0010001-0000-0000-0000-000000000053',
  iuiYear: 'c0010001-0000-0000-0000-000000000054',
  failedIvf: 'c0010001-0000-0000-0000-000000000055',
  failedIvfCycles: 'c0010001-0000-0000-0000-000000000056',
  previousArtNotes: 'c0010001-0000-0000-0000-000000000057',
  // Previous Surgery concepts (Form 9)
  previousSurgeryPerformed: 'c0010001-0000-0000-0000-000000000058',
  surgicalApproach: 'c0010001-0000-0000-0000-000000000059',
  yearOrDateOfSurgery: 'c0010001-0000-0000-0000-000000000060',
  uterineSurgeries: 'c0010001-0000-0000-0000-000000000061',
  endometriosisSurgeries: 'c0010001-0000-0000-0000-000000000062',
  ovarianSurgeries: 'c0010001-0000-0000-0000-000000000063',
  fallopianTubeSurgeries: 'c0010001-0000-0000-0000-000000000064',
  peritonealSurgeries: 'c0010001-0000-0000-0000-000000000065',
  // Procedure laterality questions
  endometrioticCystectomyLaterality: 'c0010001-0000-0000-0000-000000000066',
  endometrioticBipolarAblationLaterality: 'c0010001-0000-0000-0000-000000000067',
  endometrioticApcLaterality: 'c0010001-0000-0000-0000-000000000068',
  endometrioticDrainageLaterality: 'c0010001-0000-0000-0000-000000000069',
  endometrioticSclerotherapyLaterality: 'c0010001-0000-0000-0000-000000000070',
  endometriosisOophorectomyLaterality: 'c0010001-0000-0000-0000-000000000071',
  ovarianDermoidLaterality: 'c0010001-0000-0000-0000-000000000072',
  simpleOvarianCystLaterality: 'c0010001-0000-0000-0000-000000000073',
  paraovarianCystLaterality: 'c0010001-0000-0000-0000-000000000074',
  ovarianCystAspirationLaterality: 'c0010001-0000-0000-0000-000000000075',
  oophorectomyLaterality: 'c0010001-0000-0000-0000-000000000076',
  ovarianCystectomyLaterality: 'c0010001-0000-0000-0000-000000000077',
  chromopertubationLaterality: 'c0010001-0000-0000-0000-000000000078',
  tubalCannulationLaterality: 'c0010001-0000-0000-0000-000000000079',
  salpingectomyLaterality: 'c0010001-0000-0000-0000-000000000080',
  fimbrioplastyLaterality: 'c0010001-0000-0000-0000-000000000081',
  tubalClippingLaterality: 'c0010001-0000-0000-0000-000000000082',
  recanalizationLaterality: 'c0010001-0000-0000-0000-000000000083',
  intraoperativeFindings: 'c0010001-0000-0000-0000-000000000084',
  previousSurgeryOtherNotes: 'c0010001-0000-0000-0000-000000000085',
  // Surgery answer concepts
  lateralityRight: 'c0010002-0000-0000-0000-000000000601',
  lateralityLeft: 'c0010002-0000-0000-0000-000000000602',
  lateralityBilateral: 'c0010002-0000-0000-0000-000000000603',
  approachLaparoscopy: 'c0010002-0000-0000-0000-000000000611',
  approachOpen: 'c0010002-0000-0000-0000-000000000612',
  approachLapConvertedOpen: 'c0010002-0000-0000-0000-000000000613',
  uterineAdenomyomectomy: 'c0010002-0000-0000-0000-000000000621',
  uterineMyomectomy: 'c0010002-0000-0000-0000-000000000622',
  uterineIsthmoceleRepair: 'c0010002-0000-0000-0000-000000000623',
  endometrioticCystectomy: 'c0010002-0000-0000-0000-000000000631',
  endometrioticBipolarAblation: 'c0010002-0000-0000-0000-000000000632',
  endometrioticApc: 'c0010002-0000-0000-0000-000000000633',
  endometrioticDrainage: 'c0010002-0000-0000-0000-000000000634',
  endometrioticSclerotherapy: 'c0010002-0000-0000-0000-000000000635',
  endometriosisOophorectomy: 'c0010002-0000-0000-0000-000000000636',
  ovarianDermoid: 'c0010002-0000-0000-0000-000000000641',
  simpleOvarianCyst: 'c0010002-0000-0000-0000-000000000642',
  paraovarianCyst: 'c0010002-0000-0000-0000-000000000643',
  ovarianCystAspiration: 'c0010002-0000-0000-0000-000000000644',
  oophorectomyProcedure: 'c0010002-0000-0000-0000-000000000645',
  ovarianCystectomy: 'c0010002-0000-0000-0000-000000000646',
  chromopertubation: 'c0010002-0000-0000-0000-000000000651',
  tubalCannulation: 'c0010002-0000-0000-0000-000000000652',
  salpingectomy: 'c0010002-0000-0000-0000-000000000653',
  fimbrioplasty: 'c0010002-0000-0000-0000-000000000654',
  tubalClipping: 'c0010002-0000-0000-0000-000000000655',
  recanalization: 'c0010002-0000-0000-0000-000000000656',
  peritonealAdhesiolysis: 'c0010002-0000-0000-0000-000000000661',
  peritonectomy: 'c0010002-0000-0000-0000-000000000662',
  // Standard and medication answer concepts
  yes: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  no: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  letrozole: 'c0010002-0000-0000-0000-000000000501',
  hmg: 'c0010002-0000-0000-0000-000000000502',
  clomiphene: 'c0010002-0000-0000-0000-000000000503',
  hmgPlusClomiphene: 'c0010002-0000-0000-0000-000000000504',
  multipleOvi: 'c0010002-0000-0000-0000-000000000505',
  // Form 10: Past Medical History concepts
  medicalDisease: 'c0010001-0000-0000-0000-000000000086',
  medicalDiseasesOthers: 'c0010001-0000-0000-0000-000000000087',
  otherMedicalDisease: 'c0010002-0000-0000-0000-000000000799',
  // Form 11: Family History concepts
  fatherMedicalDisease: 'c0010001-0000-0000-0000-000000000088',
  fatherMedicalDiseasesOthers: 'c0010001-0000-0000-0000-000000000089',
  motherMedicalDisease: 'c0010001-0000-0000-0000-000000000090',
  motherMedicalDiseasesOthers: 'c0010001-0000-0000-0000-000000000091',
  husbandMedicalDisease: 'c0010001-0000-0000-0000-000000000092',
  husbandMedicalDiseasesOthers: 'c0010001-0000-0000-0000-000000000093',
  brotherMedicalDisease: 'c0010001-0000-0000-0000-000000000094',
  brotherMedicalDiseasesOthers: 'c0010001-0000-0000-0000-000000000095',
  maternalGrandmotherMedicalDisease: 'c0010001-0000-0000-0000-000000000096',
  maternalGrandmotherMedicalDiseasesOthers: 'c0010001-0000-0000-0000-000000000097',
  maternalGrandfatherMedicalDisease: 'c0010001-0000-0000-0000-000000000098',
  maternalGrandfatherMedicalDiseasesOthers: 'c0010001-0000-0000-0000-000000000099',

  // Form 12: Tuberculosis History Concepts
  tbDateOfDiagnosis: 'c0010001-0000-0000-0000-000000000100',
  tbSite: 'c0010001-0000-0000-0000-000000000101',
  tbSiteOther: 'c0010001-0000-0000-0000-000000000102',
  attStartDate: 'c0010001-0000-0000-0000-000000000103',
  attCount: 'c0010001-0000-0000-0000-000000000104',
  attDuration: 'c0010001-0000-0000-0000-000000000105',
  tbClinicalNotes: 'c0010001-0000-0000-0000-000000000106',

  // Form 13: Investigation Ultrasound Concepts
  totalAntralFollicleCount: 'c0010001-0000-0000-0000-000000000107',
  volumeRightOvary: 'c0010001-0000-0000-0000-000000000108',
  volumeLeftOvary: 'c0010001-0000-0000-0000-000000000109',
  ultrasoundRemarks: 'c0010001-0000-0000-0000-000000000110',
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

