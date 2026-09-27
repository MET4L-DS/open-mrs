import React from 'react';
import { Finance } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsDemographicsData } from './demographics.resource';
import { ObservationCard } from '../shared/components';

interface SesCardProps {
  demographics: AiimsDemographicsData;
}

export const SesCard: React.FC<SesCardProps> = ({ demographics }) => {
  const { t } = useTranslation();

  return (
    <ObservationCard
      title={t('sesAssessment', 'Socioeconomic Assessment')}
      icon={Finance}
      rows={[
        {
          label: t('kuppuswamyClass', 'Kuppuswamy Scale Class'),
          value: demographics.socioeconomicStatus,
        },
      ]}
    />
  );
};

