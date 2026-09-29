import React from 'react';
import { useTranslation } from 'react-i18next';
import { AIIMS_MENSTRUAL_FORM_UUID, AIIMS_MENSTRUAL_FORM_NAME } from '../constants';
import { useMenstrualHistory } from './menstrual-history.resource';
import { MenstrualHistoryCard } from './menstrual-history-card.component';
import { FormDashboardShell } from '../shared/components';

interface MenstrualHistoryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function MenstrualHistoryDashboard({
  patientUuid,
  formUuid = AIIMS_MENSTRUAL_FORM_UUID,
  formName = AIIMS_MENSTRUAL_FORM_NAME,
}: MenstrualHistoryDashboardProps) {
  const { t } = useTranslation();
  const { menstrualData, isLoading, error, mutate } = useMenstrualHistory(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={menstrualData.encounterUuid}
      encounterDatetime={menstrualData.encounterDatetime}
      hasData={menstrualData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingMenstrualHistory', 'Loading Menstrual History...')}
      noRecordedText={t(
        'noRecordedMenstrualHistoryEncounter',
        'No AIIMS Menstrual History encounter recorded yet'
      )}
      emptyHeading={t('noMenstrualHistoryHeader', 'No Menstrual History Recorded Yet')}
      emptyDescription={t(
        'noMenstrualHistoryBody',
        'Menstrual pattern, last menstrual period, and flow details have not been submitted for this patient yet.'
      )}
      recordButtonText={t('recordMenstrualHistory', 'Record Menstrual History')}
      updateButtonText={t('updateMenstrualHistory', 'Update Menstrual History')}
    >
      <MenstrualHistoryCard data={menstrualData} />
    </FormDashboardShell>
  );
}
