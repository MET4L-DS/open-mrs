import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_FERTILISATION_DETAILS_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsFertilisationDetailsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  numberOocytesFertilised?: string;
  fertilisationRate?: string;
  embryosCleavedDay2?: string;
  cleavageRate?: string;
  embryosCleavedDay3?: string;
  embryosCleavedDay5?: string;
  fertilisationDetailsRemarks?: string;
}

export const initialAiimsFertilisationDetailsData: Readonly<AiimsFertilisationDetailsData> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
  });

export function useFertilisationDetails(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_FERTILISATION_DETAILS_FORM_UUID
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

  let data: AiimsFertilisationDetailsData = { ...initialAiimsFertilisationDetailsData };

  if (latestEncounter && encounterHasData) {
    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      numberOocytesFertilised: getOptionalObsValue(CONCEPTS.numberOocytesFertilised),
      fertilisationRate: getOptionalObsValue(CONCEPTS.fertilisationRate),
      embryosCleavedDay2: getOptionalObsValue(CONCEPTS.embryosCleavedDay2),
      cleavageRate: getOptionalObsValue(CONCEPTS.cleavageRate),
      embryosCleavedDay3: getOptionalObsValue(CONCEPTS.embryosCleavedDay3),
      embryosCleavedDay5: getOptionalObsValue(CONCEPTS.embryosCleavedDay5),
      fertilisationDetailsRemarks: getOptionalObsValue(CONCEPTS.fertilisationDetailsRemarks),
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
