import { Page } from "@playwright/test";

export class dialog {
    constructor (private readonly page: Page) {}
        
    // Locators
    get dialogContainer() { return this.page.locator('.orangehrm-dialog-popup')}
    confirmButton(name: string) { return this.page.getByRole('button', { name: name})}
}
