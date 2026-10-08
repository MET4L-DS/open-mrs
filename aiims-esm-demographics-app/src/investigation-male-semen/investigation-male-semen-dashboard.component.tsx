import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID,
  AIIMS_INVESTIGATION_MALE_SEMEN_FORM_NAME,
} from '../constants';
import { useInvestigationMaleSemen } from './investigation-male-semen.resource';
import { InvestigationMaleSemenCard } from './investigation-male-semen-card.component';
import { FormDashboardShell } from '../shared/components';

interface InvestigationMaleSemenDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function InvestigationMaleSemenDashboard({
  patientUuid,
  formUuid = AIIMS_INVESTIGATION_MALE_SEMEN_FORM_UUID,
  formName = AIIMS_INVESTIGATION_MALE_SEMEN_FORM_NAME,
}: InvestigationMaleSemenDashboardProps) {
  const { t } = useTranslation();
  const { maleSemenData, isLoading, error, mutate } =
    useInvestigationMaleSemen(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={maleSemenData.encounterUuid}
      encounterDatetime={maleSemenData.encounterDatetime}
      hasData={maleSemenData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t(
        'loadingMaleSemen',
        'Loading Investigation Male Semen details...'
      )}
      noRecordedText={t(
        'noRecordedMaleSemenEncounter',
        'No AIIMS Investigation Male Semen encounter recorded yet'
      )}
      emptyHeading={t(
        'noMaleSemenHeader',
        'No Semen Analysis Recorded Yet'
      )}
      emptyDescription={t(
        'noMaleSemenBody',
        'Husband semen analysis volume, count, motility, and sperm morphology have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordMaleSemen', 'Record Semen Analysis')}
      updateButtonText={t('updateMaleSemen', 'Update Semen Analysis')}
    >
      <InvestigationMaleSemenCard data={maleSemenData} />
    </FormDashboardShell>
  );
}
