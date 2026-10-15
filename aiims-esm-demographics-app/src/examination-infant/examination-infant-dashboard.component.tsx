import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_EXAMINATION_INFANT_FORM_UUID,
  AIIMS_EXAMINATION_INFANT_FORM_NAME,
} from '../config/form-uuids';
import { useExaminationInfant } from './examination-infant.resource';
import { ExaminationInfantCard } from './examination-infant-card.component';

export interface ExaminationInfantDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const ExaminationInfantDashboard: React.FC<ExaminationInfantDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_EXAMINATION_INFANT_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useExaminationInfant(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_EXAMINATION_INFANT_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingExaminationInfant', 'Loading AIIMS Visit: Examination Infant...')}
      emptyHeading={t('noRecordedExaminationInfantEncounter', 'No AIIMS Visit: Examination Infant encounter recorded yet')}
      emptyDescription={t(
        'noExaminationInfantBody',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noExaminationInfantRecorded', 'No AIIMS Visit: Examination Infant recorded')}
      recordButtonText={t('recordExaminationInfant', 'Record AIIMS Visit: Examination Infant')}
      updateButtonText={t('updateExaminationInfant', 'Update AIIMS Visit: Examination Infant')}
    >
      <ExaminationInfantCard data={data} />
    </FormDashboardShell>
  );
};

export default ExaminationInfantDashboard;
