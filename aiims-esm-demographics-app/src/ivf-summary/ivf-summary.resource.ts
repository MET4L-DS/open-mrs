import { useMemo } from 'react';
import useSWR from 'swr';
import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import type { EncounterItem, EncounterResponse } from '../shared/types';
import { formatObsValue } from '../shared/hooks/useFormEncounter';

export interface IvfSummaryDomainData {
  patientUuid?: string;
  encountersCount: number;
  latestEncounterDate?: string;
  hasAnyData: boolean;
  encountersByForm: Record<string, EncounterItem>;
}

export function useIvfSummary(patientUuid?: string) {
  const query = useMemo(() => {
    if (!patientUuid) return null;
    const params = new URLSearchParams();
    params.set('patient', patientUuid);
    params.set('order', 'desc');
    params.set(
      'v',
      'custom:(uuid,encounterDatetime,form:(uuid,name),obs:(uuid,concept:(uuid,display),value,obsDatetime))'
    );
    return params.toString();
  }, [patientUuid]);

  const url = query ? `${restBaseUrl}/encounter?${query}` : null;

  const { data, error, isLoading, mutate } = useSWR<{ data: EncounterResponse }>(
    url,
    openmrsFetch,
    { revalidateOnFocus: false }
  );

  const encounters = data?.data?.results || [];

  const summaryData: IvfSummaryDomainData = useMemo(() => {
    const map: Record<string, EncounterItem> = {};

    // Sort descending by encounterDatetime
    const sorted = [...encounters].sort((a, b) => {
      const timeA = a.encounterDatetime ? new Date(a.encounterDatetime).getTime() : 0;
      const timeB = b.encounterDatetime ? new Date(b.encounterDatetime).getTime() : 0;
      return timeB - timeA;
    });

    for (const enc of sorted) {
      if (enc.form?.uuid && !map[enc.form.uuid]) {
        map[enc.form.uuid] = enc;
      }
    }

    return {
      patientUuid,
      encountersCount: sorted.length,
      latestEncounterDate: sorted[0]?.encounterDatetime,
      hasAnyData: sorted.length > 0,
      encountersByForm: map,
    };
  }, [encounters, patientUuid]);

  const getFormObs = (formUuid: string, conceptUuid: string): string | undefined => {
    const enc = summaryData.encountersByForm[formUuid];
    if (!enc || !enc.obs) return undefined;
    const item = enc.obs.find(o => o.concept?.uuid === conceptUuid);
    return item ? formatObsValue(item.value) : undefined;
  };

  const getFormObsList = (formUuid: string, conceptUuid: string): string[] => {
    const enc = summaryData.encountersByForm[formUuid];
    if (!enc || !enc.obs) return [];
    const items = enc.obs.filter(o => o.concept?.uuid === conceptUuid);
    return Array.from(new Set(items.map(o => formatObsValue(o.value)).filter(Boolean)));
  };

  return {
    summaryData,
    encounters,
    isLoading,
    error,
    mutate,
    getFormObs,
    getFormObsList,
  };
}
