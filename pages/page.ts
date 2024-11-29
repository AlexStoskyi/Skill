import {
  FileChooser,
  Locator,
  Page,
  Page as PlaywrightPage,
} from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url = "/"): Promise<void> {
    await this.page.goto(url);
  }

  async clickElement(element: Locator): Promise<void> {
    await element.click();
  }

  async clickElementAtCoordinates(
    page: Page,
    x: number,
    y: number
  ): Promise<void> {
    await page.mouse.click(x, y);
  }

  async waitForElement(
    element: Locator,
    state: "attached" | "visible" | "detached" = "visible",
    timeout: number = 5000
  ): Promise<void> {
    await element.waitFor({ state, timeout });
  }

  async setElementFiles(fileChooser: FileChooser, filePath: string) {
    await fileChooser.setFiles(filePath);
  }

  async fillData(element: Locator, data: string) {
    await element.fill(data);
  }

  protected getElement(selector: string, subSelector?: string): Locator {
    const element = this.page.locator(selector);
    return subSelector ? element.locator(subSelector) : element;
  }

  async getAllElements(locator: Locator) {
    return await locator.elementHandles();
  }

  async getElementText(element: Locator): Promise<string> {
    return await element.innerText();
  }

  async getElementCount(element: Locator): Promise<number> {
    return element.count();
  }
}
