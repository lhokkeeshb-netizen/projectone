import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { loginCreds, Urls } from '../src/test-data/data';
import path from 'path';

const authFile = path.resolve('storage-state/admin.json');

setup('authenticate user', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await page.goto('/');

  await loginPage.login(loginCreds.userName, loginCreds.password);

  // IMPORTANT: verify login succeeded
  await expect(page).toHaveURL(Urls.dashboard);

  // SAVE STORAGE STATE
  await page.context().storageState({
    path: authFile,
  });
});