import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chemistry } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsFertilisationDetailsData } from './fertilisation-details.resource';

export interface FertilisationDetailsCardProps {
  data: AiimsFertilisationDetailsData | null | undefined;
}

export const FertilisationDetailsCard: React.FC<FertilisationDetailsCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'number-oocytes-fertilised',
        label: t('numberOocytesFertilised', 'Number of Oocytes Fertilised'),
        value: data?.numberOocytesFertilised,
        unit: data?.numberOocytesFertilised ? ` ${t('oocytes', 'oocytes')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'fertilisation-rate',
        label: t('fertilisationRate', 'Fertilisation Rate'),
        value: data?.fertilisationRate,
        unit: data?.fertilisationRate ? ' %' : undefined,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  return (
    <ObservationCard
      title={t('aiimsFertilisationDetailsTitle', 'Fertilisation Details')}
      icon={Chemistry}
      rows={rows}
    />
  );
};
