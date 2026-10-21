import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfertilityCard } from './infertility-card.component';

describe('InfertilityCard', () => {
  it('renders primary infertility and duration metrics correctly', () => {
    render(
      <InfertilityCard
        data={{
          hasData: true,
          typeOfInfertility: 'Primary infertility',
          durationOfInfertility: '3',
        }}
      />
    );

    expect(screen.getByText('Infertility Classification & Timeline')).toBeInTheDocument();
    expect(screen.getByText('Type of Infertility')).toBeInTheDocument();
    expect(screen.getByText('Primary infertility')).toBeInTheDocument();
    expect(screen.getByText('Duration of Infertility')).toBeInTheDocument();
    expect(screen.getByText('3 years')).toBeInTheDocument();
  });

  it('renders secondary infertility tag and handles empty fields gracefully', () => {
    render(
      <InfertilityCard
        data={{
          hasData: true,
          typeOfInfertility: 'Secondary infertility',
          durationOfInfertility: undefined,
        }}
      />
    );

    expect(screen.getByText('Secondary infertility')).toBeInTheDocument();
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBe(1);
  });
});
