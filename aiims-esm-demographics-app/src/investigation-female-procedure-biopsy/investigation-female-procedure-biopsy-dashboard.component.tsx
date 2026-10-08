import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_INVESTIGATION_FEMALE_PROCEDURE_BIOPSY_FORM_UUID,
  AIIMS_INVESTIGATION_FEMALE_PROCEDURE_BIOPSY_FORM_NAME,
} from '../constants';
import { useInvestigationFemaleProcedureBiopsy } from './investigation-female-procedure-biopsy.resource';
import { InvestigationFemaleProcedureBiopsyCard } from './investigation-female-procedure-biopsy-card.component';
import { FormDashboardShell } from '../shared/components';

interface InvestigationFemaleProcedureBiopsyDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function InvestigationFemaleProcedureBiopsyDashboard({
  patientUuid,
  formUuid = AIIMS_INVESTIGATION_FEMALE_PROCEDURE_BIOPSY_FORM_UUID,
  formName = AIIMS_INVESTIGATION_FEMALE_PROCEDURE_BIOPSY_FORM_NAME,
}: InvestigationFemaleProcedureBiopsyDashboardProps) {
  const { t } = useTranslation();
  const { procedureBiopsyData, isLoading, error, mutate } =
    useInvestigationFemaleProcedureBiopsy(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={procedureBiopsyData.encounterUuid}
      encounterDatetime={procedureBiopsyData.encounterDatetime}
      hasData={procedureBiopsyData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingProcedureBiopsy',
        'Loading Investigation Female Procedure Biopsy details...'
      )}
      noRecordedText={t(
        'noRecordedProcedureBiopsyEncounter',
        'No AIIMS Investigation Female Procedure Biopsy encounter recorded yet'
      )}
      emptyHeading={t(
        'noProcedureBiopsyHeader',
        'No Biopsy Investigation Recorded Yet'
      )}
      emptyDescription={t(
        'noProcedureBiopsyBody',
        'Endometrial aspiration histopathological examination, PCR, and AFB findings have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordProcedureBiopsy', 'Record Biopsy Investigation')}
      updateButtonText={t('updateProcedureBiopsy', 'Update Biopsy Investigation')}
    >
      <InvestigationFemaleProcedureBiopsyCard data={procedureBiopsyData} />
    </FormDashboardShell>
  );
}
