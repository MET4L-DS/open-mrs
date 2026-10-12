import {
  AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsLabProcedureInseminationData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  methodOfInsemination: string[];
  timeOfInseminationInjection?: string;
  labProcedureInseminationRemarks?: string;
}

export const initialAiimsLabProcedureInseminationData: Readonly<AiimsLabProcedureInseminationData> =
  Object.freeze({
    hasData: false,
    methodOfInsemination: [],
  });

export function useLabProcedureInsemination(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_UUID
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
      labProcedureInseminationData: initialAiimsLabProcedureInseminationData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const methodOfInsemination = getObsValues(CONCEPTS.methodOfInsemination);
  const timeOfInseminationInjection = getOptionalObsValue(
    CONCEPTS.timeOfInseminationInjection
  );
  const labProcedureInseminationRemarks = getOptionalObsValue(
    CONCEPTS.labProcedureInseminationRemarks
  );

  const hasData =
    methodOfInsemination.length > 0 ||
    timeOfInseminationInjection !== undefined ||
    labProcedureInseminationRemarks !== undefined;

  const labProcedureInseminationData: AiimsLabProcedureInseminationData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    methodOfInsemination,
    timeOfInseminationInjection,
    labProcedureInseminationRemarks,
  };

  return {
    labProcedureInseminationData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
