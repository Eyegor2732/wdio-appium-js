import path from 'path';
import { config as baseConfig } from './wdio.conf.js';

const isCI = process.env.CI === 'true' || process.env.CI === '1';
const androidDeviceName = process.env.ANDROID_DEVICE_NAME || (isCI ? 'Android Emulator' : 'Medium Phone API 35');
const androidPlatformVersion = process.env.ANDROID_PLATFORM_VERSION || (!isCI ? '15.0' : undefined);

// Android-focused config that keeps base defaults but makes mobile settings explicit.
const config = {
  ...baseConfig,
  // Keep WDIO host and Appium service address identical to avoid connection mismatches.
  hostname: '127.0.0.1',
  maxInstances: 1,
  specs: ['./test/specs/android/*.js'],
  exclude: isCI ? ['./test/specs/android/webview.spec.js', './test/specs/android/add-note-screen.spec.js'] : [],
  capabilities: [
    {
      'appium:platformName': 'Android',
      'appium:deviceName': androidDeviceName,
      ...(androidPlatformVersion ? { 'appium:platformVersion': androidPlatformVersion } : {}),
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.join(process.cwd(), 'app/android/ColorNote+Notepad.apk'),
      'appium:uiautomator2ServerLaunchTimeout': 120000,
      'appium:adbExecTimeout': 120000,
      'appium:androidInstallTimeout': 180000,
      'appium:autoGrantPermissions': true,
      'appium:chromedriverAutodownload': true,
      'appium:chromedriverExecutable': path.join(process.cwd(), 'node_modules/chromedriver/lib/chromedriver/chromedriver'),
      'appium:ensureWebviewsHavePages': true,
      'appium:nativeWebScreenshot': true,
      'appium:webviewContext': true
    }
  ],
  services: [
    [
      'appium',
      {
        args: {
          // Must match `hostname` above.
          address: '127.0.0.1',
          port: 4723,
          relaxedSecurity: true
        },
        logPath: './appium-logs'
      }
    ]
  ],
  //
  groupLogsByTestSpec: true,
  // 
};

export { config };
