import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_ADD_PROCEDURE_ART_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsAddProcedureArtData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  additionalProceduresArt: string[];
  dateOfAdditionalArtProcedure?: string;
  additionalArtRemarks?: string;
}

export const initialAiimsAddProcedureArtData: Readonly<AiimsAddProcedureArtData> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
    additionalProceduresArt: [],
  });

export function useAddProcedureArt(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_ADD_PROCEDURE_ART_FORM_UUID
) {
  const {
    latestEncounter,
    encounters,
    hasData: encounterHasData,
    isLoading,
    error,
    mutate,
    getObsValues,
    getOptionalObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  let data: AiimsAddProcedureArtData = { ...initialAiimsAddProcedureArtData };

  if (latestEncounter && encounterHasData) {
    const additionalProceduresArt = getObsValues(CONCEPTS.additionalProceduresArt);
    const dateOfAdditionalArtProcedure = getOptionalObsValue(CONCEPTS.dateOfAdditionalArtProcedure);
    const additionalArtRemarks = getOptionalObsValue(CONCEPTS.additionalArtRemarks);

    data = {
      hasData:
        additionalProceduresArt.length > 0 ||
        Boolean(dateOfAdditionalArtProcedure) ||
        Boolean(additionalArtRemarks),
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      additionalProceduresArt,
      dateOfAdditionalArtProcedure,
      additionalArtRemarks,
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
