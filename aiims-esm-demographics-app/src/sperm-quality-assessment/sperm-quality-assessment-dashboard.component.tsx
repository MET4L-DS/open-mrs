import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID,
  AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_NAME,
} from '../constants';
import { useSpermQualityAssessment } from './sperm-quality-assessment.resource';
import { SpermQualityAssessmentCard } from './sperm-quality-assessment-card.component';
import { FormDashboardShell } from '../shared/components';

interface SpermQualityAssessmentDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function SpermQualityAssessmentDashboard({
  patientUuid,
  formUuid = AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_UUID,
  formName = AIIMS_SPERM_QUALITY_ASSESSMENT_FORM_NAME,
}: SpermQualityAssessmentDashboardProps) {
  const { t } = useTranslation();
  const { spermQualityData, isLoading, error, mutate } =
    useSpermQualityAssessment(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={spermQualityData.encounterUuid}
      encounterDatetime={spermQualityData.encounterDatetime}
      hasData={spermQualityData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingSpermQualityAssessment',
        'Loading Sperm Quality Assessment...'
      )}
      noRecordedText={t(
        'noRecordedSpermQualityAssessmentEncounter',
        'No AIIMS Sperm Quality Assessment encounter recorded yet'
      )}
      emptyHeading={t(
        'noSpermQualityAssessmentHeader',
        'No Sperm Quality Assessment Recorded Yet'
      )}
      emptyDescription={t(
        'noSpermQualityAssessmentBody',
        'Post wash sperm concentration and sperm motility on ovum pick up day have not been recorded for this patient yet.'
      )}
      recordButtonText={t(
        'recordSpermQualityAssessment',
        'Record Sperm Quality Assessment'
      )}
      updateButtonText={t(
        'updateSpermQualityAssessment',
        'Update Sperm Quality Assessment'
      )}
    >
      <SpermQualityAssessmentCard data={spermQualityData} />
    </FormDashboardShell>
  );
}
