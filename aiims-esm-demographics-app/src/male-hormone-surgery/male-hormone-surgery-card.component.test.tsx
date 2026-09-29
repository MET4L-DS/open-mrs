import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MaleHormoneSurgeryCard } from './male-hormone-surgery-card.component';
import {
  type AiimsMaleHormoneSurgeryData,
  initialAiimsMaleHormoneSurgeryData,
} from './male-hormone-surgery.resource';

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


describe('MaleHormoneSurgeryCard', () => {
  it('renders card title and placeholders when empty', () => {
    render(<MaleHormoneSurgeryCard data={initialAiimsMaleHormoneSurgeryData} />);

    expect(screen.getByText('Male Hormone & Surgery Findings')).toBeInTheDocument();
    expect(screen.getByText('Follicle Stimulating Hormone (FSH)')).toBeInTheDocument();
    expect(screen.getByText('Serum Testosterone')).toBeInTheDocument();
    expect(screen.getByText('Testicular Biopsy Report / Notes')).toBeInTheDocument();
    expect(screen.getAllByText('—')).toHaveLength(3);
  });

  it('renders numeric values with units and biopsy text', () => {
    const data: AiimsMaleHormoneSurgeryData = {
      hasData: true,
      encounterUuid: 'enc-male-hormone-1',
      encounterDatetime: '2026-09-29T10:00:00.000Z',
      fshHusband: '18.5',
      testosteroneHusband: '350',
      testicularBiopsy: 'Hypospermatogenesis with focal maturation arrest. Micro-TESE positive for sperm.',
    };

    render(<MaleHormoneSurgeryCard data={data} />);

    expect(screen.getByText('18.5 mIU/mL')).toBeInTheDocument();
    expect(screen.getByText('350 ng/dL')).toBeInTheDocument();
    expect(
      screen.getByText('Hypospermatogenesis with focal maturation arrest. Micro-TESE positive for sperm.')
    ).toBeInTheDocument();
  });
});
