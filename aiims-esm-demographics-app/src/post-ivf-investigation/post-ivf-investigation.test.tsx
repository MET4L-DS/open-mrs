import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PostIvfInvestigationCard } from './post-ivf-investigation-card.component';
import PostIvfInvestigationDashboard from './post-ivf-investigation-dashboard.component';
import * as resource from './post-ivf-investigation.resource';

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

describe('PostIvfInvestigationCard', () => {
  it('renders card title correctly', () => {
    render(<PostIvfInvestigationCard data={null} />);
    expect(screen.getByText('AIIMS Visit: Post-InVitro Fertilisation Investigation Details')).toBeInTheDocument();
  });

  it('renders populated observations correctly', () => {
    const mockData: resource.AiimsPostIvfInvestigationData = {
      hasData: true,
      uptResult: 'Positive',
      betaHcg: 1540,
      scan6To7Weeks: 'Single intrauterine gestational sac with fetal pole and cardiac activity.',
      postIvfOutcome: 'Clinical pregnancy',
      postIvfComplications: 'Gestational Diabetes',
      otherPregnancyComplications: 'Mild spotting at week 6',
      modeOfDelivery: 'Cesarean section',
      pogAtDelivery: 38.5,
    };

    render(<PostIvfInvestigationCard data={mockData} />);
    expect(screen.getByText('Positive')).toBeInTheDocument();
    expect(screen.getByText('1540 mIU/mL')).toBeInTheDocument();
    expect(screen.getByText('Single intrauterine gestational sac with fetal pole and cardiac activity.')).toBeInTheDocument();
    expect(screen.getByText('Clinical pregnancy')).toBeInTheDocument();
    expect(screen.getByText('Gestational Diabetes')).toBeInTheDocument();
    expect(screen.getByText('Mild spotting at week 6')).toBeInTheDocument();
    expect(screen.getByText('Cesarean section')).toBeInTheDocument();
    expect(screen.getByText('38.5 weeks')).toBeInTheDocument();
  });
});

describe('PostIvfInvestigationDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'usePostIvfInvestigation').mockReturnValue({
      data: { hasData: false },
      latestEncounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<PostIvfInvestigationDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No AIIMS Visit: Post-InVitro Fertilisation Investigation encounter recorded yet')
    ).toBeInTheDocument();
  });
});
