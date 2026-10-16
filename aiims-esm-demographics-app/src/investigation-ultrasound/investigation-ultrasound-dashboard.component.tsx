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
      loadingDescription={t('loadingInvestigationFemaleTransvaginalUltrasound', 'Loading Transvaginal Ultrasound details...')}
      noRecordedText={t(
        'noRecordedInvestigationFemaleTransvaginalUltrasoundEncounter',
        'No AIIMS Transvaginal Ultrasound encounter recorded yet'
      )}
      emptyHeading={t('noInvestigationFemaleTransvaginalUltrasoundHeader', 'No Transvaginal Ultrasound Recorded Yet')}
      emptyDescription={t(
        'noInvestigationFemaleTransvaginalUltrasoundBody',
        'Transvaginal ultrasound (TVS) findings including uterine dimensions, fibroids, cavity anomalies, antral follicles, and ovarian cysts have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordInvestigationFemaleTransvaginalUltrasound', 'Record Female Transvaginal Ultrasound')}
      updateButtonText={t('updateInvestigationFemaleTransvaginalUltrasound', 'Update Female Transvaginal Ultrasound')}
    >
      <InvestigationUltrasoundCard data={investigationUltrasoundData} />
    </FormDashboardShell>
  );
}
