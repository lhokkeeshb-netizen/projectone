import {test, expect} from '../src/fixtures/page.fixtures'
import { sideNavigation, headerTitle, loginCreds, createAdminUser } from '../src/test-data'

test.describe('admin tests', () => {
    test.beforeEach(async ({ page, dashboardPage }) => {
        await page.goto('/');
        await dashboardPage.waitFor()
        await dashboardPage.page.waitForLoadState('domcontentloaded')
    }); 
    
    test('navigate to admin page', async({ dashboardPage, loginPage }) =>{
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin)
        const title = await dashboardPage.verifyHeader(headerTitle.admin)
    })

    test('Create Admin User', async ({dashboardPage,adminPage,loginPage}) => {
    const user = createAdminUser();
    await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
    await adminPage.createUser(user);
    await adminPage.searchUser(user.username);
    await expect(adminPage.userRow(user.username)).toBeVisible();
});
}) 