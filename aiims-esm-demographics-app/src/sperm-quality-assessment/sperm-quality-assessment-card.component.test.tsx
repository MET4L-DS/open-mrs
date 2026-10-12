import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SpermQualityAssessmentCard } from './sperm-quality-assessment-card.component';
import {
  type AiimsSpermQualityAssessmentData,
  initialAiimsSpermQualityAssessmentData,
} from './sperm-quality-assessment.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('SpermQualityAssessmentCard', () => {
  it('renders card titles and question labels when empty', () => {
    render(
      <SpermQualityAssessmentCard
        data={initialAiimsSpermQualityAssessmentData}
      />
    );

    expect(
      screen.getByText('Sperm Retrieval & Source Procedure')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Laboratory Notes & Remarks')
    ).toBeInTheDocument();

    expect(screen.getByText('Sperm Retrieval Procedure')).toBeInTheDocument();
    expect(screen.getByText('Remarks / Notes')).toBeInTheDocument();
  });

  it('renders recorded sperm quality assessment observations correctly', () => {
    const data: AiimsSpermQualityAssessmentData = {
      hasData: true,
      encounterUuid: 'enc-sqa-1',
      encounterDatetime: '2026-10-12T11:45:00.000Z',
      spermRetrievalProcedure: [
        'Percutaneous Epididymal Sperm Aspiration (PESA)',
        'Frozen',
        'Husband Semen (HS)',
      ],
      spermQualityAssessmentRemarks:
        'Good motile sperm recovered after thaw, suitable for ICSI.',
    };

    render(<SpermQualityAssessmentCard data={data} />);

    expect(
      screen.getByText(
        'Percutaneous Epididymal Sperm Aspiration (PESA), Frozen, Husband Semen (HS)'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Good motile sperm recovered after thaw, suitable for ICSI.'
      )
    ).toBeInTheDocument();
  });
});
