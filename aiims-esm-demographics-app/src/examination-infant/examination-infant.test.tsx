import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ExaminationInfantCard } from './examination-infant-card.component';
import ExaminationInfantDashboard from './examination-infant-dashboard.component';
import * as resource from './examination-infant.resource';

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

describe('ExaminationInfantCard', () => {
  it('renders card title correctly', () => {
    render(<ExaminationInfantCard data={null} />);
    expect(screen.getByText('AIIMS Visit: Examination Infant Details')).toBeInTheDocument();
  });

  it('renders populated observations with badges and weights', () => {
    const mockData: resource.AiimsExaminationInfantData = {
      hasData: true,
      sexOfBaby: 'Female',
      weightOfBaby: 3.25,
      apgarScore: 9,
    };

    render(<ExaminationInfantCard data={mockData} />);
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('3.25 kg')).toBeInTheDocument();
    expect(screen.getByText('9 / 10')).toBeInTheDocument();
  });
});


describe('ExaminationInfantDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useExaminationInfant').mockReturnValue({
      data: { hasData: false },
      encounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<ExaminationInfantDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No AIIMS Visit: Examination Infant encounter recorded yet')
    ).toBeInTheDocument();
  });
});
