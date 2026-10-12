import {
  AIIMS_ADJUVANT_DRUG_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsAdjuvantDrugData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  growthHormone?: string;
  growthHormoneDose?: string;
  growthHormoneDuration?: string;
  remarks?: string;
}

export const initialAiimsAdjuvantDrugData: Readonly<AiimsAdjuvantDrugData> =
  Object.freeze({
    hasData: false,
  });

export function useAdjuvantDrug(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_ADJUVANT_DRUG_FORM_UUID
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
      adjuvantDrugData: initialAiimsAdjuvantDrugData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const growthHormone = getOptionalObsValue(CONCEPTS.growthHormone);
  const growthHormoneDose = getOptionalObsValue(CONCEPTS.growthHormoneDose);
  const growthHormoneDuration = getOptionalObsValue(CONCEPTS.growthHormoneDuration);
  const remarks = getOptionalObsValue(CONCEPTS.adjuvantDrugRemarks);

  const hasData =
    growthHormone !== undefined ||
    growthHormoneDose !== undefined ||
    growthHormoneDuration !== undefined ||
    remarks !== undefined;

  const adjuvantDrugData: AiimsAdjuvantDrugData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    growthHormone,
    growthHormoneDose,
    growthHormoneDuration,
    remarks,
  };

  return {
    adjuvantDrugData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
