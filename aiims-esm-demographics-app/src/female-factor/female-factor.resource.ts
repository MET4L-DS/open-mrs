import { AIIMS_FEMALE_FACTOR_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

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

export const initialAiimsFemaleFactorData: Readonly<AiimsFemaleFactorData> = Object.freeze({
  hasData: false,
  femaleFactors: [],
  tubalFactorDetails: [],
  endometriosisClassification: [],
  uterineFactorDetails: [],
  otherFemaleFactors: [],
});

export function useFemaleFactor(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_FEMALE_FACTOR_FORM_UUID
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
      femaleFactorData: initialAiimsFemaleFactorData,
      latestEncounter: null as EncounterItem | null,
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
    dorDetails: getOptionalObsValue(CONCEPTS.dorDetails),
    poseidonGroup: getOptionalObsValue(CONCEPTS.poseidonGroup),
    endometriosisClassification: getObsValues(CONCEPTS.endometriosisClassification),
    pcosPhenotype: getOptionalObsValue(CONCEPTS.pcosPhenotype),
    uterineFactorDetails: getObsValues(CONCEPTS.uterineFactorDetails),
    otherFemaleFactors: getObsValues(CONCEPTS.otherFemaleFactors),
    femaleFactorOthers: getOptionalObsValue(CONCEPTS.femaleFactorOthers),
  };

  return {
    femaleFactorData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}

