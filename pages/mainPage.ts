import test from "@playwright/test";
import { BasePage } from "./page";

export class MainPage extends BasePage {
  /**
   * Open HTML.
   *
   * @param html - HTML.
   * @param options - options.
   */
  async openHTML(
    html: string,
    options?: { htmlTitle?: string }
  ): Promise<void> {
    const { htmlTitle = "HTML" } = options ?? {};
    await test.step(`Open the ${htmlTitle}`, async () => {
      await this.page.evaluate((html) => {
        const newDoc = document.open("text/html", "replace");
        newDoc.write(html);
        newDoc.close();
      }, html);
    });
  }
}
