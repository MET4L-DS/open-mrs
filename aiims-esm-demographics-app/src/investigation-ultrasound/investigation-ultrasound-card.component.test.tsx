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
    expect(screen.getByText('Endometrial Vascularity')).toBeInTheDocument();
    expect(screen.getByText('Right Ovary Dimensions')).toBeInTheDocument();
    expect(screen.getByText('Other Cyst')).toBeInTheDocument();
    expect(screen.getByText('Haematosalpinx')).toBeInTheDocument();
  });

  it('renders recorded TVS ultrasound observations correctly', () => {
    const data: AiimsInvestigationUltrasoundData = {
      hasData: true,
      encounterUuid: 'enc-us-1',
      encounterDatetime: '2026-10-05T10:00:00.000Z',
      uterineSizeLength: 7.5,
      uterineSizeWidth: 4.2,
      totalAntralFollicleCount: 14,
      rightOvaryDimensions: '3.2 x 2.1 cm',
      leftOvaryDimensions: '3.5 x 2.4 cm',
      fibroidsPresent: 'Yes',
      numberOfFibroids: 2,
      day1416EndometrialThickness: 9.5,
      day1416EndometrialPattern: 'Trilaminar',
      endometrialVascularity: 'Zone 2 (Hyperechoic endometrial edge)',
      otherOvarianCyst: 'No',
      hydrosalpinxFinding: 'Right Hydrosalpinx',
      hydrosalpinxRightDimensions: '2.5 x 1.0 cm',
      haematosalpinxFinding: 'Absent',
    };

    render(<InvestigationUltrasoundCard data={data} />);

    expect(screen.getByText('7.5 cm')).toBeInTheDocument();
    expect(screen.getByText('4.2 cm')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('3.2 x 2.1 cm')).toBeInTheDocument();
    expect(screen.getByText('3.5 x 2.4 cm')).toBeInTheDocument();
    expect(screen.getByText('9.5 mm')).toBeInTheDocument();
    expect(screen.getByText('Trilaminar')).toBeInTheDocument();
    expect(screen.getByText('Zone 2 (Hyperechoic endometrial edge)')).toBeInTheDocument();
    expect(screen.getByText('2.5 x 1.0 cm')).toBeInTheDocument();
  });
});
