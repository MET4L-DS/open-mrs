import { AIIMS_FORM_UUID, CONCEPTS } from '../constants';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import { getPatientAge, getPatientPhoneNumber } from '../shared/utils/patient-attributes';
import type { PatientResource } from '../shared/types';

export interface AiimsDemographicsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  consultantUnit?: string;
  consultantName?: string;
  patientAge?: string;
  patientPhone?: string;
  wifeEducation?: string;
  wifeOccupation?: string;
  husbandName?: string;
  husbandAge?: string;
  husbandBmi?: string;
  husbandPhone?: string;
  husbandEducation?: string;
  husbandOccupation?: string;
  socioeconomicStatus?: string;
}

export function useAiimsDemographics(
  patientUuid: string | undefined,
  patientObj?: PatientResource | null,
  formUuid: string = AIIMS_FORM_UUID
) {
  const {
    latestEncounter,
    isLoading,
    error,
    mutate,
    getObsValue,
    getObsValues,
  } = useFormEncounter(patientUuid, formUuid);

  const fallbackAge = getPatientAge(patientObj);
  const fallbackPhone = getPatientPhoneNumber(patientObj);

  if (!latestEncounter) {
    const demographics: AiimsDemographicsData = {
      hasData: false,
      patientAge: fallbackAge,
      patientPhone: fallbackPhone,
    };

    return {
      demographics,
      latestEncounter: null,
      isLoading,
      error,
      mutate,
    };
  }

  // Retrieve education using distinct concepts (husband: c0010001-..-13, wife: 1712AAAA..)
  // with fallback to legacy duplicate concept array for historical records
  const husbandEducationObs = getObsValue(CONCEPTS.educationHusband);
  const wifeEducationObs = getObsValue(CONCEPTS.educationWife);
  const educationObsList = getObsValues(CONCEPTS.educationLevel);
  const wifeEducation = wifeEducationObs || (educationObsList.length > 0 ? educationObsList[0] : '');
  const husbandEducation =
    husbandEducationObs ||
    (educationObsList.length > 1 && educationObsList[1] !== wifeEducation ? educationObsList[1] : '');

  const demographics: AiimsDemographicsData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    consultantUnit: getObsValue(CONCEPTS.consultantUnit),
    consultantName: getObsValue(CONCEPTS.consultantName),
    patientAge: getObsValue(CONCEPTS.patientAge) || fallbackAge,
    patientPhone: fallbackPhone,
    wifeEducation,
    wifeOccupation: getObsValue(CONCEPTS.occupationWife),
    husbandName: getObsValue(CONCEPTS.husbandName),
    husbandAge: getObsValue(CONCEPTS.husbandAge),
    husbandBmi: getObsValue(CONCEPTS.husbandBmi),
    husbandPhone: getObsValue(CONCEPTS.husbandPhone),
    husbandEducation,
    husbandOccupation: getObsValue(CONCEPTS.occupationHusband),
    socioeconomicStatus: getObsValue(CONCEPTS.socioeconomicStatus),
  };

  return {
    demographics,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
