export default class BaseScreen {
  constructor(private selector: string) {}
  async isDisplayed() { return $(this.selector).isDisplayed(); }
  async waitToBeVisible(timeout = 10000) {
    await $(this.selector).waitForDisplayed({ timeout });
  }
}
