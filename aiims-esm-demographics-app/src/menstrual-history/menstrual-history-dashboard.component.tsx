import React, { useCallback } from 'react';
import { InlineLoading, InlineNotification } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDatetime, launchWorkspace2, usePatient } from '@openmrs/esm-framework';
import { AIIMS_MENSTRUAL_FORM_UUID, AIIMS_MENSTRUAL_FORM_NAME } from '../constants';
import { useMenstrualHistory } from './menstrual-history.resource';
import { MenstrualHistoryCard } from './menstrual-history-card.component';
import { DashboardToolbar, EmptyState } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface MenstrualHistoryDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function MenstrualHistoryDashboard({
  patientUuid: propPatientUuid,
  formUuid = AIIMS_MENSTRUAL_FORM_UUID,
  formName = AIIMS_MENSTRUAL_FORM_NAME,
}: MenstrualHistoryDashboardProps) {
  const { t } = useTranslation();
  const {
    patient,
    patientUuid: contextPatientUuid,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const {
    menstrualData,
    isLoading: isMenstrualLoading,
    error: menstrualError,
    mutate,
  } = useMenstrualHistory(patientUuid, formUuid);

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

  const error = patientError || menstrualError;

  if (isPatientLoading || isMenstrualLoading) {
    return (
      <div className={styles.container}>
        <InlineLoading
          status="active"
          description={t('loadingMenstrualHistory', 'Loading Menstrual History...')}
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
            t('genericError', 'An unexpected error occurred while fetching menstrual history details.')
          }
        />
      </div>
    );
  }

  const formattedDate = menstrualData.encounterDatetime
    ? formatDatetime(new Date(menstrualData.encounterDatetime))
    : null;

  return (
    <div className={styles.container}>
      <DashboardToolbar
        lastRecordedDate={formattedDate}
        noRecordedText={t(
          'noRecordedMenstrualHistoryEncounter',
          'No AIIMS Menstrual History encounter recorded yet'
        )}
        hasData={menstrualData.hasData}
        onRefresh={() => mutate()}
        onRecord={() => handleOpenForm()}
        onUpdate={() => handleOpenForm(menstrualData.encounterUuid)}
        recordButtonText={t('recordMenstrualHistory', 'Record Menstrual History')}
        updateButtonText={t('updateMenstrualHistory', 'Update Menstrual History')}
        hidePrimaryActionOnEmpty={true}
      />

      {!menstrualData.hasData ? (
        <EmptyState
          heading={t('noMenstrualHistoryHeader', 'No Menstrual History Recorded Yet')}
          description={t(
            'noMenstrualHistoryBody',
            'Menstrual pattern, last menstrual period, and flow details have not been submitted for this patient yet.'
          )}
          actionText={t('recordMenstrualHistory', 'Record Menstrual History')}
          onAction={() => handleOpenForm()}
        />
      ) : (
        <div className={styles.grid}>
          <MenstrualHistoryCard data={menstrualData} />
        </div>
      )}
    </div>
  );
}
