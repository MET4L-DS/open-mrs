import React from 'react';
import { ReportData, Cut } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsPreviousSurgeryData } from './previous-surgery.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface PreviousHysteroscopyCardProps {
  data: AiimsPreviousSurgeryData;
}

export const PreviousHysteroscopyCard: React.FC<PreviousHysteroscopyCardProps> = ({ data }) => {
  const { t } = useTranslation();

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
    {
      id: 'operative_hysteroscopy',
      label: t('operativeHysteroscopy', 'Operative Hysteroscopy'),
      value: data.operativeHysteroscopy,
      emptyPlaceholder: '—',
    },
  ], [data, t]);

  return (
    <ObservationCard
      title={t('hysteroscopyFindingsTitle', 'Hysteroscopy Findings & Interventions')}
      icon={ReportData}
      rows={hysteroscopyRows}
    />
  );
};
