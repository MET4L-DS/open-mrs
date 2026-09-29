import React from 'react';
import { useTranslation } from 'react-i18next';
import { AIIMS_INFERTILITY_FORM_UUID, AIIMS_INFERTILITY_FORM_NAME } from '../constants';
import { useInfertilityType } from './infertility-type.resource';
import { InfertilityCard } from './infertility-card.component';
import { FormDashboardShell } from '../shared/components';

interface InfertilityTypeDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function InfertilityTypeDashboard({
  patientUuid,
  formUuid = AIIMS_INFERTILITY_FORM_UUID,
  formName = AIIMS_INFERTILITY_FORM_NAME,
}: InfertilityTypeDashboardProps) {
  const { t } = useTranslation();
  const { infertilityData, isLoading, error, mutate } = useInfertilityType(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={infertilityData.encounterUuid}
      encounterDatetime={infertilityData.encounterDatetime}
      hasData={infertilityData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingInfertility', 'Loading Type of Infertility...')}
      noRecordedText={t(
        'noRecordedInfertilityEncounter',
        'No AIIMS Type of Infertility encounter recorded yet'
      )}
      emptyHeading={t('noInfertilityHeader', 'No Infertility Details Recorded Yet')}
      emptyDescription={t(
        'noInfertilityBody',
        'Infertility classification, marriage duration, and duration of infertility have not been submitted for this patient yet.'
      )}
      recordButtonText={t('recordInfertility', 'Record Infertility Details')}
      updateButtonText={t('updateInfertility', 'Update Infertility Details')}
    >
      <InfertilityCard data={infertilityData} />
    </FormDashboardShell>
  );
}
