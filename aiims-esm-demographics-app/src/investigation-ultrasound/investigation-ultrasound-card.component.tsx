import React from 'react';
import { Waveform } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsInvestigationUltrasoundData } from './investigation-ultrasound.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface InvestigationUltrasoundCardProps {
  data: AiimsInvestigationUltrasoundData;
}

export const InvestigationUltrasoundCard: React.FC<InvestigationUltrasoundCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const cm3Unit = t('cubicCentimeters', 'cm³');

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Total Antral Follicle Count
    list.push({
      id: 'total_antral_follicle_count',
      label: t('totalAntralFollicleCount', 'Total Antral Follicle Count'),
      value:
        data.totalAntralFollicleCount !== undefined && data.totalAntralFollicleCount !== null
          ? String(data.totalAntralFollicleCount)
          : undefined,
      emptyPlaceholder: '—',
    });

    // Volume Right Ovary
    list.push({
      id: 'volume_right_ovary',
      label: t('volumeRightOvary', 'Volume Right Ovary'),
      value:
        data.volumeRightOvary !== undefined && data.volumeRightOvary !== null
          ? `${data.volumeRightOvary} ${cm3Unit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Volume Left Ovary
    list.push({
      id: 'volume_left_ovary',
      label: t('volumeLeftOvary', 'Volume Left Ovary'),
      value:
        data.volumeLeftOvary !== undefined && data.volumeLeftOvary !== null
          ? `${data.volumeLeftOvary} ${cm3Unit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Ultrasound Remarks
    if (data.ultrasoundRemarks) {
      list.push({
        id: 'ultrasound_remarks',
        label: t('ultrasoundRemarks', 'Ultrasound Remarks / Notes'),
        value: <span className={styles.clinicalNotes}>{data.ultrasoundRemarks}</span>,
        emptyPlaceholder: '—',
      });
    }

    return list;
  }, [data, t, cm3Unit]);

  return (
    <ObservationCard
      title={t('ultrasoundAssessmentTitle', 'Ultrasound Assessment')}
      icon={Waveform}
      rows={rows}
    />
  );
};
