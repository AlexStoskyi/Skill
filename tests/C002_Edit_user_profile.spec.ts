import { expect, test } from "../fixtures/fixtures";
import successMsg from "../constants/successMsg.json";
import endpoint from "../constants/endpoints.constants.json";

test.describe("Tests for Skillibrium Learn", () => {
  test.beforeEach(async ({ request, loginPage }) => {
    await loginPage.login(process.env.USER_EMAIL!, request);
  });

  test("Edit the user profile", async ({
    myProfilePage,
    homePage,
    baseURL,
    randomHelper,
  }) => {
    await test.step("Open my profile page", async () => {
      await homePage.clickUserDropDownBtn();
      await expect(homePage.userDropDown).toBeVisible();
      await homePage.clickUserDropDownItem(2);
    });

    await myProfilePage.clearUserFields();

    await test.step("Fill user fields", async () => {
      const randomName = randomHelper.generateRandomName();
      await myProfilePage.fillUserData(
        randomName,
        randomHelper.generateLastName()
      );

      await expect(await homePage.page).toHaveURL(
        `${baseURL}/${endpoint.home}`
      );
      await expect(homePage.welcomeUserName).toHaveText(randomName);
      await expect(homePage.feedBackMessage).toHaveText(
        RegExp(successMsg.save)
      );
    });
  });
});
