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
    expect(screen.getByText('TVS Uterine Size & Adenomyosis')).toBeInTheDocument();
    expect(screen.getByText('TVS Fibroids')).toBeInTheDocument();
    expect(screen.getByText('TVS Endometrial Cavity & Anomalies')).toBeInTheDocument();
    expect(screen.getByText('TVS Ovaries, AFC & Endometrioma')).toBeInTheDocument();
    expect(screen.getByText('TVS Hydrosalpinx, Cysts & Endometrial Thickness')).toBeInTheDocument();
    expect(screen.getByText('Endometrial Zones & Remarks')).toBeInTheDocument();
  });

  it('renders recorded observations with units and values correctly', () => {
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
      uterineSizeLength: 7.2,
      uterineSizeWidth: 4.1,
      uterineSizeTransverseDiameter: 3.8,
      uterineSizeVolume: 58.4,
      dayOfCycle: 12,
      adenomyosisTvsFinding: 'Globular',
      uterineCalcifications: 'No',
      fibroidsPresent: 'Yes',
      numberOfFibroids: 2,
      fibroidsLocation: 'Posterior wall',
      fibroidsSize: '2.5 x 2.0 cm',
      fibroidStagesFigo: 'FIGO 4',
      tvsEndometrialCavity: 'Normal',
      endometrialMyometrialJunction: 'Well-defined',
      septateFinding: 'No',
      polypFinding: 'Absent',
      afcRightOvary: 7,
      afcLeftOvary: 6,
      endometriomaFinding: 'Absent',
      hydrosalpinxFinding: 'Absent',
      day1416EndometrialThickness: 8.5,
      day1416EndometrialPattern: 'Trilaminar',
      ovarianDermoidFinding: 'No',
      haemorrhagicCystFinding: 'No',
      corpusLuteumFinding: 'No',
      paroOvarianCystFinding: 'No',
      zone1Dimensions: 0.8,
      zone2Dimensions: 0.3,
      zone3Dimensions: 0.2,
      zone4Dimensions: 0.1,
      femaleSurgicalProcedureRemarks: 'Normal anatomy without complications.',
    };

    render(<FemaleSurgicalProcedureCard data={data} />);

    expect(screen.getByText('7.2 cm')).toBeInTheDocument();
    expect(screen.getByText('58.4 cm³')).toBeInTheDocument();
    expect(screen.getByText('8.5 mm')).toBeInTheDocument();
    expect(screen.getByText('Uterine Polypectomy')).toBeInTheDocument();
    expect(screen.getByText('FIGO 4')).toBeInTheDocument();
    expect(screen.getByText('Normal anatomy without complications.')).toBeInTheDocument();
  });
});
