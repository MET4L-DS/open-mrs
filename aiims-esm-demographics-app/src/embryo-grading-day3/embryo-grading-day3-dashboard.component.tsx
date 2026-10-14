import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_EMBRYO_GRADING_DAY3_FORM_UUID,
  AIIMS_EMBRYO_GRADING_DAY3_FORM_NAME,
} from '../config/form-uuids';
import { useEmbryoGradingDay3 } from './embryo-grading-day3.resource';
import { EmbryoGradingDay3Card } from './embryo-grading-day3-card.component';

export interface EmbryoGradingDay3DashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const EmbryoGradingDay3Dashboard: React.FC<EmbryoGradingDay3DashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_EMBRYO_GRADING_DAY3_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useEmbryoGradingDay3(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_EMBRYO_GRADING_DAY3_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingEmbryoGradingDay3', 'Loading AIIMS Visit: Embryo Grading Day 3...')}
      emptyHeading={t('noRecordedEmbryoGradingDay3Encounter', 'No AIIMS Visit: Embryo Grading Day 3 encounter recorded yet')}
      emptyDescription={t(
        'noEmbryoGradingDay3Body',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noEmbryoGradingDay3Recorded', 'No AIIMS Visit: Embryo Grading Day 3 recorded')}
      recordButtonText={t('recordEmbryoGradingDay3', 'Record AIIMS Visit: Embryo Grading Day 3')}
      updateButtonText={t('updateEmbryoGradingDay3', 'Update AIIMS Visit: Embryo Grading Day 3')}
    >
      <EmbryoGradingDay3Card data={data} />
    </FormDashboardShell>
  );
};

export default EmbryoGradingDay3Dashboard;
