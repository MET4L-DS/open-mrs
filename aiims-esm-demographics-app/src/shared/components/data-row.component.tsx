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

function decodeHtmlEntities(val: React.ReactNode): React.ReactNode {
  if (typeof val === 'string') {
    return val
      .replace(/&#x2F;/gi, '/')
      .replace(/&#x27;/gi, "'")
      .replace(/&quot;/gi, '"')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>');
  }
  return val;
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

  const rawDisplayValue = isValueEmpty
    ? emptyPlaceholder
    : unit
    ? t('valueWithUnit', '{{value}} {{unit}}', {
        value: String(value),
        unit,
        interpolation: { escapeValue: false },
      })
    : value;

  const displayValue = decodeHtmlEntities(rawDisplayValue);


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
