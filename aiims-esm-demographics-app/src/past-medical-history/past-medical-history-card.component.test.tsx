import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PastMedicalHistoryCard } from './past-medical-history-card.component';
import {
  type AiimsPastMedicalHistoryData,
  initialAiimsPastMedicalHistoryData,
} from './past-medical-history.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('PastMedicalHistoryCard', () => {
  it('renders card title and placeholder when conditions are empty', () => {
    render(<PastMedicalHistoryCard data={initialAiimsPastMedicalHistoryData} />);

    expect(screen.getByText('Past Medical History & Conditions')).toBeInTheDocument();
    expect(screen.getByText('Diagnosed Conditions / Diseases')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders disease tags and other conditions notes', () => {
    const data: AiimsPastMedicalHistoryData = {
      hasData: true,
      encounterUuid: 'enc-pmh-1',
      encounterDatetime: '2026-10-05T10:00:00.000Z',
      medicalDiseases: ['Type 2 diabetes mellitus', 'Hypertensive disorder', 'Hypothyroidism'],
      medicalDiseasesOthers: 'Managed on Metformin and Levothyroxine',
    };

    render(<PastMedicalHistoryCard data={data} />);

    expect(screen.getByText('Type 2 diabetes mellitus')).toBeInTheDocument();
    expect(screen.getByText('Hypertensive disorder')).toBeInTheDocument();
    expect(screen.getByText('Hypothyroidism')).toBeInTheDocument();
    expect(screen.getByText('Other Medical Conditions / Notes')).toBeInTheDocument();
    expect(screen.getByText('Managed on Metformin and Levothyroxine')).toBeInTheDocument();
  });
});
