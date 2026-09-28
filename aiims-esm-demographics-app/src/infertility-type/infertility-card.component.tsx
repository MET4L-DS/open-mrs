import React from 'react';
import { Activity } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type AiimsInfertilityTypeData } from './infertility-type.resource';
import { ObservationCard } from '../shared/components';

interface InfertilityCardProps {
  data: AiimsInfertilityTypeData;
}

export const InfertilityCard: React.FC<InfertilityCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const renderInfertilityType = (type?: string) => {
    if (!type) return null;
    const isPrimary = type.toLowerCase().includes('primary');
    return (
      <Tag type={isPrimary ? 'purple' : 'teal'} size="md">
        {type}
      </Tag>
    );
  };

  return (
    <ObservationCard
      title={t('infertilityClassification', 'Infertility Classification & Timeline')}
      icon={Activity}
      rows={[
        {
          label: t('typeOfInfertility', 'Type of Infertility'),
          value: renderInfertilityType(data.typeOfInfertility),
        },
        {
          label: t('marriedForYears', 'Married for'),
          value: data.marriedForYears,
          unit: data.marriedForYears ? t('years', 'years') : undefined,
        },
        {
          label: t('durationOfInfertility', 'Duration of Infertility'),
          value: data.durationOfInfertility,
          unit: data.durationOfInfertility ? t('years', 'years') : undefined,
        },
      ]}
    />
  );
};
