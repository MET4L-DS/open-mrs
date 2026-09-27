import { TELEPHONE_ATTRIBUTE_TYPE_UUID } from '../../constants';
import type { PatientResource } from '../types';

/**
 * Extracts patient age safely from patient object, with fallbacks.
 */
export function getPatientAge(patient?: PatientResource | null): string {
  if (!patient) return '';
  if (patient.person?.age !== undefined && patient.person?.age !== null) {
    return String(patient.person.age);
  }
  return '';
}

/**
 * Extracts telephone number safely from patient person attributes or telecom array.
 */
export function getPatientPhoneNumber(patient?: PatientResource | null): string {
  if (!patient) return '';

  const phoneAttr = patient.person?.attributes?.find(
    attr => attr.attributeType?.uuid === TELEPHONE_ATTRIBUTE_TYPE_UUID
  );

  if (phoneAttr?.value !== undefined && phoneAttr?.value !== null && phoneAttr?.value !== '') {
    return String(phoneAttr.value);
  }

  const phoneTelecom = patient.telecom?.find(t => t.system === 'phone');
  if (phoneTelecom?.value) {
    return phoneTelecom.value;
  }

  return '';
}

/**
 * Formats full patient display name from given and family names.
 */
export function getPatientDisplayName(patient?: PatientResource | null): string {
  if (!patient?.name?.[0]) return '';
  const first = patient.name[0].given?.join(' ') ?? '';
  const last = patient.name[0].family ?? '';
  return `${first} ${last}`.trim();
}
