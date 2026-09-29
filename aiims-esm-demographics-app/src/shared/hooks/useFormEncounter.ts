import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import type { ConceptUuid } from '../../constants';
import type {
  ConceptDisplay,
  EncounterItem,
  EncounterResponse,
  ObsItem,
  ObsValue,
  OpenMrsConceptName,
} from '../types';

export type { ConceptDisplay, EncounterItem, EncounterResponse, ObsItem, ObsValue, OpenMrsConceptName };

export function formatObsValue(val: ObsValue | unknown): string {
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
      if (typeof nameObj.name === 'string') {
        return nameObj.name;
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

  // OpenMRS REST API /ws/rest/v1/encounter does not filter by form parameter on the backend
  // and does not guarantee encounterDatetime desc sorting. We must filter and sort client-side.
  const formEncounters = useMemo(() => {
    if (!allEncounters) return [];
    let list = allEncounters;
    if (formUuid) {
      list = list.filter(e => e.form?.uuid === formUuid);
    }
    if (encounterTypeUuid) {
      list = list.filter(e => (e as any).encounterType?.uuid === encounterTypeUuid);
    }
    return [...list].sort((a, b) => {
      const timeA = a.encounterDatetime ? new Date(a.encounterDatetime).getTime() : 0;
      const timeB = b.encounterDatetime ? new Date(b.encounterDatetime).getTime() : 0;
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return (b.uuid || '').localeCompare(a.uuid || '');
    });
  }, [allEncounters, formUuid, encounterTypeUuid]);

  const latestEncounter = formEncounters.length > 0 ? formEncounters[0] : null;

  // Build index by concept UUID for fast lookup, sorting obs deterministically by obsDatetime
  // with UUID tie-breaker to avoid race conditions when multiple obs share identical timestamps.
  const obsByConcept = useMemo(() => {
    const map = new Map<string, ObsItem[]>();
    if (latestEncounter?.obs) {
      const sortedObs = [...latestEncounter.obs].sort((a, b) => {
        const timeA = a.obsDatetime ? new Date(a.obsDatetime).getTime() : 0;
        const timeB = b.obsDatetime ? new Date(b.obsDatetime).getTime() : 0;
        if (timeB !== timeA) {
          return timeB - timeA;
        }
        return (b.uuid || '').localeCompare(a.uuid || '');
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

  const getObsValue = useCallback((conceptUuid: ConceptUuid): string => {
    const list = obsByConcept.get(conceptUuid);
    if (!list || list.length === 0) return '';
    return formatObsValue(list[0].value);
  }, [obsByConcept]);

  const getOptionalObsValue = useCallback(
    (conceptUuid: ConceptUuid): string | undefined => {
      const val = getObsValue(conceptUuid);
      return val && val.trim().length > 0 ? val : undefined;
    },
    [getObsValue]
  );

  const getObsValues = useCallback((conceptUuid: ConceptUuid): string[] => {
    const list = obsByConcept.get(conceptUuid);
    if (!list) return [];
    const formatted = list
      .map(item => formatObsValue(item.value))
      .filter(val => val && val.trim().length > 0);
    return Array.from(new Set(formatted));
  }, [obsByConcept]);

  return {
    latestEncounter,
    encounters: formEncounters,
    hasData: Boolean(latestEncounter),
    isLoading,
    error,
    mutate,
    getObsValue,
    getOptionalObsValue,
    getObsValues,
    obsByConcept,
  };
}

