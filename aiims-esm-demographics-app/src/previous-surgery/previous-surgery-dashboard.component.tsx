import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AIIMS_PREV_SURGERY_FORM_UUID,
  AIIMS_PREV_SURGERY_FORM_NAME,
} from '../constants';
import { usePreviousSurgery } from './previous-surgery.resource';
import { PreviousSurgeryCard } from './previous-surgery-card.component';
import { PreviousHysteroscopyCard } from './previous-hysteroscopy-card.component';
import { FormDashboardShell } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface PreviousSurgeryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function PreviousSurgeryDashboard({
  patientUuid,
  formUuid = AIIMS_PREV_SURGERY_FORM_UUID,
  formName = AIIMS_PREV_SURGERY_FORM_NAME,
}: PreviousSurgeryDashboardProps) {
  const { t } = useTranslation();
  const { previousSurgeryData, isLoading, error, mutate } = usePreviousSurgery(
    patientUuid,
    formUuid
  );

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={formName}
      encounterUuid={previousSurgeryData.encounterUuid}
      encounterDatetime={previousSurgeryData.encounterDatetime}
      hasData={previousSurgeryData.hasData}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loadingPreviousSurgery', 'Loading Previous Fertility Enhancing Surgery history...')}
      noRecordedText={t(
        'noRecordedPreviousSurgeryEncounter',
        'No AIIMS Previous Fertility Enhancing Surgery encounter recorded yet'
      )}
      emptyHeading={t('noPreviousSurgeryHeader', 'No Previous Fertility Enhancing Surgery History Recorded Yet')}
      emptyDescription={t(
        'noPreviousSurgeryBody',
        'Previous surgical procedures including laparoscopy, laparotomy, and pelvic interventions have not been recorded for this patient yet.'
      )}
      recordButtonText={t('recordPreviousSurgery', 'Record Previous Fertility Enhancing Surgery')}
      updateButtonText={t('updatePreviousSurgery', 'Update Previous Fertility Enhancing Surgery')}
    >
      <div className={styles.cardContainer}>
        <PreviousSurgeryCard data={previousSurgeryData} />
        <PreviousHysteroscopyCard data={previousSurgeryData} />
      </div>
    </FormDashboardShell>
  );
}
