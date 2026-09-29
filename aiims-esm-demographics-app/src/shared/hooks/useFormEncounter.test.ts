import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useSWR from 'swr';
import { formatObsValue, useFormEncounter } from './useFormEncounter';

vi.mock('swr', () => ({
  default: vi.fn(),
}));

vi.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: vi.fn(),
  restBaseUrl: '/ws/rest/v1',
}));

describe('formatObsValue', () => {
  it('returns empty string for null or undefined', () => {
    expect(formatObsValue(null)).toBe('');
    expect(formatObsValue(undefined)).toBe('');
  });

  it('formats primitive string and number values', () => {
    expect(formatObsValue('Graduate')).toBe('Graduate');
    expect(formatObsValue(42)).toBe('42');
    expect(formatObsValue(true)).toBe('true');
  });

  it('formats object with display property', () => {
    expect(formatObsValue({ uuid: '123', display: 'Female' })).toBe('Female');
  });

  it('formats object with name property', () => {
    expect(formatObsValue({ name: 'Employed' })).toBe('Employed');
  });

  it('formats object with nested name.display property', () => {
    expect(formatObsValue({ name: { display: 'Doctorate' } })).toBe('Doctorate');
  });

  it('formats object with nested name.name property', () => {
    expect(formatObsValue({ name: { name: 'Master Degree' } })).toBe('Master Degree');
  });
});

describe('useFormEncounter hook functionality', () => {
  it('deduplicates values in getObsValues and handles getOptionalObsValue cleanly', () => {
    const mockObs = [
      {
        uuid: 'obs-2',
        obsDatetime: '2026-09-28T10:00:00.000Z',
        concept: { uuid: 'concept-tag-1', display: 'Tag Concept' },
        value: 'Endometriosis',
      },
      {
        uuid: 'obs-1',
        obsDatetime: '2026-09-28T10:00:00.000Z',
        concept: { uuid: 'concept-tag-1', display: 'Tag Concept' },
        value: 'Endometriosis',
      },
      {
        uuid: 'obs-3',
        obsDatetime: '2026-09-28T10:00:00.000Z',
        concept: { uuid: 'concept-tag-1', display: 'Tag Concept' },
        value: 'PCOS',
      },
      {
        uuid: 'obs-empty',
        obsDatetime: '2026-09-28T10:00:00.000Z',
        concept: { uuid: 'concept-empty', display: 'Empty Concept' },
        value: '   ',
      },
    ];

    (useSWR as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        data: {
          results: [
            {
              uuid: 'enc-1',
              encounterDatetime: '2026-09-28T10:00:00.000Z',
              form: { uuid: 'form-1', name: 'Form 1' },
              obs: mockObs,
            },
          ],
        },
      },
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useFormEncounter('patient-1', 'form-1'));

    // Should deduplicate 'Endometriosis' while maintaining deterministic UUID descending sort
    const values = result.current.getObsValues('concept-tag-1');
    expect(values).toEqual(['PCOS', 'Endometriosis']);

    // Should return undefined for empty/whitespace string
    expect(result.current.getOptionalObsValue('concept-empty')).toBeUndefined();
    expect(result.current.getOptionalObsValue('concept-nonexistent')).toBeUndefined();

    // Should return latest value by deterministic sort (obs-3: PCOS)
    expect(result.current.getOptionalObsValue('concept-tag-1')).toBe('PCOS');
  });

  it('deterministically breaks ties using UUID when obsDatetime or encounterDatetime match', () => {
    (useSWR as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        data: {
          results: [
            {
              uuid: 'enc-a',
              encounterDatetime: '2026-09-28T10:00:00.000Z',
              form: { uuid: 'form-1', name: 'Form 1' },
              obs: [],
            },
            {
              uuid: 'enc-b',
              encounterDatetime: '2026-09-28T10:00:00.000Z',
              form: { uuid: 'form-1', name: 'Form 1' },
              obs: [],
            },
          ],
        },
      },
      error: undefined,
      isLoading: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useFormEncounter('patient-1', 'form-1'));
    // enc-b should sort before enc-a deterministically based on localeCompare (b vs a)
    expect(result.current.latestEncounter?.uuid).toBe('enc-b');
  });
});
