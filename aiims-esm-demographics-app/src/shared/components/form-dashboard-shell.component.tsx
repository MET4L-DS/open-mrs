import React, { useCallback } from 'react';
import { InlineLoading, InlineNotification } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDatetime, launchWorkspace2, usePatient } from '@openmrs/esm-framework';
import { DashboardToolbar, EmptyState } from './';
import styles from '../styles/shared.scss';

export interface FormDashboardShellProps {
  patientUuid?: string;
  formUuid: string;
  formName: string;
  encounterUuid?: string;
  encounterDatetime?: string;
  hasData: boolean;
  isLoading: boolean;
  error?: unknown;
  mutate: () => void | Promise<unknown>;
  loadingDescription: string;
  emptyHeading: string;
  emptyDescription: string;
  noRecordedText: string;
  recordButtonText: string;
  updateButtonText: string;
  children: React.ReactNode;
}

export const FormDashboardShell: React.FC<FormDashboardShellProps> = ({
  patientUuid: propPatientUuid,
  formUuid,
  formName,
  encounterUuid,
  encounterDatetime,
  hasData,
  isLoading: isDataLoading,
  error: dataError,
  mutate,
  loadingDescription,
  emptyHeading,
  emptyDescription,
  noRecordedText,
  recordButtonText,
  updateButtonText,
  children,
}) => {
  const { t } = useTranslation();
  const {
    patient,
    patientUuid: contextPatientUuid,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const handleOpenForm = useCallback(
    (targetEncounterUuid?: string) => {
      console.log('[AIIMS Pipeline] Opening form entry workspace:', {
        formUuid,
        formName,
        targetEncounterUuid,
        patientUuid,
        mode: targetEncounterUuid ? 'edit' : 'enter',
      });
      launchWorkspace2('patient-form-entry-workspace', {
        workspaceTitle: formName,
        form: {
          uuid: formUuid,
          name: formName,
          display: formName,
        },
        encounterUuid: targetEncounterUuid,
        patientUuid,
        patient,
        additionalProps: {
          mode: targetEncounterUuid ? 'edit' : 'enter',
          formSessionIntent: '*',
          openClinicalFormsWorkspaceOnFormClose: false,
        },
      });
    },
    [formUuid, formName, patientUuid, patient]
  );


  const error = patientError || dataError;

  if (isPatientLoading || isDataLoading) {
    return (
      <div className={styles.container}>
        <InlineLoading status="active" description={loadingDescription} />
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
            t('genericError', 'An unexpected error occurred while fetching details.')
          }
        />
      </div>
    );
  }

  const formattedDate = encounterDatetime
    ? formatDatetime(new Date(encounterDatetime))
    : null;

  return (
    <div className={styles.container}>
      <DashboardToolbar
        lastRecordedDate={formattedDate}
        noRecordedText={noRecordedText}
        hasData={hasData}
        onRefresh={() => mutate()}
        onRecord={() => handleOpenForm()}
        onUpdate={() => handleOpenForm(encounterUuid)}
        recordButtonText={recordButtonText}
        updateButtonText={updateButtonText}
        hidePrimaryActionOnEmpty={true}
      />

      {!hasData ? (
        <EmptyState
          heading={emptyHeading}
          description={emptyDescription}
          actionText={recordButtonText}
          onAction={() => handleOpenForm()}
        />
      ) : (
        <div className={styles.grid}>{children}</div>
      )}
    </div>
  );
};
