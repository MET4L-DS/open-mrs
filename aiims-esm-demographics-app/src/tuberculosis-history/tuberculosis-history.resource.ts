import { AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsTuberculosisHistoryData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  tbDateOfDiagnosis?: string;
  tbSites: string[];
  tbSiteOther?: string;
  attStartDate?: string;
  attCount?: string | number;
  attDuration?: string;
  tbClinicalNotes?: string;
}

export const initialAiimsTuberculosisHistoryData: Readonly<AiimsTuberculosisHistoryData> = Object.freeze({
  hasData: false,
  tbSites: [],
});

export function useTuberculosisHistory(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID
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
      tuberculosisHistoryData: initialAiimsTuberculosisHistoryData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const tbSites = getObsValues(CONCEPTS.tbSite);
  const tbDateOfDiagnosis = getOptionalObsValue(CONCEPTS.tbDateOfDiagnosis);
  const tbSiteOther = getOptionalObsValue(CONCEPTS.tbSiteOther);
  const attStartDate = getOptionalObsValue(CONCEPTS.attStartDate);
  const attCount = getOptionalObsValue(CONCEPTS.attCount);
  const attDuration = getOptionalObsValue(CONCEPTS.attDuration);
  const tbClinicalNotes = getOptionalObsValue(CONCEPTS.tbClinicalNotes);

  const hasData =
    tbSites.length > 0 ||
    !!tbDateOfDiagnosis ||
    !!tbSiteOther ||
    !!attStartDate ||
    attCount !== undefined ||
    !!attDuration ||
    !!tbClinicalNotes;

  const tuberculosisHistoryData: AiimsTuberculosisHistoryData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    tbDateOfDiagnosis,
    tbSites,
    tbSiteOther,
    attStartDate,
    attCount,
    attDuration,
    tbClinicalNotes,
  };

  return {
    tuberculosisHistoryData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
