import { $ } from '@wdio/globals';

class LoginScreen {
  get usernameField() { return $('~Username input field'); }
  get passwordField() { return $('~Password input field'); }
  get loginButton() { return $('~Login button'); }

  async open() {
    await $('~open menu').waitForDisplayed({ timeout: 10000 });
    await $('~open menu').click();
    await $('~menu item log in').click();
  }

  async login(username: string, password: string) {
    await this.usernameField.setValue(username);
    await this.passwordField.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginScreen();