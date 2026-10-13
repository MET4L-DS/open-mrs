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

export const aiimsDemographicsSummaryWidget = getAsyncLifecycle(
  () => import('./demographics/demographics-summary-widget.component'),
  { featureName: 'aiims-demographics-summary', moduleName }
);

/** Manifest mapping each form key to its async dashboard loader */
const FORM_MODULES: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  'demographics': () => import('./demographics/demographics-dashboard.component'),
  'infertility-type': () => import('./infertility-type/infertility-type-dashboard.component'),
  'obstetric-history': () => import('./obstetric-history/obstetric-history-dashboard.component'),
  'menstrual-history': () => import('./menstrual-history/menstrual-history-dashboard.component'),
  'female-factor': () => import('./female-factor/female-factor-dashboard.component'),
  'male-factor': () => import('./male-factor/male-factor-dashboard.component'),
  'previous-oi-iui': () => import('./previous-oi-iui/previous-oi-iui-dashboard.component'),
  'previous-surgery': () => import('./previous-surgery/previous-surgery-dashboard.component'),
  'male-hormone-surgery': () => import('./male-hormone-surgery/male-hormone-surgery-dashboard.component'),
  'past-medical-history': () => import('./past-medical-history/past-medical-history-dashboard.component'),
  'family-history': () => import('./family-history/family-history-dashboard.component'),
  'tuberculosis-history': () => import('./tuberculosis-history/tuberculosis-history-dashboard.component'),
  'investigation-ultrasound': () => import('./investigation-ultrasound/investigation-ultrasound-dashboard.component'),
  'female-blood-hormone': () => import('./investigation-female-blood/female-blood-hormone-dashboard.component'),
  'female-surgical-procedure': () => import('./investigation-female-surgical/female-surgical-procedure-dashboard.component'),
  'procedure-embryo-transfer': () => import('./procedure-embryo-transfer/procedure-embryo-transfer-dashboard.component'),
  'investigation-female-procedure-biopsy': () => import('./investigation-female-procedure-biopsy/investigation-female-procedure-biopsy-dashboard.component'),
  'investigation-male-semen': () => import('./investigation-male-semen/investigation-male-semen-dashboard.component'),
  'ovarian-stimulation-protocol': () => import('./ovarian-stimulation-protocol/ovarian-stimulation-protocol-dashboard.component'),
  'dose-of-drugs': () => import('./dose-of-drugs/dose-of-drugs-dashboard.component'),
  'adjuvant-drug': () => import('./adjuvant-drug/adjuvant-drug-dashboard.component'),
  'trigger-details': () => import('./trigger-details/trigger-details-dashboard.component'),
  'ovum-pick-up-details': () => import('./ovum-pick-up-details/ovum-pick-up-details-dashboard.component'),
  'procedure': () => import('./procedure/procedure-dashboard.component'),
  'lab-procedure-insemination': () => import('./lab-procedure-insemination/lab-procedure-insemination-dashboard.component'),
  'sperm-quality-assessment': () => import('./sperm-quality-assessment/sperm-quality-assessment-dashboard.component'),
};

function toPascalCase(str: string): string {
  return str.replace(/(^\w|-\w)/g, clear => clear.replace('-', '').toUpperCase());
}

// Generate extensions programmatically
const _extensions: Record<string, any> = {};
for (const entry of FORM_REGISTRY) {
  const loader = FORM_MODULES[entry.key];
  if (loader) {
    const pascal = toPascalCase(entry.key);
    const exts = createFormExtensions(entry, loader);
    _extensions[`aiims${pascal}DashboardLink`] = exts.link;
    _extensions[`aiims${pascal}Dashboard`] = exts.dashboard;
  }
}

// Named exports required by Single-SPA at bundle time
export const {
  aiimsDemographicsDashboardLink,
  aiimsDemographicsDashboard,
  aiimsInfertilityTypeDashboardLink,
  aiimsInfertilityTypeDashboard,
  aiimsObstetricHistoryDashboardLink,
  aiimsObstetricHistoryDashboard,
  aiimsMenstrualHistoryDashboardLink,
  aiimsMenstrualHistoryDashboard,
  aiimsFemaleFactorDashboardLink,
  aiimsFemaleFactorDashboard,
  aiimsMaleFactorDashboardLink,
  aiimsMaleFactorDashboard,
  aiimsPreviousOiIuiDashboardLink,
  aiimsPreviousOiIuiDashboard,
  aiimsPreviousSurgeryDashboardLink,
  aiimsPreviousSurgeryDashboard,
  aiimsMaleHormoneSurgeryDashboardLink,
  aiimsMaleHormoneSurgeryDashboard,
  aiimsPastMedicalHistoryDashboardLink,
  aiimsPastMedicalHistoryDashboard,
  aiimsFamilyHistoryDashboardLink,
  aiimsFamilyHistoryDashboard,
  aiimsTuberculosisHistoryDashboardLink,
  aiimsTuberculosisHistoryDashboard,
  aiimsInvestigationUltrasoundDashboardLink,
  aiimsInvestigationUltrasoundDashboard,
  aiimsFemaleBloodHormoneDashboardLink,
  aiimsFemaleBloodHormoneDashboard,
  aiimsFemaleSurgicalProcedureDashboardLink,
  aiimsFemaleSurgicalProcedureDashboard,
  aiimsProcedureEmbryoTransferDashboardLink,
  aiimsProcedureEmbryoTransferDashboard,
  aiimsInvestigationFemaleProcedureBiopsyDashboardLink,
  aiimsInvestigationFemaleProcedureBiopsyDashboard,
  aiimsInvestigationMaleSemenDashboardLink,
  aiimsInvestigationMaleSemenDashboard,
  aiimsOvarianStimulationProtocolDashboardLink,
  aiimsOvarianStimulationProtocolDashboard,
  aiimsDoseOfDrugsDashboardLink,
  aiimsDoseOfDrugsDashboard,
  aiimsAdjuvantDrugDashboardLink,
  aiimsAdjuvantDrugDashboard,
  aiimsTriggerDetailsDashboardLink,
  aiimsTriggerDetailsDashboard,
  aiimsOvumPickUpDetailsDashboardLink,
  aiimsOvumPickUpDetailsDashboard,
  aiimsProcedureDashboardLink,
  aiimsProcedureDashboard,
  aiimsLabProcedureInseminationDashboardLink,
  aiimsLabProcedureInseminationDashboard,
  aiimsSpermQualityAssessmentDashboardLink,
  aiimsSpermQualityAssessmentDashboard,
} = _extensions;

export { FORM_REGISTRY, getFormRegistryEntry, getFormUuid, getFormName } from './constants';
export * from './shared';
export * from './infertility-type';
export * from './obstetric-history';
export * from './menstrual-history';
export * from './female-factor';
export * from './male-factor';
export * from './previous-oi-iui';
export * from './previous-surgery';
export * from './male-hormone-surgery';
export * from './past-medical-history';
export * from './family-history';
export * from './tuberculosis-history';
export * from './investigation-ultrasound';
export * from './investigation-female-blood';
export * from './investigation-female-surgical';
export * from './procedure-embryo-transfer';
export * from './investigation-female-procedure-biopsy';
export * from './investigation-male-semen';
export * from './ovarian-stimulation-protocol';
export * from './dose-of-drugs';
export * from './adjuvant-drug';
export * from './trigger-details';
export * from './ovum-pick-up-details';
export * from './lab-procedure-insemination';
export * from './procedure';
export * from './sperm-quality-assessment';






