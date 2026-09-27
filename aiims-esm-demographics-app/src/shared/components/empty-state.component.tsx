import React from 'react';
import { Button, Tile } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import styles from '../styles/shared.scss';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  heading: string;
  description: string;
  actionText: string;
  onAction: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  heading,
  description,
  actionText,
  onAction,
}) => {
  return (
    <Tile className={styles.emptyState}>
      <div className={styles.emptyStateIcon}>
        {icon || (
          <svg width="64" height="64" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zM26 30h-2v-5a5 5 0 0 0-5-5H13a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" />
          </svg>
        )}
      </div>
      <h3 className={styles.emptyStateTitle}>{heading}</h3>
      <p className={styles.emptyStateBody}>{description}</p>
      <Button kind="primary" renderIcon={Add} onClick={onAction}>
        {actionText}
      </Button>
    </Tile>
  );
};
