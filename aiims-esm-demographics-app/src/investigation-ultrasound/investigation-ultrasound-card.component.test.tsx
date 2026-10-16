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
  it('renders card titles and placeholders when empty', () => {
    render(<InvestigationUltrasoundCard data={initialAiimsInvestigationUltrasoundData} />);

    expect(screen.getByText('Uterine Dimensions & Adenomyosis')).toBeInTheDocument();
    expect(screen.getByText('Fibroids & FIGO Staging')).toBeInTheDocument();
    expect(screen.getByText('Endometrial Cavity & Congenital Anomalies')).toBeInTheDocument();
    expect(screen.getByText('Ovaries, Antral Follicles & Endometrioma')).toBeInTheDocument();
    expect(screen.getByText('Hydrosalpinx & Endometrial Thickness')).toBeInTheDocument();
    expect(screen.getByText('Ovarian Cysts (Dermoid, Haemorrhagic, CL, Paro-ovarian)')).toBeInTheDocument();
    expect(screen.getByText('Endometrial Junctional Zones & Remarks')).toBeInTheDocument();
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
