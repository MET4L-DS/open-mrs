import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_DOSE_OF_DRUGS_FORM_UUID,
  AIIMS_DOSE_OF_DRUGS_FORM_NAME,
} from '../constants';
import { useDoseOfDrugs } from './dose-of-drugs.resource';
import { DoseOfDrugsCard } from './dose-of-drugs-card.component';
import { FormDashboardShell } from '../shared/components';

interface DoseOfDrugsDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function DoseOfDrugsDashboard({
  patientUuid,
  formUuid = AIIMS_DOSE_OF_DRUGS_FORM_UUID,
  formName = AIIMS_DOSE_OF_DRUGS_FORM_NAME,
}: DoseOfDrugsDashboardProps) {
  const { t } = useTranslation();
  const { doseOfDrugsData, isLoading, error, mutate } =
    useDoseOfDrugs(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={doseOfDrugsData.encounterUuid}
      encounterDatetime={doseOfDrugsData.encounterDatetime}
      hasData={doseOfDrugsData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingDoseOfDrugs',
        'Loading Dose of Drugs...'
      )}
      noRecordedText={t(
        'noRecordedDoseOfDrugsEncounter',
        'No AIIMS Dose of Drugs encounter recorded yet'
      )}
      emptyHeading={t(
        'noDoseOfDrugsHeader',
        'No Dose of Drugs Recorded Yet'
      )}
      emptyDescription={t(
        'noDoseOfDrugsBody',
        'The medication dosages and stimulation duration have not been recorded for this patient yet.'
      )}
      recordButtonText={t(
        'recordDoseOfDrugs',
        'Record Dose of Drugs'
      )}
      updateButtonText={t(
        'updateDoseOfDrugs',
        'Update Dose of Drugs'
      )}
    >
      <DoseOfDrugsCard data={doseOfDrugsData} />
    </FormDashboardShell>
  );
}
