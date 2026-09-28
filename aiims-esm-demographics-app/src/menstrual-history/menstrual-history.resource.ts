import { AIIMS_MENSTRUAL_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';

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

export function useMenstrualHistory(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_MENSTRUAL_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  if (!latestEncounter) {
    const menstrualData: AiimsMenstrualHistoryData = {
      hasData: false,
    };

    return {
      menstrualData,
      latestEncounter: null,
      isLoading,
      error,
      mutate,
    };
  }

  const menstrualData: AiimsMenstrualHistoryData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    patternOfMenstrualCycle: getObsValue(CONCEPTS.patternOfMenstrualCycle),
    irregularCycleType: getObsValue(CONCEPTS.irregularCycleType),
    lastMenstrualPeriod: getObsValue(CONCEPTS.lastMenstrualPeriod),
    flowOfMenstrualCycle: getObsValue(CONCEPTS.flowOfMenstrualCycle),
    amenorrhoeaType: getObsValue(CONCEPTS.amenorrhoeaType),
  };

  return {
    menstrualData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
