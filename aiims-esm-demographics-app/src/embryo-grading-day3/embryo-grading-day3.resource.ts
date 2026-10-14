import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_EMBRYO_GRADING_DAY3_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsEmbryoGradingDay3Data {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  grade1EmbryosDay3?: string;
  grade2EmbryosDay3?: string;
  grade3EmbryosDay3?: string;
  grade4EmbryosDay3?: string;
  embryoGradingDay3Remarks?: string;
}

export const initialAiimsEmbryoGradingDay3Data: Readonly<AiimsEmbryoGradingDay3Data> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
  });

export function useEmbryoGradingDay3(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_EMBRYO_GRADING_DAY3_FORM_UUID
) {
  const {
    latestEncounter,
    encounters,
    hasData: encounterHasData,
    isLoading,
    error,
    mutate,
    getOptionalObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  let data: AiimsEmbryoGradingDay3Data = { ...initialAiimsEmbryoGradingDay3Data };

  if (latestEncounter && encounterHasData) {
    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      grade1EmbryosDay3: getOptionalObsValue(CONCEPTS.grade1EmbryosDay3),
      grade2EmbryosDay3: getOptionalObsValue(CONCEPTS.grade2EmbryosDay3),
      grade3EmbryosDay3: getOptionalObsValue(CONCEPTS.grade3EmbryosDay3),
      grade4EmbryosDay3: getOptionalObsValue(CONCEPTS.grade4EmbryosDay3),
      embryoGradingDay3Remarks: getOptionalObsValue(CONCEPTS.embryoGradingDay3Remarks),
    };
  }

  return {
    data,
    latestEncounter,
    encounters,
    isLoading,
    error,
    mutate,
  };
}
