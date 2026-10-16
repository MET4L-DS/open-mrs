import React from 'react';
import { Microscope } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsProcedureData } from './procedure.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface ProcedureCardProps {
  data: AiimsProcedureData;
}

export const ProcedureCard: React.FC<ProcedureCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const spermRetrievalRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Sperm Retrieval Procedure
    list.push({
      id: 'sperm_retrieval_procedure',
      label: t('spermRetrievalProcedure', 'Sperm Retrieval Procedure'),
      value:
        data.spermRetrievalProcedure.length > 0
          ? data.spermRetrievalProcedure.join(', ')
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data.spermRetrievalProcedure, t]);

  const additionalIvfRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Additional IVF Procedures
    list.push({
      id: 'additional_ivf_procedures',
      label: t('additionalIvfProcedures', 'Additional IVF Procedures'),
      value:
        data.additionalIvfProcedures.length > 0
          ? data.additionalIvfProcedures.join(', ')
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data.additionalIvfProcedures, t]);

  const remarksRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Remarks
    list.push({
      id: 'procedure_remarks',
      label: t('remarks', 'Remarks / Notes'),
      value: data.procedureRemarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data.procedureRemarks, t]);

  const allRows = React.useMemo(() => [
    ...spermRetrievalRows,
    ...additionalIvfRows,
    ...remarksRows,
  ], [spermRetrievalRows, additionalIvfRows, remarksRows]);

  return (
    <ObservationCard
      title={t('aiimsProcedureTitle', 'Procedure')}
      icon={Microscope}
      rows={allRows}
    />
  );
};
