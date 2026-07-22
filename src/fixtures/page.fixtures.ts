import { test as base, expect, Locator } from '@playwright/test' 
import {LoginPage } from '../pages/loginPage'
import {DashboardPage} from '../pages/dashboardPage'
import { AdminPage } from '../pages/adminPage'

type PageFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminPage: AdminPage
}

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use ) =>  {
        await use (new LoginPage(page)); 
    },
    dashboardPage: async ({ page }, use ) => {
        await use (new DashboardPage(page))
    },
    adminPage: async ({ page }, use ) => {
        await use (new AdminPage(page))
    }
})

export { expect, Locator }

