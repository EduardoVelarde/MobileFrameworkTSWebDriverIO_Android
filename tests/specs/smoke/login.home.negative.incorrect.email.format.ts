import { expect } from '@wdio/globals';
import LoginScreen from '@pages/LoginScreen';
import HomeScreen from '@pages/HomeScreen';

describe('Login flow – My Demo App (Negative)', () => {

  it('should not login with invalid credentials @smoke @negative', async () => {
    
    await LoginScreen.open();

    
    await LoginScreen.login('bob#example.com', 'wrong_pass');

    const errorMessage = await $('android=new UiSelector().text("Provided credentials do not match any user in this service.")');
    await errorMessage.waitForDisplayed({ timeout: 5000 });

    // Validates Error Message
    const messageText = await errorMessage.getText();
    expect(messageText).toContain('Provided credentials do not match any user in this service.');

    // 
    const homeTitle = await $('~Products-screen');
    const isHomeVisible = await homeTitle.isDisplayed();
    expect(isHomeVisible).toBe(false);
  });

});
