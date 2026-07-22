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
  timeout: 120*1000,
  expect: {
    timeout: 10*1000
  },
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