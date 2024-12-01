import { expect, test } from "../fixtures/fixtures";
import endpoints from "../constants/endpoints.constants.json";
import successMsg from "../helper/successMsg.json";
import * as fs from "fs";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL!}` + "/Login");
});

async function login({
  loginPage,
  mailAPI,
  basePage,
  userEmail,
  emailPage,
}: {
  emailPage: any;
  loginPage: any;
  mailAPI: any;
  basePage: any;
  userEmail: string;
}) {
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

  await emailPage.clickBtnConfirmMyAccount();
}

test.describe("Tests for Skillibrium Learn", () => {
  test("Login test", async ({
    emailPage,
    loginPage,
    mailAPI,
    homePage,
    basePage,
    baseURL,
  }) => {
    await test.step("Login with valid email", async () => {
      await loginPage.fillEmailInput(process.env.USER_EMAIL!);
      await loginPage.clickOnSendMagicLinkBtn();
    });

    await expect(loginPage.successPopUp).toBeVisible();

    const html = await mailAPI.getMsgHtmlBodyBySubject(
      process.env.USER_EMAIL!,
      `Confirmation email for ${process.env.USER_EMAIL!}`,
      { attemptTimeout: 10000 }
    );
    await basePage.openHTML(html.replaceAll('target="_blank"', ""), {
      htmlTitle: `Confirmation email for ${process.env.USER_EMAIL!}`,
    });

    await test.step('Click the "Login to Skillibrium" button', async () => {
      await emailPage.clickBtnConfirmMyAccount();
      await expect(homePage.userDropDownBtn).toBeVisible();
      await expect(loginPage.page).toHaveURL(`${baseURL}` + "/Home");
    });
  });

  test("Edit the user profile", async ({
    myProfilePage,
    loginPage,
    mailAPI,
    homePage,
    basePage,
    baseURL,
    textHelper,
    emailPage,
  }) => {
    await test.step("Login with valid email", async () => {
      await login({
        loginPage,
        mailAPI,
        basePage,
        emailPage,
        userEmail: process.env.USER_EMAIL!,
      });
      await test.step("Open my profile page", async () => {
        await homePage.clickUserDropDownBtn();
        await expect(await homePage.userDropDown).toBeVisible();
        await homePage.clickUserDropDownItem(2);
      });

      await myProfilePage.clearUserFields();

      await test.step("Fill user fields", async () => {
        const randomName = await textHelper.generateRandomName();
        await myProfilePage.fillUserData(
          randomName,
          textHelper.generateLastName()
        );

        const expectUserName = await homePage.getTextWelcomeUserName();
        await expect(await homePage.page).toHaveURL(`${baseURL!}` + "/Home");
        await expect(await expectUserName).toContain(randomName);
        await expect(await homePage.getTextFeedBackMessage()).toContain(
          successMsg.save
        );
      });
    });
  });

  test("Create new task", async ({
    loginPage,
    mailAPI,
    homePage,
    basePage,
    baseURL,
    textHelper,
    emailPage,
    toDoPage,
  }) => {
    await test.step("Login with valid email", async () => {
      await login({
        loginPage,
        mailAPI,
        basePage,
        emailPage,
        userEmail: process.env.USER_EMAIL!,
      });
    });

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

      const fakeTaskName = await textHelper.generateRandomName();
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
