import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_EMBRYOS_CLEAVAGE_DETAILS_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';

export interface AiimsEmbryosCleavageDetailsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  embryosCleavedDay2?: string;
  cleavageRate?: string;
  embryosCleavedDay3?: string;
  embryosCleavedDay5?: string;
}

export const initialAiimsEmbryosCleavageDetailsData: Readonly<AiimsEmbryosCleavageDetailsData> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
  });

export function useEmbryosCleavageDetails(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_EMBRYOS_CLEAVAGE_DETAILS_FORM_UUID
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

  let data: AiimsEmbryosCleavageDetailsData = { ...initialAiimsEmbryosCleavageDetailsData };

  if (latestEncounter && encounterHasData) {
    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      embryosCleavedDay2: getOptionalObsValue(CONCEPTS.embryosCleavedDay2),
      cleavageRate: getOptionalObsValue(CONCEPTS.cleavageRate),
      embryosCleavedDay3: getOptionalObsValue(CONCEPTS.embryosCleavedDay3),
      embryosCleavedDay5: getOptionalObsValue(CONCEPTS.embryosCleavedDay5),
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
