import { AIIMS_INFERTILITY_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsInfertilityTypeData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  typeOfInfertility?: string;
  marriedForYears?: string;
  durationOfInfertility?: string;
}

export const initialAiimsInfertilityTypeData: Readonly<AiimsInfertilityTypeData> = Object.freeze({
  hasData: false,
});

export function useInfertilityType(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_INFERTILITY_FORM_UUID
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
      infertilityData: initialAiimsInfertilityTypeData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const infertilityData: AiimsInfertilityTypeData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    typeOfInfertility: getOptionalObsValue(CONCEPTS.typeOfInfertility),
    marriedForYears: getOptionalObsValue(CONCEPTS.marriedForYears),
    durationOfInfertility: getOptionalObsValue(CONCEPTS.durationOfInfertility),
  };

  return {
    infertilityData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}

