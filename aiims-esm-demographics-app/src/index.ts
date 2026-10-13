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



export const aiimsDemographicsSummaryWidget = getAsyncLifecycle(
  () => import('./demographics/demographics-summary-widget.component'),
  { featureName: 'aiims-demographics-summary', moduleName }
);

// All form extensions, lifecycles, and module barrels are auto-generated from FORM_REGISTRY
export * from './generated-form-extensions';
export { FORM_REGISTRY, getFormRegistryEntry, getFormUuid, getFormName } from './constants';
export * from './shared';






