import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID,
  AIIMS_FEMALE_BLOOD_HORMONE_FORM_NAME,
} from '../constants';
import { useFemaleBloodHormone } from './female-blood-hormone.resource';
import { FemaleBloodHormoneCard } from './female-blood-hormone-card.component';
import { FormDashboardShell } from '../shared/components';

interface FemaleBloodHormoneDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function FemaleBloodHormoneDashboard({
  patientUuid,
  formUuid = AIIMS_FEMALE_BLOOD_HORMONE_FORM_UUID,
  formName = AIIMS_FEMALE_BLOOD_HORMONE_FORM_NAME,
}: FemaleBloodHormoneDashboardProps) {
  const { t } = useTranslation();
  const { femaleBloodHormoneData, isLoading, error, mutate } = useFemaleBloodHormone(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={femaleBloodHormoneData.encounterUuid}
      encounterDatetime={femaleBloodHormoneData.encounterDatetime}
      hasData={femaleBloodHormoneData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingFemaleBloodHormone',
        'Loading Investigation Female Blood Hormone details...'
      )}
      noRecordedText={t(
        'noRecordedFemaleBloodHormoneEncounter',
        'No AIIMS Investigation Female Blood Hormone encounter recorded yet'
      )}
      emptyHeading={t(
        'noFemaleBloodHormoneHeader',
        'No Investigation Female Blood Hormone Recorded Yet'
      )}
      emptyDescription={t(
        'noFemaleBloodHormoneBody',
        'Anti-Mullerian hormone, FSH, LH, TSH, and serum prolactin levels have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordFemaleBloodHormone', 'Record Female Blood Hormone')}
      updateButtonText={t('updateFemaleBloodHormone', 'Update Female Blood Hormone')}
    >
      <FemaleBloodHormoneCard data={femaleBloodHormoneData} />
    </FormDashboardShell>
  );
}
