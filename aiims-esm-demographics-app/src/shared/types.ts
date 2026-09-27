import type React from 'react';

export interface FormRegistryEntry {
  key: string;
  uuid: string;
  name: string;
  path: string;
  title: string;
  titleKey?: string;
  slot: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  order: number;
}

export interface PersonAttribute {
  attributeType?: {
    uuid?: string;
    display?: string;
  };
  value?: string | number | null;
}

export interface PatientResource {
  id?: string;
  birthDate?: string;
  person?: {
    age?: number | string | null;
    attributes?: PersonAttribute[];
  };
  telecom?: Array<{
    system?: string;
    value?: string;
  }>;
  name?: Array<{
    given?: string[];
    family?: string;
  }>;
  [key: string]: unknown;
}

