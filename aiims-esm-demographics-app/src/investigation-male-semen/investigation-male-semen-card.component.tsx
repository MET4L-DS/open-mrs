import React from 'react';
import { Chemistry } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsInvestigationMaleSemenData } from './investigation-male-semen.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface InvestigationMaleSemenCardProps {
  data: AiimsInvestigationMaleSemenData;
}

export const InvestigationMaleSemenCard: React.FC<InvestigationMaleSemenCardProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Semen Volume
    list.push({
      id: 'semen_volume',
      label: t('semenVolume', 'Semen Volume'),
      value:
        data.semenVolume !== undefined
          ? `${data.semenVolume} ${t('unitMl', 'mL')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Semen Count
    list.push({
      id: 'semen_count',
      label: t('semenCount', 'Semen Count'),
      value:
        data.semenCount !== undefined
          ? `${data.semenCount} ${t('unitMillionPerMl', 'million/mL')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Motility Finding
    const motilityFindingDisplay =
      data.semenMotilityFinding.length > 0
        ? data.semenMotilityFinding.join(', ')
        : undefined;

    list.push({
      id: 'semen_motility_finding',
      label: t('semenMotilityFinding', 'Motility Finding'),
      value: motilityFindingDisplay,
      emptyPlaceholder: '—',
    });

    // Motility (total/progressive)
    list.push({
      id: 'semen_motility_total_progressive',
      label: t(
        'semenMotilityTotalProgressive',
        'Motility (Total / Progressive)'
      ),
      value: data.semenMotilityTotalProgressive,
      emptyPlaceholder: '—',
    });

    // Sperm Morphology
    list.push({
      id: 'sperm_morphology',
      label: t('spermMorphology', 'Sperm Morphology'),
      value: data.spermMorphology,
      emptyPlaceholder: '—',
    });

    // Remarks
    list.push({
      id: 'investigation_male_semen_remarks',
      label: t('maleSemenRemarks', 'Semen Analysis Remarks / Notes'),
      value: data.investigationMaleSemenRemarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t(
        'investigationMaleSemenCardTitle',
        'Husband Semen Analysis (HSA)'
      )}
      icon={Chemistry}
      rows={rows}
    />
  );
};
