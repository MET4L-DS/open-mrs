import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TriggerDetailsCard } from './trigger-details-card.component';
import {
  type AiimsTriggerDetailsData,
  initialAiimsTriggerDetailsData,
} from './trigger-details.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('TriggerDetailsCard', () => {
  it('renders card titles and question labels when empty', () => {
    render(<TriggerDetailsCard data={initialAiimsTriggerDetailsData} />);

    expect(
      screen.getByText('Trigger Day Follicles & Endometrium')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Ovulation Trigger Administration')
    ).toBeInTheDocument();
    expect(screen.getByText('Follicles (14 mm - 22 mm)')).toBeInTheDocument();
    expect(screen.getByText('Follicles (16 mm - 22 mm)')).toBeInTheDocument();
    expect(screen.getByText('Endometrial Thickness')).toBeInTheDocument();
    expect(screen.getByText('Endometrial Pattern')).toBeInTheDocument();
    expect(screen.getByText('Estradiol (E2)')).toBeInTheDocument();
    expect(screen.getByText('Progesterone (P4)')).toBeInTheDocument();
    expect(screen.getByText('Ovulation Trigger')).toBeInTheDocument();
    expect(screen.getByText('Trigger Dose')).toBeInTheDocument();
    expect(screen.getByText('Date of Trigger')).toBeInTheDocument();
    expect(screen.getByText('Time of Trigger')).toBeInTheDocument();
    expect(screen.getByText('Remarks / Notes')).toBeInTheDocument();
  });

  it('renders recorded trigger details observations correctly', () => {
    const data: AiimsTriggerDetailsData = {
      hasData: true,
      encounterUuid: 'enc-trigger-1',
      encounterDatetime: '2026-10-09T10:00:00.000Z',
      numberOfFollicles14to22mm: 8,
      numberOfFollicles16to22mm: 5,
      endometrialThicknessTriggerDay: 9.5,
      endometrialPatternTriggerDay: 'Trilaminar',
      estradiolTriggerDay: 2450,
      progesteroneTriggerDay: 0.85,
      ovulationTrigger: 'Ovitrelle',
      ovulationTriggerDose: '250 mcg',
      dateOfTrigger: '2026-10-09',
      timeOfTrigger: '21:30',
      triggerDetailsRemarks: 'Dual trigger planned if needed',
    };

    render(<TriggerDetailsCard data={data} />);

    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('9.5 mm')).toBeInTheDocument();
    expect(screen.getByText('Trilaminar')).toBeInTheDocument();
    expect(screen.getByText('2450 pg/mL')).toBeInTheDocument();
    expect(screen.getByText('0.85 ng/mL')).toBeInTheDocument();
    expect(screen.getByText('Ovitrelle')).toBeInTheDocument();
    expect(screen.getByText('250 mcg')).toBeInTheDocument();
    expect(screen.getByText('2026-10-09')).toBeInTheDocument();
    expect(screen.getByText('21:30')).toBeInTheDocument();
    expect(screen.getByText('Dual trigger planned if needed')).toBeInTheDocument();
  });
});
