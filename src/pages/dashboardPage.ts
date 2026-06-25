import { BasePage } from './basePage';
import { test, expect, Locator } from '../fixtures/page.fixtures';


export class DashboardPage extends BasePage {
// locators







// methods

dashboardCard(cardName: string): Locator {
    return this.page.locator(
      `//div[contains(@class,'orangehrm-dashboard-widget')][.//p[normalize-space()='${cardName}']]`
    ).first();
  }
}