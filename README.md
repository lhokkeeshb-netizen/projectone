# projectone

This repository contains a TypeScript end-to-end test suite built with Playwright Test. The tests target the OrangeHRM demo application.

This document describes only the files, configuration, and implemented scenarios currently present in the repository.

## Current repository structure

```text
.
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
├── node_modules/              # Present in the workspace
├── playwright-report/         # Present generated report output
├── storage-state/
│   └── admin.json
├── test-results/              # Present generated test-result directory
├── tests/
│   ├── adminPage.spec.ts
│   ├── auth.setup.ts
│   ├── dashboardPage.spec.ts
│   └── loginPage.spec.ts
└── src/
    ├── api/                   # Empty
    ├── components/            # Empty
    ├── config/                # Empty
    ├── fixtures/
    │   └── page.fixtures.ts
    ├── logging/               # Empty
    ├── pages/
    │   ├── adminPage.ts
    │   ├── basePage.ts
    │   ├── dashboardPage.ts
    │   └── loginPage.ts
    ├── reporting/             # Empty
    ├── test-data/
    │   ├── adminData.ts
    │   ├── dashboardData.ts
    │   ├── data.ts
    │   └── index.ts
    └── utils/
        └── helper.ts          # Empty
```

The workspace also contains a `.git/` directory. The contents of `.git/` and `node_modules/` are not documented here.

## Dependencies

The declared dependencies in `package.json` are:

- `dotenv` `^17.4.2`

The declared development dependencies are:

- `@playwright/test` `^1.60.0`
- `@types/node` `^25.9.4`
- `typescript` `^6.0.3`

The `scripts` object in `package.json` is currently empty. Commands therefore need to be run through `npx` or another npm-compatible command directly.

## Environment variables

The root `.env` file exists and contains non-empty values for:

- `BASE_URL`
- `USERID`
- `PASSWORD`

Credential values are not documented here. `.env` is listed in `.gitignore`.

`playwright.config.ts` loads the root `.env` file with `dotenv`. The active code uses:

- `BASE_URL` as Playwright's `baseURL`
- `USERID` as the login username
- `PASSWORD` as the login password
- `CI` to control retries, workers, and `forbidOnly`

## Playwright configuration

The active configuration in `playwright.config.ts` has the following settings:

- Test directory: `./tests`
- `fullyParallel: false`
- `headless: false`
- List and HTML reporters
- Trace: `on-first-retry`
- Screenshots: `only-on-failure`
- Video: `retain-on-failure`
- Two retries in CI and no retries otherwise
- One worker in CI; the Playwright default outside CI
- `forbidOnly` enabled when `CI` is set

The configured projects are:

### `setup`

Matches `auth.setup.ts`.

### `login`

Matches `loginPage.spec.ts` and uses the Desktop Chrome device descriptor.

### `authenticated`

Excludes `auth.setup.ts` and `loginPage.spec.ts`, uses the Desktop Chrome device descriptor and `storage-state/admin.json`, and depends on the `setup` project.

No Firefox, WebKit, mobile, Edge, or branded Google Chrome project is active. No `webServer` is configured.

The configuration contains a `shouldRunSetup()` function that checks whether `storage-state/admin.json` is missing or older than 60 minutes. Its result is assigned to `runSetup`, but `runSetup` is not used to alter project execution. Consequently, the setup project remains configured to run when selected, regardless of that check.

## Authentication setup

`tests/auth.setup.ts`:

1. Opens `/`.
2. Logs in with `USERID` and `PASSWORD` through `loginCreds`.
3. Verifies the dashboard URL.
4. Saves browser storage state to `storage-state/admin.json`.

The `storage-state/admin.json` file is present in the workspace. Its contents are not documented because it contains authenticated browser state.

## Implemented page objects

### `BasePage`

Provides:

- A shared Playwright `Page`
- Side-navigation and header locators
- A fixed five-second wait method
- Side-navigation navigation
- Header verification

### `LoginPage`

Provides locators for the company branding, username, password, and submit button. It can navigate to `/` and submit supplied credentials.

### `DashboardPage`

Provides a locator for dashboard widgets by displayed card name. It has no additional methods.

### `AdminPage`

Provides locators and actions for:

- User role and status dropdowns
- Employee name
- Username
- Password and confirmation password
- Add, Save, and Search buttons
- A matching user row

It can create an administrator user and search for a username.

## Test scenarios

### Login tests

`tests/loginPage.spec.ts` contains five tests covering:

- Login URL and visible branding and fields
- Required-field styling after submitting empty fields
- Removal of the red border after fields are filled
- Invalid username and password combinations
- Successful login and dashboard URL verification

### Dashboard tests

`tests/dashboardPage.spec.ts` contains two tests covering:

- Dashboard navigation and header verification
- Visibility of these seven dashboard widgets:
  - Time at Work
  - Buzz Latest Posts
  - Employee Distribution by Sub Unit
  - Employees on Leave Today
  - My Actions
  - Quick Launch
  - Employee Distribution by Location

Each dashboard test opens `/`, uses the page object's fixed five-second wait, and waits for `domcontentloaded`.

### Admin tests

`tests/adminPage.spec.ts` contains two tests covering:

- Navigation to Admin and Admin header verification
- Creation of a generated administrator user, search by username, and visibility of the matching row

The generated user uses:

- Role: `Admin`
- Status: `Enabled`
- Employee: `Paul Collings`
- Username and password values derived from `Date.now()`

The admin test does not delete the created user.

## Test data

The `src/test-data/` directory contains:

- `data.ts`: fixed OrangeHRM login and dashboard URLs, environment-based credentials, side-navigation labels, and header titles
- `dashboardData.ts`: the seven dashboard card names
- `adminData.ts`: admin roles, statuses, the `AdminUser` type, and generated admin-user data
- `index.ts`: exports for the test-data modules

## TypeScript configuration

`tsconfig.json` currently specifies:

- Target: `ES2022`
- Module: `NodeNext`
- Module resolution: `NodeNext`
- Strict type checking
- Node and Playwright types
- `esModuleInterop: true`
- `resolveJsonModule: true`
- `skipLibCheck: true`
- `forceConsistentCasingInFileNames: true`
- `noEmit: true`
- Include: `**/*.ts`
- Exclude: `node_modules`

## Running the tests

There are no npm scripts currently defined. After dependencies and Playwright browsers are available, the configured test runner can be invoked with commands such as:

```text
npx playwright test
npx playwright test tests/loginPage.spec.ts
npx playwright test tests/dashboardPage.spec.ts
npx playwright test tests/adminPage.spec.ts
npx playwright test tests/auth.setup.ts --project=setup
npx playwright show-report
```

These commands are documented as direct Playwright invocations; this README does not claim a current pass/fail result for the suite.

## Generated files and ignored paths

`.gitignore` lists these paths or patterns:

- `node_modules/`
- `test-results/`
- `playwright-report/`
- `blob-report/`
- `playwright/.cache/`
- `playwright/.auth/`
- `.env`

`playwright-report/` and `test-results/` are currently present in the workspace. The existing report contains a previous failed Admin test record, but it does not establish the result of a new test run.

## Current unimplemented areas

The following directories currently exist but are empty:

- `src/api/`
- `src/components/`
- `src/config/`
- `src/logging/`
- `src/reporting/`

`src/utils/helper.ts` also exists and is empty.
