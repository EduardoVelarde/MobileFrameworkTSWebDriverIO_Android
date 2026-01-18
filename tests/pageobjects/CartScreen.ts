import { $ } from '@wdio/globals';

class CartScreen {
  get totalProductsAdded() { return $('(//android.widget.TextView[@text="1"])[2]'); }
  get productName() { return $('~product label'); }
  get proceedToCheckout() { return $('~Proceed To Checkout button'); }

  
}

export default new CartScreen();