import React from 'react';
import { User } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsDemographicsData } from './demographics.resource';
import { ObservationCard } from '../shared/components';

interface HusbandCardProps {
  demographics: AiimsDemographicsData;
}

export const HusbandCard: React.FC<HusbandCardProps> = ({ demographics }) => {
  const { t } = useTranslation();

  return (
    <ObservationCard
      title={t('husbandProfile', 'Husband Profile')}
      icon={User}
      rows={[
        { label: t('husbandName', 'Name'), value: demographics.husbandName },
        {
          label: t('husbandAge', 'Age'),
          value: demographics.husbandAge,
          unit: demographics.husbandAge ? t('years', 'years') : undefined,
        },
        {
          label: t('husbandBmi', 'BMI'),
          value: demographics.husbandBmi,
          unit: demographics.husbandBmi ? t('kgPerMSq', 'kg/m²') : undefined,
        },
        { label: t('husbandPhone', 'Phone Number'), value: demographics.husbandPhone },
        { label: t('husbandEducation', 'Education'), value: demographics.husbandEducation },
        { label: t('husbandOccupation', 'Occupation'), value: demographics.husbandOccupation },
      ]}
    />
  );
};

