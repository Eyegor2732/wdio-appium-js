import path from 'path';
import { config as baseConfig } from './wdio.conf.js';

const isCI = process.env.CI === 'true' || process.env.CI === '1';
const androidDeviceName = process.env.ANDROID_DEVICE_NAME || (isCI ? 'Android Emulator' : 'Medium Phone API 35');
const androidPlatformVersion = process.env.ANDROID_PLATFORM_VERSION || (!isCI ? '15.0' : undefined);

const config = {
  ...baseConfig,
  hostname: '127.0.0.1',
  maxInstances: 1,
  specs: ['./test/specs/apidemos/*.js'],
  capabilities: [
    {
      'appium:platformName': 'Android',
      'appium:deviceName': androidDeviceName,
      ...(androidPlatformVersion ? { 'appium:platformVersion': androidPlatformVersion } : {}),
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.join(process.cwd(), 'app/android/ApiDemos-debug.apk'),
      'appium:appPackage': 'io.appium.android.apis',
      'appium:appActivity': '.ApiDemos',
      'appium:uiautomator2ServerLaunchTimeout': 120000,
      'appium:uiautomator2ServerInstallTimeout': 120000,
      'appium:adbExecTimeout': 120000,
      'appium:androidInstallTimeout': 180000,
      'appium:autoGrantPermissions': true,
      'appium:noReset': false,
      'appium:fullReset': false
    }
  ],
  services: [
    [
      'appium',
      {
        args: {
          address: '127.0.0.1',
          port: 4723,
          relaxedSecurity: true
        },
        logPath: './appium-logs'
      }
    ]
  ],
  mochaOpts: {
    ...baseConfig.mochaOpts,
    timeout: isCI ? 240000 : baseConfig.mochaOpts.timeout
  }
};

export { config };
