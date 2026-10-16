import React from 'react';
import { Medication } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsDoseOfDrugsData } from './dose-of-drugs.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface DoseOfDrugsCardProps {
  data: AiimsDoseOfDrugsData | null;
}

export const DoseOfDrugsCard: React.FC<DoseOfDrugsCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const durationRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    list.push({
      id: 'total_days_of_leuprolide_downregulation',
      label: t('totalDaysOfLeuprolideDownregulation', 'Total days of Leuprolide Downregulation'),
      value:
        data?.totalDaysOfLeuprolideDownregulation !== undefined && data?.totalDaysOfLeuprolideDownregulation !== null
          ? `${data.totalDaysOfLeuprolideDownregulation} ${t('daysUnit', 'days')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'total_days_of_stimulation',
      label: t('totalDaysOfStimulation', 'Total days of Stimulation'),
      value:
        data?.totalDaysOfStimulation !== undefined && data?.totalDaysOfStimulation !== null
          ? `${data.totalDaysOfStimulation} ${t('daysUnit', 'days')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const gonadotropinRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];
    const iuUnit = t('iuUnit', 'IU');

    list.push({
      id: 'starting_dose_fsh',
      label: t('startingDoseFsh', 'Starting dose Follicle-Stimulating Hormone (FSH)'),
      value:
        data?.startingDoseFsh !== undefined && data?.startingDoseFsh !== null
          ? `${data.startingDoseFsh} ${iuUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'total_dose_fsh',
      label: t('totalDoseFsh', 'Total dose Follicle-Stimulating Hormone (FSH)'),
      value:
        data?.totalDoseFsh !== undefined && data?.totalDoseFsh !== null
          ? `${data.totalDoseFsh} ${iuUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'starting_dose_hmg',
      label: t('startingDoseHmg', 'Starting dose Human Menopausal Gonadotropin (HMG)'),
      value:
        data?.startingDoseHmg !== undefined && data?.startingDoseHmg !== null
          ? `${data.startingDoseHmg} ${iuUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'total_dose_hmg',
      label: t('totalDoseHmg', 'Total dose Human Menopausal Gonadotropin (HMG)'),
      value:
        data?.totalDoseHmg !== undefined && data?.totalDoseHmg !== null
          ? `${data.totalDoseHmg} ${iuUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'starting_dose_rlh',
      label: t('startingDoseRlh', 'Starting dose Recombinant Luteinizing Hormone (rLH)'),
      value:
        data?.startingDoseRlh !== undefined && data?.startingDoseRlh !== null
          ? `${data.startingDoseRlh} ${iuUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'total_dose_rlh',
      label: t('totalDoseRlh', 'Total dose Recombinant Luteinizing Hormone (rLH)'),
      value:
        data?.totalDoseRlh !== undefined && data?.totalDoseRlh !== null
          ? `${data.totalDoseRlh} ${iuUnit}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const cetrotideRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    list.push({
      id: 'day_of_start_of_cetrotide',
      label: t('dayOfStartOfCetrotide', 'Day of start of Cetrotide'),
      value: data?.dayOfStartOfCetrotide,
      emptyPlaceholder: '—',
    });

    list.push({
      id: 'total_cetrotide_dose',
      label: t('totalCetrotideDose', 'Total Cetrotide dose'),
      value:
        data?.totalCetrotideDose !== undefined && data?.totalCetrotideDose !== null
          ? `${data.totalCetrotideDose} ${t('mgUnit', 'mg')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const remarksRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    list.push({
      id: 'dose_of_drugs_remarks',
      label: t('doseOfDrugsRemarks', 'Remarks / Notes'),
      value: data?.remarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const allRows = React.useMemo(() => [
    ...durationRows,
    ...gonadotropinRows,
    ...cetrotideRows,
    ...(data?.remarks ? remarksRows : []),
  ], [durationRows, gonadotropinRows, cetrotideRows, remarksRows, data?.remarks]);

  return (
    <ObservationCard
      title={t('aiimsDoseOfDrugsTitle', 'Dose of Drugs')}
      icon={Medication}
      rows={allRows}
    />
  );
};
