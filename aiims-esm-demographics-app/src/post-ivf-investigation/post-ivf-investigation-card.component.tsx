import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReportData } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsPostIvfInvestigationData } from './post-ivf-investigation.resource';

export interface PostIvfInvestigationCardProps {
  data: AiimsPostIvfInvestigationData | null | undefined;
}

export const PostIvfInvestigationCard: React.FC<PostIvfInvestigationCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    list.push({
      id: 'uptResult',
      label: t('uptResultLabel', 'Urine Pregnancy Test (UPT)'),
      value: data?.uptResult ? t(data.uptResult, data.uptResult) : null,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'betaHcg',
      label: t('betaHcgLabel', 'Beta-Human Chorionic Gonadotropin'),
      value: data?.betaHcg !== undefined ? `${data.betaHcg} ${t('mIuPerMl', 'mIU/mL')}` : null,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'scan6To7Weeks',
      label: t('scan6To7WeeksLabel', 'Scan at 6-7 weeks'),
      value: data?.scan6To7Weeks ?? null,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'postIvfOutcome',
      label: t('postIvfOutcomeLabel', 'Outcome'),
      value: data?.postIvfOutcome ? t(data.postIvfOutcome, data.postIvfOutcome) : null,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'postIvfComplications',
      label: t('postIvfComplicationsLabel', 'Complications'),
      value: data?.postIvfComplications ? t(data.postIvfComplications, data.postIvfComplications) : null,
      emptyPlaceholder: '—',
    });

    if (data?.otherPregnancyComplications) {
      list.push({
        id: 'otherPregnancyComplications',
        label: t('otherPregnancyComplicationsLabel', 'Other Pregnancy Complications'),
        value: data.otherPregnancyComplications,
        emptyPlaceholder: '—',
      });
    }

    list.push({
      id: 'modeOfDelivery',
      label: t('modeOfDeliveryLabel', 'Mode of Delivery'),
      value: data?.modeOfDelivery ? t(data.modeOfDelivery, data.modeOfDelivery) : null,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'pogAtDelivery',
      label: t('pogAtDeliveryLabel', 'Period of Gestation at Delivery'),
      value: data?.pogAtDelivery !== undefined ? `${data.pogAtDelivery} ${t('weeks', 'weeks')}` : null,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t('postIvfInvestigationDetails', 'AIIMS Visit: Post-InVitro Fertilisation Investigation Details')}
      icon={ReportData}
      rows={rows}
    />
  );
};
