import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_EMBRYOS_FROZEN_FORM_UUID,
  AIIMS_EMBRYOS_FROZEN_FORM_NAME,
} from '../config/form-uuids';
import { useEmbryosFrozen } from './embryos-frozen.resource';
import { EmbryosFrozenCard } from './embryos-frozen-card.component';

export interface EmbryosFrozenDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const EmbryosFrozenDashboard: React.FC<EmbryosFrozenDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_EMBRYOS_FROZEN_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useEmbryosFrozen(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_EMBRYOS_FROZEN_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingEmbryosFrozen', 'Loading AIIMS Visit: Embryos Frozen...')}
      emptyHeading={t('noRecordedEmbryosFrozenEncounter', 'No AIIMS Visit: Embryos Frozen encounter recorded yet')}
      emptyDescription={t(
        'noEmbryosFrozenBody',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noEmbryosFrozenRecorded', 'No AIIMS Visit: Embryos Frozen recorded')}
      recordButtonText={t('recordEmbryosFrozen', 'Record AIIMS Visit: Embryos Frozen')}
      updateButtonText={t('updateEmbryosFrozen', 'Update AIIMS Visit: Embryos Frozen')}
    >
      <EmbryosFrozenCard data={data} />
    </FormDashboardShell>
  );
};

export default EmbryosFrozenDashboard;
