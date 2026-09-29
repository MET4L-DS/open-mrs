import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ObservationCard } from './observation-card.component';

describe('ObservationCard', () => {
  it('renders card title and row labels with values', () => {
    render(
      <ObservationCard
        title="Personal Information"
        rows={[
          { label: 'Patient Name', value: 'Sunita Sharma' },
          { label: 'Age', value: '29', unit: 'years' },
        ]}
      />
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Patient Name')).toBeInTheDocument();
    expect(screen.getByText('Sunita Sharma')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('29 years')).toBeInTheDocument();
  });

  it('renders default placeholder when row value is empty', () => {
    render(
      <ObservationCard
        title="Empty Fields Card"
        rows={[
          { label: 'Missing Phone', value: '' },
          { label: 'Undefined Field', value: undefined },
        ]}
      />
    );

    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBe(2);
  });

  it('renders units with slashes and special characters without HTML entity escaping', () => {
    render(
      <ObservationCard
        title="Units Test Card"
        rows={[
          { label: 'FSH', value: '10', unit: 'mIU/mL' },
          { label: 'Testosterone', value: '10', unit: 'ng/dL' },
          { label: 'BMI', value: '30', unit: 'kg/m²' },
          { label: 'Raw Entity Value', value: '10 mIU&#x2F;mL' },
        ]}
      />
    );

    expect(screen.getAllByText('10 mIU/mL')).toHaveLength(2);
    expect(screen.getByText('10 ng/dL')).toBeInTheDocument();
    expect(screen.getByText('30 kg/m²')).toBeInTheDocument();
    expect(screen.queryByText(/&#x2F;/)).not.toBeInTheDocument();
  });
});

