import React from 'react';
import { Activity } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsProcedureEmbryoTransferData } from './procedure-embryo-transfer.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface ProcedureEmbryoTransferCardProps {
  data: AiimsProcedureEmbryoTransferData;
}

export const ProcedureEmbryoTransferCard: React.FC<ProcedureEmbryoTransferCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Mock Embryo Transfer
    let mockEtDisplay: string | undefined = data.mockEmbryoTransfer;
    if (mockEtDisplay && data.mockEmbryoTransferSpeculum) {
      mockEtDisplay = `${mockEtDisplay} (${data.mockEmbryoTransferSpeculum})`;
    }

    list.push({
      id: 'mock_embryo_transfer',
      label: t('mockEmbryoTransfer', 'Mock Embryo Transfer'),
      value: mockEtDisplay,
      emptyPlaceholder: '—',
    });

    // Speculum Type (if recorded separately)
    list.push({
      id: 'mock_embryo_transfer_speculum',
      label: t('mockEmbryoTransferSpeculum', 'Speculum Type'),
      value: data.mockEmbryoTransferSpeculum,
      emptyPlaceholder: '—',
    });

    // Cervical Canal Direction
    list.push({
      id: 'embryo_transfer_cervical_canal_direction',
      label: t('embryoTransferCervicalCanalDirection', 'Cervical Canal Direction'),
      value: data.embryoTransferCervicalCanalDirection,
      emptyPlaceholder: '—',
    });

    // Procedure Remarks
    list.push({
      id: 'procedure_embryo_transfer_remarks',
      label: t('procedureEmbryoTransferRemarks', 'Procedure Remarks'),
      value: data.procedureEmbryoTransferRemarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t('procedureEmbryoTransferCardTitle', 'Mock Embryo Transfer & Cervical Assessment')}
      icon={Activity}
      rows={rows}
    />
  );
};
