import { test } from "../fixtures/fixtures";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
});

test.describe("Tests for Skillibrium Learn", () => {
  test("Login test", async ({ emailPage, loginPage, mailAPI, mainPage }) => {
    await loginPage.fillEmailInput(process.env.USER_EMAIL!);
    await loginPage.clickOnSendMagicLinkBtn();

    const html = await mailAPI.getMsgHtmlBodyBySubject(
      process.env.USER_EMAIL!,
      "Confirmation email for",
      { attemptTimeout: 10000 }
    );
    await mainPage.openHTML(html.replaceAll('target="_blank"', ""), {
      htmlTitle: '"Confirmation email for" email message',
    });

    await test.step('Click the "Confirm my account" button', async () => {
      await emailPage.clickBtnConfirmMyAccount();
    });
  });
});
