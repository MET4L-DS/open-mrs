import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AdjuvantDrugCard } from './adjuvant-drug-card.component';
import AdjuvantDrugDashboard from './adjuvant-drug-dashboard.component';
import * as resource from './adjuvant-drug.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue?: string) => defaultValue || _key,
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

describe('AdjuvantDrugCard', () => {
  it('renders correctly with complete growth hormone data', () => {
    const mockData: resource.AiimsAdjuvantDrugData = {
      hasData: true,
      growthHormone: 'Yes',
      growthHormoneDose: '4.5',
      growthHormoneDuration: '14',
      remarks: 'Administered in luteal phase prior to stimulation.',
    };

    render(<AdjuvantDrugCard data={mockData} />);

    expect(screen.getByText('Growth Hormone (GH) Adjuvant Therapy')).toBeInTheDocument();
    expect(screen.getByText('Clinical Notes & Remarks')).toBeInTheDocument();

    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('4.5 IU')).toBeInTheDocument();
    expect(screen.getByText('14 days')).toBeInTheDocument();
    expect(screen.getByText('Administered in luteal phase prior to stimulation.')).toBeInTheDocument();
  });

  it('renders empty placeholders when data is null', () => {
    render(<AdjuvantDrugCard data={null} />);

    expect(screen.getByText('Growth Hormone (GH) Adjuvant Therapy')).toBeInTheDocument();
    expect(screen.getByText('Clinical Notes & Remarks')).toBeInTheDocument();

    const placeholders = screen.getAllByText('—');
    expect(placeholders).toHaveLength(4);
  });
});

describe('AdjuvantDrugDashboard', () => {
  it('displays empty state when no data exists', () => {
    vi.spyOn(resource, 'useAdjuvantDrug').mockReturnValue({
      adjuvantDrugData: resource.initialAiimsAdjuvantDrugData,
      latestEncounter: null,
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    });

    render(<AdjuvantDrugDashboard patientUuid="patient-123" />);

    expect(screen.getByText('No Adjuvant Drug Recorded Yet')).toBeInTheDocument();
  });

  it('renders adjuvant drug cards when data is present', () => {
    vi.spyOn(resource, 'useAdjuvantDrug').mockReturnValue({
      adjuvantDrugData: {
        hasData: true,
        encounterUuid: 'enc-1',
        growthHormone: 'Yes',
        growthHormoneDose: '2.5',
      },
      latestEncounter: { uuid: 'enc-1', encounterDatetime: '2026-10-12' } as any,
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    });

    render(<AdjuvantDrugDashboard patientUuid="patient-123" />);

    expect(screen.getByText('Growth Hormone (GH) Adjuvant Therapy')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('2.5 IU')).toBeInTheDocument();
  });
});
