import { AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsInvestigationUltrasoundData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  totalAntralFollicleCount?: string | number;
  volumeRightOvary?: string | number;
  volumeLeftOvary?: string | number;
  ultrasoundRemarks?: string;
}

export const initialAiimsInvestigationUltrasoundData: Readonly<AiimsInvestigationUltrasoundData> = Object.freeze({
  hasData: false,
});

export function useInvestigationUltrasound(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID
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
      investigationUltrasoundData: initialAiimsInvestigationUltrasoundData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const totalAntralFollicleCount = getOptionalObsValue(CONCEPTS.totalAntralFollicleCount);
  const volumeRightOvary = getOptionalObsValue(CONCEPTS.volumeRightOvary);
  const volumeLeftOvary = getOptionalObsValue(CONCEPTS.volumeLeftOvary);
  const ultrasoundRemarks = getOptionalObsValue(CONCEPTS.ultrasoundRemarks);

  const hasData =
    totalAntralFollicleCount !== undefined ||
    volumeRightOvary !== undefined ||
    volumeLeftOvary !== undefined ||
    !!ultrasoundRemarks;

  const investigationUltrasoundData: AiimsInvestigationUltrasoundData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    totalAntralFollicleCount,
    volumeRightOvary,
    volumeLeftOvary,
    ultrasoundRemarks,
  };

  return {
    investigationUltrasoundData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
