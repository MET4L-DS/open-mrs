import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TuberculosisHistoryCard } from './tuberculosis-history-card.component';
import {
  type AiimsTuberculosisHistoryData,
  initialAiimsTuberculosisHistoryData,
} from './tuberculosis-history.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

vi.mock('@openmrs/esm-framework', () => ({
  formatDate: (date: Date) => date.toISOString().split('T')[0],
}));

describe('TuberculosisHistoryCard', () => {
  it('renders card title and placeholders when empty', () => {
    render(<TuberculosisHistoryCard data={initialAiimsTuberculosisHistoryData} />);

    expect(screen.getByText('Tuberculosis & Anti-Tubercular Therapy')).toBeInTheDocument();
    expect(screen.getByText('Tuberculosis Date of Diagnosis')).toBeInTheDocument();
    expect(screen.getByText('Site of Tuberculosis')).toBeInTheDocument();
    expect(screen.getByText('ATT Start Date')).toBeInTheDocument();
  });

  it('renders recorded tuberculosis history details and tags', () => {
    const data: AiimsTuberculosisHistoryData = {
      hasData: true,
      encounterUuid: 'enc-tb-1',
      encounterDatetime: '2026-10-05T10:00:00.000Z',
      tbDateOfDiagnosis: '2024-05-10',
      tbSites: ['Pulmonary tuberculosis', 'Cervical tuberculous lymphadenitis'],
      tbSiteOther: 'Pleural effusion noted',
      attStartDate: '2024-05-15',
      attCount: 1,
      attDuration: '6 Months',
      tbClinicalNotes: 'Completed full course of 4-drug ATT with good compliance.',
    };

    render(<TuberculosisHistoryCard data={data} />);

    expect(screen.getByText('Pulmonary tuberculosis')).toBeInTheDocument();
    expect(screen.getByText('Cervical tuberculous lymphadenitis')).toBeInTheDocument();
    expect(screen.getByText(/Pleural effusion noted/)).toBeInTheDocument();
    expect(screen.getByText('6 Months')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/Completed full course/)).toBeInTheDocument();
  });
});
