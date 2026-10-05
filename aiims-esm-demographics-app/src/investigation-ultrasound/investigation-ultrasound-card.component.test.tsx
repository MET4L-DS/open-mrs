import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InvestigationUltrasoundCard } from './investigation-ultrasound-card.component';
import {
  type AiimsInvestigationUltrasoundData,
  initialAiimsInvestigationUltrasoundData,
} from './investigation-ultrasound.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('InvestigationUltrasoundCard', () => {
  it('renders card title and placeholders when empty', () => {
    render(<InvestigationUltrasoundCard data={initialAiimsInvestigationUltrasoundData} />);

    expect(screen.getByText('Ultrasound Assessment')).toBeInTheDocument();
    expect(screen.getByText('Total Antral Follicle Count')).toBeInTheDocument();
    expect(screen.getByText('Volume Right Ovary')).toBeInTheDocument();
    expect(screen.getByText('Volume Left Ovary')).toBeInTheDocument();
  });

  it('renders recorded ultrasound observations correctly', () => {
    const data: AiimsInvestigationUltrasoundData = {
      hasData: true,
      encounterUuid: 'enc-us-1',
      encounterDatetime: '2026-10-05T10:00:00.000Z',
      totalAntralFollicleCount: 14,
      volumeRightOvary: 6.5,
      volumeLeftOvary: 7.2,
      ultrasoundRemarks: 'Normal ovarian morphology bilaterally.',
    };

    render(<InvestigationUltrasoundCard data={data} />);

    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('6.5 cm³')).toBeInTheDocument();
    expect(screen.getByText('7.2 cm³')).toBeInTheDocument();
    expect(screen.getByText('Normal ovarian morphology bilaterally.')).toBeInTheDocument();
  });
});
