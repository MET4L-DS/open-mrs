import { AIIMS_MALE_HORMONE_SURGERY_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsMaleHormoneSurgeryData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  fshHusband?: string;
  testosteroneHusband?: string;
  testicularBiopsy?: string;
}

export const initialAiimsMaleHormoneSurgeryData: Readonly<AiimsMaleHormoneSurgeryData> = Object.freeze({
  hasData: false,
});

export function useMaleHormoneSurgery(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_MALE_HORMONE_SURGERY_FORM_UUID
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
      maleHormoneSurgeryData: initialAiimsMaleHormoneSurgeryData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const maleHormoneSurgeryData: AiimsMaleHormoneSurgeryData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    fshHusband: getOptionalObsValue(CONCEPTS.fshHusband),
    testosteroneHusband: getOptionalObsValue(CONCEPTS.testosteroneHusband),
    testicularBiopsy: getOptionalObsValue(CONCEPTS.testicularBiopsy),
  };

  return {
    maleHormoneSurgeryData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
