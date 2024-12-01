import { expect, test } from "../fixtures/fixtures";
import successMsg from "../constants/successMsg.json";

test.beforeEach(
  async ({ page, baseURL, loginPage, mailAPI, basePage, emailPage }) => {
    const userEmail = process.env.USER_EMAIL!;

    await page.goto(`${baseURL!}` + "/Login");

    await loginPage.fillEmailInput(userEmail);
    await loginPage.clickOnSendMagicLinkBtn();

    const html = await mailAPI.getMsgHtmlBodyBySubject(
      userEmail,
      `Confirmation email for ${userEmail}`,
      { attemptTimeout: 10000 }
    );

    await basePage.openHTML(html.replaceAll('target="_blank"', ""), {
      htmlTitle: `Confirmation email for ${userEmail}`,
    });

    await emailPage.clickBtnLoginTo();
  }
);

test.describe("Tests for Skillibrium Learn", () => {
  test("Create new task", async ({ homePage, randomHelper, toDoPage }) => {
    await test.step("Open To Do page", async () => {
      await homePage.clickOnToDoBtn();
      await expect(await toDoPage.getPageTitleText()).toContain(
        successMsg.toDo
      );
    });

    await test.step("Fill new task form", async () => {
      await toDoPage.clickOnNewBtn();
      for (let i = 0; i < 2; i++) {
        await expect(toDoPage.newDropDown.nth(i)).toBeVisible();
      }

      await toDoPage.clickOnNewDropDownItem(0);
      await expect(await toDoPage.newTaskForm).toBeVisible();
      await expect(await toDoPage.getTextNewTaskFormTitle()).toContain(
        successMsg.newTaskTitle
      );

      const fakeTaskName = await randomHelper.generateRandomName();
      await toDoPage.fillTaskName(fakeTaskName);
      await toDoPage.clickOnAssignedToField();
      await toDoPage.clickOnAssignedToItems(0);
      await toDoPage.clickOnDueDataField();
      await toDoPage.chooseDueData(10);
      await toDoPage.fillMinuteDuration("1");
      await toDoPage.clickOnCreateTaskBtn();

      function replaceTemplate(template, variables) {
        return template.replace(
          /\$\{(\w+)\}/g,
          (_, key) => variables[key] || ""
        );
      }

      const template = successMsg.newTaskSuccess;
      const variables = { name: fakeTaskName };
      await expect(await homePage.getTextFeedBackMessage()).toContain(
        replaceTemplate(template, variables)
      );
    });
  });
});
