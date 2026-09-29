import React from 'react';
import { Medication } from '@carbon/react/icons';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { type AiimsPreviousOiIuiData } from './previous-oi-iui.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';
import styles from '../shared/styles/shared.scss';

interface PreviousOiIuiCardProps {
  data: AiimsPreviousOiIuiData;
}

export const PreviousOiIuiCard: React.FC<PreviousOiIuiCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const oiDrugsDisplay = React.useMemo(() => {
    if (!data.oiDrugs || data.oiDrugs.length === 0) {
      return undefined;
    }
    return (
      <div className={styles.tagList}>
        {data.oiDrugs.map(drug => (
          <Tag key={drug} type="teal" size="sm">
            {drug}
          </Tag>
        ))}
      </div>
    );
  }, [data.oiDrugs]);

  const iuiDrugsDisplay = React.useMemo(() => {
    if (!data.iuiDrugs || data.iuiDrugs.length === 0) {
      return undefined;
    }
    return (
      <div className={styles.tagList}>
        {data.iuiDrugs.map(drug => (
          <Tag key={drug} type="purple" size="sm">
            {drug}
          </Tag>
        ))}
      </div>
    );
  }, [data.iuiDrugs]);

  const rows = React.useMemo(() => {
    const list: ObservationRow[] = [
      {
        label: t('prevOi', 'Previous Ovulation Induction (OI)'),
        value: data.prevOi,
      },
    ];

    if (data.prevOi === 'Yes' || (data.oiDrugs && data.oiDrugs.length > 0)) {
      if (oiDrugsDisplay) {
        list.push({
          label: t('oiDrugs', 'Ovulation Induction Drugs'),
          value: oiDrugsDisplay,
        });
      }
      if (data.oiDose) {
        list.push({
          label: t('oiDose', 'OI Drug Dose'),
          value: data.oiDose,
        });
      }
      if (data.oiCycles) {
        list.push({
          label: t('oiCycles', 'Number of Previous OI Cycles'),
          value: data.oiCycles,
          unit: t('cycles', 'cycles'),
        });
      }
      if (data.oiYear) {
        list.push({
          label: t('oiYear', 'Year of Previous OI'),
          value: data.oiYear,
        });
      }
    }

    list.push({
      label: t('prevOiIui', 'Previous OI & Intra-Uterine Insemination (IUI)'),
      value: data.prevOiIui,
    });

    if (data.prevOiIui === 'Yes' || (data.iuiDrugs && data.iuiDrugs.length > 0)) {
      if (iuiDrugsDisplay) {
        list.push({
          label: t('iuiDrugs', 'IUI Ovulation Induction Drugs'),
          value: iuiDrugsDisplay,
        });
      }
      if (data.iuiDose) {
        list.push({
          label: t('iuiDose', 'OI + IUI Drug Dose'),
          value: data.iuiDose,
        });
      }
      if (data.iuiCycles) {
        list.push({
          label: t('iuiCycles', 'Number of Previous OI + IUI Cycles'),
          value: data.iuiCycles,
          unit: t('cycles', 'cycles'),
        });
      }
      if (data.iuiYear) {
        list.push({
          label: t('iuiYear', 'Year of Previous OI + IUI'),
          value: data.iuiYear,
        });
      }
    }

    list.push({
      label: t('failedIvf', 'Failed In Vitro Fertilization (IVF)'),
      value: data.failedIvf,
    });

    if (data.failedIvf === 'Yes' || data.failedIvfCycles) {
      if (data.failedIvfCycles) {
        list.push({
          label: t('failedIvfCycles', 'Number of Failed IVF Cycles'),
          value: data.failedIvfCycles,
          unit: t('cycles', 'cycles'),
        });
      }
    }

    if (data.previousArtNotes) {
      list.push({
        label: t('previousArtNotes', 'Previous ART Clinical Notes'),
        value: data.previousArtNotes,
      });
    }

    return list;
  }, [data, oiDrugsDisplay, iuiDrugsDisplay, t]);

  return (
    <ObservationCard
      title={t('prevOiIuiDetails', 'Previous Ovulation Induction & IUI History')}
      icon={Medication}
      rows={rows}
    />
  );
};
