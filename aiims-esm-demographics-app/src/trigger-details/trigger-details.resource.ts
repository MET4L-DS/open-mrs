import {
  AIIMS_TRIGGER_DETAILS_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsTriggerDetailsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  numberOfFollicles14to22mm?: number;
  numberOfFollicles16to22mm?: number;
  endometrialThicknessTriggerDay?: number;
  endometrialPatternTriggerDay?: string;
  estradiolTriggerDay?: number;
  progesteroneTriggerDay?: number;
  ovulationTrigger?: string;
  ovulationTriggerDose?: string;
  dateOfTrigger?: string;
  timeOfTrigger?: string;
  triggerDetailsRemarks?: string;
}

export const initialAiimsTriggerDetailsData: Readonly<AiimsTriggerDetailsData> =
  Object.freeze({
    hasData: false,
  });

export function useTriggerDetails(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_TRIGGER_DETAILS_FORM_UUID
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
      triggerDetailsData: initialAiimsTriggerDetailsData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const f14Str = getOptionalObsValue(CONCEPTS.numberOfFollicles14to22mm);
  const f16Str = getOptionalObsValue(CONCEPTS.numberOfFollicles16to22mm);
  const etStr = getOptionalObsValue(CONCEPTS.endometrialThicknessTriggerDay);
  const e2Str = getOptionalObsValue(CONCEPTS.estradiolTriggerDay);
  const p4Str = getOptionalObsValue(CONCEPTS.progesteroneTriggerDay);

  const numberOfFollicles14to22mm = f14Str !== undefined ? parseFloat(f14Str) : undefined;
  const numberOfFollicles16to22mm = f16Str !== undefined ? parseFloat(f16Str) : undefined;
  const endometrialThicknessTriggerDay = etStr !== undefined ? parseFloat(etStr) : undefined;
  const estradiolTriggerDay = e2Str !== undefined ? parseFloat(e2Str) : undefined;
  const progesteroneTriggerDay = p4Str !== undefined ? parseFloat(p4Str) : undefined;

  const endometrialPatternTriggerDay = getOptionalObsValue(
    CONCEPTS.endometrialPatternTriggerDay
  );
  const ovulationTrigger = getOptionalObsValue(CONCEPTS.ovulationTrigger);
  const ovulationTriggerDose = getOptionalObsValue(CONCEPTS.ovulationTriggerDose);
  const dateOfTrigger = getOptionalObsValue(CONCEPTS.dateOfTrigger);
  const timeOfTrigger = getOptionalObsValue(CONCEPTS.timeOfTrigger);
  const triggerDetailsRemarks = getOptionalObsValue(CONCEPTS.triggerDetailsRemarks);

  const hasData =
    numberOfFollicles14to22mm !== undefined ||
    numberOfFollicles16to22mm !== undefined ||
    endometrialThicknessTriggerDay !== undefined ||
    endometrialPatternTriggerDay !== undefined ||
    estradiolTriggerDay !== undefined ||
    progesteroneTriggerDay !== undefined ||
    ovulationTrigger !== undefined ||
    ovulationTriggerDose !== undefined ||
    dateOfTrigger !== undefined ||
    timeOfTrigger !== undefined ||
    triggerDetailsRemarks !== undefined;

  const triggerDetailsData: AiimsTriggerDetailsData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    numberOfFollicles14to22mm,
    numberOfFollicles16to22mm,
    endometrialThicknessTriggerDay,
    endometrialPatternTriggerDay,
    estradiolTriggerDay,
    progesteroneTriggerDay,
    ovulationTrigger,
    ovulationTriggerDose,
    dateOfTrigger,
    timeOfTrigger,
    triggerDetailsRemarks,
  };

  return {
    triggerDetailsData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
