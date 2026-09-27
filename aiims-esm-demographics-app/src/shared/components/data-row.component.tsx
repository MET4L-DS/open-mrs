import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import styles from '../styles/shared.scss';

export interface DataRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  emptyPlaceholder?: string;
}

export const DataRow: React.FC<DataRowProps> = ({
  label,
  value,
  unit,
  emptyPlaceholder = '—',
}) => {
  const { t } = useTranslation();
  const isValueEmpty =
    value === null ||
    value === undefined ||
    value === '' ||
    value === emptyPlaceholder;

  const displayValue = isValueEmpty
    ? emptyPlaceholder
    : unit
    ? t('valueWithUnit', '{{value}} {{unit}}', { value: String(value), unit })
    : value;

  return (
    <div className={styles.fieldRow}>
      <span className={styles.fieldLabel}>{label}</span>
      <span
        className={classNames(styles.fieldValue, {
          [styles.empty]: isValueEmpty,
        })}
      >
        {displayValue}
      </span>
    </div>
  );
};
