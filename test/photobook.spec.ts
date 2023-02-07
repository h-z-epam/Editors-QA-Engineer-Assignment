import { test, expect } from "../setup";
import { PhotoSelectorPage } from "../pages/PhotoSelectorPage";
import { BookPreviewPage } from "../pages/BookPreviewPage";
import { ProductConfigPage } from "../pages/ProductConfigPage";
import { BasketPage } from "../pages/BasketPage";

const BOOK_NAME = 'A';
const BOOK_PRICE = '£ 23.49';
const BOOK_DETAILS_LONG = "Square M 14x14 cm, 24 pages"
const BOOK_DETAILS_SHORT = "Square M 14x14 cm";
const DELIVERY_COST = "£ 5.49"
const TOTAL_COST = "£ 28.98"
test.describe("Photobook", () => {
  test("happy path", async ({ page, getInstantEditorUrl }) => {
    await test.step("open photobook", async () => {
      const editorUrl = getInstantEditorUrl("bonusprint.co.uk", "HardCoverPhotoBook", "PAP_360");
      await page.goto(editorUrl);
    });

    await test.step("upload photos", async () => {
      const photoSelector = new PhotoSelectorPage(page);
      await photoSelector.createAndUploadRandomPhotos(24);
      await photoSelector.waitForUploadsComplete();
      await photoSelector.clickOnUsePhotos();
    });

    await test.step("create book", async () => {
      const photoSelector = new PhotoSelectorPage(page);
      const bookPreviewPage = new BookPreviewPage(page);

      await photoSelector.clickOnUsePhotos();
      await photoSelector.waitForGenerationComplete();

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
      const bookPreviewPage = new BookPreviewPage(page);
      await bookPreviewPage.addToBasketButton.click();
      await bookPreviewPage.waitForBookTitleModalOpen()
      await bookPreviewPage.fillTitleModalNameInput(BOOK_NAME);
      await bookPreviewPage.titleModalConfirmButton.click();
    });
    await test.step("add book to basket", async () => {
      const bookPreviewPage = new BookPreviewPage(page);
      await bookPreviewPage.addToBasket();

      const productConfigPage = new ProductConfigPage(page);
      productConfigPage.dismissCookieModal();

      await expect(productConfigPage.cartItemTitle).toHaveText(BOOK_NAME);
      await expect(productConfigPage.cartItemDetails).toHaveText(BOOK_DETAILS_SHORT);
      await expect(productConfigPage.cartItemPrice).toHaveText(BOOK_PRICE);
    });
    await test.step("select matte finish", async () => {
      const productConfigPage = new ProductConfigPage(page);

      productConfigPage.dismissCookieModal();
      await productConfigPage.selectMatteFinish();
      await expect(productConfigPage.totalPrice).toHaveText(BOOK_PRICE);
    });

    await test.step("proceed to cart", async () => {
      const productConfigPage = new ProductConfigPage(page);
      await productConfigPage.continueButton.click();
      const basketPage = new BasketPage(page);

      await page.pause();
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
