import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chemistry, ChartRadial, Notebook } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsFertilisationDetailsData } from './fertilisation-details.resource';

export interface FertilisationDetailsCardProps {
  data: AiimsFertilisationDetailsData | null | undefined;
}

export const FertilisationDetailsCard: React.FC<FertilisationDetailsCardProps> = ({ data }) => {
  const { t } = useTranslation();

  // Card 1: Fertilisation & Insemination Outcome
  const outcomeRows: ObservationRow[] = React.useMemo(() => {
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

  // Card 2: Cleavage Stage Assessment
  const cleavageRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'embryos-cleaved-day2',
        label: t('embryosCleavedDay2', 'Embryos Cleaved on Day 2'),
        value: data?.embryosCleavedDay2,
        unit: data?.embryosCleavedDay2 ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'cleavage-rate',
        label: t('cleavageRate', 'Cleavage Rate'),
        value: data?.cleavageRate,
        unit: data?.cleavageRate ? ' %' : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'embryos-cleaved-day3',
        label: t('embryosCleavedDay3', 'Embryos Cleaved on Day 3'),
        value: data?.embryosCleavedDay3,
        unit: data?.embryosCleavedDay3 ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'embryos-cleaved-day5',
        label: t('embryosCleavedDay5', 'Number of Embryos Cleaved on Day 5'),
        value: data?.embryosCleavedDay5,
        unit: data?.embryosCleavedDay5 ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Card 3: Laboratory Remarks
  const remarksRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'fertilisation-details-remarks',
        label: t('fertilisationDetailsRemarks', 'Fertilisation Details Remarks'),
        value: data?.fertilisationDetailsRemarks,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  return (
    <>
      <ObservationCard
        title={t('fertilisationOutcomeTitle', 'Fertilisation & Insemination Outcome')}
        icon={Chemistry}
        rows={outcomeRows}
      />
      <ObservationCard
        title={t('cleavageAssessmentTitle', 'Cleavage Stage Assessment')}
        icon={ChartRadial}
        rows={cleavageRows}
      />
      <ObservationCard
        title={t('fertilisationRemarksTitle', 'Laboratory Remarks')}
        icon={Notebook}
        rows={remarksRows}
      />
    </>
  );
};

