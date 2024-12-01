import { EmailPage } from "../pages/emailPage";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { test as base, APIRequestContext } from "@playwright/test";
import MailsacAPI from "../api/mailsac/mailsac.api";
import { BasePage } from "../pages/page";
import { MyProfilePage } from "../pages/myProfilePage";
import { TextHelper } from "../helper/testHelper";
import { ToDoPage } from "../pages/toDoPage";

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
  homePage: HomePage;
  emailPage: EmailPage;
  loginPage: LoginPage;
  mailAPI: MailsacAPI;
  basePage: BasePage;
  myProfilePage: MyProfilePage;
  textHelper: TextHelper;
  toDoPage: ToDoPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  emailPage: async ({ page }, use) => {
    await use(new EmailPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  myProfilePage: async ({ page }, use) => {
    await use(new MyProfilePage(page));
  },

  toDoPage: async ({ page }, use) => {
    await use(new ToDoPage(page));
  },

  textHelper: async ({}, use) => {
    await use(new TextHelper());
  },

  mailAPI: async ({ request }, use) => {
    const mailAPI = new MailsacAPI(request);
    await use(mailAPI);
  },
});
