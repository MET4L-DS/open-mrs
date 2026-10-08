import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_PROCEDURE_EMBRYO_TRANSFER_FORM_UUID,
  AIIMS_PROCEDURE_EMBRYO_TRANSFER_FORM_NAME,
} from '../constants';
import { useProcedureEmbryoTransfer } from './procedure-embryo-transfer.resource';
import { ProcedureEmbryoTransferCard } from './procedure-embryo-transfer-card.component';
import { FormDashboardShell } from '../shared/components';

interface ProcedureEmbryoTransferDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function ProcedureEmbryoTransferDashboard({
  patientUuid,
  formUuid = AIIMS_PROCEDURE_EMBRYO_TRANSFER_FORM_UUID,
  formName = AIIMS_PROCEDURE_EMBRYO_TRANSFER_FORM_NAME,
}: ProcedureEmbryoTransferDashboardProps) {
  const { t } = useTranslation();
  const { procedureEmbryoTransferData, isLoading, error, mutate } = useProcedureEmbryoTransfer(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={procedureEmbryoTransferData.encounterUuid}
      encounterDatetime={procedureEmbryoTransferData.encounterDatetime}
      hasData={procedureEmbryoTransferData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingProcedureEmbryoTransfer',
        'Loading Procedure Embryo Transfer details...'
      )}
      noRecordedText={t(
        'noRecordedProcedureEmbryoTransferEncounter',
        'No AIIMS Procedure Embryo Transfer encounter recorded yet'
      )}
      emptyHeading={t(
        'noProcedureEmbryoTransferHeader',
        'No Procedure Embryo Transfer Recorded Yet'
      )}
      emptyDescription={t(
        'noProcedureEmbryoTransferBody',
        'Mock embryo transfer and cervical assessment findings have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordProcedureEmbryoTransfer', 'Record Procedure Embryo Transfer')}
      updateButtonText={t('updateProcedureEmbryoTransfer', 'Update Procedure Embryo Transfer')}
    >
      <ProcedureEmbryoTransferCard data={procedureEmbryoTransferData} />
    </FormDashboardShell>
  );
}
