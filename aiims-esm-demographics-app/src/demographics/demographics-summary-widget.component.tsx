import React from 'react';
import { InlineLoading, Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatient, navigate } from '@openmrs/esm-framework';
import { useAiimsDemographics } from './demographics.resource';
import type { PatientResource } from '../shared/types';
import styles from './demographics-summary-widget.scss';

interface DemographicsSummaryWidgetProps {
  patientUuid?: string;
  basePath?: string;
}

export default function DemographicsSummaryWidget({
  patientUuid: propPatientUuid,
  basePath = '',
}: DemographicsSummaryWidgetProps) {
  const { t } = useTranslation();
  const {
    patient,
    patientUuid: contextPatientUuid,
    isLoading: isPatientLoading,
  } = usePatient(propPatientUuid);

  const spaBase = typeof window !== 'undefined' && window.spaBase ? window.spaBase : '/openmrs/spa';

  const urlPatientUuid = React.useMemo(() => {
    if (typeof window === 'undefined') return '';
    const match = window.location.pathname.match(/\/patient\/([a-zA-Z0-9\-]+)\/chart/);
    return match ? match[1] : '';
  }, []);

  const patientUuid = propPatientUuid || contextPatientUuid || urlPatientUuid;

  const chartBasePath = basePath || (patientUuid ? `${spaBase}/patient/${patientUuid}/chart` : '');
  const targetUrl = chartBasePath ? `${chartBasePath}/aiims-demographics` : '#';

  const navigateToFullDemographics = (e: React.MouseEvent) => {
    e.preventDefault();
    if (targetUrl && targetUrl !== '#') {
      navigate({ to: targetUrl });
    }
  };

  const {
    demographics,
    isLoading: isDemographicsLoading,
  } = useAiimsDemographics(patientUuid, patient as PatientResource | null);

  if (isPatientLoading || isDemographicsLoading) {
    return (
      <div className={styles.summaryContainer}>
        <InlineLoading status="active" description={t('loadingDemographics', 'Loading AIIMS Demographics...')} />
      </div>
    );
  }

  if (!demographics.hasData) {
    return (
      <div className={styles.summaryContainer}>
        <div className={styles.notRecordedContainer}>
          <Tag type="cool-gray" size="sm">
            {t('aiimsDemographicsTitle', 'AIIMS Demographics')}
          </Tag>
          <span className={styles.notRecordedText}>
            {t('notRecorded', 'Demographics not recorded')}
          </span>
        </div>
        <a
          href={targetUrl}
          onClick={navigateToFullDemographics}
          className={styles.viewLink}
        >
          {t('recordDemographics', 'Record Demographics')} &rarr;
        </a>
      </div>
    );
  }

  const items = [
    {
      label: t('wifeAge', "Wife's Age"),
      value: demographics.patientAge
        ? t('valueWithUnit', '{{value}} {{unit}}', {
            value: demographics.patientAge,
            unit: t('years', 'years'),
            interpolation: { escapeValue: false },
          })
        : undefined,
    },
    {
      label: t('husbandNameLabel', 'Husband'),
      value: demographics.husbandName,
    },
    {
      label: t('husbandAgeLabel', "Husband's Age"),
      value: demographics.husbandAge
        ? t('valueWithUnit', '{{value}} {{unit}}', {
            value: demographics.husbandAge,
            unit: t('years', 'years'),
            interpolation: { escapeValue: false },
          })
        : undefined,
    },
    {
      label: t('consultantUnitLabel', 'Unit'),
      value: demographics.consultantUnit
        ? t('unitFormat', 'Unit {{unit}}', {
            unit: demographics.consultantUnit,
            interpolation: { escapeValue: false },
          })
        : undefined,
    },
    {
      label: t('consultantNameLabel', 'Consultant'),
      value: demographics.consultantName,
    },
    {
      label: t('sesLabel', 'SES'),
      value: demographics.socioeconomicStatus,
    },
  ].filter((item) => Boolean(item.value));

  return (
    <div className={styles.summaryContainer}>
      <Tag type="teal" size="sm">
        {t('aiimsDemographicsTitle', 'AIIMS Demographics')}
      </Tag>
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          {idx > 0 && <div className={styles.divider} role="separator" />}
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>{item.label}:</span>
            <span className={styles.summaryValue}>{item.value}</span>
          </div>
        </React.Fragment>
      ))}
      <a
        href={targetUrl}
        onClick={navigateToFullDemographics}
        className={styles.viewLink}
      >
        {t('viewDemographics', 'View full demographics')} &rarr;
      </a>
    </div>
  );
}
