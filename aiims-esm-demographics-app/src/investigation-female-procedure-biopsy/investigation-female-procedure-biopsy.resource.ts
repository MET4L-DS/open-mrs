import {
  AIIMS_INVESTIGATION_FEMALE_PROCEDURE_BIOPSY_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsInvestigationFemaleProcedureBiopsyData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  endometrialAspirationHistopathology: string[];
  endometrialAspirationPcr?: string;
  endometrialAspirationAfb?: string;
  investigationFemaleProcedureBiopsyRemarks?: string;
}

export const initialAiimsInvestigationFemaleProcedureBiopsyData: Readonly<AiimsInvestigationFemaleProcedureBiopsyData> =
  Object.freeze({
    hasData: false,
    endometrialAspirationHistopathology: [],
  });

export function useInvestigationFemaleProcedureBiopsy(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_INVESTIGATION_FEMALE_PROCEDURE_BIOPSY_FORM_UUID
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
      procedureBiopsyData: initialAiimsInvestigationFemaleProcedureBiopsyData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const endometrialAspirationHistopathology = getObsValues(
    CONCEPTS.endometrialAspirationHistopathology
  );
  const endometrialAspirationPcr = getOptionalObsValue(CONCEPTS.endometrialAspirationPcr);
  const endometrialAspirationAfb = getOptionalObsValue(CONCEPTS.endometrialAspirationAfb);
  const investigationFemaleProcedureBiopsyRemarks = getOptionalObsValue(
    CONCEPTS.investigationFemaleProcedureBiopsyRemarks
  );

  const hasData =
    endometrialAspirationHistopathology.length > 0 ||
    endometrialAspirationPcr !== undefined ||
    endometrialAspirationAfb !== undefined ||
    investigationFemaleProcedureBiopsyRemarks !== undefined;

  const procedureBiopsyData: AiimsInvestigationFemaleProcedureBiopsyData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    endometrialAspirationHistopathology,
    endometrialAspirationPcr,
    endometrialAspirationAfb,
    investigationFemaleProcedureBiopsyRemarks,
  };

  return {
    procedureBiopsyData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
