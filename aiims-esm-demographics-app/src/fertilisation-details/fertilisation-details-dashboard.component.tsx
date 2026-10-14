import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_FERTILISATION_DETAILS_FORM_UUID,
  AIIMS_FERTILISATION_DETAILS_FORM_NAME,
} from '../config/form-uuids';
import { useFertilisationDetails } from './fertilisation-details.resource';
import { FertilisationDetailsCard } from './fertilisation-details-card.component';

export interface FertilisationDetailsDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const FertilisationDetailsDashboard: React.FC<FertilisationDetailsDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_FERTILISATION_DETAILS_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useFertilisationDetails(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_FERTILISATION_DETAILS_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingFertilisationDetails', 'Loading AIIMS Visit: Fertilisation Details...')}
      emptyHeading={t('noRecordedFertilisationDetailsEncounter', 'No AIIMS Visit: Fertilisation Details encounter recorded yet')}
      emptyDescription={t(
        'noFertilisationDetailsBody',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noFertilisationDetailsRecorded', 'No AIIMS Visit: Fertilisation Details recorded')}
      recordButtonText={t('recordFertilisationDetails', 'Record AIIMS Visit: Fertilisation Details')}
      updateButtonText={t('updateFertilisationDetails', 'Update AIIMS Visit: Fertilisation Details')}
    >
      <FertilisationDetailsCard data={data} />
    </FormDashboardShell>
  );
};

export default FertilisationDetailsDashboard;
