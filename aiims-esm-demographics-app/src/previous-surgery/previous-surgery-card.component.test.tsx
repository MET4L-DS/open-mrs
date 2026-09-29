import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PreviousSurgeryCard } from './previous-surgery-card.component';
import {
  type AiimsPreviousSurgeryData,
  initialAiimsPreviousSurgeryData,
} from './previous-surgery.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string, options?: Record<string, any>) => {
      let str = defaultValue || key;
      if (options) {
        Object.keys(options).forEach(k => {
          str = str.replace(new RegExp(`{{${k}}}`, 'g'), String(options[k]));
        });
      }
      return str;
    },
  }),
}));

describe('PreviousSurgeryCard', () => {
  it('renders card title and placeholder when empty', () => {
    render(<PreviousSurgeryCard data={initialAiimsPreviousSurgeryData} />);

    expect(screen.getByText('Previous Surgery')).toBeInTheDocument();
    expect(screen.getByText('Previous Surgery Performed')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders surgical approach, date, and categorized procedures with laterality tags', () => {
    const data: AiimsPreviousSurgeryData = {
      hasData: true,
      encounterUuid: 'enc-surgery-1',
      encounterDatetime: '2026-09-29T10:00:00.000Z',
      previousSurgeryPerformed: 'Yes',
      surgicalApproach: 'Laparoscopy',
      yearOrDateOfSurgery: '2023',
      uterineSurgeries: ['Uterine Myomectomy'],
      endometriosisSurgeries: [
        { procedure: 'Endometriotic Cystectomy', laterality: 'Bilateral' },
        { procedure: 'Endometriotic Bipolar Ablation', laterality: 'Left' },
      ],
      ovarianSurgeries: [
        { procedure: 'Ovarian Cystectomy', laterality: 'Right' },
      ],
      tubalSurgeries: [
        { procedure: 'Chromopertubation of Fallopian tubes', laterality: 'Bilateral' },
      ],
      peritonealSurgeries: ['Peritoneal Adhesiolysis'],
      intraoperativeFindings: 'Stage III endometriosis with pelvic adhesions.',
      previousSurgeryOtherNotes: 'Successful bilateral cystectomy without complications.',
    };

    render(<PreviousSurgeryCard data={data} />);

    expect(screen.getByText('Previous Surgery Performed')).toBeInTheDocument();
    expect(screen.getByText('Laparoscopy')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Uterine Myomectomy')).toBeInTheDocument();
    expect(screen.getByText('Endometriotic Cystectomy (Bilateral)')).toBeInTheDocument();
    expect(screen.getByText('Endometriotic Bipolar Ablation (Left)')).toBeInTheDocument();
    expect(screen.getByText('Ovarian Cystectomy (Right)')).toBeInTheDocument();
    expect(screen.getByText('Chromopertubation of Fallopian tubes (Bilateral)')).toBeInTheDocument();
    expect(screen.getByText('Peritoneal Adhesiolysis')).toBeInTheDocument();
    expect(
      screen.getByText('Stage III endometriosis with pelvic adhesions.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Successful bilateral cystectomy without complications.')
    ).toBeInTheDocument();
  });
});
