import { test, expect } from "../setup";

const BOOK_NAME = 'A';
const BOOK_PRICE = '£ 23.49';
const BOOK_DETAILS_LONG = "Square M 14x14 cm, 24 pages"
const BOOK_DETAILS_SHORT = "Square M 14x14 cm";
const DELIVERY_COST = "£ 5.49"
const TOTAL_COST = "£ 28.98"
test.describe("Photobook", () => {
  test("happy path", async ({ page, getInstantEditorUrl, photoSelectorPage, bookPreviewPage, productConfigPage, basketPage }) => {
    await test.step("open photobook", async () => {
      const editorUrl = getInstantEditorUrl("bonusprint.co.uk", "HardCoverPhotoBook", "PAP_360");
      await page.goto(editorUrl);
    });

    await test.step("upload photos", async () => {
      await photoSelectorPage.createAndUploadRandomPhotos(24);
      await photoSelectorPage.waitForUploadsComplete();
      await photoSelectorPage.clickOnUsePhotos();
    });

    await test.step("create book", async () => {
      await photoSelectorPage.clickOnUsePhotos();
      await photoSelectorPage.waitForGenerationComplete();

      await expect(bookPreviewPage.header).toHaveText("Your photo book is ready");
      await expect(bookPreviewPage.productTitle).toHaveText(BOOK_DETAILS_LONG);
      await expect(bookPreviewPage.productPrice).toHaveText(BOOK_PRICE);
      await expect(bookPreviewPage.addToBasketButton).toBeVisible;
      await expect(bookPreviewPage.undoButton).toBeVisible;
      await expect(bookPreviewPage.redoButton).toBeVisible;
      await expect(bookPreviewPage.bookCover).toBeVisible;
      await expect(bookPreviewPage.pages).toBeVisible;
    });
    await test.step("add book name", async () => {
      await bookPreviewPage.addToBasketButton.click();
      await bookPreviewPage.waitForBookTitleModalOpen()
      await bookPreviewPage.fillTitleModalNameInput(BOOK_NAME);
      await bookPreviewPage.titleModalConfirmButton.click();
    });
    await test.step("add book to basket", async () => {
      await bookPreviewPage.addToBasket();

      await expect(productConfigPage.cartItemTitle).toHaveText(BOOK_NAME);
      await expect(productConfigPage.cartItemDetails).toHaveText(BOOK_DETAILS_SHORT);
      await expect(productConfigPage.cartItemPrice).toHaveText(BOOK_PRICE);
    });
    await test.step("select matte finish", async () => {

      await productConfigPage.dismissCookieModal();
      await productConfigPage.selectMatteFinish();
      await expect(productConfigPage.totalPrice).toHaveText(BOOK_PRICE);
    });

    await test.step("proceed to cart", async () => {
      await productConfigPage.continueButton.click();

      await expect(basketPage.productTitle).toHaveText(BOOK_NAME);
      await expect(basketPage.cartItemDetails).toHaveText(BOOK_DETAILS_SHORT);
      await expect(basketPage.cartItemPrice).toHaveText(BOOK_PRICE);
      await expect(basketPage.totalCosts).toHaveText(TOTAL_COST);
      await expect(basketPage.subtotal).toHaveText(BOOK_PRICE);
      await expect(basketPage.shipping).toHaveText(DELIVERY_COST);
      await expect(basketPage.totalCosts).toHaveText(TOTAL_COST);
    })
  });
});
