import React from 'react';
import { Tile } from '@carbon/react';
import { User } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsDemographicsData } from './demographics.resource';
import styles from './demographics.scss';

interface HusbandCardProps {
  demographics: AiimsDemographicsData;
}

export const HusbandCard: React.FC<HusbandCardProps> = ({ demographics }) => {
  const { t } = useTranslation();

  const rows = [
    { label: t('husbandName', 'Name'), value: demographics.husbandName || '—' },
    { label: t('husbandAge', 'Age'), value: demographics.husbandAge ? `${demographics.husbandAge} years` : '—' },
    { label: t('husbandBmi', 'BMI'), value: demographics.husbandBmi ? `${demographics.husbandBmi} kg/m²` : '—' },
    { label: t('husbandPhone', 'Phone Number'), value: demographics.husbandPhone || '—' },
    { label: t('husbandEducation', 'Education'), value: demographics.husbandEducation || '—' },
    { label: t('husbandOccupation', 'Occupation'), value: demographics.husbandOccupation || '—' },
  ];

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
        <User size={20} style={{ fill: 'var(--cds-interactive, #005d5d)' }} />
        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
          {t('husbandProfile', 'Husband Profile')}
        </h4>
      </div>
      <div className={styles.fieldList} style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={styles.fieldRow}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '0.45rem 0',
              borderBottom: idx < rows.length - 1 ? '1px solid #f4f4f4' : 'none',
            }}
          >
            <span style={{ color: 'var(--cds-text-secondary, #525252)', fontSize: '0.875rem' }}>
              {row.label}
            </span>
            <span
              style={{
                color: row.value !== '—' ? 'var(--cds-text-primary, #161616)' : '#8d8d8d',
                fontWeight: row.value !== '—' ? 600 : 400,
                fontSize: '0.875rem',
                textAlign: 'right',
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </Tile>
  );
};
