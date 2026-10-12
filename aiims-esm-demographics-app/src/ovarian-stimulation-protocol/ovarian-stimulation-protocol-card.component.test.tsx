import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OvarianStimulationProtocolCard } from './ovarian-stimulation-protocol-card.component';
import { type AiimsOvarianStimulationProtocolData } from './ovarian-stimulation-protocol.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback: string) => fallback,
  }),
}));

describe('OvarianStimulationProtocolCard', () => {
  it('renders card title and question labels with empty placeholders when data is null', () => {
    render(<OvarianStimulationProtocolCard data={null} />);

    expect(
      screen.getByText('Ovarian Stimulation Protocol')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Stimulation Protocol')
    ).toBeInTheDocument();
    expect(screen.getByText('Remarks / Notes')).toBeInTheDocument();

    const placeholders = screen.getAllByText('—');
    expect(placeholders).toHaveLength(2);
  });

  it('renders populated stimulation protocol and remarks correctly', () => {
    const mockData: AiimsOvarianStimulationProtocolData = {
      hasData: true,
      protocol: 'Antagonist',
      remarks: 'GnRH antagonist started on Day 6 of stimulation.',
    };

    render(<OvarianStimulationProtocolCard data={mockData} />);

    expect(
      screen.getByText('Stimulation Protocol')
    ).toBeInTheDocument();
    expect(screen.getByText('Antagonist')).toBeInTheDocument();

    expect(
      screen.getByText('GnRH antagonist started on Day 6 of stimulation.')
    ).toBeInTheDocument();
  });
});
