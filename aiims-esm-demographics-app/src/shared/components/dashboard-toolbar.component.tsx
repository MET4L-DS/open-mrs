import React from 'react';
import { Button } from '@carbon/react';
import { Edit, Renew, Add } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import styles from '../styles/shared.scss';

export interface DashboardToolbarProps {
  lastRecordedDate?: string | null;
  noRecordedText?: string;
  hasData: boolean;
  onRefresh: () => void;
  onRecord: () => void;
  onUpdate?: () => void;
  recordButtonText?: string;
  updateButtonText?: string;
  isMutating?: boolean;
  hidePrimaryActionOnEmpty?: boolean;
}

export const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  lastRecordedDate,
  noRecordedText,
  hasData,
  onRefresh,
  onRecord,
  onUpdate,
  recordButtonText,
  updateButtonText,
  isMutating = false,
  hidePrimaryActionOnEmpty = false,
}) => {
  const { t } = useTranslation();

  const handleAction = () => {
    if (hasData && onUpdate) {
      onUpdate();
    } else {
      onRecord();
    }
  };

  const defaultNoRecordedText = t(
    'noRecordedEncounterGeneric',
    'No encounter recorded yet'
  );

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarInfo}>
        {lastRecordedDate ? (
          <span className={styles.lastUpdated}>
            {t('lastRecorded', 'Last recorded')}: <strong>{lastRecordedDate}</strong>
          </span>
        ) : (
          <span className={styles.lastUpdated}>
            {noRecordedText || defaultNoRecordedText}
          </span>
        )}
      </div>

      <div className={styles.toolbarActions}>
        <Button
          kind="ghost"
          size="md"
          renderIcon={Renew}
          onClick={onRefresh}
          disabled={isMutating}
          hasIconOnly
          iconDescription={t('refresh', 'Refresh')}
          tooltipPosition="bottom"
        />
        {hasData ? (
          <Button
            kind="primary"
            size="md"
            renderIcon={Edit}
            onClick={handleAction}
          >
            {updateButtonText || t('updateData', 'Update')}
          </Button>
        ) : (
          !hidePrimaryActionOnEmpty && (
            <Button
              kind="primary"
              size="md"
              renderIcon={Add}
              onClick={handleAction}
            >
              {recordButtonText || t('recordData', 'Record')}
            </Button>
          )
        )}
      </div>
    </div>
  );
};
