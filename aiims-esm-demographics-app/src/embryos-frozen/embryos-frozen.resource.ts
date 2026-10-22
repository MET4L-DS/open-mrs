import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_EMBRYOS_FROZEN_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsEmbryosFrozenData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  numberDay3EmbryosVitrified?: string;
  gradeAEmbryosVitrified?: string;
  gradeBEmbryosVitrified?: string;
  gradeCEmbryosVitrified?: string;
  numberDay5EmbryosVitrified?: string;
  gradeDay5EmbryosVitrified?: string;
}

export const initialAiimsEmbryosFrozenData: Readonly<AiimsEmbryosFrozenData> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
  });

export function useEmbryosFrozen(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_EMBRYOS_FROZEN_FORM_UUID
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

  let data: AiimsEmbryosFrozenData = { ...initialAiimsEmbryosFrozenData };

  if (latestEncounter && encounterHasData) {
    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      numberDay3EmbryosVitrified: getOptionalObsValue(CONCEPTS.numberDay3EmbryosVitrified),
      gradeAEmbryosVitrified: getOptionalObsValue(CONCEPTS.gradeAEmbryosVitrified),
      gradeBEmbryosVitrified: getOptionalObsValue(CONCEPTS.gradeBEmbryosVitrified),
      gradeCEmbryosVitrified: getOptionalObsValue(CONCEPTS.gradeCEmbryosVitrified),
      numberDay5EmbryosVitrified: getOptionalObsValue(CONCEPTS.numberDay5EmbryosVitrified),
      gradeDay5EmbryosVitrified: getOptionalObsValue(CONCEPTS.gradeDay5EmbryosVitrified),
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
