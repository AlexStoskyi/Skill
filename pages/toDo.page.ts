import { BasePage } from "./page";

export class ToDoPage extends BasePage {
  get createTaskBtn() {
    return this.page.locator(`#b29-b25-Button`);
  }

  get minuteInput() {
    return this.page.locator(`#b29-b21-InputMinute`);
  }

  get dueDataList() {
    return this.page.locator(
      `[id*="flatpickr-calendar"].open span.flatpickr-day:not([class*="nextMonthDay"]):not([class*="prevMonthDay"])`
    );
  }

  get dueDataField() {
    return this.page.locator(`#b29-b13-Input`);
  }

  get assignedToItems() {
    return this.page.locator(
      `.vscomp-dropbox-wrapper.focused div [role="option"]`
    );
  }

  get assignedToField() {
    return this.page.locator(`[id=b28-Content] [id=b29-b7-DropdownTags]`);
  }

  get taskNameInput() {
    return this.page.locator(`#b29-Input_Name`);
  }

  get newTaskFormTitle() {
    return this.page.locator(`[class*=font-size-xl] span`);
  }

  get newTaskForm() {
    return this.page.locator(`#b28-Content`);
  }

  get newDropDown() {
    return this.page.locator(`#b5-Content button`);
  }

  get newBtn() {
    return this.page.locator(`[class=text-align-right] [class*=btn-primary]`);
  }

  get pageTitle() {
    return this.page.locator(`#b1-Title`);
  }

  async clickOnCreateTaskBtn() {
    await super.clickElement(this.createTaskBtn);
  }

  async fillMinuteDuration(i: string) {
    await super.fillData(this.minuteInput, i);
  }

  async chooseDueData(i = 0) {
    await super.waitForElement(this.dueDataList.nth(i));
    await this.dueDataList.nth(i).click({ force: true });
  }

  async clickOnDueDataField() {
    await super.clickElement(this.dueDataField);
  }

  async clickOnAssignedToItems(i = 0) {
    await super.clickElement(this.assignedToItems.nth(i));
  }

  async clickOnAssignedToField() {
    await super.clickElement(this.assignedToField);
  }

  async fillTaskName(text: string) {
    await super.fillData(this.taskNameInput, text);
  }

  async clickOnNewDropDownItem(i = 0) {
    await super.clickElement(this.newDropDown.nth(i));
    await super.waitForElement(this.newTaskFormTitle);
  }

  async clickOnNewBtn() {
    await super.clickElement(this.newBtn);
  }
}
