import React from 'react';
import { Microscope, ReportData } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { type AiimsSpermQualityAssessmentData } from './sperm-quality-assessment.resource';
import { ObservationCard, type ObservationRow } from '../shared/components';

interface SpermQualityAssessmentCardProps {
  data: AiimsSpermQualityAssessmentData;
}

export const SpermQualityAssessmentCard: React.FC<
  SpermQualityAssessmentCardProps
> = ({ data }) => {
  const { t } = useTranslation();

  const procedureRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Sperm Retrieval Procedure
    list.push({
      id: 'sperm_retrieval_procedure',
      label: t('spermRetrievalProcedure', 'Sperm Retrieval Procedure'),
      value:
        data.spermRetrievalProcedure.length > 0
          ? data.spermRetrievalProcedure.join(', ')
          : undefined,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data.spermRetrievalProcedure, t]);

  const remarksRows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];

    // Remarks
    list.push({
      id: 'sperm_quality_assessment_remarks',
      label: t('remarks', 'Remarks / Notes'),
      value: data.spermQualityAssessmentRemarks,
      emptyPlaceholder: '—',
    });

    return list;
  }, [data.spermQualityAssessmentRemarks, t]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ObservationCard
        title={t(
          'spermRetrievalCardTitle',
          'Sperm Retrieval & Source Procedure'
        )}
        icon={Microscope}
        rows={procedureRows}
      />
      <ObservationCard
        title={t('laboratoryNotesRemarks', 'Laboratory Notes & Remarks')}
        icon={ReportData}
        rows={remarksRows}
      />
    </div>
  );
};
