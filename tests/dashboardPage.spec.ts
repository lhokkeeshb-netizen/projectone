import {test, expect} from '../src/fixtures/page.fixtures'
import { sideNavigation, headerTitle } from '../src/test-data/data'

test.describe('dashboard tests', () => {
    test.beforeEach(async ({ page, dashboardPage }) => {
        await page.goto('/');
        await dashboardPage.waitFor()
        await dashboardPage.page.waitForLoadState('domcontentloaded')
}); 
    test('verify dashboard cards', async({ dashboardPage }) =>{
        await dashboardPage.navigateThroughSideBar(sideNavigation.dashboard)
        await dashboardPage.verifyHeader(headerTitle.dashBoard)
    })
}) 