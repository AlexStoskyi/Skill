import { BasePage } from "./page";

export class LoginPage extends BasePage {
  get emailInputField() {
    return this.page.locator(`[class*=form-control]`);
  }

  get magicLinkBtn() {
    return this.page.locator(`[class*=btn-primary]`);
  }

  get successPopUp() {
    return this.page.locator(`[id*=b7-Container]`);
  }

  async clickOnSendMagicLinkBtn() {
    await super.clickElement(this.magicLinkBtn);
    await super.waitForElement(this.successPopUp);
  }

  async fillEmailInput(data: string) {
    await super.fillData(this.emailInputField, data);
  }
}
