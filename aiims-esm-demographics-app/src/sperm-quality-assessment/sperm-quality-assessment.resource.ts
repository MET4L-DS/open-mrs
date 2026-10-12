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
  postWashConcentration?: string;
  spermMotility?: string;
  remarks?: string;
}

export const initialAiimsSpermQualityAssessmentData: Readonly<AiimsSpermQualityAssessmentData> =
  Object.freeze({
    hasData: false,
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
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    return {
      spermQualityData: initialAiimsSpermQualityAssessmentData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const postWashConcentration = getOptionalObsValue(CONCEPTS.postWashSpermConcentration);
  const spermMotility = getOptionalObsValue(CONCEPTS.spermMotilityOpuDay);
  const remarks = getOptionalObsValue(CONCEPTS.spermQualityAssessmentRemarks);

  const hasData =
    postWashConcentration !== undefined ||
    spermMotility !== undefined ||
    remarks !== undefined;

  const spermQualityData: AiimsSpermQualityAssessmentData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    postWashConcentration,
    spermMotility,
    remarks,
  };

  return {
    spermQualityData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
