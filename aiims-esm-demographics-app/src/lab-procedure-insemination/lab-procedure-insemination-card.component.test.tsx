import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LabProcedureInseminationCard } from './lab-procedure-insemination-card.component';
import {
  type AiimsLabProcedureInseminationData,
  initialAiimsLabProcedureInseminationData,
} from './lab-procedure-insemination.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('LabProcedureInseminationCard', () => {
  it('renders card titles and question labels when empty', () => {
    render(
      <LabProcedureInseminationCard
        data={initialAiimsLabProcedureInseminationData}
      />
    );

    expect(
      screen.getByText('Lab Procedure of Insemination')
    ).toBeInTheDocument();

    expect(screen.getByText('Method of Insemination')).toBeInTheDocument();
    expect(
      screen.getByText('Time of Insemination or Injection')
    ).toBeInTheDocument();
    expect(screen.getByText('Remarks / Notes')).toBeInTheDocument();
  });

  it('renders recorded lab procedure of insemination observations correctly', () => {
    const data: AiimsLabProcedureInseminationData = {
      hasData: true,
      encounterUuid: 'enc-insem-1',
      encounterDatetime: '2026-10-12T11:00:00.000Z',
      methodOfInsemination: [
        'IntraCytoplasmic Sperm Injection (ICSI)',
        'Assisted Oocyte Activation (AOA)',
      ],
      timeOfInseminationInjection: '11:30 AM',
      labProcedureInseminationRemarks:
        'All 10 MII oocytes injected successfully with good sperm morphology.',
    };

    render(<LabProcedureInseminationCard data={data} />);

    expect(
      screen.getByText(
        'IntraCytoplasmic Sperm Injection (ICSI), Assisted Oocyte Activation (AOA)'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('11:30 AM')).toBeInTheDocument();
    expect(
      screen.getByText(
        'All 10 MII oocytes injected successfully with good sperm morphology.'
      )
    ).toBeInTheDocument();
  });
});
