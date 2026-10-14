import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_FRESH_ET_DETAILS_FORM_UUID,
  AIIMS_FRESH_ET_DETAILS_FORM_NAME,
} from '../config/form-uuids';
import { useFreshEtDetails } from './fresh-et-details.resource';
import { FreshEtDetailsCard } from './fresh-et-details-card.component';

export interface FreshEtDetailsDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const FreshEtDetailsDashboard: React.FC<FreshEtDetailsDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_FRESH_ET_DETAILS_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useFreshEtDetails(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_FRESH_ET_DETAILS_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingFreshEtDetails', 'Loading Fresh Embryo Transfer Details...')}
      emptyHeading={t('noRecordedFreshEtDetailsEncounter', 'No Fresh Embryo Transfer Details encounter recorded yet')}
      emptyDescription={t(
        'noFreshEtDetailsBody',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noFreshEtDetailsRecorded', 'No Fresh Embryo Transfer Details recorded')}
      recordButtonText={t('recordFreshEtDetails', 'Record Fresh Embryo Transfer Details')}
      updateButtonText={t('updateFreshEtDetails', 'Update Fresh Embryo Transfer Details')}
    >
      <FreshEtDetailsCard data={data} />
    </FormDashboardShell>
  );
};

export default FreshEtDetailsDashboard;
