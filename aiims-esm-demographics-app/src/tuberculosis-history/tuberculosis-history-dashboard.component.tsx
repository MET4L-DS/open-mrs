import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID,
  AIIMS_TUBERCULOSIS_HISTORY_FORM_NAME,
} from '../constants';
import { useTuberculosisHistory } from './tuberculosis-history.resource';
import { TuberculosisHistoryCard } from './tuberculosis-history-card.component';
import { FormDashboardShell } from '../shared/components';

interface TuberculosisHistoryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function TuberculosisHistoryDashboard({
  patientUuid,
  formUuid = AIIMS_TUBERCULOSIS_HISTORY_FORM_UUID,
  formName = AIIMS_TUBERCULOSIS_HISTORY_FORM_NAME,
}: TuberculosisHistoryDashboardProps) {
  const { t } = useTranslation();
  const { tuberculosisHistoryData, isLoading, error, mutate } = useTuberculosisHistory(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={tuberculosisHistoryData.encounterUuid}
      encounterDatetime={tuberculosisHistoryData.encounterDatetime}
      hasData={tuberculosisHistoryData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingTuberculosisHistory', 'Loading Tuberculosis History details...')}
      noRecordedText={t(
        'noRecordedTuberculosisHistoryEncounter',
        'No AIIMS Tuberculosis History encounter recorded yet'
      )}
      emptyHeading={t('noTuberculosisHistoryHeader', 'No Tuberculosis History Recorded Yet')}
      emptyDescription={t(
        'noTuberculosisHistoryBody',
        'Tuberculosis diagnosis, sites of infection, and anti-tubercular therapy (ATT) details have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordTuberculosisHistory', 'Record Tuberculosis History')}
      updateButtonText={t('updateTuberculosisHistory', 'Update Tuberculosis History')}
    >
      <TuberculosisHistoryCard data={tuberculosisHistoryData} />
    </FormDashboardShell>
  );
}
