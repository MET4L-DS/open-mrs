import { AIIMS_MENSTRUAL_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsMenstrualHistoryData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  patternOfMenstrualCycle?: string;
  irregularCycleType?: string;
  lastMenstrualPeriod?: string;
  flowOfMenstrualCycle?: string;
  amenorrhoeaType?: string;
}

export const initialAiimsMenstrualHistoryData: Readonly<AiimsMenstrualHistoryData> = Object.freeze({
  hasData: false,
});

export function useMenstrualHistory(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_MENSTRUAL_FORM_UUID
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
      menstrualData: initialAiimsMenstrualHistoryData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const menstrualData: AiimsMenstrualHistoryData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    patternOfMenstrualCycle: getOptionalObsValue(CONCEPTS.patternOfMenstrualCycle),
    irregularCycleType: getOptionalObsValue(CONCEPTS.irregularCycleType),
    lastMenstrualPeriod: getOptionalObsValue(CONCEPTS.lastMenstrualPeriod),
    flowOfMenstrualCycle: getOptionalObsValue(CONCEPTS.flowOfMenstrualCycle),
    amenorrhoeaType: getOptionalObsValue(CONCEPTS.amenorrhoeaType),
  };

  return {
    menstrualData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}

