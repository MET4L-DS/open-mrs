import { AIIMS_PROCEDURE_EMBRYO_TRANSFER_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsProcedureEmbryoTransferData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  mockEmbryoTransfer?: string;
  mockEmbryoTransferSpeculum?: string;
  embryoTransferCervicalCanalDirection?: string;
  procedureEmbryoTransferRemarks?: string;
}

export const initialAiimsProcedureEmbryoTransferData: Readonly<AiimsProcedureEmbryoTransferData> = Object.freeze({
  hasData: false,
});

export function useProcedureEmbryoTransfer(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_PROCEDURE_EMBRYO_TRANSFER_FORM_UUID
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
      procedureEmbryoTransferData: initialAiimsProcedureEmbryoTransferData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const mockEmbryoTransfer = getOptionalObsValue(CONCEPTS.mockEmbryoTransfer);
  const mockEmbryoTransferSpeculum = getOptionalObsValue(CONCEPTS.mockEmbryoTransferSpeculum);
  const embryoTransferCervicalCanalDirection = getOptionalObsValue(
    CONCEPTS.embryoTransferCervicalCanalDirection
  );
  const procedureEmbryoTransferRemarks = getOptionalObsValue(
    CONCEPTS.procedureEmbryoTransferRemarks
  );

  const hasData =
    mockEmbryoTransfer !== undefined ||
    mockEmbryoTransferSpeculum !== undefined ||
    embryoTransferCervicalCanalDirection !== undefined ||
    procedureEmbryoTransferRemarks !== undefined;

  const procedureEmbryoTransferData: AiimsProcedureEmbryoTransferData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    mockEmbryoTransfer,
    mockEmbryoTransferSpeculum,
    embryoTransferCervicalCanalDirection,
    procedureEmbryoTransferRemarks,
  };

  return {
    procedureEmbryoTransferData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
