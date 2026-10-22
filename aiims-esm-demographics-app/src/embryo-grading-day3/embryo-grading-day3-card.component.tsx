import React from 'react';
import { useTranslation } from 'react-i18next';
import { Microscope } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsEmbryoGradingDay3Data } from './embryo-grading-day3.resource';

export interface EmbryoGradingDay3CardProps {
  data: AiimsEmbryoGradingDay3Data | null | undefined;
}

export const EmbryoGradingDay3Card: React.FC<EmbryoGradingDay3CardProps> = ({ data }) => {
  const { t } = useTranslation();

  // Day 3 Cleavage Stage Embryo Grading
  const gradingRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'grade-1-embryos-day3',
        label: t('grade1EmbryosDay3', 'Grade 1'),
        value: data?.grade1EmbryosDay3,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-2-embryos-day3',
        label: t('grade2EmbryosDay3', 'Grade 2'),
        value: data?.grade2EmbryosDay3,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-3-embryos-day3',
        label: t('grade3EmbryosDay3', 'Grade 3'),
        value: data?.grade3EmbryosDay3,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-4-embryos-day3',
        label: t('grade4EmbryosDay3', 'Grade 4'),
        value: data?.grade4EmbryosDay3,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Laboratory Remarks
  const remarksRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'embryo-grading-day3-remarks',
        label: t('embryoGradingDay3Remarks', 'Embryo Grading Day 3 Remarks'),
        value: data?.embryoGradingDay3Remarks,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  const allRows = React.useMemo(() => [
    ...gradingRows,
    ...(data?.embryoGradingDay3Remarks ? remarksRows : []),
  ], [gradingRows, remarksRows, data?.embryoGradingDay3Remarks]);

  return (
    <ObservationCard
      title={t('aiimsEmbryoGradingDay3Title', 'Embryo Grading Day 3')}
      icon={Microscope}
      rows={allRows}
    />
  );
};
