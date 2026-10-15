import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_POST_IVF_INVESTIGATION_FORM_UUID,
  AIIMS_POST_IVF_INVESTIGATION_FORM_NAME,
} from '../config/form-uuids';
import { usePostIvfInvestigation } from './post-ivf-investigation.resource';
import { PostIvfInvestigationCard } from './post-ivf-investigation-card.component';

export interface PostIvfInvestigationDashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const PostIvfInvestigationDashboard: React.FC<PostIvfInvestigationDashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_POST_IVF_INVESTIGATION_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = usePostIvfInvestigation(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_POST_IVF_INVESTIGATION_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingPostIvfInvestigation', 'Loading AIIMS Visit: Post-InVitro Fertilisation Investigation...')}
      emptyHeading={t('noRecordedPostIvfInvestigationEncounter', 'No AIIMS Visit: Post-InVitro Fertilisation Investigation encounter recorded yet')}
      emptyDescription={t(
        'noPostIvfInvestigationBody',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('noPostIvfInvestigationRecorded', 'No AIIMS Visit: Post-InVitro Fertilisation Investigation recorded')}
      recordButtonText={t('recordPostIvfInvestigation', 'Record AIIMS Visit: Post-InVitro Fertilisation Investigation')}
      updateButtonText={t('updatePostIvfInvestigation', 'Update AIIMS Visit: Post-InVitro Fertilisation Investigation')}
    >
      <PostIvfInvestigationCard data={data} />
    </FormDashboardShell>
  );
};

export default PostIvfInvestigationDashboard;
