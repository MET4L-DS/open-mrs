import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_ADJUVANT_DRUG_FORM_UUID,
  AIIMS_ADJUVANT_DRUG_FORM_NAME,
} from '../constants';
import { useAdjuvantDrug } from './adjuvant-drug.resource';
import { AdjuvantDrugCard } from './adjuvant-drug-card.component';
import { FormDashboardShell } from '../shared/components';

interface AdjuvantDrugDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function AdjuvantDrugDashboard({
  patientUuid,
  formUuid = AIIMS_ADJUVANT_DRUG_FORM_UUID,
  formName = AIIMS_ADJUVANT_DRUG_FORM_NAME,
}: AdjuvantDrugDashboardProps) {
  const { t } = useTranslation();
  const { adjuvantDrugData, isLoading, error, mutate } =
    useAdjuvantDrug(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={adjuvantDrugData.encounterUuid}
      encounterDatetime={adjuvantDrugData.encounterDatetime}
      hasData={adjuvantDrugData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingAdjuvantDrug',
        'Loading Adjuvant Drug...'
      )}
      noRecordedText={t(
        'noRecordedAdjuvantDrugEncounter',
        'No AIIMS Adjuvant Drug encounter recorded yet'
      )}
      emptyHeading={t(
        'noAdjuvantDrugHeader',
        'No Adjuvant Drug Recorded Yet'
      )}
      emptyDescription={t(
        'noAdjuvantDrugBody',
        'Growth hormone therapy and adjuvant medication details have not been recorded for this patient yet.'
      )}
      recordButtonText={t(
        'recordAdjuvantDrug',
        'Record Adjuvant Drug'
      )}
      updateButtonText={t(
        'updateAdjuvantDrug',
        'Update Adjuvant Drug'
      )}
    >
      <AdjuvantDrugCard data={adjuvantDrugData} />
    </FormDashboardShell>
  );
}
