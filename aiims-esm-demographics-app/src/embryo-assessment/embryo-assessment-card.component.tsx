import React from 'react';
import { useTranslation } from 'react-i18next';
import { Microscope } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsEmbryoAssessmentData } from './embryo-assessment.resource';

export interface EmbryoAssessmentCardProps {
  data: AiimsEmbryoAssessmentData | null | undefined;
}

export const EmbryoAssessmentCard: React.FC<EmbryoAssessmentCardProps> = ({ data }) => {
  const { t } = useTranslation();

  // Card 1: Fertilization & Cleavage Stage (Days 1–3)
  const cleavageRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'day1-embryos',
        label: t('numberEmbryosDay1', 'Number of Embryos Day 1 (2PN)'),
        value: data?.numberEmbryosDay1,
        emptyPlaceholder: '—',
      },
      {
        id: 'day1-grade',
        label: t('gradeEmbryosDay1', 'Grade of Embryos Day 1 (2PN)'),
        value: data?.gradeEmbryosDay1,
        emptyPlaceholder: '—',
      },
      {
        id: 'day2-embryos',
        label: t('numberEmbryosDay2', 'Number of Embryos Day 2'),
        value: data?.numberEmbryosDay2,
        emptyPlaceholder: '—',
      },
      {
        id: 'day2-grade',
        label: t('gradeEmbryosDay2', 'Grade of Embryos Day 2'),
        value: data?.gradeEmbryosDay2,
        emptyPlaceholder: '—',
      },
      {
        id: 'day3-embryos',
        label: t('numberEmbryosDay3', 'Number of Embryos Day 3'),
        value: data?.numberEmbryosDay3,
        emptyPlaceholder: '—',
      },
      {
        id: 'day3-grade',
        label: t('gradeEmbryosDay3', 'Grade of Embryos Day 3'),
        value: data?.gradeEmbryosDay3,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Card 2: Morula & Blastocyst Progression (Days 4–6)
  const blastocystRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'day4-embryos',
        label: t('numberEmbryosDay4', 'Number of Embryos Day 4'),
        value: data?.numberEmbryosDay4,
        emptyPlaceholder: '—',
      },
      {
        id: 'day4-grade',
        label: t('gradeEmbryosDay4', 'Grade of Embryos Day 4'),
        value: data?.gradeEmbryosDay4,
        emptyPlaceholder: '—',
      },
      {
        id: 'day5-embryos',
        label: t('numberEmbryosDay5', 'Number of Embryos Day 5 (Blastocysts)'),
        value: data?.numberEmbryosDay5,
        emptyPlaceholder: '—',
      },
      {
        id: 'day5-grade',
        label: t('gradeEmbryosDay5', 'Grade of Embryos Day 5'),
        value: data?.gradeEmbryosDay5,
        emptyPlaceholder: '—',
      },
      {
        id: 'day6-embryos',
        label: t('numberEmbryosDay6', 'Number of Embryos Day 6 (Blastocysts)'),
        value: data?.numberEmbryosDay6,
        emptyPlaceholder: '—',
      },
      {
        id: 'day6-grade',
        label: t('gradeEmbryosDay6', 'Grade of Embryos Day 6'),
        value: data?.gradeEmbryosDay6,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  const allRows = React.useMemo(() => [
    ...cleavageRows,
    ...blastocystRows,
  ], [cleavageRows, blastocystRows]);

  return (
    <ObservationCard
      title={t('aiimsEmbryoAssessmentTitle', 'Assessment of Fertilization, Embryo & Blastocyst')}
      icon={Microscope}
      rows={allRows}
    />
  );
};
