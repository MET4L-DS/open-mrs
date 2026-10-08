import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProcedureEmbryoTransferCard } from './procedure-embryo-transfer-card.component';
import {
  type AiimsProcedureEmbryoTransferData,
  initialAiimsProcedureEmbryoTransferData,
} from './procedure-embryo-transfer.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue: string) => defaultValue,
  }),
}));

describe('ProcedureEmbryoTransferCard', () => {
  it('renders card title and question labels when empty', () => {
    render(<ProcedureEmbryoTransferCard data={initialAiimsProcedureEmbryoTransferData} />);

    expect(screen.getByText('Mock Embryo Transfer & Cervical Assessment')).toBeInTheDocument();
    expect(screen.getByText('Mock Embryo Transfer')).toBeInTheDocument();
    expect(screen.getByText('Speculum Type')).toBeInTheDocument();
    expect(screen.getByText('Cervical Canal Direction')).toBeInTheDocument();
    expect(screen.getByText('Procedure Remarks')).toBeInTheDocument();
  });

  it('renders recorded procedure embryo transfer observations correctly', () => {
    const data: AiimsProcedureEmbryoTransferData = {
      hasData: true,
      encounterUuid: 'enc-et-1',
      encounterDatetime: '2026-10-08T10:00:00.000Z',
      mockEmbryoTransfer: 'Easy',
      mockEmbryoTransferSpeculum: "With Cusco's",
      embryoTransferCervicalCanalDirection: 'Deviated to Left',
      procedureEmbryoTransferRemarks: 'Smooth transfer without resistance',
    };

    render(<ProcedureEmbryoTransferCard data={data} />);

    expect(screen.getByText("Easy (With Cusco's)")).toBeInTheDocument();
    expect(screen.getByText("With Cusco's")).toBeInTheDocument();
    expect(screen.getByText('Deviated to Left')).toBeInTheDocument();
    expect(screen.getByText('Smooth transfer without resistance')).toBeInTheDocument();
  });
});
