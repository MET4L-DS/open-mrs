import React from 'react';
import { Medication } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsOvarianStimulationProtocolData } from './ovarian-stimulation-protocol.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface OvarianStimulationProtocolCardProps {
  data: AiimsOvarianStimulationProtocolData | null;
}

export const OvarianStimulationProtocolCard: React.FC<OvarianStimulationProtocolCardProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Protocol Regimen
    list.push({
      id: 'ovarian_stimulation_protocol',
      label: t('ovarianStimulationProtocol', 'Stimulation Protocol'),
      value: data?.protocol,
      emptyPlaceholder: '—',
    });

    // Remarks
    list.push({
      id: 'ovarian_stimulation_protocol_remarks',
      label: t('ovarianStimulationProtocolRemarks', 'Remarks / Notes'),
      value: data?.remarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t(
        'ovarianStimulationProtocolCardTitle',
        'Ovarian Stimulation Protocol'
      )}
      icon={Medication}
      rows={rows}
    />
  );
};
