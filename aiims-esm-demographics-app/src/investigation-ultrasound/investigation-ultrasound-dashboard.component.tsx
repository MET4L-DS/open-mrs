import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID,
  AIIMS_INVESTIGATION_ULTRASOUND_FORM_NAME,
} from '../constants';
import { useInvestigationUltrasound } from './investigation-ultrasound.resource';
import { InvestigationUltrasoundCard } from './investigation-ultrasound-card.component';
import { FormDashboardShell } from '../shared/components';

interface InvestigationUltrasoundDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function InvestigationUltrasoundDashboard({
  patientUuid,
  formUuid = AIIMS_INVESTIGATION_ULTRASOUND_FORM_UUID,
  formName = AIIMS_INVESTIGATION_ULTRASOUND_FORM_NAME,
}: InvestigationUltrasoundDashboardProps) {
  const { t } = useTranslation();
  const { investigationUltrasoundData, isLoading, error, mutate } = useInvestigationUltrasound(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={investigationUltrasoundData.encounterUuid}
      encounterDatetime={investigationUltrasoundData.encounterDatetime}
      hasData={investigationUltrasoundData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingInvestigationUltrasound', 'Loading Investigation Ultrasound details...')}
      noRecordedText={t(
        'noRecordedInvestigationUltrasoundEncounter',
        'No AIIMS Investigation Ultrasound encounter recorded yet'
      )}
      emptyHeading={t('noInvestigationUltrasoundHeader', 'No Investigation Ultrasound Recorded Yet')}
      emptyDescription={t(
        'noInvestigationUltrasoundBody',
        'Total antral follicle count and ovary volumes have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordInvestigationUltrasound', 'Record Investigation Ultrasound')}
      updateButtonText={t('updateInvestigationUltrasound', 'Update Investigation Ultrasound')}
    >
      <InvestigationUltrasoundCard data={investigationUltrasoundData} />
    </FormDashboardShell>
  );
}
