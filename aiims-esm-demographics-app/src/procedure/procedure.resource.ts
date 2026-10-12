import {
  AIIMS_PROCEDURE_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsProcedureData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  spermRetrievalProcedure: string[];
  additionalIvfProcedures: string[];
  procedureRemarks?: string;
}

export const initialAiimsProcedureData: Readonly<AiimsProcedureData> =
  Object.freeze({
    hasData: false,
    spermRetrievalProcedure: [],
    additionalIvfProcedures: [],
  });

export function useProcedure(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_PROCEDURE_FORM_UUID
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
      procedureData: initialAiimsProcedureData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const spermRetrievalProcedure = getObsValues(CONCEPTS.spermRetrievalProcedure);
  const additionalIvfProcedures = getObsValues(CONCEPTS.additionalIvfProcedures);
  const procedureRemarks = getOptionalObsValue(CONCEPTS.procedureRemarks);

  const hasData =
    spermRetrievalProcedure.length > 0 ||
    additionalIvfProcedures.length > 0 ||
    procedureRemarks !== undefined;

  const procedureData: AiimsProcedureData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    spermRetrievalProcedure,
    additionalIvfProcedures,
    procedureRemarks,
  };

  return {
    procedureData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
