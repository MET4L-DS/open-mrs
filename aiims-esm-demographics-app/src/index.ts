import { getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from './dashboard-link.component';
import { dashboardMeta } from './dashboard.meta';
import { moduleName } from './constants';

const options = {
  featureName: 'aiims-demographics',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  // App initialization
}

export const aiimsDemographicsDashboardLink = getSyncLifecycle(
  createDashboardLink(dashboardMeta),
  options
);

export const aiimsDemographicsDashboard = getAsyncLifecycle(
  () => import('./demographics/demographics-dashboard.component'),
  options
);
