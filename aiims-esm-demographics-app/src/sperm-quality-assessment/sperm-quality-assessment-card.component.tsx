import React from 'react';
import { Microscope } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsSpermQualityAssessmentData } from './sperm-quality-assessment.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface SpermQualityAssessmentCardProps {
  data: AiimsSpermQualityAssessmentData | null;
}

export const SpermQualityAssessmentCard: React.FC<SpermQualityAssessmentCardProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Post wash concentration
    list.push({
      id: 'post_wash_sperm_concentration',
      label: t(
        'postWashSpermConcentration',
        'Post wash Sperm concentration on Ovum Pick Up Day'
      ),
      value:
        data?.postWashConcentration !== undefined && data?.postWashConcentration !== ''
          ? `${data.postWashConcentration} ${t('unitMillionPerMl', 'million/mL')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Sperm motility
    list.push({
      id: 'sperm_motility_opu_day',
      label: t('spermMotilityOpuDay', 'Sperm motility on Ovum Pick Up Day'),
      value:
        data?.spermMotility !== undefined && data?.spermMotility !== ''
          ? `${data.spermMotility} ${t('unitPercent', '%')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t('spermQualityOpuDayCardTitle', 'Sperm Quality on Ovum Pick Up Day')}
      icon={Microscope}
      rows={rows}
    />
  );
};
