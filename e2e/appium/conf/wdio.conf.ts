import { join } from 'path';
import { AndroidCapabilities } from '../../../typings/android-typings';

/**
 * This interface extends from `WebdriverIO.Config` in `@wdio/sync` module, which is
 * `WebDriver.Options` with an omitted `capabilities` field. The capabilities is determined by
 * the "context" of how to wdio is driven.
 *
 * @ref https://github.com/webdriverio/webdriverio/blob/master/docs/Options.md
 * @ref https://webdriver.io/docs/configurationfile.html
 */
interface WDIOConf extends WebdriverIO.Config {
    capabilities: Array<AndroidCapabilities>;
}

export const config: WDIOConf = {
    // =====================
    // Server Configurations
    // =====================
    // Host address of the running Selenium server. This information is usually obsolete as
    // WebdriverIO automatically connects to localhost. Also if you are using one of the
    // supported cloud services like Sauce Labs, Browserstack or Testing Bot you also don't
    // need to define host and port information because WebdriverIO can figure that out
    // according to your user and key information. However if you are using a private Selenium
    // backend you should define the host address, port, and path here.
    //
    protocol: 'http',
    hostname: '0.0.0.0',
    port: 4723,
    // ==================================
    // Where should your test be launched
    // ==================================
    //
    runner: 'local',
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './e2e/appium/src/**/*.spec.ts',
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude option in
    // order to group specific specs to a specific capability.
    //
    //
    // First you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox and Safari) and you have
    // set maxInstances to 1, wdio will spawn 3 processes. Therefor if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property basically handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,
    //
    // Set directory to store all logs into
    outputDir: './temp',
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    // baseUrl: 'http://localhost:8080',
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    waitforTimeout: 2000,
    framework: 'jasmine',
    //
    // Options to be passed to Jasmine.
    // See also: https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-jasmine-framework#jasminenodeopts-options
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000,
        stopOnSpecFailure: true
    },
    reporters: ['spec'],
    capabilities: [{
        /*
         Below are AppiumGeneralCapabilities members
        */
        automationName: 'UiAutomator2',
        platformName: 'Android',
        platformVersion: '9',
        deviceName: 'noop',
        app: join(process.cwd(), './platforms/android/app/build/outputs/apk/debug/app-debug.apk'),
        browserName: '',
        newCommandTimeout: 240,
        orientation: 'PORTRAIT',
        autoWebview: true,
        noReset: true,
        /*
         Below are AndroidCapabilities members
        */
        systemPort: 8201,
        autoGrantPermissions: true,
        noSign: true,
        appPackage: 'io.ionic.starter',
        appActivity: '.MainActivity',
        appWaitPackage: 'io.ionic.starter',
        appWaitActivity: '.MainActivity',
        autoWebviewTimeout: 4000
    }],
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides a several hooks you can use to interfere the test process in order to enhance
    // it and build services around it. You can either apply a single function to it or an array of
    // methods. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // To see available hooks, view the bottom portion of this configuration file:
    // @ref https://webdriver.io/docs/configurationfile.html
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param capabilities list of capabilities details
     * @param specs List of spec file paths that are to be run
     */
    before: (capabilities: any,
        specs: string[]) => {
        browser.startRecordingScreen();
    },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param result 0 - test pass, 1 - test fail
     * @param capabilities list of capabilities details
     * @param specs List of spec file paths that ran
     */
    after: (result: number,
        capabilities: any,
        specs: string[]) => {
        browser.saveRecordingScreen('./temp/video.mp4');
        browser.stopRecordingScreen();
    }
};


