import {test, expect} from '../src/fixtures/page.fixtures'
import {Urls, loginCreds} from '../src/test-data'

test.describe('Login Tests', () => {
    test('verify UI before login', async({ loginPage }) => {
        await loginPage.navigateToLoginPage()
        await loginPage.waitFor()
        await expect (loginPage.page).toHaveURL(Urls.beforeLogin)
        await expect (loginPage.orangeHrmLogo).toBeVisible()
        await expect (loginPage.usernameInput).toBeVisible()
        await expect (loginPage.passwordInput).toBeVisible()
    })

    test('verify error messages for username and password', async ({ loginPage}) => {
        await loginPage.navigateToLoginPage()
        await loginPage.waitFor()
        await loginPage.loginButton.click();
        await expect(loginPage.usernameInput).toHaveCSS('border-color', 'rgb(235, 9, 16)');
        await expect(loginPage.passwordInput).toHaveCSS('border-color', 'rgb(235, 9, 16)');
    })

    test('verify error is disappeared when placeholder is filled', async({ loginPage }) =>{
        await loginPage.navigateToLoginPage()
        await loginPage.waitFor()
        await loginPage.loginButton.click();
        await expect(loginPage.usernameInput).toHaveCSS('border-color', 'rgb(235, 9, 16)');
        await expect(loginPage.passwordInput).toHaveCSS('border-color', 'rgb(235, 9, 16)');
        await loginPage.usernameInput.fill(loginCreds.userName)
        await expect(loginPage.usernameInput).not.toHaveCSS('border-color', 'rgb(235, 9, 16)');
        await loginPage.passwordInput.fill(loginCreds.password)
        await expect(loginPage.passwordInput).not.toHaveCSS('border-color', 'rgb(235, 9, 16)');
    })
    
    test('verify with only invalid username and only invalid password', async({ loginPage }) =>{
        await loginPage.navigateToLoginPage()
        await loginPage.waitFor()
        await loginPage.login('username', loginCreds.password)
        await expect(loginPage.page.getByText('Invalid credentials')).toBeVisible()
        await loginPage.login(loginCreds.userName, 'password')
        await expect(loginPage.page.getByText('Invalid credentials')).toBeVisible()
    })
    
    test('verify with valid credentials', async({ loginPage }) =>{
        await loginPage.navigateToLoginPage()
        await loginPage.waitFor()
        await loginPage.login(loginCreds.userName, loginCreds.password)
        await loginPage.page.waitForLoadState('domcontentloaded')
        await expect(loginPage.page).toHaveURL(Urls.dashboard)
    })
})
