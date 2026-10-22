import {
  AIIMS_DOSE_OF_DRUGS_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsDoseOfDrugsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  totalDaysOfLeuprolideDownregulation?: string;
  startingDoseFsh?: string;
  startingDoseHmg?: string;
  startingDoseRlh?: string;
  totalDoseFsh?: string;
  totalDoseHmg?: string;
  totalDoseRlh?: string;
  totalCetrotideDose?: string;
  dayOfStartOfCetrotide?: string;
  totalDaysOfStimulation?: string;
}

export const initialAiimsDoseOfDrugsData: Readonly<AiimsDoseOfDrugsData> =
  Object.freeze({
    hasData: false,
  });

export function useDoseOfDrugs(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_DOSE_OF_DRUGS_FORM_UUID
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
      doseOfDrugsData: initialAiimsDoseOfDrugsData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const totalDaysOfLeuprolideDownregulation = getOptionalObsValue(CONCEPTS.totalDaysOfLeuprolideDownregulation);
  const startingDoseFsh = getOptionalObsValue(CONCEPTS.startingDoseFsh);
  const startingDoseHmg = getOptionalObsValue(CONCEPTS.startingDoseHmg);
  const startingDoseRlh = getOptionalObsValue(CONCEPTS.startingDoseRlh);
  const totalDoseFsh = getOptionalObsValue(CONCEPTS.totalDoseFsh);
  const totalDoseHmg = getOptionalObsValue(CONCEPTS.totalDoseHmg);
  const totalDoseRlh = getOptionalObsValue(CONCEPTS.totalDoseRlh);
  const totalCetrotideDose = getOptionalObsValue(CONCEPTS.totalCetrotideDose);
  const dayOfStartOfCetrotide = getOptionalObsValue(CONCEPTS.dayOfStartOfCetrotide);
  const totalDaysOfStimulation = getOptionalObsValue(CONCEPTS.totalDaysOfStimulation);

  const hasData =
    totalDaysOfLeuprolideDownregulation !== undefined ||
    startingDoseFsh !== undefined ||
    startingDoseHmg !== undefined ||
    startingDoseRlh !== undefined ||
    totalDoseFsh !== undefined ||
    totalDoseHmg !== undefined ||
    totalDoseRlh !== undefined ||
    totalCetrotideDose !== undefined ||
    dayOfStartOfCetrotide !== undefined ||
    totalDaysOfStimulation !== undefined;

  const doseOfDrugsData: AiimsDoseOfDrugsData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    totalDaysOfLeuprolideDownregulation,
    startingDoseFsh,
    startingDoseHmg,
    startingDoseRlh,
    totalDoseFsh,
    totalDoseHmg,
    totalDoseRlh,
    totalCetrotideDose,
    dayOfStartOfCetrotide,
    totalDaysOfStimulation,
  };

  return {
    doseOfDrugsData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
