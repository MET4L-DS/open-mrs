import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PreviousHysteroscopyCard } from './previous-hysteroscopy-card.component';
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

describe('PreviousHysteroscopyCard', () => {
  it('renders card title and empty placeholders when empty', () => {
    render(<PreviousHysteroscopyCard data={initialAiimsPreviousSurgeryData} />);

    expect(screen.getByText('Hysteroscopy Findings & Interventions')).toBeInTheDocument();
    expect(screen.getByText('Ostia')).toBeInTheDocument();
    expect(screen.getByText('Endometrium')).toBeInTheDocument();
    expect(screen.getByText('Endometrial Cavity')).toBeInTheDocument();
    expect(screen.getByText('Cervical Canal Direction')).toBeInTheDocument();
    expect(screen.getByText('Hysteroscopy Dimensions (cm)')).toBeInTheDocument();
    expect(screen.getByText('Operative Hysteroscopy')).toBeInTheDocument();
  });

  it('renders diagnostic and operative hysteroscopy observations when populated', () => {
    const data: AiimsPreviousSurgeryData = {
      ...initialAiimsPreviousSurgeryData,
      hasData: true,
      hysteroscopyOstia: 'Deep seated',
      hysteroscopyEndometrium: 'Micropolyps',
      hysteroscopyEndometrialCavity: 'Septum',
      hysteroscopyCervicalCanalDirection: 'Towards right',
      hysteroscopyDimensions: '3.5 x 2.0 cm',
      operativeHysteroscopy: 'Septal resection',
    };

    render(<PreviousHysteroscopyCard data={data} />);

    expect(screen.getByText('Deep seated')).toBeInTheDocument();
    expect(screen.getByText('Micropolyps')).toBeInTheDocument();
    expect(screen.getByText('Septum')).toBeInTheDocument();
    expect(screen.getByText('Towards right')).toBeInTheDocument();
    expect(screen.getByText('3.5 x 2.0 cm')).toBeInTheDocument();
    expect(screen.getByText('Septal resection')).toBeInTheDocument();
  });
});
