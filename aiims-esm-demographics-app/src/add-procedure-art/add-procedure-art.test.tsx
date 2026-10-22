import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AddProcedureArtCard } from './add-procedure-art-card.component';
import AddProcedureArtDashboard from './add-procedure-art-dashboard.component';
import * as resource from './add-procedure-art.resource';

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

describe('AddProcedureArtCard', () => {
  it('renders card titles and placeholders when data is empty', () => {
    render(<AddProcedureArtCard data={null} />);
    expect(screen.getAllByText('Additional Procedures in Assisted Reproductive Technology').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Clinical Notes & Remarks')).toBeInTheDocument();
  });

  it('renders recorded procedure tags and details cleanly', () => {
    const mockData: resource.AiimsAddProcedureArtData = {
      hasData: true,
      encounterUuid: 'enc-1',
      encounterDatetime: '2026-10-14T10:00:00.000Z',
      additionalProceduresArt: [
        'Platelet Rich Plasma (PRP)',
        'Endometrial Injury (Endo Injury)',
        'Embryo Glue',
      ],
      dateOfAdditionalArtProcedure: '2026-10-14',
      additionalArtRemarks: 'Endometrial scratch performed without complications.',
    };

    render(<AddProcedureArtCard data={mockData} />);
    expect(
      screen.getByText('Platelet Rich Plasma (PRP), Endometrial Injury (Endo Injury), Embryo Glue')
    ).toBeInTheDocument();
    expect(screen.getByText('2026-10-14')).toBeInTheDocument();
    expect(
      screen.getByText('Endometrial scratch performed without complications.')
    ).toBeInTheDocument();
  });
});

describe('AddProcedureArtDashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'useAddProcedureArt').mockReturnValue({
      data: { hasData: false, additionalProceduresArt: [] },
      latestEncounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<AddProcedureArtDashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No Additional Procedures in Assisted Reproductive Technology encounter recorded yet')
    ).toBeInTheDocument();
  });
});
