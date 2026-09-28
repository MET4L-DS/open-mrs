import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ObstetricHistoryCard } from './obstetric-history-card.component';

describe('ObstetricHistoryCard', () => {
  it('renders all obstetric counts correctly when populated', () => {
    render(
      <ObstetricHistoryCard
        data={{
          hasData: true,
          gravida: '4',
          parity: '3',
          livingChildren: '2',
          abortionMiscarriage: '1',
          ectopicPregnancy: '0',
        }}
      />
    );

    expect(screen.getByText('Obstetric History Details')).toBeInTheDocument();
    expect(screen.getByText('Gravida (G)')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Parity (P)')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Living Children (L)')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Abortion / Miscarriage (A)')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Ectopic Pregnancy')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders placeholder dash for empty fields gracefully', () => {
    render(
      <ObstetricHistoryCard
        data={{
          hasData: true,
          gravida: undefined,
          parity: undefined,
          livingChildren: undefined,
          abortionMiscarriage: undefined,
          ectopicPregnancy: undefined,
        }}
      />
    );

    expect(screen.getByText('Obstetric History Details')).toBeInTheDocument();
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBe(5);
  });
});
