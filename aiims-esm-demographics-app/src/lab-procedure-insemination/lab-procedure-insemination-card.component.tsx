import React from 'react';
import { Chemistry } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsLabProcedureInseminationData } from './lab-procedure-insemination.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface LabProcedureInseminationCardProps {
  data: AiimsLabProcedureInseminationData;
}

export const LabProcedureInseminationCard: React.FC<
  LabProcedureInseminationCardProps
> = ({ data }) => {
  const { t } = useTranslation();

  const allRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Method of Insemination
    list.push({
      id: 'method_of_insemination',
      label: t('methodOfInsemination', 'Method of Insemination'),
      value:
        data.methodOfInsemination.length > 0
          ? data.methodOfInsemination.join(', ')
          : undefined,
      emptyPlaceholder: '—',
    });

    // Time of Insemination or Injection
    list.push({
      id: 'time_of_insemination_injection',
      label: t(
        'timeOfInseminationInjection',
        'Time of Insemination or Injection'
      ),
      value: data.timeOfInseminationInjection,
      emptyPlaceholder: '—',
    });

    // Semen Sample Type
    list.push({
      id: 'semen_sample_type',
      label: t('semenSampleType', 'Semen Sample Type'),
      value:
        data.semenSampleType.length > 0
          ? data.semenSampleType.join(', ')
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data.methodOfInsemination, data.timeOfInseminationInjection, data.semenSampleType, t]);

  return (
    <ObservationCard
      title={t(
        'aiimsLabProcedureInseminationTitle',
        'Lab Procedure of Insemination'
      )}
      icon={Chemistry}
      rows={allRows}
    />
  );
};
