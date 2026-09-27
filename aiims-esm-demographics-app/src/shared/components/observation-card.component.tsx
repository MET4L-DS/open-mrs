import React from 'react';
import { Tile } from '@carbon/react';
import { DataRow } from './data-row.component';
import styles from '../styles/shared.scss';

export interface ObservationRow {
  id?: string;
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  emptyPlaceholder?: string;
}

export interface ObservationCardProps {
  title: string;
  icon?: React.ComponentType<{ size?: number | string; className?: string }>;
  rows: ObservationRow[];
  headerAction?: React.ReactNode;
  className?: string;
}

export const ObservationCard: React.FC<ObservationCardProps> = ({
  title,
  icon: Icon,
  rows,
  headerAction,
  className,
}) => {
  return (
    <Tile className={className ? `${styles.card} ${className}` : styles.card}>
      <div className={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {Icon && <Icon size={20} />}
          <h4>{title}</h4>
        </div>
        {headerAction}
      </div>
      <div className={styles.fieldList}>
        {rows.map((row, idx) => (
          <DataRow
            key={row.id || (typeof row.label === 'string' ? row.label : idx)}
            label={row.label}
            value={row.value}
            unit={row.unit}
            emptyPlaceholder={row.emptyPlaceholder}
          />
        ))}
      </div>
    </Tile>
  );
};
