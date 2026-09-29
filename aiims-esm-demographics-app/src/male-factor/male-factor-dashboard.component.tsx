import React from 'react';
import { useTranslation } from 'react-i18next';
import { AIIMS_MALE_FACTOR_FORM_UUID, AIIMS_MALE_FACTOR_FORM_NAME } from '../constants';
import { useMaleFactor } from './male-factor.resource';
import { MaleFactorCard } from './male-factor-card.component';
import { FormDashboardShell } from '../shared/components';

interface MaleFactorDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function MaleFactorDashboard({
  patientUuid,
  formUuid = AIIMS_MALE_FACTOR_FORM_UUID,
  formName = AIIMS_MALE_FACTOR_FORM_NAME,
}: MaleFactorDashboardProps) {
  const { t } = useTranslation();
  const { maleFactorData, isLoading, error, mutate } = useMaleFactor(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={maleFactorData.encounterUuid}
      encounterDatetime={maleFactorData.encounterDatetime}
      hasData={maleFactorData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingMaleFactor', 'Loading Male Factor details...')}
      noRecordedText={t(
        'noRecordedMaleFactorEncounter',
        'No AIIMS Male Factor encounter recorded yet'
      )}
      emptyHeading={t('noMaleFactorHeader', 'No Male Factor Recorded Yet')}
      emptyDescription={t(
        'noMaleFactorBody',
        'Semen analysis indicators, azoospermia details, and other male infertility factors have not been submitted for this patient yet.'
      )}
      recordButtonText={t('recordMaleFactor', 'Record Male Factor')}
      updateButtonText={t('updateMaleFactor', 'Update Male Factor')}
    >
      <MaleFactorCard data={maleFactorData} />
    </FormDashboardShell>
  );
}
