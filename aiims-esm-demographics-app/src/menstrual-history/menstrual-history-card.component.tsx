import React from 'react';
import { Calendar } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@openmrs/esm-framework';
import { type AiimsMenstrualHistoryData } from './menstrual-history.resource';
import { ObservationCard } from '../shared/components';

interface MenstrualHistoryCardProps {
  data: AiimsMenstrualHistoryData;
}

export const MenstrualHistoryCard: React.FC<MenstrualHistoryCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const formattedLmp = React.useMemo(() => {
    if (!data.lastMenstrualPeriod) return '';
    const dateObj = new Date(data.lastMenstrualPeriod);
    if (isNaN(dateObj.getTime())) {
      return data.lastMenstrualPeriod;
    }
    try {
      return formatDate(dateObj, { time: false });
    } catch {
      return data.lastMenstrualPeriod;
    }
  }, [data.lastMenstrualPeriod]);

  return (
    <ObservationCard
      title={t('menstrualCycleDetails', 'Menstrual Cycle Details')}
      icon={Calendar}
      rows={[
        {
          label: t('patternOfMenstrualCycle', 'Pattern of Menstrual Cycle'),
          value: data.patternOfMenstrualCycle,
        },
        {
          label: t('lastMenstrualPeriod', 'Last Menstrual Period (LMP)'),
          value: formattedLmp,
        },
        {
          label: t('flowOfMenstrualCycle', 'Flow of Menstrual Cycle'),
          value: data.flowOfMenstrualCycle,
        },
      ]}
    />
  );
};
