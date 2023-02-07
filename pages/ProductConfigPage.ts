import { Locator, Page } from "@playwright/test";

export class ProductConfigPage {
  readonly page: Page;
  readonly cookieAcceptButton: Locator;
  readonly cartItemTitle: Locator;
  readonly cartItemDetails: Locator;
  readonly cartItemPrice: Locator;
  readonly matteFinishOption: Locator;
  readonly totalPrice: Locator;
  readonly continueButton: Locator;
  readonly xsellPanel: Locator;

  constructor(p: Page) {
    this.page = p;
    this.cookieAcceptButton = this.page.locator('.cookie-consent-btn.cookie-selection__actions__all:not(.--secondary)');
    this.cartItemTitle = this.page.locator('.cart-item-info-title');
    this.cartItemDetails = this.page.locator('.cart-item-info > .info-row > .info-row-label')
    this.cartItemPrice = this.page.locator('.cart-item-total > .info-row > .info-row-price > .total-price')
    this.matteFinishOption = this.page.locator('#glossySelectedOptionNo');
    this.totalPrice = this.page.locator('.price-row > .price-value');
    this.continueButton = this.page.locator('#AddToCartButton');
  };

  async dismissCookieModal() {
    await this.cookieAcceptButton.click();
    await this.cookieAcceptButton.waitFor({ state: "hidden" });
  };

  async selectMatteFinish() {
    await this.matteFinishOption.click();
  };
}
