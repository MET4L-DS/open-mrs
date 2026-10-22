import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chemistry } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsEmbryosCleavageDetailsData } from './embryos-cleavage-details.resource';

export interface EmbryosCleavageDetailsCardProps {
  data: AiimsEmbryosCleavageDetailsData | null | undefined;
}

export const EmbryosCleavageDetailsCard: React.FC<EmbryosCleavageDetailsCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'embryos-cleaved-day2',
        label: t('embryosCleavedDay2', 'Embryos Cleaved on Day 2'),
        value: data?.embryosCleavedDay2,
        unit: data?.embryosCleavedDay2 ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'cleavage-rate',
        label: t('cleavageRate', 'Cleavage Rate'),
        value: data?.cleavageRate,
        unit: data?.cleavageRate ? ' %' : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'embryos-cleaved-day3',
        label: t('embryosCleavedDay3', 'Embryos Cleaved on Day 3'),
        value: data?.embryosCleavedDay3,
        unit: data?.embryosCleavedDay3 ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'embryos-cleaved-day5',
        label: t('embryosCleavedDay5', 'Number of Embryos Cleaved on Day 5'),
        value: data?.embryosCleavedDay5,
        unit: data?.embryosCleavedDay5 ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  return (
    <ObservationCard
      title={t('aiimsEmbryosCleavageDetailsTitle', 'Embryos Cleavage Details')}
      icon={Chemistry}
      rows={rows}
    />
  );
};
