import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_ADD_PROCEDURE_ART_FORM_UUID,
  AIIMS_ADD_PROCEDURE_ART_FORM_NAME,
} from '../config/form-uuids';
import { useAddProcedureArt } from './add-procedure-art.resource';
import { AddProcedureArtCard } from './add-procedure-art-card.component';

export interface AddProcedureArtDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const AddProcedureArtDashboard: React.FC<AddProcedureArtDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_ADD_PROCEDURE_ART_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useAddProcedureArt(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_ADD_PROCEDURE_ART_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingAddProcedureArt', 'Loading Additional Procedures in Assisted Reproductive Technology...')}
      emptyHeading={t('noRecordedAddProcedureArtEncounter', 'No Additional Procedures in Assisted Reproductive Technology encounter recorded yet')}
      emptyDescription={t(
        'noAddProcedureArtBody',
        'Additional procedures in Assisted Reproductive Technology have not been recorded for this patient yet.'
      )}
      noRecordedText={t('noAddProcedureArtRecorded', 'No Additional Procedures in Assisted Reproductive Technology recorded')}
      recordButtonText={t('recordAddProcedureArt', 'Record Additional Procedures in Assisted Reproductive Technology')}
      updateButtonText={t('updateAddProcedureArt', 'Update Additional Procedures in Assisted Reproductive Technology')}
    >
      <AddProcedureArtCard data={data} />
    </FormDashboardShell>
  );
};

export default AddProcedureArtDashboard;
