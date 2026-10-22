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
  it('renders section card correctly with empty placeholders', () => {
    render(<FertilisationDetailsCard data={null} />);
    expect(screen.getByText('Fertilisation Details')).toBeInTheDocument();
    expect(screen.getByText('Number of Oocytes Fertilised')).toBeInTheDocument();
    expect(screen.getByText('Fertilisation Rate')).toBeInTheDocument();
  });

  it('renders recorded observation values correctly', () => {
    const mockData: resource.AiimsFertilisationDetailsData = {
      hasData: true,
      numberOocytesFertilised: '12',
      fertilisationRate: '80.0',
    };

    render(<FertilisationDetailsCard data={mockData} />);
    expect(screen.getByText('Number of Oocytes Fertilised')).toBeInTheDocument();
    expect(screen.getByText('12 oocytes')).toBeInTheDocument();
    expect(screen.getByText('Fertilisation Rate')).toBeInTheDocument();
    expect(screen.getByText('80.0 %')).toBeInTheDocument();
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
