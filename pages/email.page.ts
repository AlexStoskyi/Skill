import { BasePage } from "./page";

export class EmailPage extends BasePage {
  get btnLoginTo() {
    return this.page.locator(`a[enabled="true"] `).first();
  }

  async clickBtnLoginTo() {
    await super.clickElement(this.btnLoginTo);
  }
}
