import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_PREV_OI_IUI_FORM_UUID,
  AIIMS_PREV_OI_IUI_FORM_NAME,
} from '../constants';
import { usePreviousOiIui } from './previous-oi-iui.resource';
import { PreviousOiIuiCard } from './previous-oi-iui-card.component';
import { FormDashboardShell } from '../shared/components';

interface PreviousOiIuiDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function PreviousOiIuiDashboard({
  patientUuid,
  formUuid = AIIMS_PREV_OI_IUI_FORM_UUID,
  formName = AIIMS_PREV_OI_IUI_FORM_NAME,
}: PreviousOiIuiDashboardProps) {
  const { t } = useTranslation();
  const { previousOiIuiData, isLoading, error, mutate } = usePreviousOiIui(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={previousOiIuiData.encounterUuid}
      encounterDatetime={previousOiIuiData.encounterDatetime}
      hasData={previousOiIuiData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingPreviousOiIui', 'Loading Previous OVI & IUI history...')}
      noRecordedText={t(
        'noRecordedPreviousOiIuiEncounter',
        'No AIIMS Previous OVI and IUI encounter recorded yet'
      )}
      emptyHeading={t('noPreviousOiIuiHeader', 'No Previous OVI & IUI History Recorded Yet')}
      emptyDescription={t(
        'noPreviousOiIuiBody',
        'Previous ovulation induction (OVI), intra-uterine insemination (IUI), and prior failed IVF treatments have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordPreviousOiIui', 'Record OVI & IUI History')}
      updateButtonText={t('updatePreviousOiIui', 'Update OVI & IUI History')}
    >
      <PreviousOiIuiCard data={previousOiIuiData} />
    </FormDashboardShell>
  );
}
