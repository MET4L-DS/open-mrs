import { AIIMS_INFERTILITY_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';

export interface AiimsInfertilityTypeData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  typeOfInfertility?: string;
  marriedForYears?: string;
  durationOfInfertility?: string;
}

export function useInfertilityType(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_INFERTILITY_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    const infertilityData: AiimsInfertilityTypeData = {
      hasData: false,
    };

    return {
      infertilityData,
      latestEncounter: null,
      isLoading,
      error,
      mutate,
    };
  }

  const infertilityData: AiimsInfertilityTypeData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    typeOfInfertility: getObsValue(CONCEPTS.typeOfInfertility),
    marriedForYears: getObsValue(CONCEPTS.marriedForYears),
    durationOfInfertility: getObsValue(CONCEPTS.durationOfInfertility),
  };

  return {
    infertilityData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
