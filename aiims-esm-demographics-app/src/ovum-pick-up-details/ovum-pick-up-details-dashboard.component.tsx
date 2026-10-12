import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID,
  AIIMS_OVUM_PICK_UP_DETAILS_FORM_NAME,
} from '../constants';
import { useOvumPickUpDetails } from './ovum-pick-up-details.resource';
import { OvumPickUpDetailsCard } from './ovum-pick-up-details-card.component';
import { FormDashboardShell } from '../shared/components';

interface OvumPickUpDetailsDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function OvumPickUpDetailsDashboard({
  patientUuid,
  formUuid = AIIMS_OVUM_PICK_UP_DETAILS_FORM_UUID,
  formName = AIIMS_OVUM_PICK_UP_DETAILS_FORM_NAME,
}: OvumPickUpDetailsDashboardProps) {
  const { t } = useTranslation();
  const { ovumPickUpDetailsData, isLoading, error, mutate } =
    useOvumPickUpDetails(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={ovumPickUpDetailsData.encounterUuid}
      encounterDatetime={ovumPickUpDetailsData.encounterDatetime}
      hasData={ovumPickUpDetailsData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingOvumPickUpDetails',
        'Loading Ovum Pick Up Details...'
      )}
      noRecordedText={t(
        'noRecordedOvumPickUpDetailsEncounter',
        'No AIIMS Ovum Pick Up Details encounter recorded yet'
      )}
      emptyHeading={t(
        'noOvumPickUpDetailsHeader',
        'No Ovum Pick Up Details Recorded Yet'
      )}
      emptyDescription={t(
        'noOvumPickUpDetailsBody',
        'Ovum pick up date and time, number of oocytes retrieved, FORT/FOI indices, maturity grading, and abnormal oocytes have not been recorded for this patient yet.'
      )}
      recordButtonText={t(
        'recordOvumPickUpDetails',
        'Record Ovum Pick Up Details'
      )}
      updateButtonText={t(
        'updateOvumPickUpDetails',
        'Update Ovum Pick Up Details'
      )}
    >
      <OvumPickUpDetailsCard data={ovumPickUpDetailsData} />
    </FormDashboardShell>
  );
}
