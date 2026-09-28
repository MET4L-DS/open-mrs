import React from 'react';
import { ParentChild } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsObstetricHistoryData } from './obstetric-history.resource';
import { ObservationCard } from '../shared/components';

interface ObstetricHistoryCardProps {
  data: AiimsObstetricHistoryData;
}

export const ObstetricHistoryCard: React.FC<ObstetricHistoryCardProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <ObservationCard
      title={t('obstetricHistoryDetails', 'Obstetric History Details')}
      icon={ParentChild}
      rows={[
        {
          label: t('gravida', 'Gravida (G)'),
          value: data.gravida,
        },
        {
          label: t('parity', 'Parity (P)'),
          value: data.parity,
        },
        {
          label: t('livingChildren', 'Living Children (L)'),
          value: data.livingChildren,
        },
        {
          label: t('abortionMiscarriage', 'Abortion / Miscarriage (A)'),
          value: data.abortionMiscarriage,
        },
        {
          label: t('ectopicPregnancy', 'Ectopic Pregnancy'),
          value: data.ectopicPregnancy,
        },
      ]}
    />
  );
};
