import React, { useCallback } from 'react';
import { InlineLoading, InlineNotification } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDatetime, launchWorkspace2, usePatient } from '@openmrs/esm-framework';
import { AIIMS_OBSTETRIC_FORM_UUID, AIIMS_OBSTETRIC_FORM_NAME } from '../constants';
import { useObstetricHistory } from './obstetric-history.resource';
import { ObstetricHistoryCard } from './obstetric-history-card.component';
import { DashboardToolbar, EmptyState } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface ObstetricHistoryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function ObstetricHistoryDashboard({
  patientUuid: propPatientUuid,
  formUuid = AIIMS_OBSTETRIC_FORM_UUID,
  formName = AIIMS_OBSTETRIC_FORM_NAME,
}: ObstetricHistoryDashboardProps) {
  const { t } = useTranslation();
  const {
    patient,
    patientUuid: contextPatientUuid,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const {
    obstetricData,
    isLoading: isObstetricLoading,
    error: obstetricError,
    mutate,
  } = useObstetricHistory(patientUuid, formUuid);

  const handleOpenForm = useCallback(
    (encounterUuid?: string) => {
      launchWorkspace2('patient-form-entry-workspace', {
        workspaceTitle: formName,
        form: {
          uuid: formUuid,
          name: formName,
          display: formName,
        },
        encounterUuid,
        patientUuid,
        patient,
        additionalProps: {
          mode: encounterUuid ? 'edit' : 'enter',
          formSessionIntent: '*',
          openClinicalFormsWorkspaceOnFormClose: false,
        },
      });
    },
    [formUuid, formName, patientUuid, patient]
  );

  const error = patientError || obstetricError;

  if (isPatientLoading || isObstetricLoading) {
    return (
      <div className={styles.container}>
        <InlineLoading
          status="active"
          description={t('loadingObstetricHistory', 'Loading Obstetric History...')}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <InlineNotification
          kind="error"
          title={t('errorLoading', 'Error loading data')}
          subtitle={
            (error as Error)?.message ||
            t('genericError', 'An unexpected error occurred while fetching obstetric history details.')
          }
        />
      </div>
    );
  }

  const formattedDate = obstetricData.encounterDatetime
    ? formatDatetime(new Date(obstetricData.encounterDatetime))
    : null;

  return (
    <div className={styles.container}>
      <DashboardToolbar
        lastRecordedDate={formattedDate}
        noRecordedText={t(
          'noRecordedObstetricHistoryEncounter',
          'No AIIMS Obstetric History encounter recorded yet'
        )}
        hasData={obstetricData.hasData}
        onRefresh={() => mutate()}
        onRecord={() => handleOpenForm()}
        onUpdate={() => handleOpenForm(obstetricData.encounterUuid)}
        recordButtonText={t('recordObstetricHistory', 'Record Obstetric History')}
        updateButtonText={t('updateObstetricHistory', 'Update Obstetric History')}
        hidePrimaryActionOnEmpty={true}
      />

      {!obstetricData.hasData ? (
        <EmptyState
          heading={t('noObstetricHistoryHeader', 'No Obstetric History Recorded Yet')}
          description={t(
            'noObstetricHistoryBody',
            'Gravida, parity, living children, abortion/miscarriage, and ectopic pregnancy details have not been submitted for this patient yet.'
          )}
          actionText={t('recordObstetricHistory', 'Record Obstetric History')}
          onAction={() => handleOpenForm()}
        />
      ) : (
        <div className={styles.grid}>
          <ObstetricHistoryCard data={obstetricData} />
        </div>
      )}
    </div>
  );
}
