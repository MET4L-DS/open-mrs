import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_MALE_HORMONE_SURGERY_FORM_UUID,
  AIIMS_MALE_HORMONE_SURGERY_FORM_NAME,
} from '../constants';
import { useMaleHormoneSurgery } from './male-hormone-surgery.resource';
import { MaleHormoneSurgeryCard } from './male-hormone-surgery-card.component';
import { FormDashboardShell } from '../shared/components';

interface MaleHormoneSurgeryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function MaleHormoneSurgeryDashboard({
  patientUuid,
  formUuid = AIIMS_MALE_HORMONE_SURGERY_FORM_UUID,
  formName = AIIMS_MALE_HORMONE_SURGERY_FORM_NAME,
}: MaleHormoneSurgeryDashboardProps) {
  const { t } = useTranslation();
  const { maleHormoneSurgeryData, isLoading, error, mutate } = useMaleHormoneSurgery(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={maleHormoneSurgeryData.encounterUuid}
      encounterDatetime={maleHormoneSurgeryData.encounterDatetime}
      hasData={maleHormoneSurgeryData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingMaleHormoneSurgery', 'Loading Male Hormone & Surgery details...')}
      noRecordedText={t(
        'noRecordedMaleHormoneSurgeryEncounter',
        'No AIIMS Male Hormone & Surgery encounter recorded yet'
      )}
      emptyHeading={t('noMaleHormoneSurgeryHeader', 'No Male Hormone & Surgery Recorded Yet')}
      emptyDescription={t(
        'noMaleHormoneSurgeryBody',
        'Follicle stimulating hormone (FSH), serum testosterone, and testicular biopsy reports have not been submitted for this patient yet.'
      )}
      recordButtonText={t('recordMaleHormoneSurgery', 'Record Hormone & Surgery')}
      updateButtonText={t('updateMaleHormoneSurgery', 'Update Hormone & Surgery')}
    >
      <MaleHormoneSurgeryCard data={maleHormoneSurgeryData} />
    </FormDashboardShell>
  );
}
