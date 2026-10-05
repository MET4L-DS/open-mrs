import React from 'react';
import { Events } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type AiimsPastMedicalHistoryData } from './past-medical-history.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface PastMedicalHistoryCardProps {
  data: AiimsPastMedicalHistoryData;
}

export const PastMedicalHistoryCard: React.FC<PastMedicalHistoryCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const diseasesDisplay = React.useMemo(() => {
    if (!data.medicalDiseases || data.medicalDiseases.length === 0) {
      return undefined;
    }
    return (
      <div className={styles.tagList}>
        {data.medicalDiseases.map(disease => (
          <Tag key={disease} type="teal" size="sm">
            {disease}
          </Tag>
        ))}
      </div>
    );
  }, [data.medicalDiseases]);

  const rows = React.useMemo(() => {
    const list: ObservationRow[] = [
      {
        label: t('medicalDiseasesLabel', 'Diagnosed Conditions / Diseases'),
        value: diseasesDisplay,
      },
    ];

    if (data.medicalDiseasesOthers) {
      list.push({
        label: t('medicalDiseasesOthersLabel', 'Other Medical Conditions / Notes'),
        value: data.medicalDiseasesOthers,
      });
    }

    return list;
  }, [data.medicalDiseasesOthers, diseasesDisplay, t]);

  return (
    <ObservationCard
      title={t('pastMedicalHistoryCardTitle', 'Past Medical History & Conditions')}
      icon={Events}
      rows={rows}
    />
  );
};
