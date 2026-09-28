import React, { useCallback } from 'react';
import { InlineLoading, InlineNotification } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDatetime, launchWorkspace2, usePatient } from '@openmrs/esm-framework';
import { AIIMS_INFERTILITY_FORM_UUID, AIIMS_INFERTILITY_FORM_NAME } from '../constants';
import { useInfertilityType } from './infertility-type.resource';
import { InfertilityCard } from './infertility-card.component';
import { DashboardToolbar, EmptyState } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface InfertilityTypeDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function InfertilityTypeDashboard({
  patientUuid: propPatientUuid,
  formUuid = AIIMS_INFERTILITY_FORM_UUID,
  formName = AIIMS_INFERTILITY_FORM_NAME,
}: InfertilityTypeDashboardProps) {
  const { t } = useTranslation();
  const {
    patient,
    patientUuid: contextPatientUuid,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const {
    infertilityData,
    isLoading: isInfertilityLoading,
    error: infertilityError,
    mutate,
  } = useInfertilityType(patientUuid, formUuid);

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

  const error = patientError || infertilityError;

  if (isPatientLoading || isInfertilityLoading) {
    return (
      <div className={styles.container}>
        <InlineLoading
          status="active"
          description={t('loadingInfertility', 'Loading Type of Infertility...')}
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
            t('genericError', 'An unexpected error occurred while fetching infertility details.')
          }
        />
      </div>
    );
  }

  const formattedDate = infertilityData.encounterDatetime
    ? formatDatetime(new Date(infertilityData.encounterDatetime))
    : null;

  return (
    <div className={styles.container}>
      <DashboardToolbar
        lastRecordedDate={formattedDate}
        noRecordedText={t(
          'noRecordedInfertilityEncounter',
          'No AIIMS Type of Infertility encounter recorded yet'
        )}
        hasData={infertilityData.hasData}
        onRefresh={() => mutate()}
        onRecord={() => handleOpenForm()}
        onUpdate={() => handleOpenForm(infertilityData.encounterUuid)}
        recordButtonText={t('recordInfertility', 'Record Infertility Details')}
        updateButtonText={t('updateInfertility', 'Update Infertility Details')}
        hidePrimaryActionOnEmpty={true}
      />

      {!infertilityData.hasData ? (
        <EmptyState
          heading={t('noInfertilityHeader', 'No Infertility Details Recorded Yet')}
          description={t(
            'noInfertilityBody',
            'Infertility classification, marriage duration, and duration of infertility have not been submitted for this patient yet.'
          )}
          actionText={t('recordInfertility', 'Record Infertility Details')}
          onAction={() => handleOpenForm()}
        />
      ) : (
        <div className={styles.grid}>
          <InfertilityCard data={infertilityData} />
        </div>
      )}
    </div>
  );
}
