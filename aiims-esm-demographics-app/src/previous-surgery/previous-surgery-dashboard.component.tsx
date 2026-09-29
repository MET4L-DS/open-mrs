import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_PREV_SURGERY_FORM_UUID,
  AIIMS_PREV_SURGERY_FORM_NAME,
} from '../constants';
import { usePreviousSurgery } from './previous-surgery.resource';
import { PreviousSurgeryCard } from './previous-surgery-card.component';
import { FormDashboardShell } from '../shared/components';

interface PreviousSurgeryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function PreviousSurgeryDashboard({
  patientUuid,
  formUuid = AIIMS_PREV_SURGERY_FORM_UUID,
  formName = AIIMS_PREV_SURGERY_FORM_NAME,
}: PreviousSurgeryDashboardProps) {
  const { t } = useTranslation();
  const { previousSurgeryData, isLoading, error, mutate } = usePreviousSurgery(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={previousSurgeryData.encounterUuid}
      encounterDatetime={previousSurgeryData.encounterDatetime}
      hasData={previousSurgeryData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingPreviousSurgery', 'Loading Previous Surgery history...')}
      noRecordedText={t(
        'noRecordedPreviousSurgeryEncounter',
        'No AIIMS Previous Surgery encounter recorded yet'
      )}
      emptyHeading={t('noPreviousSurgeryHeader', 'No Previous Surgery History Recorded Yet')}
      emptyDescription={t(
        'noPreviousSurgeryBody',
        'Previous surgical procedures including laparoscopy, laparotomy, and pelvic interventions have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordPreviousSurgery', 'Record Previous Surgery')}
      updateButtonText={t('updatePreviousSurgery', 'Update Previous Surgery')}
    >
      <PreviousSurgeryCard data={previousSurgeryData} />
    </FormDashboardShell>
  );
}
