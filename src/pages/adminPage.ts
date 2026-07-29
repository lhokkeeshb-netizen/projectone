import { BasePage } from './basePage';
import { expect } from '../fixtures/page.fixtures';
import { SystemUser } from '../test-data'

export class AdminPage extends BasePage {
    // Locators
    get systemUsersHeader() { return this.page.getByRole('heading', { name: 'System Users', exact: true})}
    get addUserHeader() { return this.page.getByRole('heading', { name: 'Add User', exact: true})}
    get addButton() {return this.page.getByText('Add')}
    get employeeName() {return this.page.locator("//label[normalize-space()='Employee Name']/ancestor::div[contains(@class,'oxd-input-group')]//input")}
    get username() {return this.page.locator("//label[normalize-space()='Username']/ancestor::div[contains(@class,'oxd-input-group')]//input")}
    get password() {return this.page.locator("//label[normalize-space()='Password']/ancestor::div[contains(@class,'oxd-input-group')]//input")}
    get confirmPassword() {return this.page.locator("//label[normalize-space()='Confirm Password']/ancestor::div[contains(@class,'oxd-input-group')]//input")}
    get saveButton() {return this.page.getByRole('button', {name: 'Save',exact: true})}
    get searchUsername() {return this.page.locator("//label[normalize-space()='Username']/ancestor::div[contains(@class,'oxd-input-group')]//input")}
    get searchButton() {return this.page.getByRole('button', {name: 'Search', exact: true})}
    get resetButton() {return this.page.getByRole('button', {name: 'Reset', exact: true})}
    userRow(username: string) {return this.page.locator(`//div[@role='row'][.//*[normalize-space()='${username}']]`)}
    deleteUserRow(username: string) {return this.userRow(username).locator('button:has(.bi-trash)')}
    editUserRow(username: string) {return this.userRow(username).locator('button:has(.bi-pencil-fill)')}

    // Methods
    async selectDropdown(label: string, option: string) {
        await this.page.locator(`//label[normalize-space()='${label}']/ancestor::div[contains(@class,'oxd-input-group')]//div[contains(@class,'oxd-select-text-input')]`).click();
        await this.page.locator(`//div[@role='option']//span[normalize-space()='${option}']`).click();
    }

    async createUser(user: SystemUser) {
        await this.addButton.first().click()
        await this.waitFor()
        await expect(this.addUserHeader).toBeVisible();
        await this.selectDropdown('User Role', user.userRole);
        await this.employeeName.fill(user.employeeName);
        await this.waitFor()
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.getByRole('option').first().click();
        await this.selectDropdown('Status', user.status);
        await this.username.fill(user.username);
        await this.password.fill(user.password);
        await this.confirmPassword.fill(user.password);
        await this.saveButton.click();
        await this.waitFor()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async searchUser(username: string) {
        await this.waitFor()
        await this.searchUsername.fill(username);
        await this.searchButton.click();
    }

    async editUser(username: string, updates: Partial<SystemUser>) {
        await this.editUserRow(username).click();
        await this.page.waitForLoadState('domcontentloaded');

        if (updates.userRole) {
            await this.waitFor()
            await this.selectDropdown('User Role', updates.userRole);
        }
        if (updates.status) {
            await this.waitFor()
            await this.selectDropdown('Status', updates.status);
        }
        if (updates.username) {
            await this.waitFor()
            await this.username.fill(updates.username);
            
        }
        if (updates.password) {
            await this.waitFor()
            await this.password.fill(updates.password);
            await this.confirmPassword.fill(updates.password);
        }
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded')
        await this.waitFor()
    }

}