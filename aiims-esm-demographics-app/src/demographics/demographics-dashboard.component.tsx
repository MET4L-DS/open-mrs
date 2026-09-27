import React, { useCallback } from 'react';
import { InlineLoading, InlineNotification } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDatetime, launchWorkspace2, usePatient } from '@openmrs/esm-framework';
import { AIIMS_FORM_UUID, AIIMS_FORM_NAME } from '../constants';
import { useAiimsDemographics } from './demographics.resource';
import { ClinicalCard } from './clinical-card.component';
import { PatientCard } from './patient-card.component';
import { HusbandCard } from './husband-card.component';
import { SesCard } from './ses-card.component';
import { DashboardToolbar, EmptyState } from '../shared/components';
import { getPatientDisplayName } from '../shared/utils/patient-attributes';
import type { PatientResource } from '../shared/types';
import styles from '../shared/styles/shared.scss';

interface DemographicsDashboardProps {
  patientUuid?: string;
  basePath?: string;
  formUuid?: string;
  formName?: string;
}

export default function DemographicsDashboard({
  patientUuid: propPatientUuid,
  formUuid = AIIMS_FORM_UUID,
  formName = AIIMS_FORM_NAME,
}: DemographicsDashboardProps) {
  const { t } = useTranslation();
  const {
    patient,
    patientUuid: contextPatientUuid,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const {
    demographics,
    isLoading: isDemographicsLoading,
    error: demographicsError,
    mutate,
  } = useAiimsDemographics(patientUuid, patient as PatientResource | null, formUuid);

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

  const error = patientError || demographicsError;

  if (isPatientLoading || isDemographicsLoading) {
    return (
      <div className={styles.container}>
        <InlineLoading status="active" description={t('loadingDemographics', 'Loading AIIMS Demographics...')} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <InlineNotification
          kind="error"
          title={t('errorLoading', 'Error loading demographics')}
          subtitle={
            (error as Error)?.message ||
            t('genericError', 'An unexpected error occurred while fetching demographics data.')
          }
        />
      </div>
    );
  }

  const patientName = getPatientDisplayName(patient as PatientResource | null) || undefined;

  const formattedDate = demographics.encounterDatetime
    ? formatDatetime(new Date(demographics.encounterDatetime))
    : null;

  return (
    <div className={styles.container}>
      <DashboardToolbar
        lastRecordedDate={formattedDate}
        noRecordedText={t('noRecordedEncounter', 'No AIIMS Personal Information Intake encounter recorded yet')}
        hasData={demographics.hasData}
        onRefresh={() => mutate()}
        onRecord={() => handleOpenForm()}
        onUpdate={() => handleOpenForm(demographics.encounterUuid)}
        recordButtonText={t('recordDemographics', 'Record Demographics')}
        updateButtonText={t('updateDemographics', 'Update Demographics')}
        hidePrimaryActionOnEmpty={true}
      />

      {!demographics.hasData ? (
        <EmptyState
          heading={t('noDemographicsHeader', 'No Demographics Recorded Yet')}
          description={t(
            'noDemographicsBody',
            'Personal, family, education, and socioeconomic details have not been submitted for this patient yet.'
          )}
          actionText={t('recordDemographics', 'Record Personal Information Intake')}
          onAction={() => handleOpenForm()}
        />
      ) : (
        <div className={styles.grid}>
          <ClinicalCard demographics={demographics} />
          <PatientCard demographics={demographics} patientName={patientName} />
          <HusbandCard demographics={demographics} />
          <SesCard demographics={demographics} />
        </div>
      )}
    </div>
  );
}
