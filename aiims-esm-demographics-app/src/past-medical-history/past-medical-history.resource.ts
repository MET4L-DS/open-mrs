import { AIIMS_PAST_MEDICAL_HISTORY_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsPastMedicalHistoryData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  medicalDiseases: string[];
  medicalDiseasesOthers?: string;
}

export const initialAiimsPastMedicalHistoryData: Readonly<AiimsPastMedicalHistoryData> = Object.freeze({
  hasData: false,
  medicalDiseases: [],
});

export function usePastMedicalHistory(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_PAST_MEDICAL_HISTORY_FORM_UUID
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
      pastMedicalHistoryData: initialAiimsPastMedicalHistoryData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const pastMedicalHistoryData: AiimsPastMedicalHistoryData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    medicalDiseases: getObsValues(CONCEPTS.medicalDisease),
    medicalDiseasesOthers: getOptionalObsValue(CONCEPTS.medicalDiseasesOthers),
  };

  return {
    pastMedicalHistoryData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
