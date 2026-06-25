import {test, expect} from '../src/fixtures/page.fixtures'
import { sideNavigation, headerTitle, loginCreds } from '../src/test-data'

test.describe('admin tests', () => {
    test.beforeEach(async ({ page, dashboardPage }) => {
        await page.goto('/');
        await dashboardPage.waitFor()
        await dashboardPage.page.waitForLoadState('domcontentloaded')
    }); 
    
    test('navigate to admin page', async({ dashboardPage, loginPage }) =>{
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin)
        // await loginPage.login(loginCreds.userName, loginCreds.password);
        const title = await dashboardPage.verifyHeader(headerTitle.admin)
    })


}) 