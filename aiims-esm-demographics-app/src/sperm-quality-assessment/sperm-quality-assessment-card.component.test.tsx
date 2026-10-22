import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SpermQualityAssessmentCard } from './sperm-quality-assessment-card.component';
import { type AiimsSpermQualityAssessmentData } from './sperm-quality-assessment.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback: string) => fallback,
  }),
}));

describe('SpermQualityAssessmentCard', () => {
  it('renders card title and question labels with empty placeholders when data is null', () => {
    render(<SpermQualityAssessmentCard data={null} />);

    expect(
      screen.getByText('Sperm Quality on Ovum Pick Up Day')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Post wash Sperm concentration on Ovum Pick Up Day')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Sperm motility on Ovum Pick Up Day')
    ).toBeInTheDocument();

    const placeholders = screen.getAllByText('—');
    expect(placeholders).toHaveLength(2);
  });

  it('renders populated data with units correctly', () => {
    const mockData: AiimsSpermQualityAssessmentData = {
      hasData: true,
      postWashConcentration: '45.5',
      spermMotility: '78',
    };

    render(<SpermQualityAssessmentCard data={mockData} />);

    expect(
      screen.getByText('Post wash Sperm concentration on Ovum Pick Up Day')
    ).toBeInTheDocument();
    expect(screen.getByText('45.5 million/mL')).toBeInTheDocument();

    expect(
      screen.getByText('Sperm motility on Ovum Pick Up Day')
    ).toBeInTheDocument();
    expect(screen.getByText('78 %')).toBeInTheDocument();
  });
});
