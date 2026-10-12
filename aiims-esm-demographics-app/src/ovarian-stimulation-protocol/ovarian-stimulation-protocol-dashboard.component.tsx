import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_UUID,
  AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_NAME,
} from '../constants';
import { useOvarianStimulationProtocol } from './ovarian-stimulation-protocol.resource';
import { OvarianStimulationProtocolCard } from './ovarian-stimulation-protocol-card.component';
import { FormDashboardShell } from '../shared/components';

interface OvarianStimulationProtocolDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function OvarianStimulationProtocolDashboard({
  patientUuid,
  formUuid = AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_UUID,
  formName = AIIMS_OVARIAN_STIMULATION_PROTOCOL_FORM_NAME,
}: OvarianStimulationProtocolDashboardProps) {
  const { t } = useTranslation();
  const { protocolData, isLoading, error, mutate } =
    useOvarianStimulationProtocol(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={protocolData.encounterUuid}
      encounterDatetime={protocolData.encounterDatetime}
      hasData={protocolData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingOvarianStimulationProtocol',
        'Loading Ovarian Stimulation Protocol...'
      )}
      noRecordedText={t(
        'noRecordedOvarianStimulationProtocolEncounter',
        'No AIIMS Ovarian Stimulation Protocol encounter recorded yet'
      )}
      emptyHeading={t(
        'noOvarianStimulationProtocolHeader',
        'No Ovarian Stimulation Protocol Recorded Yet'
      )}
      emptyDescription={t(
        'noOvarianStimulationProtocolBody',
        'The ovarian stimulation protocol regimen and clinical notes have not been recorded for this patient yet.'
      )}
      recordButtonText={t(
        'recordOvarianStimulationProtocol',
        'Record Protocol'
      )}
      updateButtonText={t(
        'updateOvarianStimulationProtocol',
        'Update Protocol'
      )}
    >
      <OvarianStimulationProtocolCard data={protocolData} />
    </FormDashboardShell>
  );
}
