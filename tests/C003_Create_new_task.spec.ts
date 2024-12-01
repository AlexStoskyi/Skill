import { expect, test } from "../fixtures/fixtures";
import successMsg from "../constants/successMsg.json";

test.describe("Tests for Skillibrium Learn", () => {
  test.beforeEach(async ({ request, loginPage }) => {
    await loginPage.login(process.env.THIRD_USER_EMAIL!, request);
  });

  test("Create new task", async ({ homePage, randomHelper, toDoPage }) => {
    await test.step("Open To Do page", async () => {
      await homePage.clickOnToDoBtn();
      await expect(toDoPage.pageTitle).toHaveText(RegExp(successMsg.toDo));
    });

    const fakeTaskName = randomHelper.generateRandomName();
    await test.step("Fill new task form", async () => {
      await toDoPage.clickOnNewBtn();
      for (let i = 0; i < 2; i++) {
        await expect(toDoPage.newDropDown.nth(i)).toBeVisible();
      }

      await toDoPage.clickOnNewDropDownItem(0);
      await expect(toDoPage.newTaskForm).toBeVisible();
      await expect(toDoPage.newTaskFormTitle).toHaveText(
        RegExp(successMsg.newTaskTitle)
      );

      await toDoPage.fillTaskName(fakeTaskName);
      await toDoPage.clickOnAssignedToField();
      await toDoPage.clickOnAssignedToItems(0);
      await toDoPage.clickOnDueDataField();
      await toDoPage.chooseDueData(10);
      await toDoPage.fillMinuteDuration("1");
      await toDoPage.clickOnCreateTaskBtn();
    });

    await test.step("Verify that the test is created", async () => {
      await expect(homePage.feedBackMessage).toHaveText(RegExp(fakeTaskName), {
        useInnerText: true,
      });
    });
  });
});
