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
  test("Edit the user profile", async ({
    myProfilePage,
    homePage,
    baseURL,
    randomHelper,
  }) => {
    await test.step("Open my profile page", async () => {
      await homePage.clickUserDropDownBtn();
      await expect(await homePage.userDropDown).toBeVisible();
      await homePage.clickUserDropDownItem(2);
    });

    await myProfilePage.clearUserFields();

    await test.step("Fill user fields", async () => {
      const randomName = await randomHelper.generateRandomName();
      await myProfilePage.fillUserData(
        randomName,
        randomHelper.generateLastName()
      );

      await expect(await homePage.page).toHaveURL(`${baseURL!}` + "/Home");
      await expect(homePage.welcomeUserName).toHaveText(randomName);
      await expect(homePage.feedBackMessage).toHaveText(
        RegExp(successMsg.save)
      );
    });
  });
});
