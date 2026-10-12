import React from 'react';
import { Medication } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsAdjuvantDrugData } from './adjuvant-drug.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface AdjuvantDrugCardProps {
  data: AiimsAdjuvantDrugData | null;
}

export const AdjuvantDrugCard: React.FC<AdjuvantDrugCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const ghRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    list.push({
      id: 'growth_hormone',
      label: t('growthHormone', 'Growth Hormone Administered'),
      value: data?.growthHormone,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'growth_hormone_dose',
      label: t('growthHormoneDose', 'Growth Hormone Dose'),
      value:
        data?.growthHormoneDose !== undefined && data?.growthHormoneDose !== null
          ? `${data.growthHormoneDose} ${t('iuUnit', 'IU')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'growth_hormone_duration',
      label: t('growthHormoneDuration', 'Growth Hormone Duration'),
      value:
        data?.growthHormoneDuration !== undefined && data?.growthHormoneDuration !== null
          ? `${data.growthHormoneDuration} ${t('daysUnit', 'days')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const remarksRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    list.push({
      id: 'adjuvant_drug_remarks',
      label: t('adjuvantDrugRemarks', 'Remarks / Notes'),
      value: data?.remarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ObservationCard
        title={t('growthHormoneAdjuvantTherapyTitle', 'Growth Hormone (GH) Adjuvant Therapy')}
        icon={Medication}
        rows={ghRows}
      />
      <ObservationCard
        title={t('adjuvantDrugRemarksTitle', 'Clinical Notes & Remarks')}
        icon={Medication}
        rows={remarksRows}
      />
    </div>
  );
};
