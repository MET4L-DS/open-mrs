import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FertilisationDetailsCard } from './fertilisation-details-card.component';
import FertilisationDetailsDashboard from './fertilisation-details-dashboard.component';
import * as resource from './fertilisation-details.resource';

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

describe('FertilisationDetailsCard', () => {
  it('renders section cards correctly with empty placeholders', () => {
    render(<FertilisationDetailsCard data={null} />);
    expect(screen.getByText('Fertilisation & Insemination Outcome')).toBeInTheDocument();
    expect(screen.getByText('Cleavage Stage Assessment')).toBeInTheDocument();
    expect(screen.getByText('Laboratory Remarks')).toBeInTheDocument();
  });

  it('renders recorded observation values correctly', () => {
    const mockData: resource.AiimsFertilisationDetailsData = {
      hasData: true,
      numberOocytesFertilised: '12',
      fertilisationRate: '80.0',
      embryosCleavedDay2: '10',
      cleavageRate: '83.3',
      embryosCleavedDay3: '8',
      embryosCleavedDay5: '5',
      fertilisationDetailsRemarks: 'Good cleavage progression with high blastocyst rate.',
    };

    render(<FertilisationDetailsCard data={mockData} />);
    expect(screen.getByText('Number of Oocytes Fertilised')).toBeInTheDocument();
    expect(screen.getByText('12 oocytes')).toBeInTheDocument();
    expect(screen.getByText('Fertilisation Rate')).toBeInTheDocument();
    expect(screen.getByText('80.0 %')).toBeInTheDocument();
    expect(screen.getByText('Embryos Cleaved on Day 2')).toBeInTheDocument();
    expect(screen.getByText('10 embryos')).toBeInTheDocument();
    expect(screen.getByText('Good cleavage progression with high blastocyst rate.')).toBeInTheDocument();
  });
});

describe('FertilisationDetailsDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useFertilisationDetails').mockReturnValue({
      data: { hasData: false },
      latestEncounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<FertilisationDetailsDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No AIIMS Visit: Fertilisation Details encounter recorded yet')
    ).toBeInTheDocument();
  });
});
