import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InvestigationFemaleProcedureBiopsyCard } from './investigation-female-procedure-biopsy-card.component';
import {
  type AiimsInvestigationFemaleProcedureBiopsyData,
  initialAiimsInvestigationFemaleProcedureBiopsyData,
} from './investigation-female-procedure-biopsy.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('InvestigationFemaleProcedureBiopsyCard', () => {
  it('renders card title and question labels when empty', () => {
    render(
      <InvestigationFemaleProcedureBiopsyCard
        data={initialAiimsInvestigationFemaleProcedureBiopsyData}
      />
    );

    expect(
      screen.getByText('Endometrial Biopsy Findings (EAHPE, PCR, AFB)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Histopathological Examination (EAHPE)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Polymerase Chain Reaction (PCR)')
    ).toBeInTheDocument();
    expect(screen.getByText('Acid Fast Bacillus (AFB)')).toBeInTheDocument();
    expect(screen.getByText('Biopsy Remarks / Notes')).toBeInTheDocument();
  });

  it('renders recorded procedure biopsy observations correctly', () => {
    const data: AiimsInvestigationFemaleProcedureBiopsyData = {
      hasData: true,
      encounterUuid: 'enc-biopsy-1',
      encounterDatetime: '2026-10-08T10:00:00.000Z',
      endometrialAspirationHistopathology: [
        'Proliferative endometrium',
        'Fragmented Endometrial Glands',
      ],
      endometrialAspirationPcr: 'Negative',
      endometrialAspirationAfb: 'Negative',
      investigationFemaleProcedureBiopsyRemarks: 'No granuloma or AFB seen',
    };

    render(<InvestigationFemaleProcedureBiopsyCard data={data} />);

    expect(
      screen.getByText('Proliferative endometrium, Fragmented Endometrial Glands')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Negative')).toHaveLength(2);
    expect(screen.getByText('No granuloma or AFB seen')).toBeInTheDocument();
  });
});
