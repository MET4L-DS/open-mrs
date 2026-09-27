import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';

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

export function useFormEncounter(
  patientUuid?: string,
  formUuid?: string,
  encounterTypeUuid?: string
) {
  const query = useMemo(() => {
    if (!patientUuid) return null;
    const params = new URLSearchParams();
    params.set('patient', patientUuid);
    if (formUuid) {
      params.set('form', formUuid);
    }
    if (encounterTypeUuid) {
      params.set('encounterType', encounterTypeUuid);
    }
    params.set('order', 'desc');
    params.set(
      'v',
      'custom:(uuid,encounterDatetime,form:(uuid,name),obs:(uuid,concept:(uuid,display),value,obsDatetime)'
    );
    return params.toString();
  }, [patientUuid, formUuid, encounterTypeUuid]);

  const url = query ? `${restBaseUrl}/encounter?${query}` : null;

  const { data, error, isLoading, mutate } = useSWR<{ data: EncounterResponse }>(
    url,
    openmrsFetch,
    { revalidateOnFocus: false }
  );

  const allEncounters = data?.data?.results;
  const formEncounters = allEncounters ?? [];
  const latestEncounter = formEncounters.length > 0 ? formEncounters[0] : null;

  // Build index by concept UUID for fast lookup, sorting obs deterministically by obsDatetime
  const obsByConcept = useMemo(() => {
    const map = new Map<string, ObsItem[]>();
    if (latestEncounter?.obs) {
      const sortedObs = [...latestEncounter.obs].sort((a, b) => {
        const timeA = a.obsDatetime ? new Date(a.obsDatetime).getTime() : 0;
        const timeB = b.obsDatetime ? new Date(b.obsDatetime).getTime() : 0;
        return timeB - timeA;
      });
      for (const o of sortedObs) {
        if (!o.concept?.uuid) continue;
        const list = map.get(o.concept.uuid) ?? [];
        list.push(o);
        map.set(o.concept.uuid, list);
      }
    }
    return map;
  }, [latestEncounter]);

  const getObsValue = useCallback((conceptUuid: string): string => {
    const list = obsByConcept.get(conceptUuid);
    if (!list || list.length === 0) return '';
    return formatObsValue(list[0].value);
  }, [obsByConcept]);

  const getObsValues = useCallback((conceptUuid: string): string[] => {
    const list = obsByConcept.get(conceptUuid);
    if (!list) return [];
    return list.map(item => formatObsValue(item.value));
  }, [obsByConcept]);

  return {
    latestEncounter,
    encounters: formEncounters,
    hasData: Boolean(latestEncounter),
    isLoading,
    error,
    mutate,
    getObsValue,
    getObsValues,
    obsByConcept,
  };
}
