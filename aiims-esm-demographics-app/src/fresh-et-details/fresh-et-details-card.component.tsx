import React from 'react';
import { useTranslation } from 'react-i18next';
import { EventSchedule } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsFreshEtDetailsData } from './fresh-et-details.resource';

export interface FreshEtDetailsCardProps {
  data: AiimsFreshEtDetailsData | null | undefined;
}

export const FreshEtDetailsCard: React.FC<FreshEtDetailsCardProps> = ({ data }) => {
  const { t } = useTranslation();

  // Fresh Embryo Transfer Clinical Status
  const decisionRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'fresh-embryo-transfer',
        label: t('freshEmbryoTransfer', 'Fresh Embryo Transfer Done'),
        value: data?.freshEmbryoTransfer,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Cancellation & Rationale (when fresh ET not done / or if reasons recorded)
  const cancellationRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'reason-fresh-et-not-done',
        label: t('reasonFreshEtNotDone', 'Reason why Fresh Embryo Transfer Not Done'),
        value: data?.reasonFreshEtNotDone,
        emptyPlaceholder: '—',
      },
      {
        id: 'other-reason-fresh-et-not-done',
        label: t('otherReasonFreshEtNotDone', 'Other Reason why Fresh Embryo Transfer Not Done'),
        value: data?.otherReasonFreshEtNotDone,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Procedure & Embryo Details (when fresh ET performed)
  const procedureRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'fresh-et-date',
        label: t('freshEtDate', 'Embryo Transfer Date'),
        value: data?.freshEtDate,
        emptyPlaceholder: '—',
      },
      {
        id: 'day-of-fresh-embryo-transfer',
        label: t('dayOfFreshEmbryoTransfer', 'Day of Embryo'),
        value: data?.dayOfFreshEmbryoTransfer,
        emptyPlaceholder: '—',
      },
      {
        id: 'number-fresh-embryos-transferred',
        label: t('numberFreshEmbryosTransferred', 'Number of Embryos Transferred'),
        value: data?.numberFreshEmbryosTransferred,
        unit: data?.numberFreshEmbryosTransferred ? ` ${t('embryos', 'embryos')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'grade-fresh-embryos-transferred',
        label: t('gradeFreshEmbryosTransferred', 'Grade of Embryos'),
        value: data?.gradeFreshEmbryosTransferred,
        emptyPlaceholder: '—',
      },
      {
        id: 'fresh-et-endometrial-thickness',
        label: t('freshEtEndometrialThickness', 'Endometrial Thickness'),
        value: data?.freshEtEndometrialThickness,
        unit: data?.freshEtEndometrialThickness ? ` ${t('mm', 'mm')}` : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'fresh-et-difficulty',
        label: t('freshEtDifficulty', 'Embryo Transfer (Easy / Difficult)'),
        value: data?.freshEtDifficulty,
        emptyPlaceholder: '—',
      },
      {
        id: 'blood-on-catheter-tip',
        label: t('bloodOnTipOfCatheter', 'Blood on Tip of Catheter'),
        value: data?.bloodOnTipOfCatheter,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  const allRows = React.useMemo(() => {
    const isCancelled =
      data?.freshEmbryoTransfer?.toLowerCase() === 'no' ||
      (!data?.freshEmbryoTransfer && Boolean(data?.reasonFreshEtNotDone || data?.otherReasonFreshEtNotDone));

    const rows: ObservationRow[] = [...decisionRows];

    if (isCancelled) {
      rows.push(...cancellationRows);
    } else {
      rows.push(...procedureRows);
    }

    return rows;
  }, [data, decisionRows, cancellationRows, procedureRows]);

  return (
    <ObservationCard
      title={t('aiimsFreshEtDetailsTitle', 'Fresh Embryo Transfer Details')}
      icon={EventSchedule}
      rows={allRows}
    />
  );
};
