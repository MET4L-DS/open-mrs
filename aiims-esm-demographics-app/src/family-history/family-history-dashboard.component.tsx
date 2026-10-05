import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_FAMILY_HISTORY_FORM_UUID,
  AIIMS_FAMILY_HISTORY_FORM_NAME,
} from '../constants';
import { useFamilyHistory } from './family-history.resource';
import { FamilyHistoryCard } from './family-history-card.component';
import { FormDashboardShell } from '../shared/components';

interface FamilyHistoryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function FamilyHistoryDashboard({
  patientUuid,
  formUuid = AIIMS_FAMILY_HISTORY_FORM_UUID,
  formName = AIIMS_FAMILY_HISTORY_FORM_NAME,
}: FamilyHistoryDashboardProps) {
  const { t } = useTranslation();
  const { familyHistoryData, isLoading, error, mutate } = useFamilyHistory(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={familyHistoryData.encounterUuid}
      encounterDatetime={familyHistoryData.encounterDatetime}
      hasData={familyHistoryData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingFamilyHistory', 'Loading Family History details...')}
      noRecordedText={t(
        'noRecordedFamilyHistoryEncounter',
        'No AIIMS Family History encounter recorded yet'
      )}
      emptyHeading={t('noFamilyHistoryHeader', 'No Family History Recorded Yet')}
      emptyDescription={t(
        'noFamilyHistoryBody',
        'Medical conditions, chronic illnesses, and disease history for family members have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordFamilyHistory', 'Record Family History')}
      updateButtonText={t('updateFamilyHistory', 'Update Family History')}
    >
      <FamilyHistoryCard data={familyHistoryData} />
    </FormDashboardShell>
  );
}
