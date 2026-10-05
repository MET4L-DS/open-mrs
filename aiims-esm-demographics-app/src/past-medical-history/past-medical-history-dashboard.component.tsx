import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_PAST_MEDICAL_HISTORY_FORM_UUID,
  AIIMS_PAST_MEDICAL_HISTORY_FORM_NAME,
} from '../constants';
import { usePastMedicalHistory } from './past-medical-history.resource';
import { PastMedicalHistoryCard } from './past-medical-history-card.component';
import { FormDashboardShell } from '../shared/components';

interface PastMedicalHistoryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function PastMedicalHistoryDashboard({
  patientUuid,
  formUuid = AIIMS_PAST_MEDICAL_HISTORY_FORM_UUID,
  formName = AIIMS_PAST_MEDICAL_HISTORY_FORM_NAME,
}: PastMedicalHistoryDashboardProps) {
  const { t } = useTranslation();
  const { pastMedicalHistoryData, isLoading, error, mutate } = usePastMedicalHistory(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={pastMedicalHistoryData.encounterUuid}
      encounterDatetime={pastMedicalHistoryData.encounterDatetime}
      hasData={pastMedicalHistoryData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingPastMedicalHistory', 'Loading Past Medical History details...')}
      noRecordedText={t(
        'noRecordedPastMedicalHistoryEncounter',
        'No AIIMS Past Medical History encounter recorded yet'
      )}
      emptyHeading={t('noPastMedicalHistoryHeader', 'No Past Medical History Recorded Yet')}
      emptyDescription={t(
        'noPastMedicalHistoryBody',
        'Past medical conditions, chronic illnesses, and medical disease history have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordPastMedicalHistory', 'Record Past Medical History')}
      updateButtonText={t('updatePastMedicalHistory', 'Update Past Medical History')}
    >
      <PastMedicalHistoryCard data={pastMedicalHistoryData} />
    </FormDashboardShell>
  );
}
