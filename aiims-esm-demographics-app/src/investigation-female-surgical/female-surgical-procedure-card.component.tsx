import React from 'react';
import { Cut, Activity, ReportData } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsFemaleSurgicalProcedureData } from './female-surgical-procedure.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface FemaleSurgicalProcedureCardProps {
  data: AiimsFemaleSurgicalProcedureData;
}

export const FemaleSurgicalProcedureCard: React.FC<FemaleSurgicalProcedureCardProps> = ({ data }) => {
  const { t } = useTranslation();

  // 1. Diagnostic Hysteroscopy Findings
  const hysteroscopyRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'hysteroscopy_ostia',
      label: t('hysteroscopyOstia', 'Ostia'),
      value: data.hysteroscopyOstia,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_endometrium',
      label: t('hysteroscopyEndometrium', 'Endometrium'),
      value: data.hysteroscopyEndometrium,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_endometrial_cavity',
      label: t('hysteroscopyEndometrialCavity', 'Endometrial Cavity'),
      value: data.hysteroscopyEndometrialCavity,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_cervical_direction',
      label: t('hysteroscopyCervicalCanalDirection', 'Cervical Canal Direction'),
      value: data.hysteroscopyCervicalCanalDirection,
      emptyPlaceholder: '—',
    },
    {
      id: 'hysteroscopy_dimensions',
      label: t('hysteroscopyDimensions', 'Hysteroscopy Dimensions (cm)'),
      value: data.hysteroscopyDimensions,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  // 2. Operative Hysteroscopy
  const operativeRows: ObservationRow[] = React.useMemo(() => [
    {
      id: 'operative_hysteroscopy',
      label: t('operativeHysteroscopy', 'Operative Hysteroscopy'),
      value: data.operativeHysteroscopy,
      emptyPlaceholder: '—',
    },
    ...(data.femaleSurgicalProcedureRemarks ? [{
      id: 'surgical_procedure_remarks',
      label: t('surgicalProcedureRemarks', 'Remarks / Notes'),
      value: <span className={styles.clinicalNotes}>{data.femaleSurgicalProcedureRemarks}</span>,
      emptyPlaceholder: '—',
    }] : []),
  ], [data, t]);

  return (
    <div className={styles.cardContainer}>
      <ObservationCard
        title={t('hysteroscopyFindingsTitle', 'Hysteroscopy Findings')}
        icon={ReportData}
        rows={hysteroscopyRows}
      />
      <ObservationCard
        title={t('operativeHysteroscopyTitle', 'Operative Hysteroscopy')}
        icon={Cut}
        rows={operativeRows}
      />
    </div>
  );
};
