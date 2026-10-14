import React from 'react';
import { useTranslation } from 'react-i18next';
import { Microscope, Notebook } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsEmbryoGradingDay3Data } from './embryo-grading-day3.resource';

export interface EmbryoGradingDay3CardProps {
  data: AiimsEmbryoGradingDay3Data | null | undefined;
}

export const EmbryoGradingDay3Card: React.FC<EmbryoGradingDay3CardProps> = ({ data }) => {
  const { t } = useTranslation();

  // Card 1: Day 3 Cleavage Stage Embryo Grading
  const gradingRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'grade-1-embryos-day3',
        label: t('grade1EmbryosDay3', 'Grade 1 Embryos (Day 3)'),
        value: data?.grade1EmbryosDay3,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-2-embryos-day3',
        label: t('grade2EmbryosDay3', 'Grade 2 Embryos (Day 3)'),
        value: data?.grade2EmbryosDay3,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-3-embryos-day3',
        label: t('grade3EmbryosDay3', 'Grade 3 Embryos (Day 3)'),
        value: data?.grade3EmbryosDay3,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-4-embryos-day3',
        label: t('grade4EmbryosDay3', 'Grade 4 Embryos (Day 3)'),
        value: data?.grade4EmbryosDay3,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Card 2: Laboratory Remarks
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

  return (
    <>
      <ObservationCard
        title={t('embryoGradingDay3Title', 'Day 3 Cleavage Stage Embryo Grading')}
        icon={Microscope}
        rows={gradingRows}
      />
      <ObservationCard
        title={t('embryoGradingDay3RemarksTitle', 'Laboratory Notes & Remarks')}
        icon={Notebook}
        rows={remarksRows}
      />
    </>
  );
};
