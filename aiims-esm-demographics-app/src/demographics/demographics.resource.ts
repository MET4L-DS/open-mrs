import useSWRImmutable from 'swr/immutable';
import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import { AIIMS_FORM_UUID, CONCEPTS, TELEPHONE_ATTRIBUTE_TYPE_UUID } from '../constants';

export interface ConceptDisplay {
  uuid: string;
  display: string;
}

export interface ObsItem {
  uuid: string;
  concept: ConceptDisplay;
  value: string | number | ConceptDisplay | { display?: string; name?: { display?: string } };
  obsDatetime: string;
}

export interface EncounterItem {
  uuid: string;
  encounterDatetime: string;
  form?: {
    uuid: string;
    name: string;
  };
  obs: ObsItem[];
}

export interface EncounterResponse {
  results: EncounterItem[];
}

export interface AiimsDemographicsData {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  consultantUnit?: string;
  consultantName?: string;
  patientAge?: number | string;
  patientPhone?: string;
  wifeEducation?: string;
  wifeOccupation?: string;
  husbandName?: string;
  husbandAge?: number | string;
  husbandBmi?: number | string;
  husbandPhone?: string;
  husbandEducation?: string;
  husbandOccupation?: string;
  socioeconomicStatus?: string;
}

export function formatObsValue(val: unknown): string {
  if (val === null || val === undefined) {
    return '';
  }
  if (typeof val === 'object' && val !== null) {
    const obj = val as Record<string, unknown>;
    if (typeof obj.display === 'string' && obj.display.length > 0) {
      return obj.display;
    }
    if (typeof obj.name === 'string' && obj.name.length > 0) {
      return obj.name;
    }
    if (typeof obj.name === 'object' && obj.name !== null) {
      const nameObj = obj.name as Record<string, unknown>;
      if (typeof nameObj.display === 'string') {
        return nameObj.display;
      }
    }
  }
  return String(val);
}

export function useAiimsDemographics(patientUuid: string | undefined, patientObj?: any) {
  const url = patientUuid
    ? `${restBaseUrl}/encounter?patient=${patientUuid}&v=custom:(uuid,encounterDatetime,form:(uuid,name),obs:(uuid,concept:(uuid,display),value,obsDatetime))`
    : null;

  const { data, error, isLoading, mutate } = useSWRImmutable<{ data: EncounterResponse }>(
    url,
    openmrsFetch
  );

  const encounters = data?.data?.results ?? [];
  const aiimsEncounters = encounters
    .filter(e => e.form?.uuid === AIIMS_FORM_UUID)
    .sort((a, b) => new Date(b.encounterDatetime).getTime() - new Date(a.encounterDatetime).getTime());

  const latestEncounter = aiimsEncounters[0];

  if (!latestEncounter) {
    // Check if patient object has demographics from registration
    const phoneAttribute = patientObj?.person?.attributes?.find(
      (a: any) => a.attributeType?.uuid === TELEPHONE_ATTRIBUTE_TYPE_UUID
    );
    const demographics: AiimsDemographicsData = {
      hasData: false,
      patientAge: patientObj?.person?.age ?? '',
      patientPhone: phoneAttribute?.value ?? '',
    };

    return {
      demographics,
      latestEncounter: null,
      isLoading,
      error,
      mutate,
    };
  }

  const obsList = latestEncounter.obs ?? [];

  // Group obs by concept UUID
  const obsByConcept = new Map<string, ObsItem[]>();
  for (const o of obsList) {
    const list = obsByConcept.get(o.concept.uuid) ?? [];
    list.push(o);
    obsByConcept.set(o.concept.uuid, list);
  }

  const getSingleValue = (conceptUuid: string): string => {
    const list = obsByConcept.get(conceptUuid);
    if (!list || list.length === 0) return '';
    return formatObsValue(list[0].value);
  };

  // Handle duplicate concept 1712AAAA... (Education)
  const educationObsList = obsByConcept.get(CONCEPTS.educationLevel) ?? [];
  const wifeEducation = educationObsList.length > 0 ? formatObsValue(educationObsList[0].value) : '';
  const husbandEducation = educationObsList.length > 1 ? formatObsValue(educationObsList[1].value) : '';

  // Get patient phone attribute if not in encounter
  const phoneAttribute = patientObj?.person?.attributes?.find(
    (a: any) => a.attributeType?.uuid === TELEPHONE_ATTRIBUTE_TYPE_UUID
  );

  const demographics: AiimsDemographicsData = {
    hasData: true,
    encounterUuid: latestEncounter.uuid,
    encounterDatetime: latestEncounter.encounterDatetime,
    consultantUnit: getSingleValue(CONCEPTS.consultantUnit),
    consultantName: getSingleValue(CONCEPTS.consultantName),
    patientAge: getSingleValue(CONCEPTS.patientAge) || (patientObj?.person?.age ? String(patientObj.person.age) : ''),
    patientPhone: phoneAttribute?.value ?? '',
    wifeEducation,
    wifeOccupation: getSingleValue(CONCEPTS.occupationWife),
    husbandName: getSingleValue(CONCEPTS.husbandName),
    husbandAge: getSingleValue(CONCEPTS.husbandAge),
    husbandBmi: getSingleValue(CONCEPTS.husbandBmi),
    husbandPhone: getSingleValue(CONCEPTS.husbandPhone),
    husbandEducation,
    husbandOccupation: getSingleValue(CONCEPTS.occupationHusband),
    socioeconomicStatus: getSingleValue(CONCEPTS.socioeconomicStatus),
  };

  return {
    demographics,
    latestEncounter,
    isLoading,
    error,
    mutate,
  };
}
