import React from 'react';
import { Chemistry } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsFemaleBloodHormoneData } from './female-blood-hormone.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface FemaleBloodHormoneCardProps {
  data: AiimsFemaleBloodHormoneData;
}

export const FemaleBloodHormoneCard: React.FC<FemaleBloodHormoneCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const ngMlUnit = t('unitNgMl', 'ng/mL');
  const miuMlUnit = t('unitMiuMl', 'mIU/mL');
  const uiuMlUnit = t('unitUiuMl', 'uIU/mL');

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Anti-Mullerian Hormone (AMH)
    list.push({
      id: 'anti_mullerian_hormone',
      label: t('antiMullerianHormone', 'Anti-Mullerian Hormone (AMH)'),
      value:
        data.antiMullerianHormone !== undefined && data.antiMullerianHormone !== null
          ? `${data.antiMullerianHormone} ${ngMlUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Day 2 Follicle-Stimulating Hormone (FSH)
    list.push({
      id: 'day2_follicle_stimulating_hormone',
      label: t('day2FollicleStimulatingHormone', 'Day 2 Follicle-Stimulating Hormone (FSH)'),
      value:
        data.day2FollicleStimulatingHormone !== undefined && data.day2FollicleStimulatingHormone !== null
          ? `${data.day2FollicleStimulatingHormone} ${miuMlUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Day 2 Luteinizing Hormone (LH)
    list.push({
      id: 'day2_luteinizing_hormone',
      label: t('day2LuteinizingHormone', 'Day 2 Luteinizing Hormone (LH)'),
      value:
        data.day2LuteinizingHormone !== undefined && data.day2LuteinizingHormone !== null
          ? `${data.day2LuteinizingHormone} ${miuMlUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Thyroid-Stimulating Hormone (TSH)
    list.push({
      id: 'thyroid_stimulating_hormone',
      label: t('thyroidStimulatingHormone', 'Thyroid-Stimulating Hormone (TSH)'),
      value:
        data.thyroidStimulatingHormone !== undefined && data.thyroidStimulatingHormone !== null
          ? `${data.thyroidStimulatingHormone} ${uiuMlUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Serum Prolactin
    list.push({
      id: 'serum_prolactin',
      label: t('serumProlactin', 'Serum Prolactin'),
      value:
        data.serumProlactin !== undefined && data.serumProlactin !== null
          ? `${data.serumProlactin} ${ngMlUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t, ngMlUnit, miuMlUnit, uiuMlUnit]);

  return (
    <ObservationCard
      title={t('femaleBloodHormoneProfileTitle', 'Female Blood Hormone Profile')}
      icon={Chemistry}
      rows={rows}
    />
  );
};
