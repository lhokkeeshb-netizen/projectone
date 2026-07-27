import {test, expect} from '../../src/fixtures/page.fixtures'
import { sideNavigation, headerTitle, dialogButtonText, createAdminOrEssUser, userRole } from '../../src/test-data'

test.describe('user management - admin tests', () => {
    test.beforeEach(async ({ page, dashboardPage }) => {
        await page.goto('/');
        await dashboardPage.waitFor()
        await dashboardPage.page.waitForLoadState('domcontentloaded')
    }); 
    
    test('navigate to admin page', async({ dashboardPage, loginPage }) =>{
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin)
        const title = await dashboardPage.verifyHeader(headerTitle.admin)
    })

    test('create and delete admin user', async({dashboardPage,adminPage}) => {
        const user = createAdminOrEssUser(userRole.admin)
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin)
        await adminPage.createUser(user)
        await adminPage.searchUser(user.username)
        await expect(adminPage.userRow(user.username)).toBeVisible()
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.waitFor()
        await adminPage.searchUser(user.username)
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })

    test('create and delete ess user', async({dashboardPage,adminPage}) => {
        const user = createAdminOrEssUser(userRole.ess)
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin)
        await adminPage.createUser(user)
        await adminPage.searchUser(user.username)
        await expect(adminPage.userRow(user.username)).toBeVisible()
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.waitFor()
        await adminPage.searchUser(user.username)
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })

    test('cancel delete user', async({dashboardPage,adminPage}) => {
        const user = createAdminOrEssUser(userRole.admin)
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

    test('search invalid user', async({dashboardPage,adminPage}) => {
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.searchUser('asdnkmvronjxsw');
        await expect(adminPage.userRow('asdnkmvronjxsw')).toHaveCount(0)
    })

    test('search user by username', async({dashboardPage,adminPage}) => {
        const user = createAdminOrEssUser(userRole.admin)
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.createUser(user);
        await adminPage.searchUser(user.username);
        await expect(adminPage.userRow(user.username)).toBeVisible();
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })

    test('search user by userrole', async({dashboardPage,adminPage}) => {
        const user = createAdminOrEssUser(userRole.admin)
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.createUser(user);
        await adminPage.searchUser(user.username);
        await adminPage.selectDropdown('User Role', user.userRole);
        await adminPage.searchButton.click();
        await expect(adminPage.userRow(user.username)).toBeVisible();
        await expect(adminPage.userRow(user.username)).toHaveCount(1)
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })

    test('search user by employee name', async({dashboardPage,adminPage}) => {
        const user = createAdminOrEssUser(userRole.admin)
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.createUser(user);
        await adminPage.searchUser(user.username);
        await adminPage.employeeName.fill(user.employeeName);
        await adminPage.waitFor()
        await adminPage.page.waitForLoadState('domcontentloaded')
        await adminPage.page.getByRole('option').first().click();
        await adminPage.searchButton.click();
        await expect(adminPage.userRow(user.username)).toBeVisible();
        await expect(adminPage.userRow(user.username)).toHaveCount(1)
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })

        test('search user by status', async({dashboardPage,adminPage}) => {
        const user = createAdminOrEssUser(userRole.admin)
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        await adminPage.createUser(user);
        await adminPage.searchUser(user.username);
        await adminPage.selectDropdown('Status', user.status);
        await adminPage.searchButton.click();
        await expect(adminPage.userRow(user.username)).toBeVisible();
        await expect(adminPage.userRow(user.username)).toHaveCount(1)
        await adminPage.deleteUserRow(user.username).click()
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.waitFor()
        await expect(adminPage.userRow(user.username)).toHaveCount(0)
    })

    test('edit user', async({dashboardPage,adminPage}) => {
        await dashboardPage.navigateThroughSideBar(sideNavigation.admin);
        const user = createAdminOrEssUser(userRole.admin)
        const updatedUserName = `${user.username}!`
        await adminPage.createUser(user)
        await adminPage.searchUser(user.username)
        await expect(adminPage.userRow(user.username)).toBeVisible()
        await expect(adminPage.userRow(user.username)).toHaveCount(1)
        await adminPage.editUser(user.username, {username: updatedUserName})
        await adminPage.searchUser(updatedUserName);
        await adminPage.waitFor()
        await expect(adminPage.userRow(updatedUserName)).toBeVisible();
        await adminPage.deleteUserRow(updatedUserName).click();
        await adminPage.dialog.confirmButton(dialogButtonText.yesDelete).click()
        await adminPage.searchUser(updatedUserName);
        await expect(adminPage.userRow(updatedUserName)).toHaveCount(0);
          })
}) 