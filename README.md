# gravana-e2e-tests

## Brief introduction

This application uses Playwright.ts as both a test runner, and framework, and node.js as a runtime environment.

We make use of TypeScript, and follow the strict type declarations, no .js files should appear in this repository as .js is disabled.

### Requirements

To run the application on your pc, please ensure you have the following:

Node.JS >v22.0.0

### Running the application on local environment

Please install the dependencies with the following cmd:

`yarn install`

You will also need to edit the config.ts file to add your HMCTS email and password, it is recommended not to commit this. Once the test has commenced, you will need to enter your SSO code to your authenticator.

### Running the application locally.

Run the following command:
`yarn test`
Or run (for UI mode):
`yarn test:ui`
