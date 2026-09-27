import React from 'react';
import { Hospital } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsDemographicsData } from './demographics.resource';
import { ObservationCard } from '../shared/components';

interface ClinicalCardProps {
  demographics: AiimsDemographicsData;
}

export const ClinicalCard: React.FC<ClinicalCardProps> = ({ demographics }) => {
  const { t } = useTranslation();

  return (
    <ObservationCard
      title={t('clinicalContext', 'Clinical Context')}
      icon={Hospital}
      rows={[
        {
          label: t('consultantUnit', 'Consultant Unit'),
          value: demographics.consultantUnit
            ? t('unitFormat', 'Unit {{unit}}', { unit: demographics.consultantUnit })
            : '',
        },
        {
          label: t('consultantName', 'Consultant Name'),
          value: demographics.consultantName,
        },
      ]}
    />
  );
};

