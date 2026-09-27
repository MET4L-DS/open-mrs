import React from 'react';
import { Tile } from '@carbon/react';
import { Hospital } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsDemographicsData } from './demographics.resource';
import styles from './demographics.scss';

interface ClinicalCardProps {
  demographics: AiimsDemographicsData;
}

export const ClinicalCard: React.FC<ClinicalCardProps> = ({ demographics }) => {
  const { t } = useTranslation();

  return (
    <Tile
      className={styles.card}
      style={{
        padding: '1.25rem',
        backgroundColor: 'var(--cds-layer, #ffffff)',
        border: '1px solid var(--cds-border-subtle, #e0e0e0)',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className={styles.cardHeader}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingBottom: '0.75rem',
          marginBottom: '0.75rem',
          borderBottom: '1px solid var(--cds-border-subtle, #f4f4f4)',
        }}
      >
        <Hospital size={20} style={{ fill: 'var(--cds-interactive, #005d5d)' }} />
        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
          {t('clinicalContext', 'Clinical Context')}
        </h4>
      </div>
      <div className={styles.fieldList} style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          className={styles.fieldRow}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '0.45rem 0',
            borderBottom: '1px solid #f4f4f4',
          }}
        >
          <span style={{ color: 'var(--cds-text-secondary, #525252)', fontSize: '0.875rem' }}>
            {t('consultantUnit', 'Consultant Unit')}
          </span>
          <span
            style={{
              color: demographics.consultantUnit ? 'var(--cds-text-primary, #161616)' : '#8d8d8d',
              fontWeight: demographics.consultantUnit ? 600 : 400,
              fontSize: '0.875rem',
              textAlign: 'right',
            }}
          >
            {demographics.consultantUnit ? `Unit ${demographics.consultantUnit}` : '—'}
          </span>
        </div>
        <div
          className={styles.fieldRow}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '0.45rem 0',
          }}
        >
          <span style={{ color: 'var(--cds-text-secondary, #525252)', fontSize: '0.875rem' }}>
            {t('consultantName', 'Consultant Name')}
          </span>
          <span
            style={{
              color: demographics.consultantName ? 'var(--cds-text-primary, #161616)' : '#8d8d8d',
              fontWeight: demographics.consultantName ? 600 : 400,
              fontSize: '0.875rem',
              textAlign: 'right',
            }}
          >
            {demographics.consultantName || '—'}
          </span>
        </div>
      </div>
    </Tile>
  );
};
