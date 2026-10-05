import { AIIMS_FAMILY_HISTORY_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface FamilyMemberHistory {
  relationKey: string;
  relationLabelKey: string;
  defaultLabel: string;
  medicalDiseases: string[];
  medicalDiseasesOthers?: string;
}

export interface AiimsFamilyHistoryData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  members: FamilyMemberHistory[];
}

export const initialAiimsFamilyHistoryData: Readonly<AiimsFamilyHistoryData> = Object.freeze({
  hasData: false,
  members: [],
});

export const FAMILY_MEMBERS_CONFIG = [
  {
    relationKey: 'father',
    relationLabelKey: 'familyMemberFather',
    defaultLabel: 'Father',
    diseaseConcept: CONCEPTS.fatherMedicalDisease,
    notesConcept: CONCEPTS.fatherMedicalDiseasesOthers,
  },
  {
    relationKey: 'mother',
    relationLabelKey: 'familyMemberMother',
    defaultLabel: 'Mother',
    diseaseConcept: CONCEPTS.motherMedicalDisease,
    notesConcept: CONCEPTS.motherMedicalDiseasesOthers,
  },
  {
    relationKey: 'husband',
    relationLabelKey: 'familyMemberHusband',
    defaultLabel: 'Husband',
    diseaseConcept: CONCEPTS.husbandMedicalDisease,
    notesConcept: CONCEPTS.husbandMedicalDiseasesOthers,
  },
  {
    relationKey: 'brother',
    relationLabelKey: 'familyMemberBrother',
    defaultLabel: 'Brother',
    diseaseConcept: CONCEPTS.brotherMedicalDisease,
    notesConcept: CONCEPTS.brotherMedicalDiseasesOthers,
  },
  {
    relationKey: 'maternalGrandmother',
    relationLabelKey: 'familyMemberMaternalGrandmother',
    defaultLabel: 'Maternal Grandmother',
    diseaseConcept: CONCEPTS.maternalGrandmotherMedicalDisease,
    notesConcept: CONCEPTS.maternalGrandmotherMedicalDiseasesOthers,
  },
  {
    relationKey: 'maternalGrandfather',
    relationLabelKey: 'familyMemberMaternalGrandfather',
    defaultLabel: 'Maternal Grandfather',
    diseaseConcept: CONCEPTS.maternalGrandfatherMedicalDisease,
    notesConcept: CONCEPTS.maternalGrandfatherMedicalDiseasesOthers,
  },
];

export function useFamilyHistory(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_FAMILY_HISTORY_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getOptionalObsValue,
    getObsValues,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    return {
      familyHistoryData: initialAiimsFamilyHistoryData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const members: FamilyMemberHistory[] = FAMILY_MEMBERS_CONFIG.map(cfg => {
    return {
      relationKey: cfg.relationKey,
      relationLabelKey: cfg.relationLabelKey,
      defaultLabel: cfg.defaultLabel,
      medicalDiseases: getObsValues(cfg.diseaseConcept),
      medicalDiseasesOthers: getOptionalObsValue(cfg.notesConcept),
    };
  });

  const hasAnyData = members.some(
    m => m.medicalDiseases.length > 0 || !!m.medicalDiseasesOthers
  );

  const familyHistoryData: AiimsFamilyHistoryData = {
    hasData: hasAnyData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    members,
  };

  return {
    familyHistoryData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
