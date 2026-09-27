import React from 'react';
import { User } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsDemographicsData } from './demographics.resource';
import { ObservationCard } from '../shared/components';

interface PatientCardProps {
  demographics: AiimsDemographicsData;
  patientName?: string;
}

export const PatientCard: React.FC<PatientCardProps> = ({ demographics, patientName }) => {
  const { t } = useTranslation();

  return (
    <ObservationCard
      title={t('patientProfile', 'Patient (Wife) Profile')}
      icon={User}
      rows={[
        { label: t('name', 'Name'), value: patientName },
        {
          label: t('age', 'Age'),
          value: demographics.patientAge,
          unit: demographics.patientAge ? t('years', 'years') : undefined,
        },
        { label: t('phone', 'Phone Number'), value: demographics.patientPhone },
        { label: t('education', 'Education'), value: demographics.wifeEducation },
        { label: t('occupation', 'Occupation'), value: demographics.wifeOccupation },
      ]}
    />
  );
};

