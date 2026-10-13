#!/usr/bin/env tsx
/**
 * scripts/create-form.ts
 * Automated clinical form scaffolding CLI for @aiims/esm-demographics-app.
 *
 * Usage:
 *   npx tsx scripts/create-form.ts <key> "<Form Name>" [--icon=IconName] [--concepts=c1,c2] [--keep-on-fail]
 *   npm run create-form -- <key> "<Form Name>" [--icon=IconName] [--concepts=c1,c2] [--keep-on-fail]
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import * as CarbonIcons from '@carbon/react/icons';
import { FORM_REGISTRY } from '../src/config/form-registry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper casing functions
function toPascalCase(str: string): string {
  return str.replace(/(^\w|-\w)/g, clear => clear.replace('-', '').toUpperCase());
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toUpperSnakeCase(str: string): string {
  return str.replace(/-/g, '_').toUpperCase();
}

interface ParsedArgs {
  key: string;
  name: string;
  icon: string;
  concepts: string[];
  keepOnFail: boolean;
}

function parseArguments(): ParsedArgs {
  const args = process.argv.slice(2);
  const positionals: string[] = [];
  let icon = 'ReportData';
  let concepts: string[] = [];
  let keepOnFail = false;

  for (const arg of args) {
    if (arg.startsWith('--icon=')) {
      icon = arg.split('=')[1].trim();
    } else if (arg.startsWith('--concepts=')) {
      concepts = arg
        .split('=')[1]
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);
    } else if (arg === '--keep-on-fail') {
      keepOnFail = true;
    } else if (!arg.startsWith('--')) {
      positionals.push(arg);
    }
  }

  if (positionals.length < 2) {
    console.error(`\x1b[31m[ERROR] Missing required arguments.\x1b[0m`);
    console.log(`\nUsage: npm run create-form -- <key> "<Form Name>" [--icon=IconName] [--concepts=c1,c2] [--keep-on-fail]`);
    console.log(`Example: npm run create-form -- cervical-screening "AIIMS Visit: Cervical Screening" --icon=Activity\n`);
    process.exit(1);
  }

  const key = positionals[0].trim();
  const name = positionals[1].trim();

  // Validate key format (kebab-case)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(key)) {
    console.error(`\x1b[31m[ERROR] Invalid form key "${key}". Must be kebab-case (e.g. cervical-screening).\x1b[0m`);
    process.exit(1);
  }

  // Check if form key already exists
  if (FORM_REGISTRY.some(e => e.key === key)) {
    console.error(`\x1b[31m[ERROR] Form key "${key}" already exists in FORM_REGISTRY.\x1b[0m`);
    process.exit(1);
  }

  // Validate icon exists in @carbon/react/icons
  if (!(icon in CarbonIcons)) {
    console.error(`\x1b[31m[ERROR] Icon "${icon}" not found in @carbon/react/icons.\x1b[0m`);
    process.exit(1);
  }

  return { key, name, icon, concepts, keepOnFail };
}

// Generate new random UUIDv4 or predictable OpenMRS test format
function generateFormUuid(): string {
  // Generates valid UUIDv4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function main() {
  const { key, name, icon, concepts, keepOnFail } = parseArguments();

  const pascal = toPascalCase(key);
  const camel = toCamelCase(key);
  const upperSnake = toUpperSnakeCase(key);
  const formUuid = generateFormUuid();

  console.log(`\x1b[36m=================================================================\x1b[0m`);
  console.log(`\x1b[36m AIIMS Form Scaffolder: ${key}\x1b[0m`);
  console.log(`\x1b[36m=================================================================\x1b[0m`);
  console.log(`• Key:        ${key}`);
  console.log(`• Name:       ${name}`);
  console.log(`• Icon:       ${icon}`);
  console.log(`• UUID:       ${formUuid}`);
  console.log(`• PascalCase: ${pascal}`);

  // Dynamic order calculation: max existing order + 1
  const maxOrder = Math.max(...FORM_REGISTRY.map(e => e.order || 0), 0);
  const nextOrder = maxOrder + 1;
  console.log(`• Order:      ${nextOrder}`);

  // Paths
  const featureDir = path.join(ROOT_DIR, 'src', key);
  const formUuidsFile = path.join(ROOT_DIR, 'src', 'config', 'form-uuids.ts');
  const formRegistryFile = path.join(ROOT_DIR, 'src', 'config', 'form-registry.ts');
  const enJsonFile = path.join(ROOT_DIR, 'translations', 'en.json');

  // Backup files for rollback
  const backupUuids = fs.readFileSync(formUuidsFile, 'utf-8');
  const backupRegistry = fs.readFileSync(formRegistryFile, 'utf-8');
  const backupEnJson = fs.readFileSync(enJsonFile, 'utf-8');

  const rollback = (errorMsg: string) => {
    if (keepOnFail) {
      console.warn(`\x1b[33m[KEEP-ON-FAIL] Preserving scaffolded files for inspection despite failure.\x1b[0m`);
      console.error(`\x1b[31m${errorMsg}\x1b[0m`);
      process.exit(1);
    }
    console.log(`\x1b[33m[ROLLBACK] Reverting scaffolded changes...\x1b[0m`);
    if (fs.existsSync(featureDir)) {
      fs.rmSync(featureDir, { recursive: true, force: true });
    }
    fs.writeFileSync(formUuidsFile, backupUuids, 'utf-8');
    fs.writeFileSync(formRegistryFile, backupRegistry, 'utf-8');
    fs.writeFileSync(enJsonFile, backupEnJson, 'utf-8');

    try {
      execSync('npm run generate-routes', { cwd: ROOT_DIR, stdio: 'ignore' });
    } catch {
      // Ignore
    }

    console.error(`\x1b[31m[ABORT] Scaffolding failed and was cleanly rolled back.\x1b[0m`);
    console.error(`\x1b[31mReason: ${errorMsg}\x1b[0m`);
    process.exit(1);
  };

  try {
    // Step 1: Create feature directory
    if (!fs.existsSync(featureDir)) {
      fs.mkdirSync(featureDir, { recursive: true });
    }

    // Step 2: Write resource file
    const resourceContent = `import {
  AIIMS_${upperSnake}_FORM_UUID,
} from '../config/form-uuids';
import { useFormEncounter } from '../shared/hooks/useFormEncounter';
import type { EncounterItem } from '../shared/types';

export interface Aiims${pascal}Data {
  hasData: boolean;
  encounterUuid?: string;
  encounterDatetime?: string;
  // TODO: Add clinical observation fields for ${name}
}

export const initialAiims${pascal}Data: Readonly<Aiims${pascal}Data> =
  Object.freeze({
    hasData: false, // Default false: shows empty state until concepts are recorded
  });

export function use${pascal}(
  patientUuid: string | undefined,
  formUuid: string = AIIMS_${upperSnake}_FORM_UUID
) {
  const {
    latestEncounter,
    encounters,
    hasData: encounterHasData,
    isLoading,
    error,
    mutate,
    getOptionalObsValue,
  } = useFormEncounter(patientUuid, formUuid);

  let data: Aiims${pascal}Data = { ...initialAiims${pascal}Data };

  if (latestEncounter && encounterHasData) {
    // TODO: Map observations from encounter to concept UUIDs
    data = {
      hasData: true,
      encounterUuid: latestEncounter.uuid,
      encounterDatetime: latestEncounter.encounterDatetime,
    };
  }

  return {
    data,
    latestEncounter,
    encounters,
    isLoading,
    error,
    mutate,
  };
}
`;
    fs.writeFileSync(path.join(featureDir, `${key}.resource.ts`), resourceContent, 'utf-8');

    // Step 3: Write card component
    const cardContent = `import React from 'react';
import { useTranslation } from 'react-i18next';
import { ${icon} } from '@carbon/react/icons';
import { ObservationCard, type ObservationRow } from '../shared/components';
import type { Aiims${pascal}Data } from './${key}.resource';

export interface ${pascal}CardProps {
  data: Aiims${pascal}Data | null | undefined;
}

export const ${pascal}Card: React.FC<${pascal}CardProps> = ({ data }) => {
  const { t } = useTranslation();

  const rows: ObservationRow[] = React.useMemo(() => {
    const list: ObservationRow[] = [];
    list.push({
      id: 'status',
      label: t('status', 'Status'),
      value: data?.hasData ? t('recorded', 'Recorded') : null,
      emptyPlaceholder: '—',
    });
    return list;
  }, [data, t]);

  return (
    <ObservationCard
      title={t('${camel}Details', '${name} Details')}
      icon={${icon}}
      rows={rows}
    />
  );
};
`;
    fs.writeFileSync(path.join(featureDir, `${key}-card.component.tsx`), cardContent, 'utf-8');

    // Step 4: Write dashboard component
    const dashboardContent = `import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDashboardShell } from '../shared/components';
import {
  AIIMS_${upperSnake}_FORM_UUID,
  AIIMS_${upperSnake}_FORM_NAME,
} from '../config/form-uuids';
import { use${pascal} } from './${key}.resource';
import { ${pascal}Card } from './${key}-card.component';

export interface ${pascal}DashboardProps {
  patientUuid?: string;
  formUuid?: string;
}

export const ${pascal}Dashboard: React.FC<${pascal}DashboardProps> = ({
  patientUuid,
  formUuid = AIIMS_${upperSnake}_FORM_UUID,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error, mutate } = use${pascal}(patientUuid, formUuid);

  return (
    <FormDashboardShell
      patientUuid={patientUuid}
      formUuid={formUuid}
      formName={AIIMS_${upperSnake}_FORM_NAME}
      encounterUuid={data?.encounterUuid}
      encounterDatetime={data?.encounterDatetime}
      hasData={Boolean(data?.hasData)}
      isLoading={isLoading}
      error={error}
      mutate={mutate}
      loadingDescription={t('loading${pascal}', 'Loading ${name}...')}
      emptyHeading={t('noRecorded${pascal}Encounter', 'No ${name} encounter recorded yet')}
      emptyDescription={t(
        'no${pascal}Body',
        'No clinical intake details have been submitted for this patient yet.'
      )}
      noRecordedText={t('no${pascal}Recorded', 'No ${name} recorded')}
      recordButtonText={t('record${pascal}', 'Record ${name}')}
      updateButtonText={t('update${pascal}', 'Update ${name}')}
    >
      <${pascal}Card data={data} />
    </FormDashboardShell>
  );
};

export default ${pascal}Dashboard;
`;
    fs.writeFileSync(path.join(featureDir, `${key}-dashboard.component.tsx`), dashboardContent, 'utf-8');

    // Step 5: Write unit test
    const testContent = `import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ${pascal}Card } from './${key}-card.component';
import ${pascal}Dashboard from './${key}-dashboard.component';
import * as resource from './${key}.resource';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultValue?: string) => defaultValue || _key,
  }),
}));

vi.mock('../shared/components', async () => {
  const actual = await vi.importActual('../shared/components');
  return {
    ...actual,
    FormDashboardShell: ({
      children,
      isLoading,
      hasData,
      emptyHeading,
    }: any) => (
      <div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && !hasData && <div>{emptyHeading}</div>}
        {!isLoading && hasData && children}
      </div>
    ),
  };
});

describe('${pascal}Card', () => {
  it('renders card title correctly', () => {
    render(<${pascal}Card data={null} />);
    expect(screen.getByText('${name} Details')).toBeInTheDocument();
  });
});

describe('${pascal}Dashboard', () => {
  it('renders empty state when hasData is false', () => {
    vi.spyOn(resource, 'use${pascal}').mockReturnValue({
      data: { hasData: false },
      encounter: undefined,
      encounters: [],
      isLoading: false,
      error: undefined,
      mutate: vi.fn(),
    } as any);

    render(<${pascal}Dashboard patientUuid="patient-1" />);
    expect(
      screen.getByText('No ${name} encounter recorded yet')
    ).toBeInTheDocument();
  });
});
`;
    fs.writeFileSync(path.join(featureDir, `${key}.test.tsx`), testContent, 'utf-8');

    // Step 6: Write feature index barrel
    const indexContent = `export * from './${key}.resource';
export * from './${key}-card.component';
export * from './${key}-dashboard.component';
`;
    fs.writeFileSync(path.join(featureDir, 'index.ts'), indexContent, 'utf-8');

    // Step 7: Update src/config/form-uuids.ts
    const uuidMarker = '// @create-form:uuids-end';
    if (!backupUuids.includes(uuidMarker)) {
      throw new Error(`Marker "${uuidMarker}" not found in ${formUuidsFile}`);
    }
    const newUuidBlock = `// Form UUID for ${name}
export const AIIMS_${upperSnake}_FORM_UUID = '${formUuid}';
export const AIIMS_${upperSnake}_FORM_NAME = '${name}';

${uuidMarker}`;
    const updatedUuids = backupUuids.replace(uuidMarker, newUuidBlock);
    fs.writeFileSync(formUuidsFile, updatedUuids, 'utf-8');

    // Step 8: Update src/config/form-registry.ts
    // 8a: Ensure icon is imported
    let registryContent = fs.readFileSync(formRegistryFile, 'utf-8');
    if (!registryContent.includes(icon)) {
      registryContent = registryContent.replace(
        "} from '@carbon/react/icons';",
        `  ${icon},\n} from '@carbon/react/icons';`
      );
    }
    // 8b: Ensure UUID constants are imported
    const importMarker = '// @create-form:imports-end';
    if (!registryContent.includes(importMarker)) {
      throw new Error(`Marker "${importMarker}" not found in ${formRegistryFile}`);
    }
    const newImports = `  AIIMS_${upperSnake}_FORM_UUID,\n  AIIMS_${upperSnake}_FORM_NAME,\n  ${importMarker}`;
    registryContent = registryContent.replace(importMarker, newImports);

    // 8c: Add entry to FORM_REGISTRY before registry marker
    const registryMarker = '// @create-form:registry-end';
    if (!registryContent.includes(registryMarker)) {
      throw new Error(`Marker "${registryMarker}" not found in ${formRegistryFile}`);
    }
    const newRegistryEntry = `  {
    key: '${key}',
    uuid: AIIMS_${upperSnake}_FORM_UUID,
    name: AIIMS_${upperSnake}_FORM_NAME,
    path: 'aiims-${key}',
    titleKey: 'aiims${pascal}Title',
    title: '${name.replace(/^AIIMS Visit:\s*/, '')}',
    slot: 'aiims-${key}-dashboard-slot',
    icon: ${icon},
    order: ${nextOrder},
  },
  ${registryMarker}`;
    registryContent = registryContent.replace(registryMarker, newRegistryEntry);
    fs.writeFileSync(formRegistryFile, registryContent, 'utf-8');

    // Step 9: Add translation keys to translations/en.json
    const enJsonRaw = fs.readFileSync(enJsonFile, 'utf-8');
    const lastBraceIndex = enJsonRaw.lastIndexOf('}');
    if (lastBraceIndex === -1) {
      throw new Error('Malformed translations/en.json');
    }
    const cleanName = name.replace(/^AIIMS Visit:\s*/, '');
    const translationSnippet = `,\n  "aiims${pascal}Title": "${cleanName}",\n  "${camel}Details": "${cleanName} Details",\n  "loading${pascal}": "Loading ${cleanName}...",\n  "noRecorded${pascal}Encounter": "No ${name} encounter recorded yet",\n  "no${pascal}Body": "No clinical intake details have been submitted for this patient yet.",\n  "no${pascal}Recorded": "No ${cleanName} recorded",\n  "record${pascal}": "Record ${cleanName}",\n  "update${pascal}": "Update ${cleanName}"\n}`;
    const updatedEnJson = enJsonRaw.slice(0, lastBraceIndex) + translationSnippet;
    fs.writeFileSync(enJsonFile, updatedEnJson, 'utf-8');

    console.log(`✓ Generated 5 starter files in src/${key}/`);
    console.log(`✓ Registered UUIDs in src/config/form-uuids.ts`);
    console.log(`✓ Registered entry in src/config/form-registry.ts`);
    console.log(`✓ Added 8 translation keys to translations/en.json`);

    // Step 10: Regenerate routes and extensions
    console.log(`\nRegenerating routes and extensions...`);
    execSync('npm run generate-routes', { cwd: ROOT_DIR, stdio: 'inherit' });

    // Step 11: Verification Quality Gates (tsc + vitest)
    console.log(`\nRunning TypeScript type check...`);
    try {
      execSync('npm run typescript', { cwd: ROOT_DIR, stdio: 'pipe' });
      console.log(`✓ TypeScript check passed (0 errors)`);
    } catch (err: any) {
      rollback(`TypeScript check failed:\n${err.stdout?.toString() || err.message}`);
    }

    console.log(`\nRunning unit tests for src/${key}/...`);
    try {
      execSync(`npx vitest run src/${key}/`, { cwd: ROOT_DIR, stdio: 'inherit' });
      console.log(`✓ Unit tests passed`);
    } catch (err: any) {
      rollback(`Unit tests failed for src/${key}/`);
    }

    console.log(`\x1b[32m\n=================================================================\x1b[0m`);
    console.log(`\x1b[32m 🎉 Form "${key}" successfully scaffolded and verified!\x1b[0m`);
    console.log(`\x1b[32m=================================================================\x1b[0m`);
    console.log(`Next steps:`);
    console.log(`1. Map concept UUIDs in src/${key}/${key}.resource.ts`);
    console.log(`2. Add observation DataRows in src/${key}/${key}-card.component.tsx`);
    console.log(`3. Deploy with: npm run deploy:local\n`);
  } catch (err: any) {
    rollback(err.message || String(err));
  }
}

main();
