import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useSWR from 'swr';
import { usePreviousSurgery } from './previous-surgery.resource';
import { CONCEPTS, AIIMS_PREV_SURGERY_FORM_UUID } from '../constants';

vi.mock('swr', () => ({
  default: vi.fn(),
}));

vi.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: vi.fn(),
  restBaseUrl: '/ws/rest/v1',
}));

describe('usePreviousSurgery hook', () => {
  it('extracts procedures and attaches laterality correctly from encounter obs', () => {
    const mockEncounter = {
      uuid: 'enc-prev-surg-1',
      encounterDatetime: '2026-09-29T11:54:00.000Z',
      form: { uuid: AIIMS_PREV_SURGERY_FORM_UUID, name: 'AIIMS Visit: Previous Surgery' },
      obs: [
        {
          uuid: 'obs-prev-performed',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.previousSurgeryPerformed, display: 'Previous Surgery Performed' },
          value: { uuid: CONCEPTS.yes, display: 'Yes' },
        },
        {
          uuid: 'obs-approach',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.surgicalApproach, display: 'Surgical Approach' },
          value: { uuid: CONCEPTS.approachLaparoscopy, display: 'Laparoscopy' },
        },
        {
          uuid: 'obs-date',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.yearOrDateOfSurgery, display: 'Year or Date of Surgery' },
          value: '2024',
        },
        // Endometriosis Surgeries
        {
          uuid: 'obs-endo-1',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.endometriosisSurgeries, display: 'Endometriosis Surgeries' },
          value: { uuid: CONCEPTS.endometrioticCystectomy, display: 'Endometriotic Cystectomy' },
        },
        {
          uuid: 'obs-endo-lat-1',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.endometrioticCystectomyLaterality, display: 'Endometriotic Cystectomy Laterality' },
          value: { uuid: CONCEPTS.lateralityBilateral, display: 'Bilateral' },
        },
        {
          uuid: 'obs-endo-2',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.endometriosisSurgeries, display: 'Endometriosis Surgeries' },
          value: { uuid: CONCEPTS.endometriosisOophorectomy, display: 'Endometriosis Oophorectomy' },
        },
        {
          uuid: 'obs-endo-lat-2',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.endometriosisOophorectomyLaterality, display: 'Endometriosis Oophorectomy Laterality' },
          value: { uuid: CONCEPTS.lateralityBilateral, display: 'Bilateral' },
        },
        {
          uuid: 'obs-endo-3',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.endometriosisSurgeries, display: 'Endometriosis Surgeries' },
          value: { uuid: CONCEPTS.endometrioticSclerotherapy, display: 'Endometriotic Sclerotherapy' },
        },
        {
          uuid: 'obs-endo-lat-3',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.endometrioticSclerotherapyLaterality, display: 'Endometriotic Sclerotherapy Laterality' },
          value: { uuid: CONCEPTS.lateralityLeft, display: 'Left' },
        },
        // Ovarian Surgeries
        {
          uuid: 'obs-ovarian-1',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.ovarianSurgeries, display: 'Ovarian Surgeries' },
          value: { uuid: CONCEPTS.ovarianDermoid, display: 'Ovarian Dermoid/Mature Teratoma' },
        },
        {
          uuid: 'obs-ovarian-lat-1',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.ovarianDermoidLaterality, display: 'Ovarian Dermoid Laterality' },
          value: { uuid: CONCEPTS.lateralityLeft, display: 'Left' },
        },
        // Tubal Surgeries
        {
          uuid: 'obs-tubal-1',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.fallopianTubeSurgeries, display: 'Fallopian Tube Surgeries' },
          value: { uuid: CONCEPTS.tubalCannulation, display: 'Tubal cannulation' },
        },
        {
          uuid: 'obs-tubal-lat-1',
          obsDatetime: '2026-09-29T11:54:00.000Z',
          concept: { uuid: CONCEPTS.tubalCannulationLaterality, display: 'Tubal Cannulation Laterality' },
          value: { uuid: CONCEPTS.lateralityLeft, display: 'Left' },
        },
      ],
    };

    (useSWR as any).mockReturnValue({
      data: { data: { results: [mockEncounter] } },
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => usePreviousSurgery('patient-123'));

    expect(result.current.previousSurgeryData.hasData).toBe(true);
    expect(result.current.previousSurgeryData.previousSurgeryPerformed).toBe('Yes');
    expect(result.current.previousSurgeryData.surgicalApproach).toBe('Laparoscopy');
    expect(result.current.previousSurgeryData.yearOrDateOfSurgery).toBe('2024');

    // Verify laterality mapping
    expect(result.current.previousSurgeryData.endometriosisSurgeries).toEqual(
      expect.arrayContaining([
        { procedure: 'Endometriotic Cystectomy', laterality: 'Bilateral' },
        { procedure: 'Endometriosis Oophorectomy', laterality: 'Bilateral' },
        { procedure: 'Endometriotic Sclerotherapy', laterality: 'Left' },
      ])
    );
    expect(result.current.previousSurgeryData.endometriosisSurgeries).toHaveLength(3);

    expect(result.current.previousSurgeryData.ovarianSurgeries).toEqual([
      { procedure: 'Ovarian Dermoid/Mature Teratoma', laterality: 'Left' },
    ]);

    expect(result.current.previousSurgeryData.tubalSurgeries).toEqual([
      { procedure: 'Tubal cannulation', laterality: 'Left' },
    ]);
  });
});
