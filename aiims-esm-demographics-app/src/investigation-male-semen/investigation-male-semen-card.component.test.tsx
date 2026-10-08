import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InvestigationMaleSemenCard } from './investigation-male-semen-card.component';
import {
  type AiimsInvestigationMaleSemenData,
  initialAiimsInvestigationMaleSemenData,
} from './investigation-male-semen.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('InvestigationMaleSemenCard', () => {
  it('renders card title and question labels when empty', () => {
    render(
      <InvestigationMaleSemenCard
        data={initialAiimsInvestigationMaleSemenData}
      />
    );

    expect(
      screen.getByText('Husband Semen Analysis (HSA)')
    ).toBeInTheDocument();
    expect(screen.getByText('Semen Volume')).toBeInTheDocument();
    expect(screen.getByText('Semen Count')).toBeInTheDocument();
    expect(screen.getByText('Motility Finding')).toBeInTheDocument();
    expect(
      screen.getByText('Motility (Total / Progressive)')
    ).toBeInTheDocument();
    expect(screen.getByText('Sperm Morphology')).toBeInTheDocument();
    expect(
      screen.getByText('Semen Analysis Remarks / Notes')
    ).toBeInTheDocument();
  });

  it('renders recorded semen observations correctly', () => {
    const data: AiimsInvestigationMaleSemenData = {
      hasData: true,
      encounterUuid: 'enc-semen-1',
      encounterDatetime: '2026-10-08T10:00:00.000Z',
      semenVolume: 2.5,
      semenCount: 45,
      semenMotilityFinding: ['Few motile'],
      semenMotilityTotalProgressive: '50% / 35%',
      spermMorphology: 'Normal forms 4%',
      investigationMaleSemenRemarks: 'Normozoospermia',
    };

    render(<InvestigationMaleSemenCard data={data} />);

    expect(screen.getByText('2.5 mL')).toBeInTheDocument();
    expect(screen.getByText('45 million/mL')).toBeInTheDocument();
    expect(screen.getByText('Few motile')).toBeInTheDocument();
    expect(screen.getByText('50% / 35%')).toBeInTheDocument();
    expect(screen.getByText('Normal forms 4%')).toBeInTheDocument();
    expect(screen.getByText('Normozoospermia')).toBeInTheDocument();
  });
});
