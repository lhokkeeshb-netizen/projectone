import {test, expect} from '../src/fixtures/page.fixtures'
import { sideNavigation, headerTitle, createAdminUser, dialogButtonText } from '../src/test-data'

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

    test('Create Admin User', async ({dashboardPage,adminPage}) => {
        const user = createAdminUser();
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.createUser(user);
        await adminPage.searchUser(user.username);
        await expect(adminPage.userRow(user.username)).toBeVisible();
    });

    test('delete user', async({dashboardPage,adminPage}) => {
        const user = createAdminUser();
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.createUser(user);
        await adminPage.searchUser(user.username);
        await expect(adminPage.userRow(user.username)).toBeVisible();
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.waitFor()
        await adminPage.searchUser(user.username)
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })

    test('cancel delete user', async({dashboardPage,adminPage}) => {
        const user = createAdminUser();
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.createUser(user);
        await adminPage.searchUser(user.username);
        await expect(adminPage.userRow(user.username)).toBeVisible();
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.noCancel).click()
        await adminPage.waitFor()
        await adminPage.searchUser(user.username)
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(1)
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })
}) 