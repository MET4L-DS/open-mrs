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
  columns?: 1 | 2;
  fullWidth?: boolean;
}

export const ObservationCard: React.FC<ObservationCardProps> = ({
  title,
  icon: Icon,
  rows,
  headerAction,
  className,
  columns = 1,
  fullWidth = false,
}) => {
  const cardClassName = [
    styles.card,
    fullWidth ? styles.fullWidthCard : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const listClassName = columns === 2 ? styles.twoColumnFieldList : styles.fieldList;

  return (
    <Tile className={cardClassName}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleWrapper}>
          {Icon && <Icon size={20} />}
          <h4>{title}</h4>
        </div>
        {headerAction}
      </div>
      <div className={listClassName}>
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
