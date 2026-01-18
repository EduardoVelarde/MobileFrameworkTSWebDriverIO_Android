import type { Options } from "@wdio/types";
import path from 'path';
import fs from 'fs';

const appPath = path.join(process.cwd(), 'apps', 'mydemo.apk');
if (!fs.existsSync(appPath)) {
  throw new Error(`APK not found at: ${appPath}`);
}

export const config: Options.Testrunner = {
  runner: "local",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: { transpileOnly: true, project: "tsconfig.json" },
  },

  specs: ["./tests/specs/**/*.ts"],
  suites: { smoke: ["./tests/specs/smoke/*.ts"] },

  maxInstances: 1,
  
  capabilities: [
    {
      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": process.env.ANDROID_DEVICE || "Android Emulator",
      "appium:platformVersion": process.env.ANDROID_VERSION || "11",    
      // O usa APK o paquete/actividad (uno de los dos enfoques)
      "appium:app": appPath,
      "appium:appPackage": process.env.APP_PACKAGE || undefined,
      "appium:appActivity": process.env.APP_ACTIVITY || undefined,
      "appium:noReset": true,
      "appium:newCommandTimeout": 180,
    },
  ],

  logLevel: "info",
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      { outputDir: "allure-results", disableWebdriverStepsReporting: true },
    ],
  ],
  mochaOpts: { ui: "bdd", timeout: 120000,grep: process.env.GREP || '', },

  services: [["appium", { args: { basePath: "/wd/hub" } }]],

  before: async function () {
    browser.addCommand("resetAppIfNeeded", async () => {
      if (process.env.RESET_APP === "true") await driver.reset();
    });
  },
};

export default config;
