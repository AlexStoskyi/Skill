import { BasePage } from "./page";

export class LoginPage extends BasePage {
  get emailInputField() {
    return this.page.locator(`[class*=form-control]`);
  }

  get magicLinkBtn() {
    return this.page.locator(`[class*=btn-primary]`);
  }

  async clickOnSendMagicLinkBtn() {
    await super.clickElement(this.magicLinkBtn);
  }

  async fillEmailInput(data: string) {
    await super.fillData(this.emailInputField, data);
  }
}
