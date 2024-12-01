import { BasePage } from "./page";

export class MyProfilePage extends BasePage {
  get firstNameField() {
    return this.page.locator(`#Input_FirstName`);
  }

  get lastNameField() {
    return this.page.locator(`#Input_LastName`);
  }

  get saveBtn() {
    return this.page.locator(`[class*=osui-btn-loading] span`);
  }

  async clearUserFields() {
    await this.firstNameField.clear();
    await this.lastNameField.clear();
  }

  async fillUserData(firstName: string, lastName: string) {
    await this.fillData(this.firstNameField, firstName);
    await this.fillData(this.lastNameField, lastName);
    await this.clickElement(this.saveBtn);
  }
}
