import {
  AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID,
  CONCEPTS,
} from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface AiimsOvumPickUpDetailsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  dateOfOvumPickUp?: string;
  timeOfOvumPickUp?: string;
  intervalTriggerOvumPickup?: string;
  numberOfOocytesRetrieved?: number;
  numberOfOocytesRetrievedComments?: string;
  fortFollicularOutputRate?: number;
  follicleToOocyteIndex?: number;
  oocyteCumulusComplexGrade1?: number;
  oocyteCumulusComplexGrade2?: number;
  oocyteCumulusComplexGrade3?: number;
  metaphase2?: number;
  metaphase1?: number;
  germinalVesicle?: number;
  abnormalOocytesNumber?: number;
  abnormalOocytes: string[];
}

export const initialAiimsOvumPickUpDetailsData: Readonly<AiimsOvumPickUpDetailsData> =
  Object.freeze({
    hasData: false,
    abnormalOocytes: [],
  });

export function useOvumPickUpDetails(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID
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
      ovumPickUpDetailsData: initialAiimsOvumPickUpDetailsData,
      latestEncounter: null as EncounterItem | null,
      isLoading,
      error,
      mutate,
    };
  }

  const dateOfOvumPickUp = getOptionalObsValue(CONCEPTS.dateOfOvumPickUp);
  const timeOfOvumPickUp = getOptionalObsValue(CONCEPTS.timeOfOvumPickUp);
  const intervalTriggerOvumPickup = getOptionalObsValue(
    CONCEPTS.intervalTriggerOvumPickup
  );

  const numOocytesStr = getOptionalObsValue(CONCEPTS.numberOfOocytesRetrieved);
  const numberOfOocytesRetrieved =
    numOocytesStr !== undefined ? parseFloat(numOocytesStr) : undefined;

  const numberOfOocytesRetrievedComments = getOptionalObsValue(
    CONCEPTS.numberOfOocytesRetrievedComments
  );

  const fortStr = getOptionalObsValue(CONCEPTS.fortFollicularOutputRate);
  const fortFollicularOutputRate =
    fortStr !== undefined ? parseFloat(fortStr) : undefined;

  const foiStr = getOptionalObsValue(CONCEPTS.follicleToOocyteIndex);
  const follicleToOocyteIndex =
    foiStr !== undefined ? parseFloat(foiStr) : undefined;

  const occ1Str = getOptionalObsValue(CONCEPTS.oocyteCumulusComplexGrade1);
  const oocyteCumulusComplexGrade1 =
    occ1Str !== undefined ? parseFloat(occ1Str) : undefined;

  const occ2Str = getOptionalObsValue(CONCEPTS.oocyteCumulusComplexGrade2);
  const oocyteCumulusComplexGrade2 =
    occ2Str !== undefined ? parseFloat(occ2Str) : undefined;

  const occ3Str = getOptionalObsValue(CONCEPTS.oocyteCumulusComplexGrade3);
  const oocyteCumulusComplexGrade3 =
    occ3Str !== undefined ? parseFloat(occ3Str) : undefined;

  const m2Str = getOptionalObsValue(CONCEPTS.metaphase2);
  const metaphase2 = m2Str !== undefined ? parseFloat(m2Str) : undefined;

  const m1Str = getOptionalObsValue(CONCEPTS.metaphase1);
  const metaphase1 = m1Str !== undefined ? parseFloat(m1Str) : undefined;

  const gvStr = getOptionalObsValue(CONCEPTS.germinalVesicle);
  const germinalVesicle = gvStr !== undefined ? parseFloat(gvStr) : undefined;

  const abNumStr = getOptionalObsValue(CONCEPTS.abnormalOocytesNumber);
  const abnormalOocytesNumber =
    abNumStr !== undefined ? parseFloat(abNumStr) : undefined;

  const abnormalOocytes = getObsValues(CONCEPTS.abnormalOocytes);

  const hasData =
    dateOfOvumPickUp !== undefined ||
    timeOfOvumPickUp !== undefined ||
    intervalTriggerOvumPickup !== undefined ||
    numberOfOocytesRetrieved !== undefined ||
    numberOfOocytesRetrievedComments !== undefined ||
    fortFollicularOutputRate !== undefined ||
    follicleToOocyteIndex !== undefined ||
    oocyteCumulusComplexGrade1 !== undefined ||
    oocyteCumulusComplexGrade2 !== undefined ||
    oocyteCumulusComplexGrade3 !== undefined ||
    metaphase2 !== undefined ||
    metaphase1 !== undefined ||
    germinalVesicle !== undefined ||
    abnormalOocytesNumber !== undefined ||
    abnormalOocytes.length > 0;

  const ovumPickUpDetailsData: AiimsOvumPickUpDetailsData = {
    hasData,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    dateOfOvumPickUp,
    timeOfOvumPickUp,
    intervalTriggerOvumPickup,
    numberOfOocytesRetrieved,
    numberOfOocytesRetrievedComments,
    fortFollicularOutputRate,
    follicleToOocyteIndex,
    oocyteCumulusComplexGrade1,
    oocyteCumulusComplexGrade2,
    oocyteCumulusComplexGrade3,
    metaphase2,
    metaphase1,
    germinalVesicle,
    abnormalOocytesNumber,
    abnormalOocytes,
  };

  return {
    ovumPickUpDetailsData,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
