import React from 'react';
import { Scalpel } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsMaleHormoneSurgeryData } from './male-hormone-surgery.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface MaleHormoneSurgeryCardProps {
  data: AiimsMaleHormoneSurgeryData;
}

export const MaleHormoneSurgeryCard: React.FC<MaleHormoneSurgeryCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows = React.useMemo(() => {
    const list: ObservationRow[] = [
      {
        label: t('fshHusband', 'Follicle Stimulating Hormone (FSH)'),
        value: data.fshHusband,
        unit: data.fshHusband ? t('mIuPerMl', 'mIU/mL') : undefined,
      },
      {
        label: t('testosteroneHusband', 'Serum Testosterone'),
        value: data.testosteroneHusband,
        unit: data.testosteroneHusband ? t('ngPerDl', 'ng/dL') : undefined,
      },
      {
        label: t('testicularBiopsy', 'Testicular Biopsy Report / Notes'),
        value: data.testicularBiopsy,
      },
    ];

    return list;
  }, [data.fshHusband, data.testosteroneHusband, data.testicularBiopsy, t]);

  return (
    <ObservationCard
      title={t('maleHormoneSurgeryDetails', 'Male Hormone & Surgery Findings')}
      icon={Scalpel}
      rows={rows}
    />
  );
};
