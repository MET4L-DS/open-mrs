import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_UUID,
  AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_NAME,
} from '../constants';
import { useLabProcedureInsemination } from './lab-procedure-insemination.resource';
import { LabProcedureInseminationCard } from './lab-procedure-insemination-card.component';
import { FormDashboardShell } from '../shared/components';

interface LabProcedureInseminationDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function LabProcedureInseminationDashboard({
  patientUuid,
  formUuid = AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_UUID,
  formName = AIIMS_LAB_PROCEDURE_INSEMINATION_FORM_NAME,
}: LabProcedureInseminationDashboardProps) {
  const { t } = useTranslation();
  const { labProcedureInseminationData, isLoading, error, mutate } =
    useLabProcedureInsemination(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={labProcedureInseminationData.encounterUuid}
      encounterDatetime={labProcedureInseminationData.encounterDatetime}
      hasData={labProcedureInseminationData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingLabProcedureInsemination',
        'Loading Lab Procedure of Insemination...'
      )}
      noRecordedText={t(
        'noRecordedLabProcedureInseminationEncounter',
        'No AIIMS Lab Procedure of Insemination encounter recorded yet'
      )}
      emptyHeading={t(
        'noLabProcedureInseminationHeader',
        'No Lab Procedure of Insemination Recorded Yet'
      )}
      emptyDescription={t(
        'noLabProcedureInseminationBody',
        'Insemination method (IVF, ICSI, PICSI, AOA) and injection timing have not been recorded for this patient yet.'
      )}
      recordButtonText={t(
        'recordLabProcedureInsemination',
        'Record Lab Procedure of Insemination'
      )}
      updateButtonText={t(
        'updateLabProcedureInsemination',
        'Update Lab Procedure of Insemination'
      )}
    >
      <LabProcedureInseminationCard data={labProcedureInseminationData} />
    </FormDashboardShell>
  );
}
