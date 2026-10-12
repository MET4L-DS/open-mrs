import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_PROCEDURE_FORM_UUID,
  AIIMS_PROCEDURE_FORM_NAME,
} from '../constants';
import { useProcedure } from './procedure.resource';
import { ProcedureCard } from './procedure-card.component';
import { FormDashboardShell } from '../shared/components';

interface ProcedureDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function ProcedureDashboard({
  patientUuid,
  formUuid = AIIMS_PROCEDURE_FORM_UUID,
  formName = AIIMS_PROCEDURE_FORM_NAME,
}: ProcedureDashboardProps) {
  const { t } = useTranslation();
  const { procedureData, isLoading, error, mutate } = useProcedure(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={procedureData.encounterUuid}
      encounterDatetime={procedureData.encounterDatetime}
      hasData={procedureData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingProcedure', 'Loading Procedure details...')}
      noRecordedText={t(
        'noRecordedProcedureEncounter',
        'No AIIMS Procedure encounter recorded yet'
      )}
      emptyHeading={t('noProcedureHeader', 'No Procedure Recorded Yet')}
      emptyDescription={t(
        'noProcedureBody',
        'Sperm retrieval procedures (PESA, TESA, ejaculated, frozen, donor/husband semen) and additional IVF procedures (LAH, PICSI, AOA) have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordProcedure', 'Record Procedure')}
      updateButtonText={t('updateProcedure', 'Update Procedure')}
    >
      <ProcedureCard data={procedureData} />
    </FormDashboardShell>
  );
}
