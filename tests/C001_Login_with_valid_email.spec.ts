import { expect, test } from "../fixtures/fixtures";
import endpoint from "../constants/endpoints.constants.json";

test.describe("Tests for Skillibrium Learn", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test("Login", async ({
    homePage,
    baseURL,
    loginPage,
    mailAPI,
    basePage,
    emailPage,
  }) => {
    const userEmail = process.env.FIRST_USER_EMAIL!;

    await test.step("Login with valid email", async () => {
      await loginPage.fillEmailInput(userEmail);
      await loginPage.clickOnSendMagicLinkBtn();

      await expect(loginPage.successPopUp).toBeVisible();

      const html = await mailAPI.getMsgHtmlBodyBySubject(
        userEmail,
        `Confirmation email for ${userEmail}`,
        { attemptTimeout: 10000 }
      );

      await basePage.openHTML(html.replaceAll('target="_blank"', ""), {
        htmlTitle: `Confirmation email for ${userEmail}`,
      });
    });

    await test.step('Click the "Login to Skillibrium" button', async () => {
      await emailPage.clickBtnLoginTo();
    });

    await test.step("Verify that the user is logged in", async () => {
      await expect(homePage.userDropDownBtn).toBeVisible();
      await expect(homePage.page).toHaveURL(`${baseURL}/${endpoint.home}`);
    });
  });
});
