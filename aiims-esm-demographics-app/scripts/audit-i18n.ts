import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface AuditOptions {
  strict: boolean;
  fix: boolean;
  silent: boolean;
}

const ROOT_DIR = path.resolve(__dirname, '..');
const TRANSLATIONS_PATH = path.join(ROOT_DIR, 'translations', 'en.json');
const CONFIG_PATH = path.join(ROOT_DIR, 'tools', 'i18next-parser.config.js');
const TEMP_DIR = path.join(ROOT_DIR, '.tmp-i18n-audit');
const TEMP_OUTPUT_FILE = path.join(TEMP_DIR, 'en.json');

function parseArgs(): AuditOptions {
  const args = process.argv.slice(2);
  return {
    strict: args.includes('--strict'),
    fix: args.includes('--fix'),
    silent: args.includes('--silent'),
  };
}

function loadJson(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function runAudit() {
  const options = parseArgs();

  console.log('====================================================');
  console.log('🌐 OpenMRS AIIMS i18n Translation Health Check');
  console.log('====================================================');
  console.log(`Catalog : ${path.relative(ROOT_DIR, TRANSLATIONS_PATH)}`);
  console.log(`Parser  : ${path.relative(ROOT_DIR, CONFIG_PATH)}`);
  console.log(`Mode    : ${options.strict ? 'Strict' : 'Standard'}\n`);

  // Ensure isolated temp directory exists
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  let extractedKeys: Record<string, string> = {};

  try {
    process.stdout.write('Extracting translation keys from source code... ');
    // Execute i18next CLI with isolated output to temp dir
    // We target .tmp-i18n-audit/en.json
    const i18nCmd = `npx i18next "src/**/*.component.tsx" "src/**/*.extension.tsx" "src/**/*.modal.tsx" "src/**/*.workspace.tsx" "src/index.ts" --config "${CONFIG_PATH}" -o "${TEMP_DIR}/$LOCALE.json" --silent`;

    execSync(i18nCmd, {
      cwd: ROOT_DIR,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8',
    });
    console.log('✓ OK');

    // i18next parser output file in TEMP_DIR
    // If output pattern was $LOCALE.json, it wrote en.json
    let generatedFile = TEMP_OUTPUT_FILE;
    if (!fs.existsSync(generatedFile)) {
      // Find whatever .json file was created
      const files = fs.readdirSync(TEMP_DIR).filter((f) => f.endsWith('.json'));
      if (files.length > 0) {
        generatedFile = path.join(TEMP_DIR, files[0]);
      }
    }

    extractedKeys = loadJson(generatedFile);
  } catch (err: any) {
    console.log('❌ FAILED');
    console.error(`\n[Extraction Error] Failed to run i18next-parser: ${err.message}`);
    process.exit(1);
  } finally {
    // Guaranteed cleanup
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
  }

  // Load existing translations
  const existingTranslations = loadJson(TRANSLATIONS_PATH);

  const extractedKeyList = Object.keys(extractedKeys);
  const existingKeyList = Object.keys(existingTranslations);

  // Analyze discrepancies
  const missingKeys: string[] = [];
  const emptyKeys: string[] = [];
  const orphanKeys: string[] = [];

  for (const key of extractedKeyList) {
    if (!(key in existingTranslations)) {
      missingKeys.push(key);
    }
  }

  for (const [key, value] of Object.entries(existingTranslations)) {
    if (typeof value === 'string' && value.trim() === '') {
      emptyKeys.push(key);
    }
    if (!(key in extractedKeys)) {
      orphanKeys.push(key);
    }
  }

  // Summary Table
  console.log('\n====================================================');
  console.log('📊 Translation Health Summary');
  console.log('====================================================');
  console.log(`Keys Referenced in Code : ${extractedKeyList.length}`);
  console.log(`Keys Defined in en.json : ${existingKeyList.length}`);
  console.log(`Missing from en.json    : ${missingKeys.length}`);
  console.log(`Empty Values in en.json : ${emptyKeys.length}`);
  console.log(`Orphan / Unused in Code : ${orphanKeys.length}`);

  let hasErrors = false;

  if (missingKeys.length > 0) {
    hasErrors = true;
    console.error('\n🚨 MISSING TRANSLATION KEYS (Used in code but missing from en.json):');
    for (const key of missingKeys) {
      console.error(`  • ${key}`);
    }
  }

  if (emptyKeys.length > 0) {
    hasErrors = true;
    console.error('\n⚠️  EMPTY TRANSLATION VALUES (Defined in en.json with blank string):');
    for (const key of emptyKeys) {
      console.error(`  • ${key}`);
    }
  }

  if (orphanKeys.length > 0) {
    if (options.strict) {
      hasErrors = true;
      console.error('\n⚠️  ORPHAN TRANSLATION KEYS (Defined in en.json but unused in code):');
      for (const key of orphanKeys) {
        console.error(`  • ${key}`);
      }
    } else {
      console.log(`\nℹ️  Notice: ${orphanKeys.length} orphan keys present in en.json (pass --strict to fail on orphan keys).`);
    }
  }

  // Handle --fix mode if requested
  if (options.fix && missingKeys.length > 0) {
    console.log('\nApplying --fix: Appending missing keys to translations/en.json...');
    const updated = { ...existingTranslations };
    for (const key of missingKeys) {
      updated[key] = extractedKeys[key] || '';
    }
    fs.writeFileSync(TRANSLATIONS_PATH, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
    console.log(`✓ Appended ${missingKeys.length} missing keys to en.json.`);
  }

  console.log('====================================================');

  if (hasErrors) {
    console.error('❌ Translation health check failed. Please resolve discrepancies above.\n');
    process.exit(1);
  } else {
    console.log('🎉 100% Translation health verified! All keys exist and are populated.\n');
    process.exit(0);
  }
}

runAudit();
