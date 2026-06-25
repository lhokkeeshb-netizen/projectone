import { test as base, expect, Locator } from '@playwright/test' 
import {LoginPage } from '../pages/loginPage'
import {DashboardPage} from '../pages/dashboardPage'

type PageFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
}

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use ) =>  {
        await use (new LoginPage(page)); 
    },
    dashboardPage: async ({ page }, use ) => {
        await use (new DashboardPage(page))
    }
})

export { expect, Locator }

