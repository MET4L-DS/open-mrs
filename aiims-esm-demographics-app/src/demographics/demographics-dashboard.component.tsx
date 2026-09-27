import React, { useCallback } from 'react';
import { Button, InlineLoading, InlineNotification, Tile } from '@carbon/react';
import { Edit, Renew, Add } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { launchWorkspace2, usePatient } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { AIIMS_FORM_UUID } from '../constants';
import { useAiimsDemographics } from './demographics.resource';
import { ClinicalCard } from './clinical-card.component';
import { PatientCard } from './patient-card.component';
import { HusbandCard } from './husband-card.component';
import { SesCard } from './ses-card.component';
import styles from './demographics.scss';

interface DemographicsDashboardProps {
  patientUuid?: string;
  basePath?: string;
}

export default function DemographicsDashboard({ patientUuid: propPatientUuid }: DemographicsDashboardProps) {
  const { t } = useTranslation();
  const { patient, patientUuid: contextPatientUuid, isLoading: isPatientLoading } = usePatient(propPatientUuid);
  const patientUuid = propPatientUuid || contextPatientUuid;

  const { demographics, isLoading: isDemographicsLoading, error, mutate } = useAiimsDemographics(
    patientUuid,
    patient
  );

  const handleOpenForm = useCallback(
    (encounterUuid?: string) => {
      launchWorkspace2('patient-form-entry-workspace', {
        formUuid: AIIMS_FORM_UUID,
        encounterUuid,
      });
    },
    []
  );

  if (isPatientLoading || isDemographicsLoading) {
    return (
      <div className={styles.container} style={{ padding: '2rem' }}>
        <InlineLoading status="active" description={t('loadingDemographics', 'Loading AIIMS Demographics...')} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container} style={{ padding: '2rem' }}>
        <InlineNotification
          kind="error"
          title={t('errorLoading', 'Error loading demographics')}
          subtitle={error.message || t('genericError', 'An unexpected error occurred while fetching demographics data.')}
        />
      </div>
    );
  }

  const patientName = patient?.name?.[0]
    ? `${patient.name[0].given?.join(' ') ?? ''} ${patient.name[0].family ?? ''}`.trim()
    : undefined;

  const formattedDate = demographics.encounterDatetime
    ? dayjs(demographics.encounterDatetime).format('DD-MMM-YYYY, hh:mm A')
    : null;

  return (
    <div
      className={styles.container}
      style={{
        padding: '1.25rem 1.75rem 2.5rem 1.75rem',
        maxWidth: '1400px',
      }}
    >
      <div
        className={styles.toolbar}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--cds-border-subtle, #e0e0e0)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {formattedDate ? (
            <span
              className={styles.lastUpdated}
              style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary, #525252)' }}
            >
              {t('lastRecorded', 'Last recorded')}: <strong>{formattedDate}</strong>
            </span>
          ) : (
            <span
              className={styles.lastUpdated}
              style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary, #525252)' }}
            >
              {t('noRecordedEncounter', 'No AIIMS Personal Information Intake encounter recorded yet')}
            </span>
          )}
        </div>
        <div
          className={styles.actions}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <Button
            kind="ghost"
            size="md"
            renderIcon={Renew}
            onClick={() => mutate()}
            hasIconOnly
            iconDescription={t('refresh', 'Refresh')}
            tooltipPosition="bottom"
          />
          {demographics.hasData ? (
            <Button
              kind="primary"
              size="md"
              renderIcon={Edit}
              onClick={() => handleOpenForm(demographics.encounterUuid)}
            >
              {t('updateDemographics', 'Update Demographics')}
            </Button>
          ) : (
            <Button
              kind="primary"
              size="md"
              renderIcon={Add}
              onClick={() => handleOpenForm()}
            >
              {t('recordDemographics', 'Record Demographics')}
            </Button>
          )}
        </div>
      </div>

      {!demographics.hasData ? (
        <Tile
          className={styles.emptyState}
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            backgroundColor: 'var(--cds-layer, #ffffff)',
            border: '1px dashed var(--cds-border-subtle, #c6c6c6)',
            borderRadius: '4px',
            marginTop: '1rem',
          }}
        >
          <UserIconPlaceholder />
          <h3 style={{ margin: '1rem 0 0.5rem 0', fontSize: '1.25rem', color: 'var(--cds-text-primary, #161616)' }}>
            {t('noDemographicsHeader', 'No Demographics Recorded Yet')}
          </h3>
          <p style={{ color: 'var(--cds-text-secondary, #525252)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
            {t(
              'noDemographicsBody',
              'Personal, family, education, and socioeconomic details have not been submitted for this patient yet.'
            )}
          </p>
          <Button
            kind="primary"
            renderIcon={Add}
            onClick={() => handleOpenForm()}
          >
            {t('recordDemographics', 'Record Personal Information Intake')}
          </Button>
        </Tile>
      ) : (
        <div
          className={styles.grid}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <ClinicalCard demographics={demographics} />
          <PatientCard demographics={demographics} patientName={patientName} />
          <HusbandCard demographics={demographics} />
          <SesCard demographics={demographics} />
        </div>
      )}
    </div>
  );
}

function UserIconPlaceholder() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" fill="#8d8d8d">
      <path d="M16 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zM26 30h-2v-5a5 5 0 0 0-5-5H13a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" />
    </svg>
  );
}
