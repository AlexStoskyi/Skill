import { BasePage } from "./page";

export class EmailPage extends BasePage {
  get btnConfirmMyAccount() {
    return this.page.locator(`div a img`);
  }

  async clickBtnConfirmMyAccount() {
    await super.clickElement(this.btnConfirmMyAccount);
  }
}
