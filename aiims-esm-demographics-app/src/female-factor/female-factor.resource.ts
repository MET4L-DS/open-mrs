import { AIIMS_FEMALE_FACTOR_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';

export interface AiimsFemaleFactorData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  femaleFactors: string[];
  tubalFactorDetails: string[];
  dorDetails?: string;
  poseidonGroup?: string;
  endometriosisClassification: string[];
  pcosPhenotype?: string;
  uterineFactorDetails: string[];
  otherFemaleFactors: string[];
  femaleFactorOthers?: string;
}

export function useFemaleFactor(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_FEMALE_FACTOR_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getObsValue,
    getObsValues,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    const femaleFactorData: AiimsFemaleFactorData = {
      hasData: false,
      femaleFactors: [],
      tubalFactorDetails: [],
      endometriosisClassification: [],
      uterineFactorDetails: [],
      otherFemaleFactors: [],
    };

    return {
      femaleFactorData,
      latestEncounter: null,
      isLoading,
      error,
      mutate,
    };
  }

  const femaleFactorData: AiimsFemaleFactorData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    femaleFactors: getObsValues(CONCEPTS.femaleInfertilityFactor),
    tubalFactorDetails: getObsValues(CONCEPTS.tubalFactorDetails),
    dorDetails: getObsValue(CONCEPTS.dorDetails) || undefined,
    poseidonGroup: getObsValue(CONCEPTS.poseidonGroup) || undefined,
    endometriosisClassification: getObsValues(CONCEPTS.endometriosisClassification),
    pcosPhenotype: getObsValue(CONCEPTS.pcosPhenotype) || undefined,
    uterineFactorDetails: getObsValues(CONCEPTS.uterineFactorDetails),
    otherFemaleFactors: getObsValues(CONCEPTS.otherFemaleFactors),
    femaleFactorOthers: getObsValue(CONCEPTS.femaleFactorOthers) || undefined,
  };

  return {
    femaleFactorData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
