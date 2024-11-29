import { BasePage } from "./page";

export class EmailPage extends BasePage {
  get btnConfirmMyAccount() {
    return this.page.locator("");
  }

  async clickBtnConfirmMyAccount() {
    await super.clickElement(this.btnConfirmMyAccount);
  }
}
