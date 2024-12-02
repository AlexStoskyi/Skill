# Skillibrium

## Tech stack

- [NodeJS](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/)

## Install

Before working with this framework, complete the following steps:

- Clone this repo:

```bash
git clone https://github.com/AlexStoskyi/Skill
```

- Install dependencies:

```bash
npm i
```

- Install playwright browsers:

```bash
npm playwright install
```

- Copy the `.env.example` file and rename it to `.env`. Please note that in a real project, the `.env.example` file will not have filled values, you will have to fill them in yourself.

## Steps to run

To run all tests use the following commands:

- In headless mode (without showing the browser):

```bash
npm run test
```

- In headed mode (with showing the browser):

```bash
npm run test:headed
```

- In UI mode (interactive interface for selecting and running tests):

```bash
npm run test:ui
```

## Reports

### Locally

When the tests are completed, an HTML report is generated. To open it, run the following command:

```bash
npm run report:html:show
```

### CI

When running the `playwright.yml` workflow, the HTML report is deployed to the `reports` branch. The GitHub Pages feature is enabled in this branch, and you can view the deployed report by following this [link](https://alexstoskyi.github.io/Skill/).

## GitHub Actions

In this reposetori, we use GitHub Actions to run all the tests and then deploy the report in the `gh-pages` branch.

## Features

- Flexible Tech Stack: TypeScript and Playwright provide a modern approach to test automation.
- Automatic Report Deployment: Playwright reports are easily accessible through CI/CD integration.
- Simple Test Execution: Clearly structured commands for both headless and headed modes.

#### If you have any questions or suggestions, feel free to create new Issues in the repository. Happy testing! 🚀
