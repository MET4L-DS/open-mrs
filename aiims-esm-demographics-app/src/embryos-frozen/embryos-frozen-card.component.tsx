import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chemistry } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsEmbryosFrozenData } from './embryos-frozen.resource';

export interface EmbryosFrozenCardProps {
  data: AiimsEmbryosFrozenData | null | undefined;
}

export const EmbryosFrozenCard: React.FC<EmbryosFrozenCardProps> = ({ data }) => {
  const { t } = useTranslation();

  // Day 3 Embryo Vitrification (Cleavage Stage)
  const day3Rows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'number-day3-embryos-vitrified',
        label: t('numberDay3EmbryosVitrified', 'Number of Day 3 Embryos Vitrified'),
        value: data?.numberDay3EmbryosVitrified,
        unit: data?.numberDay3EmbryosVitrified ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-a-embryos-vitrified',
        label: t('gradeAEmbryosVitrified', 'Grade A Embryos Vitrified'),
        value: data?.gradeAEmbryosVitrified,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-b-embryos-vitrified',
        label: t('gradeBEmbryosVitrified', 'Grade B Embryos Vitrified'),
        value: data?.gradeBEmbryosVitrified,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-c-embryos-vitrified',
        label: t('gradeCEmbryosVitrified', 'Grade C Embryos Vitrified'),
        value: data?.gradeCEmbryosVitrified,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Day 5 Blastocyst Vitrification
  const day5Rows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'number-day5-embryos-vitrified',
        label: t('numberDay5EmbryosVitrified', 'Number of Day 5 Embryos Vitrified'),
        value: data?.numberDay5EmbryosVitrified,
        unit: data?.numberDay5EmbryosVitrified ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-day5-embryos-vitrified',
        label: t('gradeDay5EmbryosVitrified', 'Grade of Day 5 Embryos Vitrified'),
        value: data?.gradeDay5EmbryosVitrified,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Cryopreservation Notes & Remarks
  const remarksRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'embryos-frozen-remarks',
        label: t('embryosFrozenRemarks', 'Embryos Frozen Remarks'),
        value: data?.embryosFrozenRemarks,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  const allRows = React.useMemo(() => [
    ...day3Rows,
    ...day5Rows,
    ...(data?.embryosFrozenRemarks ? remarksRows : []),
  ], [day3Rows, day5Rows, remarksRows, data?.embryosFrozenRemarks]);

  return (
    <ObservationCard
      title={t('aiimsEmbryosFrozenTitle', 'Embryos Frozen')}
      icon={Chemistry}
      rows={allRows}
    />
  );
};
