import { describe, it, expect } from 'vitest';
import { formatObsValue } from './useFormEncounter';

describe('formatObsValue', () => {
  it('returns empty string for null or undefined', () => {
    expect(formatObsValue(null)).toBe('');
    expect(formatObsValue(undefined)).toBe('');
  });

  it('formats primitive string and number values', () => {
    expect(formatObsValue('Graduate')).toBe('Graduate');
    expect(formatObsValue(42)).toBe('42');
  });

  it('formats object with display property', () => {
    expect(formatObsValue({ display: 'Female' })).toBe('Female');
  });

  it('formats object with name property', () => {
    expect(formatObsValue({ name: 'Employed' })).toBe('Employed');
  });

  it('formats object with nested name.display property', () => {
    expect(formatObsValue({ name: { display: 'Doctorate' } })).toBe('Doctorate');
  });
});
