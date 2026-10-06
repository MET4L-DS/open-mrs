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

  // Diagnostic pipeline logger for form submissions (POST /encounter)
  if (!(window as any).__aiims_fetch_logger_installed) {

    (window as any).__aiims_fetch_logger_installed = true;
    const originalFetch = window.fetch;
    window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
      const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
      const isEncounterPost = method === 'POST' && url.includes('/encounter');

      if (isEncounterPost) {
        let parsedBody: unknown = undefined;
        try {
          if (init?.body && typeof init.body === 'string') {
            parsedBody = JSON.parse(init.body);
          }
        } catch {
          parsedBody = init?.body;
        }

        console.log(`[AIIMS Pipeline] Submitting encounter: ${method} ${url}`, {
          payload: parsedBody,
          timestamp: new Date().toISOString(),
        });

        const startTime = performance.now();
        try {
          const response = await originalFetch.apply(this, [input, init]);
          const duration = Math.round(performance.now() - startTime);
          if (!response.ok) {
            try {
              const clone = response.clone();
              const errBody = await clone.json();
              console.error(`[AIIMS Pipeline] Encounter submission failed (HTTP ${response.status}):`, errBody);
            } catch {
              try {
                const clone = response.clone();
                const errText = await clone.text();
                console.error(`[AIIMS Pipeline] Encounter submission failed (HTTP ${response.status}):`, errText);
              } catch {}
            }
          } else {
            console.log(`[AIIMS Pipeline] Encounter submission responded: HTTP ${response.status} (${duration}ms)`, {
              ok: response.ok,
              url,
            });
          }
          return response;
        } catch (err) {
          const duration = Math.round(performance.now() - startTime);
          console.error(`[AIIMS Pipeline] Encounter submission failed (${duration}ms):`, err);
          throw err;
        }
      }
      return originalFetch.apply(this, [input, init]);
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

const pastMedicalHistoryExtensions = createFormExtensions(
  getFormRegistryEntry('past-medical-history'),
  () => import('./past-medical-history/past-medical-history-dashboard.component')
);

export const aiimsPastMedicalHistoryDashboardLink = pastMedicalHistoryExtensions.link;
export const aiimsPastMedicalHistoryDashboard = pastMedicalHistoryExtensions.dashboard;

const familyHistoryExtensions = createFormExtensions(
  getFormRegistryEntry('family-history'),
  () => import('./family-history/family-history-dashboard.component')
);

export const aiimsFamilyHistoryDashboardLink = familyHistoryExtensions.link;
export const aiimsFamilyHistoryDashboard = familyHistoryExtensions.dashboard;

const tuberculosisHistoryExtensions = createFormExtensions(
  getFormRegistryEntry('tuberculosis-history'),
  () => import('./tuberculosis-history/tuberculosis-history-dashboard.component')
);

export const aiimsTuberculosisHistoryDashboardLink = tuberculosisHistoryExtensions.link;
export const aiimsTuberculosisHistoryDashboard = tuberculosisHistoryExtensions.dashboard;

const investigationUltrasoundExtensions = createFormExtensions(
  getFormRegistryEntry('investigation-ultrasound'),
  () => import('./investigation-ultrasound/investigation-ultrasound-dashboard.component')
);

export const aiimsInvestigationUltrasoundDashboardLink = investigationUltrasoundExtensions.link;
export const aiimsInvestigationUltrasoundDashboard = investigationUltrasoundExtensions.dashboard;

const femaleBloodHormoneExtensions = createFormExtensions(
  getFormRegistryEntry('female-blood-hormone'),
  () => import('./investigation-female-blood/female-blood-hormone-dashboard.component')
);

export const aiimsFemaleBloodHormoneDashboardLink = femaleBloodHormoneExtensions.link;
export const aiimsFemaleBloodHormoneDashboard = femaleBloodHormoneExtensions.dashboard;

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
export * from './past-medical-history';
export * from './family-history';
export * from './tuberculosis-history';
export * from './investigation-ultrasound';
export * from './investigation-female-blood';




