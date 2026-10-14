import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_FRESH_ET_DETAILS_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsFreshEtDetailsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  freshEmbryoTransfer?: string;
  reasonFreshEtNotDone?: string;
  otherReasonFreshEtNotDone?: string;
  numberFreshEmbryosTransferred?: string;
  gradeFreshEmbryosTransferred?: string;
  dayOfFreshEmbryoTransfer?: string;
  freshEtEndometrialThickness?: string;
  freshEtDifficulty?: string;
  bloodOnTipOfCatheter?: string;
  freshEtDate?: string;
  freshEtRemarks?: string;
}

export const initialAiimsFreshEtDetailsData: Readonly<AiimsFreshEtDetailsData> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
  });

export function useFreshEtDetails(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_FRESH_ET_DETAILS_FORM_UUID
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

  let data: AiimsFreshEtDetailsData = { ...initialAiimsFreshEtDetailsData };

  if (latestEncounter && encounterHasData) {
    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      freshEmbryoTransfer: getOptionalObsValue(CONCEPTS.freshEmbryoTransfer),
      reasonFreshEtNotDone: getOptionalObsValue(CONCEPTS.reasonFreshEtNotDone),
      otherReasonFreshEtNotDone: getOptionalObsValue(CONCEPTS.otherReasonFreshEtNotDone),
      numberFreshEmbryosTransferred: getOptionalObsValue(CONCEPTS.numberFreshEmbryosTransferred),
      gradeFreshEmbryosTransferred: getOptionalObsValue(CONCEPTS.gradeFreshEmbryosTransferred),
      dayOfFreshEmbryoTransfer: getOptionalObsValue(CONCEPTS.dayOfFreshEmbryoTransfer),
      freshEtEndometrialThickness: getOptionalObsValue(CONCEPTS.freshEtEndometrialThickness),
      freshEtDifficulty: getOptionalObsValue(CONCEPTS.freshEtDifficulty),
      bloodOnTipOfCatheter: getOptionalObsValue(CONCEPTS.bloodOnTipOfCatheter),
      freshEtDate: getOptionalObsValue(CONCEPTS.freshEtDate),
      freshEtRemarks: getOptionalObsValue(CONCEPTS.freshEtRemarks),
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
