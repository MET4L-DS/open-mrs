import React from 'react';
import { PedestrianFamily } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type AiimsFamilyHistoryData } from './family-history.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface FamilyHistoryCardProps {
  data: AiimsFamilyHistoryData;
}

export const FamilyHistoryCard: React.FC<FamilyHistoryCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    return data.members.map(member => {
      const hasDiseases = member.medicalDiseases && member.medicalDiseases.length > 0;
      const hasNotes = !!member.medicalDiseasesOthers;

      let valueDisplay: React.ReactNode = undefined;

      if (hasDiseases || hasNotes) {
        valueDisplay = (
          <div className={styles.tagList}>
            {hasDiseases &&
              member.medicalDiseases.map(disease => (
                <Tag key={disease} type="teal" size="sm">
                  {disease}
                </Tag>
              ))}
            {hasNotes && (
              <div className={styles.clinicalNotes}>
                <strong>{t('notesPrefix', 'Notes:')} </strong>
                {member.medicalDiseasesOthers}
              </div>
            )}
          </div>
        );
      }

      return {
        id: member.relationKey,
        label: t(member.relationLabelKey, member.defaultLabel),
        value: valueDisplay,
        emptyPlaceholder: '—',
      };
    });
  }, [data.members, t]);

  return (
    <ObservationCard
      title={t('familyHistoryCardTitle', 'Family History & Conditions')}
      icon={PedestrianFamily}
      rows={rows}
    />
  );
};
