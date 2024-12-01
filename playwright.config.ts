import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export const ROOT_FOLDER = __dirname;

export default defineConfig({
  expect: {
    timeout: 10000,
  },
  timeout: 60000,
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 5 : undefined,
  reporter: [
    [
      "html",
      { open: "never", outputFolder: path.join(ROOT_FOLDER, "reports/html") },
    ],
    [process.env.CI ? "dot" : "list"],
  ],
  use: {
    baseURL: process.env.BASE_URL!,
    screenshot: process.env.CI ? "only-on-failure" : "on",
    video: process.env.CI ? "retain-on-failure" : "on",
    trace: process.env.CI ? "on-first-retry" : "on",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
