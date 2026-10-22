import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DoseOfDrugsCard } from './dose-of-drugs-card.component';
import DoseOfDrugsDashboard from './dose-of-drugs-dashboard.component';
import * as resource from './dose-of-drugs.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue || key,
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

describe('DoseOfDrugsCard', () => {
  it('renders correctly with complete drug dose data', () => {
    const mockData: resource.AiimsDoseOfDrugsData = {
      hasData: true,
      totalDaysOfLeuprolideDownregulation: '14',
      totalDaysOfStimulation: '10',
      startingDoseFsh: '150',
      totalDoseFsh: '1500',
      startingDoseHmg: '75',
      totalDoseHmg: '750',
      startingDoseRlh: '75',
      totalDoseRlh: '750',
      dayOfStartOfCetrotide: 'Day 6',
      totalCetrotideDose: '1.25',
    };

    render(<DoseOfDrugsCard data={mockData} />);

    expect(screen.getByText('Dose of Drugs')).toBeInTheDocument();
    expect(screen.getByText('Total days of Leuprolide Downregulation')).toBeInTheDocument();
    expect(screen.getByText('Starting dose Follicle-Stimulating Hormone (FSH)')).toBeInTheDocument();
    expect(screen.getByText('Day of start of Cetrotide')).toBeInTheDocument();

    expect(screen.getByText('14 days')).toBeInTheDocument();
    expect(screen.getByText('10 days')).toBeInTheDocument();
    expect(screen.getByText('150 IU')).toBeInTheDocument();
    expect(screen.getByText('1500 IU')).toBeInTheDocument();
    expect(screen.getAllByText('75 IU')).toHaveLength(2);
    expect(screen.getAllByText('750 IU')).toHaveLength(2);
    expect(screen.getByText('Day 6')).toBeInTheDocument();
    expect(screen.getByText('1.25 mg')).toBeInTheDocument();
  });

  it('renders placeholders when data fields are undefined', () => {
    render(<DoseOfDrugsCard data={null} />);

    expect(screen.getByText('Dose of Drugs')).toBeInTheDocument();
    expect(screen.getByText('Total days of Leuprolide Downregulation')).toBeInTheDocument();
    expect(screen.getByText('Starting dose Follicle-Stimulating Hormone (FSH)')).toBeInTheDocument();
  });
});

describe('DoseOfDrugsDashboard', () => {
  it('displays empty state when no data exists', () => {
    vi.spyOn(resource, 'useDoseOfDrugs').mockReturnValue({
      doseOfDrugsData: resource.initialAiimsDoseOfDrugsData,
      latestEncounter: null,
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    });

    render(<DoseOfDrugsDashboard patientUuid="patient-123" />);

    expect(screen.getByText('No Dose of Drugs Recorded Yet')).toBeInTheDocument();
  });

  it('renders drug dose cards when data is present', () => {
    vi.spyOn(resource, 'useDoseOfDrugs').mockReturnValue({
      doseOfDrugsData: {
        hasData: true,
        encounterUuid: 'enc-1',
        totalDaysOfStimulation: '11',
        startingDoseFsh: '225',
      },
      latestEncounter: { uuid: 'enc-1', encounterDatetime: '2026-10-12' } as any,
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    });

    render(<DoseOfDrugsDashboard patientUuid="patient-123" />);

    expect(screen.getByText('Dose of Drugs')).toBeInTheDocument();
    expect(screen.getByText('11 days')).toBeInTheDocument();
    expect(screen.getByText('225 IU')).toBeInTheDocument();
  });
});
