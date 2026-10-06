import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FemaleBloodHormoneCard } from './female-blood-hormone-card.component';
import {
  type AiimsFemaleBloodHormoneData,
  initialAiimsFemaleBloodHormoneData,
} from './female-blood-hormone.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('FemaleBloodHormoneCard', () => {
  it('renders card title and question labels when empty', () => {
    render(<FemaleBloodHormoneCard data={initialAiimsFemaleBloodHormoneData} />);

    expect(screen.getByText('Female Blood Hormone Profile')).toBeInTheDocument();
    expect(screen.getByText('Anti-Mullerian Hormone (AMH)')).toBeInTheDocument();
    expect(screen.getByText('Day 2 Follicle-Stimulating Hormone (FSH)')).toBeInTheDocument();
    expect(screen.getByText('Day 2 Luteinizing Hormone (LH)')).toBeInTheDocument();
    expect(screen.getByText('Thyroid-Stimulating Hormone (TSH)')).toBeInTheDocument();
    expect(screen.getByText('Serum Prolactin')).toBeInTheDocument();
  });

  it('renders recorded blood hormone observations with units correctly', () => {
    const data: AiimsFemaleBloodHormoneData = {
      hasData: true,
      encounterUuid: 'enc-fbh-1',
      encounterDatetime: '2026-10-06T10:00:00.000Z',
      antiMullerianHormone: 2.45,
      day2FollicleStimulatingHormone: 6.8,
      day2LuteinizingHormone: 5.2,
      thyroidStimulatingHormone: 1.85,
      serumProlactin: 14.3,
    };

    render(<FemaleBloodHormoneCard data={data} />);

    expect(screen.getByText('2.45 ng/mL')).toBeInTheDocument();
    expect(screen.getByText('6.8 mIU/mL')).toBeInTheDocument();
    expect(screen.getByText('5.2 mIU/mL')).toBeInTheDocument();
    expect(screen.getByText('1.85 uIU/mL')).toBeInTheDocument();
    expect(screen.getByText('14.3 ng/mL')).toBeInTheDocument();
  });
});
