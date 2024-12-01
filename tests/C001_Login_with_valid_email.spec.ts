import { expect, test } from "../fixtures/fixtures";
import successMsg from "../constants/successMsg.json";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL!}` + "/Login");
});

test.describe("Tests for Skillibrium Learn", () => {
  test("Edit the user profile", async ({
    homePage,
    baseURL,
    loginPage,
    mailAPI,
    basePage,
    emailPage,
  }) => {
    const userEmail = process.env.USER_EMAIL!;

    test.step("Login with valid email", async () => {
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
    });

    await expect(loginPage.successPopUp).toBeVisible();

    await test.step('Click the "Login to Skillibrium" button', async () => {
      await emailPage.clickBtnLoginTo();
      await expect(homePage.userDropDownBtn).toBeVisible();
      await expect(loginPage.page).toHaveURL(`${baseURL}` + "/Home");
    });
  });
});
