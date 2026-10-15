import { CONCEPTS } from '../config/concepts';
import {
  AIIMS_POST_IVF_INVESTIGATION_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsPostIvfInvestigationData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  uptResult?: string;
  betaHcg?: number;
  scan6To7Weeks?: string;
  postIvfOutcome?: string;
  postIvfComplications?: string;
  otherPregnancyComplications?: string;
  modeOfDelivery?: string;
  pogAtDelivery?: number;
}

export const initialAiimsPostIvfInvestigationData: Readonly<AiimsPostIvfInvestigationData> =
  Object.freeze({
    hasData: false,
  });

export function usePostIvfInvestigation(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_POST_IVF_INVESTIGATION_FORM_UUID
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

  let data: AiimsPostIvfInvestigationData = { ...initialAiimsPostIvfInvestigationData };

  if (latestEncounter && encounterHasData) {
    const upt = getOptionalObsValue(CONCEPTS.uptResult);
    const beta = getOptionalObsValue(CONCEPTS.betaHcg);
    const scan = getOptionalObsValue(CONCEPTS.scan6To7Weeks);
    const outcome = getOptionalObsValue(CONCEPTS.postIvfOutcome);
    const complications = getOptionalObsValue(CONCEPTS.postIvfComplications);
    const otherComplications = getOptionalObsValue(CONCEPTS.otherPregnancyComplications);
    const delivery = getOptionalObsValue(CONCEPTS.modeOfDelivery);
    const pog = getOptionalObsValue(CONCEPTS.pogAtDelivery);

    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
      uptResult: upt ? String(upt) : undefined,
      betaHcg: typeof beta === 'number' ? beta : beta ? parseFloat(String(beta)) : undefined,
      scan6To7Weeks: scan ? String(scan) : undefined,
      postIvfOutcome: outcome ? String(outcome) : undefined,
      postIvfComplications: complications ? String(complications) : undefined,
      otherPregnancyComplications: otherComplications ? String(otherComplications) : undefined,
      modeOfDelivery: delivery ? String(delivery) : undefined,
      pogAtDelivery: typeof pog === 'number' ? pog : pog ? parseFloat(String(pog)) : undefined,
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
