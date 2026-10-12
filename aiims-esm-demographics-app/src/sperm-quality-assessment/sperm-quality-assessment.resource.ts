import {
  AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsSpermQualityAssessmentData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  spermRetrievalProcedure: string[];
  spermQualityAssessmentRemarks?: string;
}

export const initialAiimsSpermQualityAssessmentData: Readonly<AiimsSpermQualityAssessmentData> =
  Object.freeze({
    hasData: false,
    spermRetrievalProcedure: [],
  });

export function useSpermQualityAssessment(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID
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
      spermQualityAssessmentData: initialAiimsSpermQualityAssessmentData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const spermRetrievalProcedure = getObsValues(CONCEPTS.spermRetrievalProcedure);
  const spermQualityAssessmentRemarks = getOptionalObsValue(
    CONCEPTS.spermQualityAssessmentRemarks
  );

  const hasData =
    spermRetrievalProcedure.length > 0 ||
    spermQualityAssessmentRemarks !== undefined;

  const spermQualityAssessmentData: AiimsSpermQualityAssessmentData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    spermRetrievalProcedure,
    spermQualityAssessmentRemarks,
  };

  return {
    spermQualityAssessmentData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
