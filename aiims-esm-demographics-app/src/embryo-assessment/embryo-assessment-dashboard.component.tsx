import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_EMBRYO_ASSESSMENT_FORM_UUID,
  AIIMS_EMBRYO_ASSESSMENT_FORM_NAME,
} from '../config/form-uuids';
import { useEmbryoAssessment } from './embryo-assessment.resource';
import { EmbryoAssessmentCard } from './embryo-assessment-card.component';

export interface EmbryoAssessmentDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const EmbryoAssessmentDashboard: React.FC<EmbryoAssessmentDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_EMBRYO_ASSESSMENT_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = useEmbryoAssessment(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_EMBRYO_ASSESSMENT_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingEmbryoAssessment', 'Loading AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst...')}
      emptyHeading={t('noRecordedEmbryoAssessmentEncounter', 'No AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst encounter recorded yet')}
      emptyDescription={t(
        'noEmbryoAssessmentBody',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noEmbryoAssessmentRecorded', 'No AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst recorded')}
      recordButtonText={t('recordEmbryoAssessment', 'Record AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst')}
      updateButtonText={t('updateEmbryoAssessment', 'Update AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst')}
    >
      <EmbryoAssessmentCard data={data} />
    </FormDashboardShell>
  );
};

export default EmbryoAssessmentDashboard;
