import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import IvfSummaryDashboard from './ivf-summary-dashboard.component';
import * as resource from './ivf-summary.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue?: string) => defaultValue || _key,
  }),
}));

vi.mock('@openmrs/esm-framework', () => ({
  usePatient: () => ({
    patient: { uuid: 'patient-1' },
    patientUuid: 'patient-1',
    isLoading: false,
  }),
  formatDatetime: () => '15-Oct-2026',
}));

describe('IvfSummaryDashboard', () => {
  it('renders loading state when isLoading is true', () => {
    vi.spyOn(resource, 'useIvfSummary').mockReturnValue({
      summaryData: {
        patientUuid: 'patient-1',
        encountersCount: 0,
        hasAnyData: false,
        encountersByForm: {},
      },
      encounters: [],
      isLoading: true,
      error: undefined,
      mutate: vi.fn(),
      getFormObs: vi.fn(),
      getFormObsList: vi.fn().mockReturnValue([]),
    });

    render(<IvfSummaryDashboard patientUuid="patient-1" />);
    expect(screen.getByText('Consolidating patient IVF clinical summary...')).toBeInTheDocument();
  });

  it('renders summary dashboard with domain sections when loaded', () => {
    vi.spyOn(resource, 'useIvfSummary').mockReturnValue({
      summaryData: {
        patientUuid: 'patient-1',
        encountersCount: 3,
        latestEncounterDate: '2026-10-15T10:00:00.000Z',
        hasAnyData: true,
        encountersByForm: {
          '80930653-7e80-4bfd-9e29-ec37c334d880': {
            uuid: 'enc-1',
            encounterDatetime: '2026-10-15T10:00:00.000Z',
            obs: [],
          },
        },
      },
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
      getFormObs: (formUuid: string) => (formUuid.includes('80930653') ? '30' : undefined),
      getFormObsList: () => [],
    });

    render(<IvfSummaryDashboard patientUuid="patient-1" />);
    expect(screen.getByText('AIIMS Comprehensive IVF Summary')).toBeInTheDocument();
    expect(screen.getByText('1. Infertility Profile & Prior History')).toBeInTheDocument();
    expect(screen.getByText('2. Ovarian Reserve & Diagnostic Subtyping')).toBeInTheDocument();
    expect(screen.getByText('3. Ovarian Stimulation & Cycle Monitoring')).toBeInTheDocument();
    expect(screen.getByText('4. OPU, Insemination & Laboratory Procedures')).toBeInTheDocument();
    expect(screen.getByText('5. Embryology Culture & Cryopreservation')).toBeInTheDocument();
    expect(screen.getByText('6. Embryo Transfer, Pregnancy Outcome & Neonate')).toBeInTheDocument();
  });

  it('renders multi-select observations and new procedure/delivery fields correctly', () => {
    vi.spyOn(resource, 'useIvfSummary').mockReturnValue({
      summaryData: {
        patientUuid: 'patient-1',
        encountersCount: 5,
        latestEncounterDate: '2026-10-15T10:00:00.000Z',
        hasAnyData: true,
        encountersByForm: {},
      },
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
      getFormObs: (formUuid: string, conceptUuid: string) => {
        if (conceptUuid === 'c0010001-0000-0000-0000-000000000300') return 'Cesarean section';
        if (conceptUuid === 'c0010001-0000-0000-0000-000000000301') return '38';
        return undefined;
      },
      getFormObsList: (_formUuid: string, conceptUuid: string) => {
        if (conceptUuid === 'c0010001-0000-0000-0000-000000000311') return ['Husband Semen (HS)', 'Frozen'];
        if (conceptUuid === 'c0010001-0000-0000-0000-000000000227') return ['Laser Assisted Hatching (LAH)', 'Physiological Intracytoplasmic Sperm Injection (PICSI)'];
        if (conceptUuid === 'c0010001-0000-0000-0000-000000000222') return ['In vitro Fertilisation (IVF)', 'IntraCytoplasmic Sperm Injection (ICSI)'];
        if (conceptUuid === 'c0010001-0000-0000-0000-000000000225') return ['Percutaneous Epididymal Sperm Aspiration (PESA)', 'Testicular Sperm Aspiration (TESA)'];
        return [];
      },
    });

    render(<IvfSummaryDashboard patientUuid="patient-1" />);

    // Multi-select insemination and procedure fields
    expect(screen.getByText('Husband Semen (HS), Frozen')).toBeInTheDocument();
    expect(screen.getByText('Laser Assisted Hatching (LAH), Physiological Intracytoplasmic Sperm Injection (PICSI)')).toBeInTheDocument();
    expect(screen.getByText('In vitro Fertilisation (IVF), IntraCytoplasmic Sperm Injection (ICSI)')).toBeInTheDocument();
    expect(screen.getByText('Percutaneous Epididymal Sperm Aspiration (PESA), Testicular Sperm Aspiration (TESA)')).toBeInTheDocument();

    // Delivery & gestation row
    expect(screen.getByText('Cesarean section (38 wks)')).toBeInTheDocument();
  });
});
