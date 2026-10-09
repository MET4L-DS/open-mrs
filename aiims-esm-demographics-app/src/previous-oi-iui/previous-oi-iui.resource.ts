import { AIIMS_PREV_OI_IUI_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsPreviousOiIuiData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  prevOi?: string;
  oiDrugs: string[];
  oiDose?: string;
  oiCycles?: string;
  oiYear?: string;
  prevOiIui?: string;
  iuiDrugs: string[];
  iuiDose?: string;
  iuiCycles?: string;
  iuiYear?: string;
  failedIvf?: string;
  failedIvfCycles?: string;
  prevIvfDetailsDate?: string;
  prevIvfDetails?: string;
  previousArtNotes?: string;
}

export const initialAiimsPreviousOiIuiData: Readonly<AiimsPreviousOiIuiData> = Object.freeze({
  hasData: false,
  oiDrugs: [],
  iuiDrugs: [],
});

export function usePreviousOiIui(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_PREV_OI_IUI_FORM_UUID
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
      previousOiIuiData: initialAiimsPreviousOiIuiData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const previousOiIuiData: AiimsPreviousOiIuiData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    prevOi: getOptionalObsValue(CONCEPTS.prevOi),
    oiDrugs: getObsValues(CONCEPTS.oiDrugs),
    oiDose: getOptionalObsValue(CONCEPTS.oiDose),
    oiCycles: getOptionalObsValue(CONCEPTS.oiCycles),
    oiYear: getOptionalObsValue(CONCEPTS.oiYear),
    prevOiIui: getOptionalObsValue(CONCEPTS.prevOiIui),
    iuiDrugs: getObsValues(CONCEPTS.iuiDrugs),
    iuiDose: getOptionalObsValue(CONCEPTS.iuiDose),
    iuiCycles: getOptionalObsValue(CONCEPTS.iuiCycles),
    iuiYear: getOptionalObsValue(CONCEPTS.iuiYear),
    failedIvf: getOptionalObsValue(CONCEPTS.failedIvf),
    failedIvfCycles: getOptionalObsValue(CONCEPTS.failedIvfCycles),
    prevIvfDetailsDate: getOptionalObsValue(CONCEPTS.prevIvfDetailsDate),
    prevIvfDetails: getOptionalObsValue(CONCEPTS.prevIvfDetails),
    previousArtNotes: getOptionalObsValue(CONCEPTS.previousArtNotes),
  };

  return {
    previousOiIuiData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
