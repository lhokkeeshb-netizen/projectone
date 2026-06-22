import { Page, expect } from "@playwright/test";
import { type SideNavigation, HeaderTitle } from '../test-data/data';

export class BasePage {
  constructor(readonly page: Page) {}

  get sideNavigationLocator() { return this.page.locator('#app [role="navigation"]').first(); }
  get headerTitle() { return this.page.locator('#app span h6')}

  async waitFor() {
    await this.page.waitForTimeout(5000);
  }

  async navigateThroughSideBar(menuitem: SideNavigation) {
    await expect(this.sideNavigationLocator).toBeVisible();
    const menu = this.page.locator(`//span[normalize-space()="${menuitem}"]`).first()
    await expect(menu).toBeVisible()
    await menu.click()
  }

  async verifyHeader(header:HeaderTitle) {
    await expect(this.headerTitle).toBeVisible();
    await expect(this.headerTitle).toContainText(header)
  }
}