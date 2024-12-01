import { EmailPage } from "../pages/email.page";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { test as base, APIRequestContext } from "@playwright/test";
import MailsacAPI from "../api/mailsac/mailsac.api";
import { BasePage } from "../pages/page";
import { MyProfilePage } from "../pages/myProfile.page";
import { RandomHelper } from "../helper/random.helper";
import { ToDoPage } from "../pages/toDo.page";

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
  randomHelper: RandomHelper;
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

  randomHelper: async ({}, use) => {
    await use(new RandomHelper());
  },

  mailAPI: async ({ request }, use) => {
    await use(new MailsacAPI(request));
  },
});
