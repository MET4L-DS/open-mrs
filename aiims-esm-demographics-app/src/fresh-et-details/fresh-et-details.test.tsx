import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FreshEtDetailsCard } from './fresh-et-details-card.component';
import FreshEtDetailsDashboard from './fresh-et-details-dashboard.component';
import * as resource from './fresh-et-details.resource';

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

describe('FreshEtDetailsCard', () => {
  it('renders section card title and rows correctly', () => {
    render(<FreshEtDetailsCard data={null} />);
    expect(screen.getByText('Fresh Embryo Transfer Details')).toBeInTheDocument();
    expect(screen.getByText('Fresh Embryo Transfer Done')).toBeInTheDocument();
    expect(screen.getByText('Embryo Transfer Date')).toBeInTheDocument();
    expect(screen.getByText('Number of Embryos Transferred')).toBeInTheDocument();
  });

  it('renders populated transfer procedure observations correctly', () => {
    const mockData: resource.AiimsFreshEtDetailsData = {
      hasData: true,
      freshEmbryoTransfer: 'Yes',
      freshEtDate: '2026-10-14',
      dayOfFreshEmbryoTransfer: 'Day 5',
      numberFreshEmbryosTransferred: '2',
      gradeFreshEmbryosTransferred: '4AA',
      freshEtEndometrialThickness: '9.5',
      freshEtDifficulty: 'Easy',
      bloodOnTipOfCatheter: 'No',
      freshEtRemarks: 'Smooth transfer under ultrasound guidance',
    };

    render(<FreshEtDetailsCard data={mockData} />);
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('2026-10-14')).toBeInTheDocument();
    expect(screen.getByText('Day 5')).toBeInTheDocument();
    expect(screen.getByText(/2\s+embryos/)).toBeInTheDocument();
    expect(screen.getByText('4AA')).toBeInTheDocument();
    expect(screen.getByText(/9\.5\s+mm/)).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('Smooth transfer under ultrasound guidance')).toBeInTheDocument();
  });

  it('renders cancellation reasons correctly when transfer not done', () => {
    const mockData: resource.AiimsFreshEtDetailsData = {
      hasData: true,
      freshEmbryoTransfer: 'No',
      reasonFreshEtNotDone: 'Risk of Ovarian Hyperstimulation',
      otherReasonFreshEtNotDone: 'Freeze-all policy due to high follicle count',
      freshEtRemarks: 'Planned for frozen embryo transfer next cycle',
    };

    render(<FreshEtDetailsCard data={mockData} />);
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Risk of Ovarian Hyperstimulation')).toBeInTheDocument();
    expect(screen.getByText('Freeze-all policy due to high follicle count')).toBeInTheDocument();
  });
});

describe('FreshEtDetailsDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useFreshEtDetails').mockReturnValue({
      data: { hasData: false },
      latestEncounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<FreshEtDetailsDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No Fresh Embryo Transfer Details encounter recorded yet')
    ).toBeInTheDocument();
  });
});
