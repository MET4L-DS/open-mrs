import React from 'react';
import { Timer, Medication } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsTriggerDetailsData } from './trigger-details.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface TriggerDetailsCardProps {
  data: AiimsTriggerDetailsData;
}

export const TriggerDetailsCard: React.FC<TriggerDetailsCardProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  const follicleRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Follicles 14-22 mm
    list.push({
      id: 'follicles_14_22_mm',
      label: t('numberOfFollicles14to22mm', 'Follicles (14 mm - 22 mm)'),
      value:
        data.numberOfFollicles14to22mm !== undefined
          ? `${data.numberOfFollicles14to22mm}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Follicles 16-22 mm
    list.push({
      id: 'follicles_16_22_mm',
      label: t('numberOfFollicles16to22mm', 'Follicles (16 mm - 22 mm)'),
      value:
        data.numberOfFollicles16to22mm !== undefined
          ? `${data.numberOfFollicles16to22mm}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Endometrial Thickness
    list.push({
      id: 'endometrial_thickness',
      label: t('endometrialThicknessTriggerDay', 'Endometrial Thickness'),
      value:
        data.endometrialThicknessTriggerDay !== undefined
          ? `${data.endometrialThicknessTriggerDay} ${t('unitMm', 'mm')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Endometrial Pattern
    list.push({
      id: 'endometrial_pattern',
      label: t('endometrialPatternTriggerDay', 'Endometrial Pattern'),
      value: data.endometrialPatternTriggerDay,
      emptyPlaceholder: '—',
    });

    // Estradiol (E2)
    list.push({
      id: 'estradiol_e2',
      label: t('estradiolTriggerDay', 'Estradiol (E2)'),
      value:
        data.estradiolTriggerDay !== undefined
          ? `${data.estradiolTriggerDay} ${t('unitPgMl', 'pg/mL')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    // Progesterone (P4)
    list.push({
      id: 'progesterone_p4',
      label: t('progesteroneTriggerDay', 'Progesterone (P4)'),
      value:
        data.progesteroneTriggerDay !== undefined
          ? `${data.progesteroneTriggerDay} ${t('unitNgMl', 'ng/mL')}`
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  const administrationRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Ovulation Trigger
    list.push({
      id: 'ovulation_trigger',
      label: t('ovulationTrigger', 'Ovulation Trigger'),
      value: data.ovulationTrigger,
      emptyPlaceholder: '—',
    });

    // Trigger Dose
    list.push({
      id: 'ovulation_trigger_dose',
      label: t('ovulationTriggerDose', 'Trigger Dose'),
      value: data.ovulationTriggerDose,
      emptyPlaceholder: '—',
    });

    // Date of Trigger
    list.push({
      id: 'date_of_trigger',
      label: t('dateOfTrigger', 'Date of Trigger'),
      value: data.dateOfTrigger,
      emptyPlaceholder: '—',
    });

    // Time of Trigger
    list.push({
      id: 'time_of_trigger',
      label: t('timeOfTrigger', 'Time of Trigger'),
      value: data.timeOfTrigger,
      emptyPlaceholder: '—',
    });

    // Remarks
    list.push({
      id: 'trigger_details_remarks',
      label: t('triggerDetailsRemarks', 'Remarks / Notes'),
      value: data.triggerDetailsRemarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data, t]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ObservationCard
        title={t('triggerDetailsCardTitle', 'Trigger Day Follicles & Endometrium')}
        icon={Timer}
        rows={follicleRows}
      />
      <ObservationCard
        title={t('triggerAdministrationCardTitle', 'Ovulation Trigger Administration')}
        icon={Medication}
        rows={administrationRows}
      />
    </div>
  );
};
