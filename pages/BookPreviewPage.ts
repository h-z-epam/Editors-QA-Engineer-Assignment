import { Page, Locator } from "@playwright/test";

export class BookPreviewPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly header: Locator;
  readonly addToBasketButton: Locator;
  readonly undoButton: Locator;
  readonly redoButton: Locator;
  readonly bookCover: Locator;
  readonly pages: Locator;
  readonly titleModalInput: Locator
  readonly titleModalConfirmButton: Locator
  readonly titleModalConfirmButtonDisabled: Locator
  readonly loader: Locator;

  constructor(p: Page) {
    this.page = p;
    this.productTitle = this.page.locator('.product-info__title');
    this.productPrice = this.page.locator('.product-info__actual-price')
    this.header = this.page.locator('.page-header__title')
    this.addToBasketButton = this.page.locator('[data-tam="add-to-basket"]')
    this.undoButton = this.page.locator('[data-testid="undo-button"]')
    this.redoButton = this.page.locator('[data-testid="redo-button"]')
    this.bookCover = this.page.locator('.book-cover');
    this.pages = this.page.locator('.print-surface-views-container');
    this.titleModalInput = this.page.locator('[placeholder="Enter a title"]');
    this.titleModalConfirmButton = this.page.locator('[data-tam="confirm-cover-edit"]');
    this.titleModalConfirmButtonDisabled = this.page.locator('[data-tam="confirm-cover-edit"].--disabled')
    this.loader = this.page.locator('[data-testid="loading"]');
  };

  async waitForBookTitleModalOpen() {
    await this.titleModalInput.waitFor({ state: "visible" });
    await this.titleModalConfirmButton.waitFor({ state: "visible" });
  };

  async fillTitleModalNameInput(name) {
    await this.titleModalInput.type(name);
    await this.titleModalConfirmButtonDisabled.waitFor({ state: "visible" });
    await this.titleModalConfirmButtonDisabled.waitFor({ state: "hidden" });
  };

  async addToBasket() {
    await this.addToBasketButton.click();
    await this.loader.waitFor({ state: "visible" });
    await this.loader.waitFor({ state: "hidden" });
  }

};
