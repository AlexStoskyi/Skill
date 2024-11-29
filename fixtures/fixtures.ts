import { EmailPage } from "../pages/emailPage";
import { LoginPage } from "../pages/loginPage";
import { MainPage } from "../pages/mainPage";
import { test as base, APIRequestContext } from "@playwright/test";
import mailAPI from "../api/mailsac/mailsac.api";

export {
  expect,
  type Page,
  type Download,
  type Locator,
  type TestInfo,
  type APIRequestContext,
  type APIResponse,
  defineConfig,
  type PlaywrightTestConfig,
  devices,
} from "@playwright/test";

export type MyFixtures = {
  mainPage: MainPage;
  emailPage: EmailPage;
  loginPage: LoginPage;
  mailAPI: typeof mailAPI;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  emailPage: async ({ page }, use) => {
    await use(new EmailPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  mailAPI: async ({}, use) => {
    await use(mailAPI);
  },
});
