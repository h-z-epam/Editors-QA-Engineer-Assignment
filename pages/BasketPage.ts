import { Locator, Page } from "@playwright/test";

export class BasketPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly cartItemDetails: Locator;
  readonly cartItemPrice: Locator;
  readonly totalPrice: Locator;
  readonly subtotal: Locator;
  readonly shipping: Locator;
  readonly totalCosts: Locator;

  constructor(p: Page) {
    this.page = p;
    this.productTitle = this.page.locator(".productTitle");
    this.cartItemDetails = this.page.locator(".cart-item-info > .PriceLineProduct > .info-row-label");
    this.cartItemPrice = this.page.locator(".cart-item-info > .PriceLineProduct > .info-row-price");
    this.totalPrice = this.page.locator(".cart-item-total > .info-row > .info-row-price > .total-price");
    this.subtotal = this.page.locator("#subTotal")
    this.shipping = this.page.locator("#shippingCosts");
    this.totalCosts = this.page.locator("#totalCosts")
  }
}
