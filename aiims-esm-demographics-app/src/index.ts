import { getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from './shared/components/dashboard-link.component';
import { FORM_REGISTRY, moduleName, getFormRegistryEntry, getFormUuid, getFormName } from './constants';
import type { FormRegistryEntry } from './shared/types';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

// Polyfill missing core translation for patient contact attribute in O3
if (typeof window !== 'undefined') {
  const i18n = (window as any).i18next;
  if (i18n) {
    i18n.addResource('en', 'core', 'Telephone Number', 'Telephone Number');
    i18n.on?.('initialized', () => {
      i18n.addResource('en', 'core', 'Telephone Number', 'Telephone Number');
    });
  }

  // Suppress spurious upstream O3 core translation warning for 'Telephone Number'
  if (!(window as any).__o3_translation_hook_installed) {
    (window as any).__o3_translation_hook_installed = true;
    const originalError = console.error;
    console.error = function (...args: any[]) {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('O3 Core Translations does not provide key') &&
        args[0].includes('Telephone Number')
      ) {
        return;
      }
      return originalError.apply(console, args);
    };
  }
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

export const aiimsDemographicsSummaryWidget = getAsyncLifecycle(
  () => import('./demographics/demographics-summary-widget.component'),
  { featureName: 'aiims-demographics-summary', moduleName }
);

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

const femaleFactorExtensions = createFormExtensions(
  getFormRegistryEntry('female-factor'),
  () => import('./female-factor/female-factor-dashboard.component')
);

export const aiimsFemaleFactorDashboardLink = femaleFactorExtensions.link;
export const aiimsFemaleFactorDashboard = femaleFactorExtensions.dashboard;

const maleFactorExtensions = createFormExtensions(
  getFormRegistryEntry('male-factor'),
  () => import('./male-factor/male-factor-dashboard.component')
);

export const aiimsMaleFactorDashboardLink = maleFactorExtensions.link;
export const aiimsMaleFactorDashboard = maleFactorExtensions.dashboard;

const maleHormoneSurgeryExtensions = createFormExtensions(
  getFormRegistryEntry('male-hormone-surgery'),
  () => import('./male-hormone-surgery/male-hormone-surgery-dashboard.component')
);

export const aiimsMaleHormoneSurgeryDashboardLink = maleHormoneSurgeryExtensions.link;
export const aiimsMaleHormoneSurgeryDashboard = maleHormoneSurgeryExtensions.dashboard;

const previousOiIuiExtensions = createFormExtensions(
  getFormRegistryEntry('previous-oi-iui'),
  () => import('./previous-oi-iui/previous-oi-iui-dashboard.component')
);

export const aiimsPreviousOiIuiDashboardLink = previousOiIuiExtensions.link;
export const aiimsPreviousOiIuiDashboard = previousOiIuiExtensions.dashboard;

const previousSurgeryExtensions = createFormExtensions(
  getFormRegistryEntry('previous-surgery'),
  () => import('./previous-surgery/previous-surgery-dashboard.component')
);

export const aiimsPreviousSurgeryDashboardLink = previousSurgeryExtensions.link;
export const aiimsPreviousSurgeryDashboard = previousSurgeryExtensions.dashboard;

export { FORM_REGISTRY, getFormRegistryEntry, getFormUuid, getFormName } from './constants';
export * from './shared';
export * from './infertility-type';
export * from './obstetric-history';
export * from './menstrual-history';
export * from './female-factor';
export * from './male-factor';
export * from './male-hormone-surgery';
export * from './previous-oi-iui';
export * from './previous-surgery';



