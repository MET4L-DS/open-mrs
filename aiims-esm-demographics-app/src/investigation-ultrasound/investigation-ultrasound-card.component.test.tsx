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
  it('renders unified card title and placeholders when empty', () => {
    render(<InvestigationUltrasoundCard data={initialAiimsInvestigationUltrasoundData} />);

    expect(screen.getByText('Investigation Female Transvaginal Ultrasound')).toBeInTheDocument();
    expect(screen.getByText('Day of Cycle')).toBeInTheDocument();
    expect(screen.getByText('Length')).toBeInTheDocument();
    expect(screen.getByText('Width')).toBeInTheDocument();
  });

  it('renders recorded TVS ultrasound observations correctly', () => {
    const data: AiimsInvestigationUltrasoundData = {
      hasData: true,
      encounterUuid: 'enc-us-1',
      encounterDatetime: '2026-10-05T10:00:00.000Z',
      uterineSizeLength: 7.5,
      uterineSizeWidth: 4.2,
      totalAntralFollicleCount: 14,
      volumeRightOvary: 6.5,
      volumeLeftOvary: 7.2,
      fibroidsPresent: 'Yes',
      numberOfFibroids: 2,
      day1416EndometrialThickness: 9.5,
      day1416EndometrialPattern: 'Trilaminar',
      ultrasoundRemarks: 'Normal ovarian morphology bilaterally.',
    };

    render(<InvestigationUltrasoundCard data={data} />);

    expect(screen.getByText('7.5 cm')).toBeInTheDocument();
    expect(screen.getByText('4.2 cm')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('6.5 cm³')).toBeInTheDocument();
    expect(screen.getByText('7.2 cm³')).toBeInTheDocument();
    expect(screen.getByText('9.5 mm')).toBeInTheDocument();
    expect(screen.getByText('Trilaminar')).toBeInTheDocument();
    expect(screen.getByText('Normal ovarian morphology bilaterally.')).toBeInTheDocument();
  });
});
