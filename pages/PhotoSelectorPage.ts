import { writeFile, mkdir } from "fs/promises";
import type { Locator, Page } from "@playwright/test";
import { toPng } from "jdenticon";

export class PhotoSelectorPage {
  readonly page: Page;
  readonly browsePhotosInput: Locator;
  readonly uploadStatsText: Locator;
  readonly addPhotosButton: Locator;
  readonly generateBookAnimation: Locator;
  readonly previewBook: Locator;

  constructor(private p: Page) {
    this.page = p;
    this.browsePhotosInput = this.page.locator("[data-tam=browse-photos]");
    this.uploadStatsText = this.page.locator("[data-tam=upload-stats]");
    this.addPhotosButton = this.page.locator("[data-tam=add-photos-button]");
    this.generateBookAnimation = this.page.locator('.generate-book-animation');
    this.previewBook = this.page.locator('[data-tam="preview-book"]');
  }

  /**
   * Create and upload a certain amount of PNG photos.
   * @param amount
   */
  async createAndUploadRandomPhotos(amount = 24, resolution = 2000): Promise<number> {
    const path = `./node_modules/.temp/${String(Math.random()).slice(2)}/`;
    await mkdir(path, { recursive: true });
    const images = await Promise.all(
      // Generate PNG images.
      new Array(amount).fill(0).map(async () => {
        const file = `${path}/${String(Math.random()).slice(2)}.png`;
        const png = toPng(file, resolution);
        await writeFile(file, png);
        return file;
      })
    );
    // Set the photos as input to the test.
    await this.browsePhotosInput.setInputFiles(images);
    return images.length;
  }

  async waitForUploadsComplete(): Promise<void> {
    await this.uploadStatsText.waitFor({ state: "visible" });
    await this.uploadStatsText.waitFor({ state: "detached" });
  }
  async waitForGenerationComplete(): Promise<void> {
    await this.generateBookAnimation.waitFor({ state: "visible" });
    await this.generateBookAnimation.waitFor({ state: "hidden" });
    await this.previewBook.waitFor({ state: "visible" });
  }

  async clickOnUsePhotos(): Promise<void> {
    await this.addPhotosButton.click();
  }
}
