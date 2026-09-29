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

export interface OpenMrsConceptName {
  display?: string;
  name?: string;
}

export interface ConceptDisplay {
  uuid: string;
  display: string;
  name?: string | OpenMrsConceptName;
}

export type ObsValue =
  | string
  | number
  | boolean
  | ConceptDisplay
  | { display?: string; name?: string | OpenMrsConceptName }
  | null
  | undefined;

export interface ObsItem {
  uuid: string;
  concept: ConceptDisplay;
  value: ObsValue;
  obsDatetime: string;
}

export interface EncounterItem {
  uuid: string;
  encounterDatetime: string;
  encounterType?: {
    uuid: string;
    display?: string;
  };
  form?: {
    uuid: string;
    name: string;
  };
  obs: ObsItem[];
}

export interface EncounterResponse {
  results: EncounterItem[];
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


