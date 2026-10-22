import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_EMBRYOS_CLEAVAGE_DETAILS_FORM_UUID,
  AIIMS_EMBRYOS_CLEAVAGE_DETAILS_FORM_NAME,
} from '../config/form-uuids';
import { useEmbryosCleavageDetails } from './embryos-cleavage-details.resource';
import { EmbryosCleavageDetailsCard } from './embryos-cleavage-details-card.component';

export interface EmbryosCleavageDetailsDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const EmbryosCleavageDetailsDashboard: React.FC<EmbryosCleavageDetailsDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_EMBRYOS_CLEAVAGE_DETAILS_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useEmbryosCleavageDetails(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_EMBRYOS_CLEAVAGE_DETAILS_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingEmbryosCleavageDetails', 'Loading AIIMS Visit: Embryos Cleavage Details...')}
      emptyHeading={t('noRecordedEmbryosCleavageDetailsEncounter', 'No AIIMS Visit: Embryos Cleavage Details encounter recorded yet')}
      emptyDescription={t(
        'noEmbryosCleavageDetailsBody',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noEmbryosCleavageDetailsRecorded', 'No AIIMS Visit: Embryos Cleavage Details recorded')}
      recordButtonText={t('recordEmbryosCleavageDetails', 'Record AIIMS Visit: Embryos Cleavage Details')}
      updateButtonText={t('updateEmbryosCleavageDetails', 'Update AIIMS Visit: Embryos Cleavage Details')}
    >
      <EmbryosCleavageDetailsCard data={data} />
    </FormDashboardShell>
  );
};

export default EmbryosCleavageDetailsDashboard;
