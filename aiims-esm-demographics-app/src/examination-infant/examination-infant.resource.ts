import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_EXAMINATION_INFANT_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsExaminationInfantData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  sexOfBaby?: string;
  weightOfBaby?: number;
  apgarScore?: number;
}

export const initialAiimsExaminationInfantData: Readonly<AiimsExaminationInfantData> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
  });

export function useExaminationInfant(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_EXAMINATION_INFANT_FORM_UUID
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

  let data: AiimsExaminationInfantData = { ...initialAiimsExaminationInfantData };

  if (latestEncounter && encounterHasData) {
    const sexOfBaby = getOptionalObsValue(CONCEPTS.sexOfBaby);
    const weightOfBaby = getOptionalObsValue(CONCEPTS.weightOfBaby);
    const apgarScore = getOptionalObsValue(CONCEPTS.apgarScore);

    const hasAnyObs = Boolean(sexOfBaby || weightOfBaby !== undefined || apgarScore !== undefined);

    data = {
      hasData: hasAnyObs,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      sexOfBaby: sexOfBaby ? String(sexOfBaby) : undefined,
      weightOfBaby: weightOfBaby !== undefined && weightOfBaby !== '' ? Number(weightOfBaby) : undefined,
      apgarScore: apgarScore !== undefined && apgarScore !== '' ? Number(apgarScore) : undefined,
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
