import { BasePage } from "./page";

export class HomePage extends BasePage {
  get toDoBtn() {
    return this.page.locator(`#b2-link_ToDo`);
  }

  get feedBackMessage() {
    return this.page.locator(`[class*=feedback-message-text]`);
  }

  get welcomeUserName() {
    return this.page.locator(`[class=content-name] span`);
  }

  get userDropDownBtn() {
    return this.page.locator(`#b1-b3-b3-SubMenuHeader`);
  }

  get userDropDown() {
    return this.page.locator(`#b1-b3-b3-Items`);
  }

  get userDropDownItems() {
    return this.page.locator(`#b1-b3-b3-Items a`);
  }

  async clickOnToDoBtn() {
    await this.page.waitForTimeout(500);
    await super.clickElement(this.toDoBtn);
  }

  async getTextFeedBackMessage() {
    return await super.getElementText(this.feedBackMessage);
  }

  async getTextWelcomeUserName() {
    return await super.getElementText(this.welcomeUserName);
  }

  async clickUserDropDownItem(i: number = 0) {
    await super.clickElement(this.userDropDownItems.nth(i));
  }

  async getAllUserDropDownItems() {
    return await super.getAllElements(this.userDropDownItems);
  }

  async getTextUsersDropDownItems(i: number = 0) {
    return await super.getElementText(this.userDropDownItems.nth(i));
  }

  async clickUserDropDownBtn() {
    await super.clickElement(this.userDropDownBtn);
    await this.page.waitForTimeout(500);
  }
}
