import { AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsFemaleBloodHormoneData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  antiMullerianHormone?: string | number;
  day2FollicleStimulatingHormone?: string | number;
  day2LuteinizingHormone?: string | number;
  thyroidStimulatingHormone?: string | number;
  serumProlactin?: string | number;
}

export const initialAiimsFemaleBloodHormoneData: Readonly<AiimsFemaleBloodHormoneData> = Object.freeze({
  hasData: false,
});

export function useFemaleBloodHormone(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID
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
      femaleBloodHormoneData: initialAiimsFemaleBloodHormoneData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const antiMullerianHormone = getOptionalObsValue(CONCEPTS.antiMullerianHormone);
  const day2FollicleStimulatingHormone = getOptionalObsValue(CONCEPTS.day2FollicleStimulatingHormone);
  const day2LuteinizingHormone = getOptionalObsValue(CONCEPTS.day2LuteinizingHormone);
  const thyroidStimulatingHormone = getOptionalObsValue(CONCEPTS.thyroidStimulatingHormone);
  const serumProlactin = getOptionalObsValue(CONCEPTS.serumProlactin);

  const hasData =
    antiMullerianHormone !== undefined ||
    day2FollicleStimulatingHormone !== undefined ||
    day2LuteinizingHormone !== undefined ||
    thyroidStimulatingHormone !== undefined ||
    serumProlactin !== undefined;

  const femaleBloodHormoneData: AiimsFemaleBloodHormoneData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    antiMullerianHormone,
    day2FollicleStimulatingHormone,
    day2LuteinizingHormone,
    thyroidStimulatingHormone,
    serumProlactin,
  };

  return {
    femaleBloodHormoneData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
