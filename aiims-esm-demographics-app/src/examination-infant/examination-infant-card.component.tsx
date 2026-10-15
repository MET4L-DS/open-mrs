import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from '@carbon/react';
import { PedestrianChild } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsExaminationInfantData } from './examination-infant.resource';

export interface ExaminationInfantCardProps {
  data: AiimsExaminationInfantData | null | undefined;
}

export const ExaminationInfantCard: React.FC<ExaminationInfantCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    if (!data || !data.hasData) {
      return [];
    }

    const list: ObservationRow[] = [];

    // Sex of Baby
    if (data.sexOfBaby) {
      let tagType: 'blue' | 'magenta' | 'purple' | 'cool-gray' = 'cool-gray';
      const lowerSex = data.sexOfBaby.toLowerCase();
      if (lowerSex.includes('male') && !lowerSex.includes('female')) {
        tagType = 'blue';
      } else if (lowerSex.includes('female')) {
        tagType = 'magenta';
      } else if (lowerSex.includes('ambiguous')) {
        tagType = 'purple';
      }

      list.push({
        id: 'sexOfBaby',
        label: t('sexOfBaby', 'Sex of Baby'),
        value: (
          <Tag type={tagType} size="sm">
            {data.sexOfBaby}
          </Tag>
        ),
      });
    }

    // Weight of Baby (kg)
    if (data.weightOfBaby !== undefined) {
      list.push({
        id: 'weightOfBaby',
        label: t('weightOfBaby', 'Weight of Baby'),
        value: `${data.weightOfBaby} ${t('kg', 'kg')}`,
      });
    }

    // APGAR Score
    if (data.apgarScore !== undefined) {
      let apgarTagType: 'green' | 'warm-gray' | 'red' = 'green';
      if (data.apgarScore >= 7) {
        apgarTagType = 'green';
      } else if (data.apgarScore >= 4) {
        apgarTagType = 'warm-gray';
      } else {
        apgarTagType = 'red';
      }

      list.push({
        id: 'apgarScore',
        label: t('apgarScore', 'APGAR Score'),
        value: (
          <Tag type={apgarTagType} size="sm">
            {`${data.apgarScore} / 10`}
          </Tag>
        ),
      });
    }

    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t('examinationInfantDetails', 'AIIMS Visit: Examination Infant Details')}
      icon={PedestrianChild}
      rows={rows}
    />
  );
};


