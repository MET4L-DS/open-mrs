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
  semenSampleType: string[];
}

export const initialAiimsLabProcedureInseminationData: Readonly<AiimsLabProcedureInseminationData> =
  Object.freeze({
    hasData: false,
    methodOfInsemination: [],
    semenSampleType: [],
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
  const semenSampleType = getObsValues(CONCEPTS.semenSampleType);

  const hasData =
    methodOfInsemination.length > 0 ||
    timeOfInseminationInjection !== undefined ||
    semenSampleType.length > 0;

  const labProcedureInseminationData: AiimsLabProcedureInseminationData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    methodOfInsemination,
    timeOfInseminationInjection,
    semenSampleType,
  };

  return {
    labProcedureInseminationData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
