import { AIIMS_OBSTETRIC_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

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

export const initialAiimsObstetricHistoryData: Readonly<AiimsObstetricHistoryData> = Object.freeze({
  hasData: false,
});

export function useObstetricHistory(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_OBSTETRIC_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getOptionalObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    return {
      obstetricData: initialAiimsObstetricHistoryData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const obstetricData: AiimsObstetricHistoryData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    gravida: getOptionalObsValue(CONCEPTS.gravida),
    parity: getOptionalObsValue(CONCEPTS.parity),
    livingChildren: getOptionalObsValue(CONCEPTS.livingChildren),
    abortionMiscarriage: getOptionalObsValue(CONCEPTS.abortionMiscarriage),
    ectopicPregnancy: getOptionalObsValue(CONCEPTS.ectopicPregnancy),
  };

  return {
    obstetricData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}

