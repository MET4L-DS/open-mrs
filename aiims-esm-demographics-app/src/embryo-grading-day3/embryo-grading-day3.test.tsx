import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmbryoGradingDay3Card } from './embryo-grading-day3-card.component';
import EmbryoGradingDay3Dashboard from './embryo-grading-day3-dashboard.component';
import * as resource from './embryo-grading-day3.resource';

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

describe('EmbryoGradingDay3Card', () => {
  it('renders card titles correctly', () => {
    render(<EmbryoGradingDay3Card data={null} />);
    expect(screen.getByText('Day 3 Cleavage Stage Embryo Grading')).toBeInTheDocument();
    expect(screen.getByText('Laboratory Notes & Remarks')).toBeInTheDocument();
  });

  it('renders all grade counts and total correctly when data is provided', () => {
    const mockData: resource.AiimsEmbryoGradingDay3Data = {
      hasData: true,
      grade1EmbryosDay3: '4',
      grade2EmbryosDay3: '3',
      grade3EmbryosDay3: '1',
      grade4EmbryosDay3: '0',
      totalGradedEmbryosDay3: 8,
      embryoGradingDay3Remarks: 'Uniform cleavage, minimal fragmentation',
    };

    render(<EmbryoGradingDay3Card data={mockData} />);
    expect(screen.getByText('Grade 1 Embryos (Day 3)')).toBeInTheDocument();
    expect(screen.getByText(/4\s+embryos/)).toBeInTheDocument();
    expect(screen.getByText('Grade 2 Embryos (Day 3)')).toBeInTheDocument();
    expect(screen.getByText(/3\s+embryos/)).toBeInTheDocument();
    expect(screen.getByText('Total Graded Embryos (Day 3)')).toBeInTheDocument();
    expect(screen.getByText(/8\s+embryos/)).toBeInTheDocument();
    expect(screen.getByText('Uniform cleavage, minimal fragmentation')).toBeInTheDocument();
  });
});

describe('EmbryoGradingDay3Dashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useEmbryoGradingDay3').mockReturnValue({
      data: { hasData: false },
      encounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<EmbryoGradingDay3Dashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No AIIMS Visit: Embryo Grading Day 3 encounter recorded yet')
    ).toBeInTheDocument();
  });

  it('renders content when hasData is true', () => {
    vi.spyOn(resource, 'useEmbryoGradingDay3').mockReturnValue({
      data: {
        hasData: true,
        grade1EmbryosDay3: '2',
        totalGradedEmbryosDay3: 2,
      },
      encounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<EmbryoGradingDay3Dashboard patientUuid="patient-1" />);
    expect(screen.getByText('Day 3 Cleavage Stage Embryo Grading')).toBeInTheDocument();
    expect(screen.getByText('Grade 1 Embryos (Day 3)')).toBeInTheDocument();
  });
});
