import React from 'react';
import { Microscope } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '@openmrs/esm-framework';
import { type AiimsTuberculosisHistoryData } from './tuberculosis-history.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface TuberculosisHistoryCardProps {
  data: AiimsTuberculosisHistoryData;
}

function safeFormatDate(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  try {
    return formatDate(d, { time: false });
  } catch {
    return dateStr;
  }
}

export const TuberculosisHistoryCard: React.FC<TuberculosisHistoryCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const formattedDiagnosisDate = React.useMemo(() => safeFormatDate(data.tbDateOfDiagnosis), [data.tbDateOfDiagnosis]);
  const formattedAttStartDate = React.useMemo(() => safeFormatDate(data.attStartDate), [data.attStartDate]);

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Diagnosis Date
    list.push({
      id: 'tb_date_of_diagnosis',
      label: t('tbDateOfDiagnosis', 'Tuberculosis Date of Diagnosis'),
      value: formattedDiagnosisDate || undefined,
      emptyPlaceholder: '—',
    });

    // Sites of Tuberculosis
    const hasSites = data.tbSites && data.tbSites.length > 0;
    const hasOtherSite = !!data.tbSiteOther;

    let sitesDisplay: React.ReactNode = undefined;
    if (hasSites || hasOtherSite) {
      sitesDisplay = (
        <div className={styles.tagList}>
          {hasSites &&
            data.tbSites.map(site => (
              <Tag key={site} type="magenta" size="sm">
                {site}
              </Tag>
            ))}
          {hasOtherSite && (
            <div className={styles.clinicalNotes}>
              <strong>{t('otherSitePrefix', 'Other Site:')} </strong>
              {data.tbSiteOther}
            </div>
          )}
        </div>
      );
    }

    list.push({
      id: 'site_of_tb',
      label: t('siteOfTuberculosis', 'Site of Tuberculosis'),
      value: sitesDisplay,
      emptyPlaceholder: '—',
    });

    // ATT Start Date
    list.push({
      id: 'att_start_date',
      label: t('attStartDate', 'ATT Start Date'),
      value: formattedAttStartDate || undefined,
      emptyPlaceholder: '—',
    });

    // ATT Count
    list.push({
      id: 'att_count',
      label: t('attCount', 'ATT Count'),
      value: data.attCount !== undefined ? String(data.attCount) : undefined,
      emptyPlaceholder: '—',
    });

    // ATT Duration
    list.push({
      id: 'att_duration',
      label: t('attDuration', 'ATT Duration'),
      value: data.attDuration,
      emptyPlaceholder: '—',
    });

    // Clinical Notes
    if (data.tbClinicalNotes) {
      list.push({
        id: 'tb_clinical_notes',
        label: t('tbClinicalNotes', 'Clinical Notes & Regimen'),
        value: (
          <div className={styles.clinicalNotes}>
            {data.tbClinicalNotes}
          </div>
        ),
        emptyPlaceholder: '—',
      });
    }

    return list;
  }, [
    data.tbSites,
    data.tbSiteOther,
    data.attCount,
    data.attDuration,
    data.tbClinicalNotes,
    formattedDiagnosisDate,
    formattedAttStartDate,
    t,
  ]);

  return (
    <ObservationCard
      title={t('tuberculosisHistoryCardTitle', 'Tuberculosis & Anti-Tubercular Therapy')}
      icon={Microscope}
      rows={rows}
    />
  );
};
