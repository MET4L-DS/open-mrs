import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FamilyHistoryCard } from './family-history-card.component';
import {
  type AiimsFamilyHistoryData,
  initialAiimsFamilyHistoryData,
} from './family-history.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('FamilyHistoryCard', () => {
  it('renders card title and placeholders when members list is empty', () => {
    render(<FamilyHistoryCard data={initialAiimsFamilyHistoryData} />);

    expect(screen.getByText('Family History & Conditions')).toBeInTheDocument();
  });

  it('renders family members with disease tags and notes', () => {
    const data: AiimsFamilyHistoryData = {
      hasData: true,
      encounterUuid: 'enc-fh-1',
      encounterDatetime: '2026-10-05T10:00:00.000Z',
      members: [
        {
          relationKey: 'father',
          relationLabelKey: 'familyMemberFather',
          defaultLabel: 'Father',
          medicalDiseases: ['Type 2 diabetes mellitus', 'Hypertensive disorder'],
          medicalDiseasesOthers: 'On insulin therapy',
        },
        {
          relationKey: 'mother',
          relationLabelKey: 'familyMemberMother',
          defaultLabel: 'Mother',
          medicalDiseases: ['Hypothyroidism'],
        },
        {
          relationKey: 'brother',
          relationLabelKey: 'familyMemberBrother',
          defaultLabel: 'Brother',
          medicalDiseases: [],
        },
      ],
    };

    render(<FamilyHistoryCard data={data} />);

    expect(screen.getByText('Father')).toBeInTheDocument();
    expect(screen.getByText('Type 2 diabetes mellitus')).toBeInTheDocument();
    expect(screen.getByText('Hypertensive disorder')).toBeInTheDocument();
    expect(screen.getByText(/On insulin therapy/)).toBeInTheDocument();

    expect(screen.getByText('Mother')).toBeInTheDocument();
    expect(screen.getByText('Hypothyroidism')).toBeInTheDocument();

    expect(screen.getByText('Brother')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
