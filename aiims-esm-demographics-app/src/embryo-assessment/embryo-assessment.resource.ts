import { AIIMS_EMBRYO_ASSESSMENT_FORM_UUID } from '../config/form-uuids';
import { CONCEPTS } from '../config/concepts';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';

export interface AiimsEmbryoAssessmentData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;

  // Day 1: Fertilization (2PN)
  numberEmbryosDay1?: string;
  gradeEmbryosDay1?: string;

  // Day 2: Cleavage Stage
  numberEmbryosDay2?: string;
  gradeEmbryosDay2?: string;

  // Day 3: Cleavage Stage
  numberEmbryosDay3?: string;
  gradeEmbryosDay3?: string;

  // Day 4: Morula Stage (Free Text)
  numberEmbryosDay4?: string;
  gradeEmbryosDay4?: string;

  // Day 5: Blastocyst Stage
  numberEmbryosDay5?: string;
  gradeEmbryosDay5?: string;

  // Day 6: Extended Culture
  numberEmbryosDay6?: string;
  gradeEmbryosDay6?: string;
}

export const initialAiimsEmbryoAssessmentData: Readonly<AiimsEmbryoAssessmentData> =
  Object.freeze({
    hasData: false,
  });

export function useEmbryoAssessment(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_EMBRYO_ASSESSMENT_FORM_UUID
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

  let data: AiimsEmbryoAssessmentData = { ...initialAiimsEmbryoAssessmentData };

  if (latestEncounter && encounterHasData) {
    const numberEmbryosDay1 = getOptionalObsValue(CONCEPTS.numberEmbryosDay1);
    const gradeEmbryosDay1 = getOptionalObsValue(CONCEPTS.gradeEmbryosDay1);

    const numberEmbryosDay2 = getOptionalObsValue(CONCEPTS.numberEmbryosDay2);
    const gradeEmbryosDay2 = getOptionalObsValue(CONCEPTS.gradeEmbryosDay2);

    const numberEmbryosDay3 = getOptionalObsValue(CONCEPTS.numberEmbryosDay3);
    const gradeEmbryosDay3 = getOptionalObsValue(CONCEPTS.gradeEmbryosDay3);

    const numberEmbryosDay4 = getOptionalObsValue(CONCEPTS.numberEmbryosDay4);
    const gradeEmbryosDay4 = getOptionalObsValue(CONCEPTS.gradeEmbryosDay4);

    const numberEmbryosDay5 = getOptionalObsValue(CONCEPTS.numberEmbryosDay5);
    const gradeEmbryosDay5 = getOptionalObsValue(CONCEPTS.gradeEmbryosDay5);

    const numberEmbryosDay6 = getOptionalObsValue(CONCEPTS.numberEmbryosDay6);
    const gradeEmbryosDay6 = getOptionalObsValue(CONCEPTS.gradeEmbryosDay6);

    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      numberEmbryosDay1,
      gradeEmbryosDay1,
      numberEmbryosDay2,
      gradeEmbryosDay2,
      numberEmbryosDay3,
      gradeEmbryosDay3,
      numberEmbryosDay4,
      gradeEmbryosDay4,
      numberEmbryosDay5,
      gradeEmbryosDay5,
      numberEmbryosDay6,
      gradeEmbryosDay6,
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
