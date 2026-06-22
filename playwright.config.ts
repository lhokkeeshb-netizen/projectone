import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const storageStatePath = path.resolve(
  __dirname,
  'storage-state',
  'admin.json'
);

function shouldRunSetup(): boolean {
  if (!fs.existsSync(storageStatePath)) {
    console.log('Storage state not found. Running authentication setup...');
    return true;
  }

  const stats = fs.statSync(storageStatePath);
  const ageInMinutes =
    (Date.now() - stats.mtime.getTime()) / (1000 * 60);

  if (ageInMinutes > 60) {
    console.log('Storage state expired. Running authentication setup...');
    return true;
  }

  console.log('Valid storage state found. Skipping authentication setup.');
  return false;
}

const runSetup = shouldRunSetup();

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html']
  ],

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [
  {
    name: 'setup',
    testMatch: /auth\.setup\.ts/,
  },

  {
    name: 'login',
    testMatch: /loginPage\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },

  {
    name: 'authenticated',
    testIgnore: [
      /auth\.setup\.ts/,
      /loginPage\.spec\.ts/,
    ],
    use: {
      ...devices['Desktop Chrome'],
      storageState: storageStatePath,
    },
    dependencies: ['setup'],
  },
]
});





// import { defineConfig, devices } from '@playwright/test';
// import dotenv from 'dotenv';

// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// export default defineConfig({
//   /* Run tests in files in parallel */
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   /* Retry on CI only */
//   /* Opt out of parallel tests on CI. */
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  
  
  
//   use: {
//     baseURL: process.env.baseurl,
//     headless: false,
//   },
//   testDir: './src/tests',
//   fullyParallel: false,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 1 : undefined,
//   reporter: 'html',
//   // use: {
//   //   /* Base URL to use in actions like `await page.goto('')`. */
//   //   // baseURL: 'http://localhost:3000',

//   //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//   //   trace: 'on-first-retry',
//   // },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     // {
//     //   name: 'firefox',
//     //   use: { ...devices['Desktop Firefox'] },
//     // },

//     // {
//     //   name: 'webkit',
//     //   use: { ...devices['Desktop Safari'] },
//     // },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });
// console.log('baseurl =', process.env.baseurl);
