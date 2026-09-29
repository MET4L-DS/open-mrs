import React from 'react';
import { useTranslation } from 'react-i18next';
import { AIIMS_FEMALE_FACTOR_FORM_UUID, AIIMS_FEMALE_FACTOR_FORM_NAME } from '../constants';
import { useFemaleFactor } from './female-factor.resource';
import { FemaleFactorCard } from './female-factor-card.component';
import { FormDashboardShell } from '../shared/components';

interface FemaleFactorDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function FemaleFactorDashboard({
  patientUuid,
  formUuid = AIIMS_FEMALE_FACTOR_FORM_UUID,
  formName = AIIMS_FEMALE_FACTOR_FORM_NAME,
}: FemaleFactorDashboardProps) {
  const { t } = useTranslation();
  const { femaleFactorData, isLoading, error, mutate } = useFemaleFactor(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={femaleFactorData.encounterUuid}
      encounterDatetime={femaleFactorData.encounterDatetime}
      hasData={femaleFactorData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingFemaleFactor', 'Loading Female Factor details...')}
      noRecordedText={t(
        'noRecordedFemaleFactorEncounter',
        'No AIIMS Female Factor encounter recorded yet'
      )}
      emptyHeading={t('noFemaleFactorHeader', 'No Female Factor Recorded Yet')}
      emptyDescription={t(
        'noFemaleFactorBody',
        'Diagnostic categories, tubal findings, ovarian reserve, PCOS phenotypes, and uterine factor details have not been submitted for this patient yet.'
      )}
      recordButtonText={t('recordFemaleFactor', 'Record Female Factor')}
      updateButtonText={t('updateFemaleFactor', 'Update Female Factor')}
    >
      <FemaleFactorCard data={femaleFactorData} />
    </FormDashboardShell>
  );
}
