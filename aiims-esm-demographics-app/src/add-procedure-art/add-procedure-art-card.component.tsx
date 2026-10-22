import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Notebook } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { AiimsAddProcedureArtData } from './add-procedure-art.resource';

export interface AddProcedureArtCardProps {
  data: AiimsAddProcedureArtData | null | undefined;
}

export const AddProcedureArtCard: React.FC<AddProcedureArtCardProps> = ({ data }) => {
  const { t } = useTranslation();

  // Card 1: Additional Procedures in ART
  const procedureRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'additional-procedures-art',
        label: t('additionalProceduresArt', 'Additional Procedures in Assisted Reproductive Technology'),
        value:
          data?.additionalProceduresArt && data.additionalProceduresArt.length > 0
            ? data.additionalProceduresArt.join(', ')
            : undefined,
        emptyPlaceholder: '—',
      },
      {
        id: 'date-of-additional-art-procedure',
        label: t('dateOfAdditionalArtProcedure', 'Date of Procedure'),
        value: data?.dateOfAdditionalArtProcedure,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  // Card 2: Clinical Remarks & Notes
  const remarksRows: ObservationRow[] = React.useMemo(() => {
    return [
      {
        id: 'additional-art-remarks',
        label: t('additionalArtRemarks', 'Remarks / Notes'),
        value: data?.additionalArtRemarks,
        emptyPlaceholder: '—',
      },
    ];
  }, [data, t]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ObservationCard
        title={t('additionalProceduresArtCardTitle', 'Additional Procedures in Assisted Reproductive Technology')}
        icon={Activity}
        rows={procedureRows}
      />
      <ObservationCard
        title={t('additionalArtRemarksCardTitle', 'Clinical Notes & Remarks')}
        icon={Notebook}
        rows={remarksRows}
      />
    </div>
  );
};
