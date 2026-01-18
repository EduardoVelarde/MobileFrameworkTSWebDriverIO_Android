import { $ } from '@wdio/globals';

class HomeScreen {
  get productList() { return $('~products screen'); }
  get cartIcon() { return $('~cart badge'); }

  async selectItem() {
    await $('//android.widget.TextView[@content-desc="store item text" and @text="Sauce Labs Fleece Jacket"]').waitForDisplayed({ timeout: 10000 });
    await $('//android.widget.TextView[@content-desc="store item text" and @text="Sauce Labs Fleece Jacket"]').click();
    await $('~Add To Cart button').waitForDisplayed({ timeout: 10000 });
    await $('~Add To Cart button').click();
  }
  async validateAddedItem() {
    await $('~cart badge').waitForDisplayed({ timeout: 10000 });
    await $('//android.widget.TextView[@text="1"]').waitForDisplayed({ timeout: 10000 });
    await $('~Add To Cart button').waitForDisplayed({ timeout: 10000 });
    await $('~Add To Cart button').click();
  }
  async goToCart() {
    await $('~cart badge').waitForDisplayed({ timeout: 10000 });
    await $('~cart badge').click();
  }
}

export default new HomeScreen();