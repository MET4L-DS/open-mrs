import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OvumPickUpDetailsCard } from './ovum-pick-up-details-card.component';
import {
  type AiimsOvumPickUpDetailsData,
  initialAiimsOvumPickUpDetailsData,
} from './ovum-pick-up-details.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('OvumPickUpDetailsCard', () => {
  it('renders card titles and question labels when empty', () => {
    render(<OvumPickUpDetailsCard data={initialAiimsOvumPickUpDetailsData} />);

    expect(screen.getByText('Ovum Pick Up Details')).toBeInTheDocument();
    expect(screen.getByText('Date of Ovum Pick Up')).toBeInTheDocument();
    expect(screen.getByText('Time of Ovum Pick Up')).toBeInTheDocument();
    expect(
      screen.getByText('Interval between Trigger & Ovum Pick Up')
    ).toBeInTheDocument();
    expect(screen.getByText('Number of Oocytes Retrieved')).toBeInTheDocument();
    expect(screen.getByText('Oocytes Retrieved Comments')).toBeInTheDocument();
    expect(
      screen.getByText('FORT (Follicular Output Rate)')
    ).toBeInTheDocument();
    expect(
      screen.getByText('FOI (Follicle to Oocyte Index)')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Oocyte-Cumulus Complex Grade-I')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Oocyte-Cumulus Complex Grade-II')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Oocyte-Cumulus Complex Grade-III')
    ).toBeInTheDocument();
    expect(screen.getByText('Metaphase II (MII)')).toBeInTheDocument();
    expect(screen.getByText('Metaphase I (MI)')).toBeInTheDocument();
    expect(screen.getByText('Germinal Vesicle (GV)')).toBeInTheDocument();

    expect(screen.getByText('Abnormal Oocytes (Count)')).toBeInTheDocument();
    expect(screen.getByText('Abnormal Oocytes Findings')).toBeInTheDocument();
    expect(screen.getByText('Remarks / Notes')).toBeInTheDocument();
  });

  it('renders recorded ovum pick up details observations correctly', () => {
    const data: AiimsOvumPickUpDetailsData = {
      hasData: true,
      encounterUuid: 'enc-opu-1',
      encounterDatetime: '2026-10-09T10:30:00.000Z',
      dateOfOvumPickUp: '2026-10-09',
      timeOfOvumPickUp: '09:45 AM',
      intervalTriggerOvumPickup: '36 hours',
      numberOfOocytesRetrieved: 14,
      numberOfOocytesRetrievedComments: 'Clear follicular fluid aspirates',
      fortFollicularOutputRate: 82.5,
      follicleToOocyteIndex: 78.0,
      oocyteCumulusComplexGrade1: 8,
      oocyteCumulusComplexGrade2: 4,
      oocyteCumulusComplexGrade3: 2,
      metaphase2: 10,
      metaphase1: 2,
      germinalVesicle: 1,
      abnormalOocytesNumber: 1,
      abnormalOocytes: ['Giant oocyte', 'Dark cumulus'],
      ovumPickUpDetailsRemarks:
        'Good quality oocytes retrieved without complications',
    };

    render(<OvumPickUpDetailsCard data={data} />);

    expect(screen.getByText('2026-10-09')).toBeInTheDocument();
    expect(screen.getByText('09:45 AM')).toBeInTheDocument();
    expect(screen.getByText('36 hours')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(
      screen.getByText('Clear follicular fluid aspirates')
    ).toBeInTheDocument();
    expect(screen.getByText('82.5%')).toBeInTheDocument();
    expect(screen.getByText('78%')).toBeInTheDocument();

    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getAllByText('2')).toHaveLength(2);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('1')).toHaveLength(2);

    expect(screen.getByText('Giant oocyte, Dark cumulus')).toBeInTheDocument();
    expect(
      screen.getByText('Good quality oocytes retrieved without complications')
    ).toBeInTheDocument();
  });
});
