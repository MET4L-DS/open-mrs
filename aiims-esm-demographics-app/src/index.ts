import { getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from './shared/components/dashboard-link.component';
import { FORM_REGISTRY, moduleName } from './constants';
import type { FormRegistryEntry } from './shared/types';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

/**
 * Helper to retrieve form registry entry by key safely.
 */
export function getFormRegistryEntry(key: string): FormRegistryEntry {
  const entry = FORM_REGISTRY.find(e => e.key === key);
  if (!entry) {
    throw new Error(`Form configuration for key "${key}" not found in FORM_REGISTRY.`);
  }
  return entry;
}

/**
 * Factory helper to generate lifecycle extensions for any form entry in FORM_REGISTRY.
 * Enables zero-boilerplate scaling across all 8+ clinical forms.
 */
export function createFormExtensions(
  entry: FormRegistryEntry,
  loadDashboard: () => Promise<{ default: React.ComponentType<any> }>
) {
  const options = {
    featureName: entry.key,
    moduleName,
    order: entry.order,
  };

  return {
    link: getSyncLifecycle(
      createDashboardLink({
        path: entry.path,
        title: entry.title,
        titleKey: entry.titleKey,
        icon: entry.icon,
      }),
      options
    ),
    dashboard: getAsyncLifecycle(loadDashboard, options),
  };
}

const demographicsExtensions = createFormExtensions(
  getFormRegistryEntry('demographics'),
  () => import('./demographics/demographics-dashboard.component')
);

export const aiimsDemographicsDashboardLink = demographicsExtensions.link;
export const aiimsDemographicsDashboard = demographicsExtensions.dashboard;

const infertilityTypeExtensions = createFormExtensions(
  getFormRegistryEntry('infertility-type'),
  () => import('./infertility-type/infertility-type-dashboard.component')
);

export const aiimsInfertilityTypeDashboardLink = infertilityTypeExtensions.link;
export const aiimsInfertilityTypeDashboard = infertilityTypeExtensions.dashboard;

const obstetricHistoryExtensions = createFormExtensions(
  getFormRegistryEntry('obstetric-history'),
  () => import('./obstetric-history/obstetric-history-dashboard.component')
);

export const aiimsObstetricHistoryDashboardLink = obstetricHistoryExtensions.link;
export const aiimsObstetricHistoryDashboard = obstetricHistoryExtensions.dashboard;

const menstrualHistoryExtensions = createFormExtensions(
  getFormRegistryEntry('menstrual-history'),
  () => import('./menstrual-history/menstrual-history-dashboard.component')
);

export const aiimsMenstrualHistoryDashboardLink = menstrualHistoryExtensions.link;
export const aiimsMenstrualHistoryDashboard = menstrualHistoryExtensions.dashboard;

export { FORM_REGISTRY } from './constants';
export * from './shared';
export * from './infertility-type';
export * from './obstetric-history';
export * from './menstrual-history';
