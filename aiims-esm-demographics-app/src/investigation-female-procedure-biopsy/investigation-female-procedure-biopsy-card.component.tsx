import React from 'react';
import { Microscope } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsInvestigationFemaleProcedureBiopsyData } from './investigation-female-procedure-biopsy.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface InvestigationFemaleProcedureBiopsyCardProps {
  data: AiimsInvestigationFemaleProcedureBiopsyData;
}

export const InvestigationFemaleProcedureBiopsyCard: React.FC<
  InvestigationFemaleProcedureBiopsyCardProps
> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Endometrial Aspiration Histopathological Examination
    const histopathologyDisplay =
      data.endometrialAspirationHistopathology.length > 0
        ? data.endometrialAspirationHistopathology.join(', ')
        : undefined;

    list.push({
      id: 'endometrial_aspiration_histopathology',
      label: t(
        'endometrialAspirationHistopathology',
        'Histopathological Examination (EAHPE)'
      ),
      value: histopathologyDisplay,
      emptyPlaceholder: '—',
    });

    // Endometrial Aspiration Polymerase Chain Reaction
    list.push({
      id: 'endometrial_aspiration_pcr',
      label: t('endometrialAspirationPcr', 'Polymerase Chain Reaction (PCR)'),
      value: data.endometrialAspirationPcr,
      emptyPlaceholder: '—',
    });

    // Endometrial Aspiration Acid Fast Bacillus
    list.push({
      id: 'endometrial_aspiration_afb',
      label: t('endometrialAspirationAfb', 'Acid Fast Bacillus (AFB)'),
      value: data.endometrialAspirationAfb,
      emptyPlaceholder: '—',
    });

    // Biopsy Remarks
    list.push({
      id: 'procedure_biopsy_remarks',
      label: t('procedureBiopsyRemarks', 'Biopsy Remarks / Notes'),
      value: data.investigationFemaleProcedureBiopsyRemarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t(
        'procedureBiopsyFindingsTitle',
        'Endometrial Biopsy Findings (EAHPE, PCR, AFB)'
      )}
      icon={Microscope}
      rows={rows}
    />
  );
};
