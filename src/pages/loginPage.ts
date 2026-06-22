import { BasePage } from './basePage';

export class LoginPage extends BasePage {

  get orangeHrmLogo() { return this.page.locator('#app img[alt="company-branding"]'); }
  get usernameInput() { return this.page.locator('input[name="username"]'); }
  get passwordInput() { return this.page.locator('input[name="password"]'); }
  get loginButton() { return this.page.locator('[type="submit"]'); }

  async navigateToLoginPage() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}