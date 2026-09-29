import React from 'react';
import { Cut } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type AiimsPreviousSurgeryData, type ProcedureWithLaterality } from './previous-surgery.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface PreviousSurgeryCardProps {
  data: AiimsPreviousSurgeryData;
}

export const PreviousSurgeryCard: React.FC<PreviousSurgeryCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const renderTags = (items: string[], tagType: 'teal' | 'purple' | 'blue' | 'magenta' | 'cool-gray') => {
    if (!items || items.length === 0) return undefined;
    return (
      <div className={styles.tagList}>
        {items.map(item => (
          <Tag key={item} type={tagType} size="sm">
            {item}
          </Tag>
        ))}
      </div>
    );
  };

  const renderProceduresWithLaterality = (
    items: ProcedureWithLaterality[],
    tagType: 'teal' | 'purple' | 'blue' | 'magenta' | 'cyan'
  ) => {
    if (!items || items.length === 0) return undefined;
    return (
      <div className={styles.tagList}>
        {items.map(({ procedure, laterality }) => (
          <Tag key={procedure} type={tagType} size="sm">
            {laterality ? `${procedure} (${laterality})` : procedure}
          </Tag>
        ))}
      </div>
    );
  };

  const uterineDisplay = React.useMemo(
    () => renderTags(data.uterineSurgeries, 'teal'),
    [data.uterineSurgeries]
  );

  const endometriosisDisplay = React.useMemo(
    () => renderProceduresWithLaterality(data.endometriosisSurgeries, 'purple'),
    [data.endometriosisSurgeries]
  );

  const ovarianDisplay = React.useMemo(
    () => renderProceduresWithLaterality(data.ovarianSurgeries, 'blue'),
    [data.ovarianSurgeries]
  );

  const tubalDisplay = React.useMemo(
    () => renderProceduresWithLaterality(data.tubalSurgeries, 'cyan'),
    [data.tubalSurgeries]
  );

  const peritonealDisplay = React.useMemo(
    () => renderTags(data.peritonealSurgeries, 'magenta'),
    [data.peritonealSurgeries]
  );

  const rows = React.useMemo(() => {
    const list: ObservationRow[] = [
      {
        label: t('previousSurgeryPerformed', 'Previous Surgery Performed'),
        value: data.previousSurgeryPerformed,
      },
    ];

    if (
      data.previousSurgeryPerformed === 'Yes' ||
      data.surgicalApproach ||
      data.yearOrDateOfSurgery ||
      data.uterineSurgeries.length > 0 ||
      data.endometriosisSurgeries.length > 0 ||
      data.ovarianSurgeries.length > 0 ||
      data.tubalSurgeries.length > 0 ||
      data.peritonealSurgeries.length > 0
    ) {
      if (data.surgicalApproach) {
        list.push({
          label: t('surgicalApproach', 'Surgical Approach'),
          value: data.surgicalApproach,
        });
      }

      if (data.yearOrDateOfSurgery) {
        list.push({
          label: t('yearOrDateOfSurgery', 'Year / Date of Surgery'),
          value: data.yearOrDateOfSurgery,
        });
      }

      if (uterineDisplay) {
        list.push({
          label: t('uterineSurgeries', 'Uterine Surgeries'),
          value: uterineDisplay,
        });
      }

      if (endometriosisDisplay) {
        list.push({
          label: t('endometriosisSurgeries', 'Endometriosis Surgeries'),
          value: endometriosisDisplay,
        });
      }

      if (ovarianDisplay) {
        list.push({
          label: t('ovarianSurgeries', 'Ovarian Surgeries'),
          value: ovarianDisplay,
        });
      }

      if (tubalDisplay) {
        list.push({
          label: t('fallopianTubeSurgeries', 'Fallopian Tube Surgeries'),
          value: tubalDisplay,
        });
      }

      if (peritonealDisplay) {
        list.push({
          label: t('peritonealSurgeries', 'Peritoneal Surgeries'),
          value: peritonealDisplay,
        });
      }
    }

    if (data.intraoperativeFindings) {
      list.push({
        label: t('intraoperativeFindings', 'Intra-operative Findings'),
        value: data.intraoperativeFindings,
      });
    }

    if (data.previousSurgeryOtherNotes) {
      list.push({
        label: t('previousSurgeryOtherNotes', 'Previous Surgery Notes'),
        value: data.previousSurgeryOtherNotes,
      });
    }

    return list;
  }, [
    data,
    uterineDisplay,
    endometriosisDisplay,
    ovarianDisplay,
    tubalDisplay,
    peritonealDisplay,
    t,
  ]);

  return (
    <ObservationCard
      title={t('previousSurgery', 'Previous Surgery')}
      icon={Cut}
      rows={rows}
    />
  );
};
