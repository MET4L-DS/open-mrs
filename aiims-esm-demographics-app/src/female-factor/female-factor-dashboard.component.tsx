import React, { useCallback } from 'react';
import { InlineLoading, InlineNotification } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDatetime, launchWorkspace2, usePatient } from '@openmrs/esm-framework';
import { AIIMS_FEMALE_FACTOR_FORM_UUID, AIIMS_FEMALE_FACTOR_FORM_NAME } from '../constants';
import { useFemaleFactor } from './female-factor.resource';
import { FemaleFactorCard } from './female-factor-card.component';
import { DashboardToolbar, EmptyState } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface FemaleFactorDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function FemaleFactorDashboard({
  patientUuid: propPatientUuid,
  formUuid = AIIMS_FEMALE_FACTOR_FORM_UUID,
  formName = AIIMS_FEMALE_FACTOR_FORM_NAME,
}: FemaleFactorDashboardProps) {
  const { t } = useTranslation();
  const {
    patient,
    patientUuid: contextPatientUuid,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const {
    femaleFactorData,
    isLoading: isFactorLoading,
    error: factorError,
    mutate,
  } = useFemaleFactor(patientUuid, formUuid);

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

  const error = patientError || factorError;

  if (isPatientLoading || isFactorLoading) {
    return (
      <div className={styles.container}>
        <InlineLoading
          status="active"
          description={t('loadingFemaleFactor', 'Loading Female Factor details...')}
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
            t('genericError', 'An unexpected error occurred while fetching female factor details.')
          }
        />
      </div>
    );
  }

  const formattedDate = femaleFactorData.encounterDatetime
    ? formatDatetime(new Date(femaleFactorData.encounterDatetime))
    : null;

  return (
    <div className={styles.container}>
      <DashboardToolbar
        lastRecordedDate={formattedDate}
        noRecordedText={t(
          'noRecordedFemaleFactorEncounter',
          'No AIIMS Female Factor encounter recorded yet'
        )}
        hasData={femaleFactorData.hasData}
        onRefresh={() => mutate()}
        onRecord={() => handleOpenForm()}
        onUpdate={() => handleOpenForm(femaleFactorData.encounterUuid)}
        recordButtonText={t('recordFemaleFactor', 'Record Female Factor')}
        updateButtonText={t('updateFemaleFactor', 'Update Female Factor')}
        hidePrimaryActionOnEmpty={true}
      />

      {!femaleFactorData.hasData ? (
        <EmptyState
          heading={t('noFemaleFactorHeader', 'No Female Factor Recorded Yet')}
          description={t(
            'noFemaleFactorBody',
            'Diagnostic categories, tubal findings, ovarian reserve, PCOS phenotypes, and uterine factor details have not been submitted for this patient yet.'
          )}
          actionText={t('recordFemaleFactor', 'Record Female Factor')}
          onAction={() => handleOpenForm()}
        />
      ) : (
        <div className={styles.grid}>
          <FemaleFactorCard data={femaleFactorData} />
        </div>
      )}
    </div>
  );
}
