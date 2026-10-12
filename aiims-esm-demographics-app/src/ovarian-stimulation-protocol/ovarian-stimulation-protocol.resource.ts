import {
  AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsOvarianStimulationProtocolData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  protocol?: string;
  remarks?: string;
}

export const initialAiimsOvarianStimulationProtocolData: Readonly<AiimsOvarianStimulationProtocolData> =
  Object.freeze({
    hasData: false,
  });

export function useOvarianStimulationProtocol(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_UUID
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
      protocolData: initialAiimsOvarianStimulationProtocolData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const protocol = getOptionalObsValue(CONCEPTS.ovarianStimulationProtocol);
  const remarks = getOptionalObsValue(CONCEPTS.ovarianStimulationProtocolRemarks);

  const hasData = protocol !== undefined || remarks !== undefined;

  const protocolData: AiimsOvarianStimulationProtocolData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    protocol,
    remarks,
  };

  return {
    protocolData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
