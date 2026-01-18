import { expect } from '@wdio/globals';
import LoginScreen from '@pages/LoginScreen';
import HomeScreen  from '@pages/HomeScreen';
import CartScreen  from '@pages/CartScreen';

describe('Login flow - My Demo App', () => {

    before(async () => {
    await browser.resetAppIfNeeded?.();
  });
  it('should login successfully with valid credentials @smoke @positive @cart', async () => {
    await LoginScreen.open();
    await LoginScreen.login('bob@example.com', '10203040');

    await HomeScreen.selectItem();
    await HomeScreen.validateAddedItem();
    const correctNumberAdded = await $('//android.widget.TextView[@text="5"]');
    await correctNumberAdded.waitForDisplayed({ timeout: 5000 });
    const messageText = await correctNumberAdded.getText();
    expect(messageText).toContain('1');
    await HomeScreen.goToCart();    
    await expect(CartScreen.proceedToCheckout).toBeDisplayed();

    const msgProduct = await CartScreen.productName;
    await msgProduct.waitForDisplayed({ timeout: 5000 });
    const msgProductval = await msgProduct.getText();
    expect(msgProductval).toContain('Sauce Labs Fleece Jacket');

    const msgNumProd = await CartScreen.totalProductsAdded;
    await msgNumProd.waitForDisplayed({ timeout: 5000 });
    const msgNumProdVal = await msgNumProd.getText();
    expect(msgNumProdVal).toContain('1');

  });

});