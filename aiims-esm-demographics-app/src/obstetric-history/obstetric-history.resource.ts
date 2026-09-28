import { AIIMS_OBSTETRIC_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';

export interface AiimsObstetricHistoryData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  gravida?: string;
  parity?: string;
  livingChildren?: string;
  abortionMiscarriage?: string;
  ectopicPregnancy?: string;
}

export function useObstetricHistory(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_OBSTETRIC_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    const obstetricData: AiimsObstetricHistoryData = {
      hasData: false,
    };

    return {
      obstetricData,
      latestEncounter: null,
      isLoading,
      error,
      mutate,
    };
  }

  const obstetricData: AiimsObstetricHistoryData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    gravida: getObsValue(CONCEPTS.gravida),
    parity: getObsValue(CONCEPTS.parity),
    livingChildren: getObsValue(CONCEPTS.livingChildren),
    abortionMiscarriage: getObsValue(CONCEPTS.abortionMiscarriage),
    ectopicPregnancy: getObsValue(CONCEPTS.ectopicPregnancy),
  };

  return {
    obstetricData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
