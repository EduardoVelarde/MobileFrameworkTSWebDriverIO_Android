import { expect } from '@wdio/globals';
import LoginScreen from '@pages/LoginScreen';
import HomeScreen  from '@pages/HomeScreen';

describe('Login flow - My Demo App', () => {

    before(async () => {
    await browser.resetAppIfNeeded?.();
  });
  it('should login successfully with valid credentials @smoke @positive', async () => {
    await LoginScreen.open();
    await LoginScreen.login('bob@example.com', '10203040');

    await expect(HomeScreen.productList).toBeDisplayed();
    await expect(HomeScreen.cartIcon).toBeDisplayed();
  });

});