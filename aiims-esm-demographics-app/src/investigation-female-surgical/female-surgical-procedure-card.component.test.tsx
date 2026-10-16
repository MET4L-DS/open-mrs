import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FemaleSurgicalProcedureCard } from './female-surgical-procedure-card.component';
import {
  type AiimsFemaleSurgicalProcedureData,
  initialAiimsFemaleSurgicalProcedureData,
} from './female-surgical-procedure.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('FemaleSurgicalProcedureCard', () => {
  it('renders card titles and section headings when empty', () => {
    render(<FemaleSurgicalProcedureCard data={initialAiimsFemaleSurgicalProcedureData} />);

    expect(screen.getByText('Hysteroscopy Findings')).toBeInTheDocument();
    expect(screen.getAllByText('Operative Hysteroscopy').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Ostia')).toBeInTheDocument();
    expect(screen.getByText('Endometrium')).toBeInTheDocument();
    expect(screen.getByText('Endometrial Cavity')).toBeInTheDocument();
  });

  it('renders recorded hysteroscopy observations with values correctly', () => {
    const data: AiimsFemaleSurgicalProcedureData = {
      hasData: true,
      encounterUuid: 'enc-fsp-1',
      encounterDatetime: '2026-10-06T10:00:00.000Z',
      hysteroscopyOstia: 'Normal',
      hysteroscopyEndometrium: 'Normal',
      hysteroscopyEndometrialCavity: 'Normal',
      hysteroscopyCervicalCanalDirection: 'Straight',
      hysteroscopyDimensions: '7 x 4 x 3 cm',
      operativeHysteroscopy: 'Uterine Polypectomy',
      femaleSurgicalProcedureRemarks: 'Normal anatomy without complications.',
    };

    render(<FemaleSurgicalProcedureCard data={data} />);

    expect(screen.getByText('Normal anatomy without complications.')).toBeInTheDocument();
    expect(screen.getByText('Uterine Polypectomy')).toBeInTheDocument();
    expect(screen.getByText('7 x 4 x 3 cm')).toBeInTheDocument();
    expect(screen.getByText('Straight')).toBeInTheDocument();
  });
});
