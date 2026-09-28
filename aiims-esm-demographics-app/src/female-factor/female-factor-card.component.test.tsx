import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FemaleFactorCard } from './female-factor-card.component';

vi.mock('@openmrs/esm-framework', () => ({
  formatDate: vi.fn((date: Date) => date.toISOString().split('T')[0]),
}));

describe('FemaleFactorCard', () => {
  it('renders all female factor details correctly when fully populated', () => {
    render(
      <FemaleFactorCard
        data={{
          hasData: true,
          femaleFactors: ['Tubal factor', 'Diminished ovarian reserve', 'PCOS'],
          tubalFactorDetails: ['Tubal block bilateral', 'Hydrosalpinx'],
          dorDetails: 'POSEIDON criteria',
          poseidonGroup: 'POSEIDON GROUP 2a',
          endometriosisClassification: ['ASRM'],
          pcosPhenotype: 'Phenotype A (Classic/Severe)',
          uterineFactorDetails: ['Fibroids', 'Polyps'],
          otherFemaleFactors: ['Oncofertility'],
          femaleFactorOthers: 'Prior laparoscopy in 2024',
        }}
      />
    );

    expect(screen.getByText('Female Factor Infertility Details')).toBeInTheDocument();
    expect(screen.getByText('Female Infertility Factors')).toBeInTheDocument();
    expect(screen.getByText('Tubal factor')).toBeInTheDocument();
    expect(screen.getByText('Diminished ovarian reserve')).toBeInTheDocument();
    expect(screen.getByText('PCOS')).toBeInTheDocument();
    expect(screen.getByText('Tubal Factor Findings')).toBeInTheDocument();
    expect(screen.getByText('Tubal block bilateral, Hydrosalpinx')).toBeInTheDocument();
    expect(screen.getByText('Diminished Ovarian Reserve')).toBeInTheDocument();
    expect(screen.getByText('POSEIDON criteria (POSEIDON GROUP 2a)')).toBeInTheDocument();
    expect(screen.getByText('PCOS Phenotype')).toBeInTheDocument();
    expect(screen.getByText('Phenotype A (Classic/Severe)')).toBeInTheDocument();
    expect(screen.getByText('Uterine Factor Findings')).toBeInTheDocument();
    expect(screen.getByText('Fibroids, Polyps')).toBeInTheDocument();
    expect(screen.getByText('Clinical Notes')).toBeInTheDocument();
    expect(screen.getByText('Prior laparoscopy in 2024')).toBeInTheDocument();
  });

  it('renders placeholder dash when fields are empty gracefully', () => {
    render(
      <FemaleFactorCard
        data={{
          hasData: true,
          femaleFactors: [],
          tubalFactorDetails: [],
          endometriosisClassification: [],
          uterineFactorDetails: [],
          otherFemaleFactors: [],
        }}
      />
    );

    expect(screen.getByText('Female Factor Infertility Details')).toBeInTheDocument();
    expect(screen.getByText('Female Infertility Factors')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
