import { chromium, type Browser, type Page } from 'playwright';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { FORM_REGISTRY } from '../src/config/form-registry';

interface SmokeTestOptions {
  baseUrl: string;
  patientUuid: string;
  formKey?: string;
  headed: boolean;
  timeoutMs: number;
}

const DEFAULT_OPTIONS: SmokeTestOptions = {
  baseUrl: process.env.OPENMRS_SPA_URL || 'http://localhost/openmrs/spa',
  patientUuid: process.env.TEST_PATIENT_UUID || '1d678f66-801a-4a52-b47f-29854389c09f',
  headed: false,
  timeoutMs: 30000,
};

function parseArgs(): SmokeTestOptions {
  const args = process.argv.slice(2);
  const options = { ...DEFAULT_OPTIONS };

  for (const arg of args) {
    if (arg === '--headed') {
      options.headed = true;
    } else if (arg.startsWith('--form=')) {
      options.formKey = arg.split('=')[1];
    } else if (arg === '-f' && args[args.indexOf(arg) + 1]) {
      options.formKey = args[args.indexOf(arg) + 1];
    } else if (arg.startsWith('--patient=')) {
      options.patientUuid = arg.split('=')[1];
    } else if (arg.startsWith('--timeout=')) {
      options.timeoutMs = parseInt(arg.split('=')[1], 10);
    }
  }

  return options;
}

function checkUrlLive(urlStr: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const url = new URL(urlStr);
      const req = http.request(
        {
          hostname: url.hostname,
          port: url.port || 80,
          path: url.pathname,
          method: 'GET',
          timeout: 4000,
        },
        (res) => {
          resolve((res.statusCode ?? 500) < 500);
        }
      );
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

async function verifyPatientExists(patientUuid: string): Promise<boolean> {
  return new Promise((resolve) => {
    const authHeader = 'Basic ' + Buffer.from('admin:Admin123').toString('base64');
    const req = http.request(
      {
        hostname: 'localhost',
        port: 80,
        path: `/openmrs/ws/rest/v1/patient/${patientUuid}?v=default`,
        method: 'GET',
        headers: { Authorization: authHeader },
        timeout: 5000,
      },
      (res) => {
        resolve(res.statusCode === 200);
      }
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function login(page: Page, baseUrl: string) {
  const loginUrl = `${baseUrl}/login`;
  await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });

  // Enter username
  const usernameInput = page.locator('#username');
  await usernameInput.waitFor({ state: 'visible', timeout: 15000 });
  await usernameInput.fill('admin');

  // Submit username step
  const continueBtn = page.locator('button[type="submit"]');
  await continueBtn.click();

  // Enter password
  const passwordInput = page.locator('#password');
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.fill('Admin123');
  await continueBtn.click();

  // Wait until out of login page
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 20000 });
}

async function runSmokeTests() {
  const options = parseArgs();
  console.log('====================================================');
  console.log('🏥 OpenMRS AIIMS E2E Dashboard Smoke Test Robot');
  console.log('====================================================');
  console.log(`Endpoint : ${options.baseUrl}`);
  console.log(`Patient  : ${options.patientUuid}`);
  if (options.formKey) {
    console.log(`Filter   : Single form "${options.formKey}"`);
  }
  console.log(`Mode     : ${options.headed ? 'Headed' : 'Headless'}\n`);

  // 1. Preconditions Check
  process.stdout.write('Checking OpenMRS SPA availability... ');
  const isSpaUp = await checkUrlLive(options.baseUrl);
  if (!isSpaUp) {
    console.log('❌ FAILED');
    console.error(
      '\n[Precondition Error] OpenMRS SPA is not reachable at http://localhost/openmrs/spa.\n' +
      'Please ensure your Docker containers are running:\n' +
      '  powershell .\\openmrs.ps1 start\n'
    );
    process.exit(1);
  }
  console.log('✓ OK');

  process.stdout.write(`Verifying test patient (${options.patientUuid})... `);
  const patientValid = await verifyPatientExists(options.patientUuid);
  if (!patientValid) {
    console.log('❌ FAILED');
    console.error(
      `\n[Precondition Error] Patient with UUID ${options.patientUuid} was not found in OpenMRS.\n` +
      'Please run setup scripts to populate test patients.\n'
    );
    process.exit(1);
  }
  console.log('✓ OK');

  // Filter forms if specified
  const formsToTest = options.formKey
    ? FORM_REGISTRY.filter((f) => f.key === options.formKey || f.path === options.formKey)
    : FORM_REGISTRY;

  if (formsToTest.length === 0) {
    console.error(`\n[Error] No form found matching filter "${options.formKey}".`);
    process.exit(1);
  }

  // 2. Launch Browser
  console.log('\nLaunching browser session...');
  let browser: Browser;
  try {
    browser = await chromium.launch({
      headless: !options.headed,
    });
  } catch (err: any) {
    console.warn(`[Warning] Default Chromium launch error: ${err.message}. Falling back to system Chrome...`);
    browser = await chromium.launch({
      channel: 'chrome',
      headless: !options.headed,
    });
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  // Create screenshot directory
  const screenshotsDir = path.resolve(process.cwd(), 'e2e-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // 3. Authenticate
  process.stdout.write('Authenticating admin session... ');
  try {
    await login(page, options.baseUrl);
    console.log('✓ Logged in');
  } catch (err: any) {
    console.log('❌ Login failed');
    console.error(`\n[Auth Error] Failed to complete OpenMRS login: ${err.message}`);
    await page.screenshot({ path: path.join(screenshotsDir, 'auth-failure.png') });
    await browser.close();
    process.exit(1);
  }

  console.log(`\nTesting ${formsToTest.length} Clinical Dashboards:\n`);

  let passed = 0;
  let failed = 0;
  const failureReports: string[] = [];

  for (let i = 0; i < formsToTest.length; i++) {
    const form = formsToTest[i];
    const indexStr = `[${(i + 1).toString().padStart(2, '0')}/${formsToTest.length}]`;
    const targetUrl = `${options.baseUrl}/patient/${options.patientUuid}/chart/${form.path}`;

    process.stdout.write(`${indexStr} ${form.name.padEnd(46, '.')} `);
    const startTime = Date.now();

    try {
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: options.timeoutMs });

      // Wait for layout to mount with locator or timeout
      await page.locator('.omrs-main-content, main, [data-extension-slot], h3').first().waitFor({
        state: 'visible',
        timeout: 8000,
      }).catch(() => {});
      await page.waitForTimeout(1000);

      // 1. Assert non-blank body content
      const bodyText = await page.innerText('body');
      if (bodyText.length < 50) {
        throw new Error(`Blank screen detected! Body text length is only ${bodyText.length} characters.`);
      }

      // 2. Assert no fatal React error boundaries
      const lowerBody = bodyText.toLowerCase();
      if (
        lowerBody.includes('something went wrong') ||
        lowerBody.includes('minified react error') ||
        lowerBody.includes('application error')
      ) {
        throw new Error('Fatal React error boundary triggered on dashboard.');
      }

      // 3. Assert dashboard content mounted:
      // Either ObservationCard rows/tiles or EmptyState header ("No ... Recorded Yet" / "Record ...")
      const headings = await page.locator('h3, h4').allInnerTexts();
      const hasHeading = headings.length > 0;
      const hasMainContent = (await page.locator('.omrs-main-content, main, [data-extension-slot]').count()) > 0;

      if (!hasHeading && !hasMainContent) {
        throw new Error('Neither dashboard headings nor main extension container could be found.');
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`✓ OK (${elapsed}s)`);
      passed++;
    } catch (err: any) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`❌ FAIL (${elapsed}s)`);
      failed++;

      const screenshotFile = path.join(screenshotsDir, `${form.key}-failure.png`);
      try {
        await page.screenshot({ path: screenshotFile, fullPage: true });
      } catch {}

      const report = `  • ${form.name} (${form.path}): ${err.message}\n    Screenshot: ${screenshotFile}`;
      failureReports.push(report);
    }
  }

  await browser.close();

  // Summary
  console.log('\n====================================================');
  console.log(`🏁 Smoke Test Completed: ${passed} passed, ${failed} failed (${formsToTest.length} total)`);
  console.log('====================================================');

  if (failed > 0) {
    console.error('\nFailures Summary:');
    for (const report of failureReports) {
      console.error(report);
    }
    process.exit(1);
  } else {
    console.log('\n🎉 All registered dashboards mounted successfully without white screens or crashes!\n');
    process.exit(0);
  }
}

runSmokeTests().catch((err) => {
  console.error('\nFatal test runner error:', err);
  process.exit(1);
});
