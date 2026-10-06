import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_UUID,
  AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_NAME,
} from '../constants';
import { useFemaleSurgicalProcedure } from './female-surgical-procedure.resource';
import { FemaleSurgicalProcedureCard } from './female-surgical-procedure-card.component';
import { FormDashboardShell } from '../shared/components';

interface FemaleSurgicalProcedureDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function FemaleSurgicalProcedureDashboard({
  patientUuid,
  formUuid = AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_UUID,
  formName = AIIMS_FEMALE_SURGICAL_PROCEDURE_FORM_NAME,
}: FemaleSurgicalProcedureDashboardProps) {
  const { t } = useTranslation();
  const { femaleSurgicalProcedureData, isLoading, error, mutate } = useFemaleSurgicalProcedure(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={femaleSurgicalProcedureData.encounterUuid}
      encounterDatetime={femaleSurgicalProcedureData.encounterDatetime}
      hasData={femaleSurgicalProcedureData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingFemaleSurgicalProcedure',
        'Loading Investigation Female Surgical Procedure details...'
      )}
      noRecordedText={t(
        'noRecordedFemaleSurgicalProcedureEncounter',
        'No AIIMS Investigation Female Surgical Procedure encounter recorded yet'
      )}
      emptyHeading={t(
        'noFemaleSurgicalProcedureHeader',
        'No Investigation Female Surgical Procedure Recorded Yet'
      )}
      emptyDescription={t(
        'noFemaleSurgicalProcedureBody',
        'Hysteroscopy, TVS findings, and Endometrial zones have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordFemaleSurgicalProcedure', 'Record Surgical Procedure')}
      updateButtonText={t('updateFemaleSurgicalProcedure', 'Update Surgical Procedure')}
    >
      <FemaleSurgicalProcedureCard data={femaleSurgicalProcedureData} />
    </FormDashboardShell>
  );
}
