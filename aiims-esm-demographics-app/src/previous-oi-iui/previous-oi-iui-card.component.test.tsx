import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PreviousOiIuiCard } from './previous-oi-iui-card.component';
import {
  type AiimsPreviousOiIuiData,
  initialAiimsPreviousOiIuiData,
} from './previous-oi-iui.resource';

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

describe('PreviousOiIuiCard', () => {
  it('renders card title and placeholders when empty', () => {
    render(<PreviousOiIuiCard data={initialAiimsPreviousOiIuiData} />);

    expect(
      screen.getByText('Previous Ovulation Induction & IUI History')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Previous Ovulation Induction (OI)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Previous OI & Intra-Uterine Insemination (IUI)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Failed In Vitro Fertilization (IVF)')
    ).toBeInTheDocument();
    expect(screen.getAllByText('—')).toHaveLength(3);
  });

  it('renders detailed ovulation induction and IUI information when present', () => {
    const data: AiimsPreviousOiIuiData = {
      hasData: true,
      encounterUuid: 'enc-prev-oi-1',
      encounterDatetime: '2026-09-29T10:00:00.000Z',
      prevOi: 'Yes',
      oiDrugs: ['Letrozole', 'Clomiphene citrate'],
      oiDose: '2.5 mg OD',
      oiCycles: '3',
      oiYear: '2023',
      prevOiIui: 'Yes',
      iuiDrugs: ['Human menopausal gonadotropin'],
      iuiDose: '150 IU hMG',
      iuiCycles: '2',
      iuiYear: '2024',
      failedIvf: 'Yes',
      failedIvfCycles: '1',
      previousArtNotes: 'Previous antagonist protocol with poor response.',
    };

    render(<PreviousOiIuiCard data={data} />);

    expect(screen.getByText('Letrozole')).toBeInTheDocument();
    expect(screen.getByText('Clomiphene citrate')).toBeInTheDocument();
    expect(screen.getByText('2.5 mg OD')).toBeInTheDocument();
    expect(screen.getByText('3 cycles')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();

    expect(screen.getByText('Human menopausal gonadotropin')).toBeInTheDocument();
    expect(screen.getByText('150 IU hMG')).toBeInTheDocument();
    expect(screen.getByText('2 cycles')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();

    expect(screen.getByText('1 cycles')).toBeInTheDocument();
    expect(
      screen.getByText('Previous antagonist protocol with poor response.')
    ).toBeInTheDocument();
  });
});
