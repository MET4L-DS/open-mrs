import {
  AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsInvestigationMaleSemenData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  semenVolume?: number;
  semenCount?: number;
  semenMotilityFinding: string[];
  semenMotilityTotalProgressive?: string;
  spermMorphology?: string;
  investigationMaleSemenRemarks?: string;
}

export const initialAiimsInvestigationMaleSemenData: Readonly<AiimsInvestigationMaleSemenData> =
  Object.freeze({
    hasData: false,
    semenMotilityFinding: [],
  });

export function useInvestigationMaleSemen(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID
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
      maleSemenData: initialAiimsInvestigationMaleSemenData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const volumeStr = getOptionalObsValue(CONCEPTS.semenVolume);
  const countStr = getOptionalObsValue(CONCEPTS.semenCount);
  const semenVolume = volumeStr !== undefined ? parseFloat(volumeStr) : undefined;
  const semenCount = countStr !== undefined ? parseFloat(countStr) : undefined;

  const semenMotilityFinding = getObsValues(CONCEPTS.semenMotilityFinding);
  const semenMotilityTotalProgressive = getOptionalObsValue(
    CONCEPTS.semenMotilityTotalProgressive
  );
  const spermMorphology = getOptionalObsValue(CONCEPTS.spermMorphology);
  const investigationMaleSemenRemarks = getOptionalObsValue(
    CONCEPTS.investigationMaleSemenRemarks
  );

  const hasData =
    semenVolume !== undefined ||
    semenCount !== undefined ||
    semenMotilityFinding.length > 0 ||
    semenMotilityTotalProgressive !== undefined ||
    spermMorphology !== undefined ||
    investigationMaleSemenRemarks !== undefined;

  const maleSemenData: AiimsInvestigationMaleSemenData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    semenVolume,
    semenCount,
    semenMotilityFinding,
    semenMotilityTotalProgressive,
    spermMorphology,
    investigationMaleSemenRemarks,
  };

  return {
    maleSemenData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
