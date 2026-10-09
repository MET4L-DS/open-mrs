import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_TRIGGER_DETAILS_FORM_UUID,
  AIIMS_TRIGGER_DETAILS_FORM_NAME,
} from '../constants';
import { useTriggerDetails } from './trigger-details.resource';
import { TriggerDetailsCard } from './trigger-details-card.component';
import { FormDashboardShell } from '../shared/components';

interface TriggerDetailsDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function TriggerDetailsDashboard({
  patientUuid,
  formUuid = AIIMS_TRIGGER_DETAILS_FORM_UUID,
  formName = AIIMS_TRIGGER_DETAILS_FORM_NAME,
}: TriggerDetailsDashboardProps) {
  const { t } = useTranslation();
  const { triggerDetailsData, isLoading, error, mutate } =
    useTriggerDetails(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={triggerDetailsData.encounterUuid}
      encounterDatetime={triggerDetailsData.encounterDatetime}
      hasData={triggerDetailsData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingTriggerDetails',
        'Loading Trigger Details...'
      )}
      noRecordedText={t(
        'noRecordedTriggerDetailsEncounter',
        'No AIIMS Trigger Details encounter recorded yet'
      )}
      emptyHeading={t(
        'noTriggerDetailsHeader',
        'No Trigger Details Recorded Yet'
      )}
      emptyDescription={t(
        'noTriggerDetailsBody',
        'Follicles on trigger day, endometrial thickness, hormone levels, and trigger administration have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordTriggerDetails', 'Record Trigger Details')}
      updateButtonText={t('updateTriggerDetails', 'Update Trigger Details')}
    >
      <TriggerDetailsCard data={triggerDetailsData} />
    </FormDashboardShell>
  );
}
