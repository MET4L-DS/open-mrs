import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmbryoAssessmentCard } from './embryo-assessment-card.component';
import EmbryoAssessmentDashboard from './embryo-assessment-dashboard.component';
import * as resource from './embryo-assessment.resource';

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

describe('EmbryoAssessmentCard', () => {
  it('renders unified card title and observation labels when empty', () => {
    render(<EmbryoAssessmentCard data={null} />);
    expect(screen.getByText('Assessment of Fertilization, Embryo & Blastocyst')).toBeInTheDocument();
    expect(screen.getByText('Number of Embryos Day 1 (2PN)')).toBeInTheDocument();
    expect(screen.getByText('Number of Embryos Day 5 (Blastocysts)')).toBeInTheDocument();
  });

  it('renders clinical observation values when provided', () => {
    const mockData: resource.AiimsEmbryoAssessmentData = {
      hasData: true,
      numberEmbryosDay1: '8',
      gradeEmbryosDay1: 'Normal 2PN',
      numberEmbryosDay2: '7',
      gradeEmbryosDay2: '4C/A',
      numberEmbryosDay3: '6',
      gradeEmbryosDay3: '8C/A',
      numberEmbryosDay4: '5',
      gradeEmbryosDay4: 'Compacted Morula',
      numberEmbryosDay5: '4',
      gradeEmbryosDay5: '4AA',
      numberEmbryosDay6: '3',
      gradeEmbryosDay6: '5AA',
    };

    render(<EmbryoAssessmentCard data={mockData} />);
    expect(screen.getByText('Normal 2PN')).toBeInTheDocument();
    expect(screen.getByText('4AA')).toBeInTheDocument();
    expect(screen.getByText('Compacted Morula')).toBeInTheDocument();
  });
});

describe('EmbryoAssessmentDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useEmbryoAssessment').mockReturnValue({
      data: { hasData: false },
      latestEncounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<EmbryoAssessmentDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No AIIMS Visit: Assessment of Fertilization, Embryo & Blastocyst encounter recorded yet')
    ).toBeInTheDocument();
  });
});
