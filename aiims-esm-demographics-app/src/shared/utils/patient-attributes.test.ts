import { describe, it, expect } from 'vitest';
import { getPatientAge, getPatientPhoneNumber, getPatientDisplayName } from './patient-attributes';
import { TELEPHONE_ATTRIBUTE_TYPE_UUID } from '../../constants';

describe('patient-attributes utils', () => {
  it('extracts patient age when available', () => {
    expect(getPatientAge(null)).toBe('');
    expect(getPatientAge(undefined)).toBe('');
    expect(getPatientAge({ person: { age: 32 } })).toBe('32');
    expect(getPatientAge({ person: { age: 0 } })).toBe('0');
  });

  it('extracts telephone number from person attributes', () => {
    const patientWithAttr = {
      person: {
        attributes: [
          {
            attributeType: { uuid: TELEPHONE_ATTRIBUTE_TYPE_UUID },
            value: '9876543210',
          },
        ],
      },
    };
    expect(getPatientPhoneNumber(patientWithAttr)).toBe('9876543210');
  });

  it('extracts telephone number from fhir telecom fallback', () => {
    const patientWithTelecom = {
      telecom: [{ system: 'phone', value: '1122334455' }],
    };
    expect(getPatientPhoneNumber(patientWithTelecom)).toBe('1122334455');
  });

  it('extracts patient display name properly', () => {
    const patient = {
      name: [
        {
          given: ['Sunita', 'Devi'],
          family: 'Sharma',
        },
      ],
    };
    expect(getPatientDisplayName(patient)).toBe('Sunita Devi Sharma');
    expect(getPatientDisplayName(null)).toBe('');
  });
});
