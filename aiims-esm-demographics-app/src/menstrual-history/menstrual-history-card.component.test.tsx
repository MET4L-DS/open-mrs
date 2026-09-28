import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MenstrualHistoryCard } from './menstrual-history-card.component';

vi.mock('@openmrs/esm-framework', () => ({
  formatDate: vi.fn((date: Date) => date.toISOString().split('T')[0]),
}));

describe('MenstrualHistoryCard', () => {
  it('renders all menstrual history details correctly when populated', () => {
    render(
      <MenstrualHistoryCard
        data={{
          hasData: true,
          patternOfMenstrualCycle: 'Regular periods',
          lastMenstrualPeriod: '2026-05-15T00:00:00.000Z',
          flowOfMenstrualCycle: 'Normal',
        }}
      />
    );

    expect(screen.getByText('Menstrual Cycle Details')).toBeInTheDocument();
    expect(screen.getByText('Pattern of Menstrual Cycle')).toBeInTheDocument();
    expect(screen.getByText('Regular periods')).toBeInTheDocument();
    expect(screen.getByText('Last Menstrual Period (LMP)')).toBeInTheDocument();
    expect(screen.getByText('2026-05-15')).toBeInTheDocument();
    expect(screen.getByText('Flow of Menstrual Cycle')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
  });

  it('renders placeholder dash for empty fields gracefully', () => {
    render(
      <MenstrualHistoryCard
        data={{
          hasData: true,
          patternOfMenstrualCycle: undefined,
          lastMenstrualPeriod: undefined,
          flowOfMenstrualCycle: undefined,
        }}
      />
    );

    expect(screen.getByText('Menstrual Cycle Details')).toBeInTheDocument();
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBe(3);
  });

  it('renders nested sub-type fields when present', () => {
    render(
      <MenstrualHistoryCard
        data={{
          hasData: true,
          patternOfMenstrualCycle: 'Irregular periods',
          irregularCycleType: 'Oligomenorrhea',
          lastMenstrualPeriod: '2026-05-15T00:00:00.000Z',
          flowOfMenstrualCycle: 'Amenorrhoea',
          amenorrhoeaType: 'Secondary',
        }}
      />
    );

    expect(screen.getByText('Pattern of Menstrual Cycle')).toBeInTheDocument();
    expect(screen.getByText('Irregular periods')).toBeInTheDocument();
    expect(screen.getByText('Type of Irregular Periods')).toBeInTheDocument();
    expect(screen.getByText('Oligomenorrhea')).toBeInTheDocument();
    expect(screen.getByText('Flow of Menstrual Cycle')).toBeInTheDocument();
    expect(screen.getByText('Amenorrhoea')).toBeInTheDocument();
    expect(screen.getByText('Type of Amenorrhoea')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });
});
