import React from 'react';
import { useTranslation } from 'react-i18next';
import { AIIMS_OBSTETRIC_FORM_UUID, AIIMS_OBSTETRIC_FORM_NAME } from '../constants';
import { useObstetricHistory } from './obstetric-history.resource';
import { ObstetricHistoryCard } from './obstetric-history-card.component';
import { FormDashboardShell } from '../shared/components';

interface ObstetricHistoryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function ObstetricHistoryDashboard({
  patientUuid,
  formUuid = AIIMS_OBSTETRIC_FORM_UUID,
  formName = AIIMS_OBSTETRIC_FORM_NAME,
}: ObstetricHistoryDashboardProps) {
  const { t } = useTranslation();
  const { obstetricData, isLoading, error, mutate } = useObstetricHistory(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={obstetricData.encounterUuid}
      encounterDatetime={obstetricData.encounterDatetime}
      hasData={obstetricData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingObstetricHistory', 'Loading Obstetric History...')}
      noRecordedText={t(
        'noRecordedObstetricHistoryEncounter',
        'No AIIMS Obstetric History encounter recorded yet'
      )}
      emptyHeading={t('noObstetricHistoryHeader', 'No Obstetric History Recorded Yet')}
      emptyDescription={t(
        'noObstetricHistoryBody',
        'Gravida, parity, living children, abortion/miscarriage, and ectopic pregnancy details have not been submitted for this patient yet.'
      )}
      recordButtonText={t('recordObstetricHistory', 'Record Obstetric History')}
      updateButtonText={t('updateObstetricHistory', 'Update Obstetric History')}
    >
      <ObstetricHistoryCard data={obstetricData} />
    </FormDashboardShell>
  );
}
