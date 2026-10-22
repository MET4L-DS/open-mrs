import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmbryosCleavageDetailsCard } from './embryos-cleavage-details-card.component';
import EmbryosCleavageDetailsDashboard from './embryos-cleavage-details-dashboard.component';
import * as resource from './embryos-cleavage-details.resource';

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

describe('EmbryosCleavageDetailsCard', () => {
  it('renders section card correctly with empty placeholders', () => {
    render(<EmbryosCleavageDetailsCard data={null} />);
    expect(screen.getByText('Embryos Cleavage Details')).toBeInTheDocument();
    expect(screen.getByText('Embryos Cleaved on Day 2')).toBeInTheDocument();
    expect(screen.getByText('Cleavage Rate')).toBeInTheDocument();
    expect(screen.getByText('Embryos Cleaved on Day 3')).toBeInTheDocument();
    expect(screen.getByText('Number of Embryos Cleaved on Day 5')).toBeInTheDocument();
  });

  it('renders recorded observation values correctly', () => {
    const mockData: resource.AiimsEmbryosCleavageDetailsData = {
      hasData: true,
      embryosCleavedDay2: '10',
      cleavageRate: '83.3',
      embryosCleavedDay3: '8',
      embryosCleavedDay5: '5',
    };

    render(<EmbryosCleavageDetailsCard data={mockData} />);
    expect(screen.getByText('Embryos Cleaved on Day 2')).toBeInTheDocument();
    expect(screen.getByText('10 embryos')).toBeInTheDocument();
    expect(screen.getByText('Cleavage Rate')).toBeInTheDocument();
    expect(screen.getByText('83.3 %')).toBeInTheDocument();
    expect(screen.getByText('Embryos Cleaved on Day 3')).toBeInTheDocument();
    expect(screen.getByText('8 embryos')).toBeInTheDocument();
    expect(screen.getByText('Number of Embryos Cleaved on Day 5')).toBeInTheDocument();
    expect(screen.getByText('5 embryos')).toBeInTheDocument();
  });
});

describe('EmbryosCleavageDetailsDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useEmbryosCleavageDetails').mockReturnValue({
      data: { hasData: false },
      latestEncounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<EmbryosCleavageDetailsDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No AIIMS Visit: Embryos Cleavage Details encounter recorded yet')
    ).toBeInTheDocument();
  });
});
