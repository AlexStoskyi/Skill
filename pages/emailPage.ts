import { BasePage } from "./page";

export class EmailPage extends BasePage {
  get btnConfirmMyAccount() {
    return this.page.locator(`a[enabled="true"] `).first();
  }

  async clickBtnConfirmMyAccount() {
    await super.clickElement(this.btnConfirmMyAccount);
  }
}
