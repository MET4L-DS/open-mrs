import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProcedureCard } from './procedure-card.component';
import {
  type AiimsProcedureData,
  initialAiimsProcedureData,
} from './procedure.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('ProcedureCard', () => {
  it('renders card titles and question labels when empty', () => {
    render(<ProcedureCard data={initialAiimsProcedureData} />);

    expect(screen.getByText('Procedure')).toBeInTheDocument();
    expect(screen.getByText('Additional IVF Procedures')).toBeInTheDocument();

    expect(screen.getByText('Sperm Retrieval Procedure')).toBeInTheDocument();
  });

  it('renders recorded procedure observations correctly', () => {
    const data: AiimsProcedureData = {
      hasData: true,
      encounterUuid: 'enc-proc-1',
      encounterDatetime: '2026-10-12T11:45:00.000Z',
      spermRetrievalProcedure: [
        'Percutaneous Epididymal Sperm Aspiration (PESA)',
        'Testicular Sperm Extraction (TESE)',
      ],
      additionalIvfProcedures: [
        'Laser Assisted Hatching (LAH)',
        'Physiological Intracytoplasmic Sperm Injection (PICSI)',
      ],
    };

    render(<ProcedureCard data={data} />);

    expect(
      screen.getByText(
        'Percutaneous Epididymal Sperm Aspiration (PESA), Testicular Sperm Extraction (TESE)'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Laser Assisted Hatching (LAH), Physiological Intracytoplasmic Sperm Injection (PICSI)'
      )
    ).toBeInTheDocument();
  });
});
