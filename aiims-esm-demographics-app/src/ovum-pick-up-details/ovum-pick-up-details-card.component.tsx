import React from 'react';
import { Microscope } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsOvumPickUpDetailsData } from './ovum-pick-up-details.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface OvumPickUpDetailsCardProps {
  data: AiimsOvumPickUpDetailsData;
}

export const OvumPickUpDetailsCard: React.FC<OvumPickUpDetailsCardProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  const procedureRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Date of Ovum Pick Up
    list.push({
      id: 'date_of_ovum_pick_up',
      label: t('dateOfOvumPickUp', 'Date of Ovum Pick Up'),
      value: data.dateOfOvumPickUp,
      emptyPlaceholder: '—',
    });

    // Time of Ovum Pick Up
    list.push({
      id: 'time_of_ovum_pick_up',
      label: t('timeOfOvumPickUp', 'Time of Ovum Pick Up'),
      value: data.timeOfOvumPickUp,
      emptyPlaceholder: '—',
    });

    // Interval between Trigger & Ovum pick up
    list.push({
      id: 'interval_trigger_ovum_pickup',
      label: t(
        'intervalTriggerOvumPickup',
        'Interval between Trigger & Ovum Pick Up'
      ),
      value: data.intervalTriggerOvumPickup,
      emptyPlaceholder: '—',
    });

    // Number of Oocytes Retrieved
    list.push({
      id: 'number_of_oocytes_retrieved',
      label: t('numberOfOocytesRetrieved', 'Number of Oocytes Retrieved'),
      value:
        data.numberOfOocytesRetrieved !== undefined
          ? `${data.numberOfOocytesRetrieved}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Number of Oocytes Retrieved comments
    list.push({
      id: 'number_of_oocytes_retrieved_comments',
      label: t(
        'numberOfOocytesRetrievedComments',
        'Oocytes Retrieved Comments'
      ),
      value: data.numberOfOocytesRetrievedComments,
      emptyPlaceholder: '—',
    });

    // Fort Follicular Output Rate (FORT %)
    list.push({
      id: 'fort_follicular_output_rate',
      label: t('fortFollicularOutputRate', 'FORT (Follicular Output Rate)'),
      value:
        data.fortFollicularOutputRate !== undefined
          ? `${data.fortFollicularOutputRate}%`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Follicle to Oocyte Index (FOI %)
    list.push({
      id: 'follicle_to_oocyte_index',
      label: t('follicleToOocyteIndex', 'FOI (Follicle to Oocyte Index)'),
      value:
        data.follicleToOocyteIndex !== undefined
          ? `${data.follicleToOocyteIndex}%`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const maturityRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Oocyte-Cumulus Complex Grade-I
    list.push({
      id: 'oocyte_cumulus_complex_grade_1',
      label: t('oocyteCumulusComplexGrade1', 'Oocyte-Cumulus Complex Grade-I'),
      value:
        data.oocyteCumulusComplexGrade1 !== undefined
          ? `${data.oocyteCumulusComplexGrade1}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Oocyte-Cumulus Complex Grade-II
    list.push({
      id: 'oocyte_cumulus_complex_grade_2',
      label: t('oocyteCumulusComplexGrade2', 'Oocyte-Cumulus Complex Grade-II'),
      value:
        data.oocyteCumulusComplexGrade2 !== undefined
          ? `${data.oocyteCumulusComplexGrade2}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Oocyte-Cumulus Complex Grade-III
    list.push({
      id: 'oocyte_cumulus_complex_grade_3',
      label: t(
        'oocyteCumulusComplexGrade3',
        'Oocyte-Cumulus Complex Grade-III'
      ),
      value:
        data.oocyteCumulusComplexGrade3 !== undefined
          ? `${data.oocyteCumulusComplexGrade3}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Metaphase II
    list.push({
      id: 'metaphase_2',
      label: t('metaphase2', 'Metaphase II (MII)'),
      value:
        data.metaphase2 !== undefined ? `${data.metaphase2}` : undefined,
      emptyPlaceholder: '—',
    });

    // Metaphase I
    list.push({
      id: 'metaphase_1',
      label: t('metaphase1', 'Metaphase I (MI)'),
      value:
        data.metaphase1 !== undefined ? `${data.metaphase1}` : undefined,
      emptyPlaceholder: '—',
    });

    // Germinal Vesicle
    list.push({
      id: 'germinal_vesicle',
      label: t('germinalVesicle', 'Germinal Vesicle (GV)'),
      value:
        data.germinalVesicle !== undefined
          ? `${data.germinalVesicle}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const abnormalityRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Abnormal oocytes number
    list.push({
      id: 'abnormal_oocytes_number',
      label: t('abnormalOocytesNumber', 'Abnormal Oocytes (Count)'),
      value:
        data.abnormalOocytesNumber !== undefined
          ? `${data.abnormalOocytesNumber}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Abnormal oocytes
    list.push({
      id: 'abnormal_oocytes',
      label: t('abnormalOocytes', 'Abnormal Oocytes Findings'),
      value:
        data.abnormalOocytes.length > 0
          ? data.abnormalOocytes.join(', ')
          : undefined,
      emptyPlaceholder: '—',
    });

    // Remarks
    list.push({
      id: 'ovum_pick_up_details_remarks',
      label: t('ovumPickUpDetailsRemarks', 'Remarks / Notes'),
      value: data.ovumPickUpDetailsRemarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const allRows = React.useMemo(() => [
    ...procedureRows,
    ...maturityRows,
    ...abnormalityRows,
  ], [procedureRows, maturityRows, abnormalityRows]);

  return (
    <ObservationCard
      title={t('aiimsOvumPickUpDetailsTitle', 'Ovum Pick Up Details')}
      icon={Microscope}
      rows={allRows}
    />
  );
};
