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
  totalGradedEmbryosDay3?: number;
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
    const grade1 = getOptionalObsValue(CONCEPTS.grade1EmbryosDay3);
    const grade2 = getOptionalObsValue(CONCEPTS.grade2EmbryosDay3);
    const grade3 = getOptionalObsValue(CONCEPTS.grade3EmbryosDay3);
    const grade4 = getOptionalObsValue(CONCEPTS.grade4EmbryosDay3);
    const remarks = getOptionalObsValue(CONCEPTS.embryoGradingDay3Remarks);

    const counts = [grade1, grade2, grade3, grade4]
      .map(v => (v !== undefined ? Number(v) : NaN))
      .filter(n => !isNaN(n));

    const totalGradedEmbryosDay3 = counts.length > 0
      ? counts.reduce((acc, curr) => acc + curr, 0)
      : undefined;

    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      grade1EmbryosDay3: grade1,
      grade2EmbryosDay3: grade2,
      grade3EmbryosDay3: grade3,
      grade4EmbryosDay3: grade4,
      totalGradedEmbryosDay3,
      embryoGradingDay3Remarks: remarks,
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
