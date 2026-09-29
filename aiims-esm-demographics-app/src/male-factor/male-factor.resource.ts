import { AIIMS_MALE_FACTOR_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsMaleFactorData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  maleFactors: string[];
  azoospermiaDetails?: string;
  maleFactorOthers?: string;
}

export const initialAiimsMaleFactorData: Readonly<AiimsMaleFactorData> = Object.freeze({
  hasData: false,
  maleFactors: [],
});

export function useMaleFactor(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_MALE_FACTOR_FORM_UUID
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
      maleFactorData: initialAiimsMaleFactorData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const maleFactorData: AiimsMaleFactorData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    maleFactors: getObsValues(CONCEPTS.maleInfertilityFactor),
    azoospermiaDetails: getOptionalObsValue(CONCEPTS.azoospermiaDetails),
    maleFactorOthers: getOptionalObsValue(CONCEPTS.maleFactorOthers),
  };

  return {
    maleFactorData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
