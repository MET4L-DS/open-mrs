import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmbryosFrozenCard } from './embryos-frozen-card.component';
import EmbryosFrozenDashboard from './embryos-frozen-dashboard.component';
import * as resource from './embryos-frozen.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue?: string, options?: any) => {
      let result = defaultValue || _key;
      if (options?.value !== undefined && options?.unit !== undefined) {
        return `${options.value} ${options.unit}`;
      }
      return result;
    },
  }),
}));

vi.mock('../shared/components', async () => {
  const actual = await vi.importActual('../shared/components');
  return {
    ...actual,
    FormDashboardShell: ({
      children,
      isLoading,
      hasData,
      emptyHeading,
    }: any) => (
      <div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && !hasData && <div>{emptyHeading}</div>}
        {!isLoading && hasData && children}
      </div>
    ),
  };
});

describe('EmbryosFrozenCard', () => {
  it('renders card titles correctly', () => {
    render(<EmbryosFrozenCard data={null} />);
    expect(screen.getByText('Day 3 Embryo Vitrification (Cleavage Stage)')).toBeInTheDocument();
    expect(screen.getByText('Day 5 Blastocyst Vitrification')).toBeInTheDocument();
    expect(screen.getByText('Cryopreservation Notes & Remarks')).toBeInTheDocument();
  });

  it('renders all populated vitrification observations correctly', () => {
    const mockData: resource.AiimsEmbryosFrozenData = {
      hasData: true,
      numberDay3EmbryosVitrified: '4',
      gradeAEmbryosVitrified: '2 (Straw 1: 8C/A, 8C/A)',
      gradeBEmbryosVitrified: '1 (Straw 2: 7C/B)',
      gradeCEmbryosVitrified: '1 (Straw 2: 6C/C)',
      numberDay5EmbryosVitrified: '2',
      gradeDay5EmbryosVitrified: '4AA, 3BB',
      embryosFrozenRemarks: 'Vitrified in LN2 Tank 3, Canister 2, Goblet Red',
    };

    render(<EmbryosFrozenCard data={mockData} />);
    expect(screen.getByText('Number of Day 3 Embryos Vitrified')).toBeInTheDocument();
    expect(screen.getByText(/4\s+embryos/)).toBeInTheDocument();
    expect(screen.getByText('Grade A Embryos Vitrified')).toBeInTheDocument();
    expect(screen.getByText('2 (Straw 1: 8C/A, 8C/A)')).toBeInTheDocument();
    expect(screen.getByText('Grade B Embryos Vitrified')).toBeInTheDocument();
    expect(screen.getByText('1 (Straw 2: 7C/B)')).toBeInTheDocument();
    expect(screen.getByText('Grade C Embryos Vitrified')).toBeInTheDocument();
    expect(screen.getByText('1 (Straw 2: 6C/C)')).toBeInTheDocument();
    expect(screen.getByText('Number of Day 5 Embryos Vitrified')).toBeInTheDocument();
    expect(screen.getByText(/2\s+embryos/)).toBeInTheDocument();
    expect(screen.getByText('Grade of Day 5 Embryos Vitrified')).toBeInTheDocument();
    expect(screen.getByText('4AA, 3BB')).toBeInTheDocument();
    expect(screen.getByText('Vitrified in LN2 Tank 3, Canister 2, Goblet Red')).toBeInTheDocument();
  });
});

describe('EmbryosFrozenDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useEmbryosFrozen').mockReturnValue({
      data: { hasData: false },
      encounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<EmbryosFrozenDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No AIIMS Visit: Embryos Frozen encounter recorded yet')
    ).toBeInTheDocument();
  });

  it('renders card content when hasData is true', () => {
    vi.spyOn(resource, 'useEmbryosFrozen').mockReturnValue({
      data: {
        hasData: true,
        numberDay3EmbryosVitrified: '3',
      },
      encounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<EmbryosFrozenDashboard patientUuid="patient-1" />);
    expect(screen.getByText('Day 3 Embryo Vitrification (Cleavage Stage)')).toBeInTheDocument();
    expect(screen.getByText('Number of Day 3 Embryos Vitrified')).toBeInTheDocument();
  });
});
