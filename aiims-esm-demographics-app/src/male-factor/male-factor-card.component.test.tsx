import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MaleFactorCard } from './male-factor-card.component';
import { type AiimsMaleFactorData, initialAiimsMaleFactorData } from './male-factor.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('MaleFactorCard', () => {
  it('renders card title and placeholder when factors are empty', () => {
    render(<MaleFactorCard data={initialAiimsMaleFactorData} />);

    expect(screen.getByText('Male Factor Infertility Details')).toBeInTheDocument();
    expect(screen.getByText('Male Infertility Factors')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renders primary factors tags, azoospermia details, and clinical notes', () => {
    const data: AiimsMaleFactorData = {
      hasData: true,
      encounterUuid: 'enc-male-1',
      encounterDatetime: '2026-09-29T10:00:00.000Z',
      maleFactors: ['Azoospermia', 'Oligozoospermia'],
      azoospermiaDetails: 'Non-Obstructive',
      maleFactorOthers: 'Severe oligospermia on previous semen analysis',
    };

    render(<MaleFactorCard data={data} />);

    expect(screen.getByText('Azoospermia')).toBeInTheDocument();
    expect(screen.getByText('Oligozoospermia')).toBeInTheDocument();
    expect(screen.getByText('Azoospermia Classification')).toBeInTheDocument();
    expect(screen.getByText('Non-Obstructive')).toBeInTheDocument();
    expect(screen.getByText('Clinical Notes')).toBeInTheDocument();
    expect(screen.getByText('Severe oligospermia on previous semen analysis')).toBeInTheDocument();
  });
});
