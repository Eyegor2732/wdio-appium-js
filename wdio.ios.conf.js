import path from 'path';
import { config as baseConfig } from './wdio.conf.js';

// iOS-focused config that keeps base defaults but makes mobile settings explicit.
const config = {
  ...baseConfig,
  // Keep WDIO host and Appium service address identical to avoid connection mismatches.
  hostname: '127.0.0.1',
  maxInstances: 1,
  specs: ['./test/specs/ios/*.js'],
  capabilities: [
    {
      'appium:platformName': 'iOS',
      // Replace with your simulator or real device name.
      'appium:deviceName': 'iPhone 15',
      // Replace with your installed iOS simulator/runtime version.
      'appium:platformVersion': '17.5',
      'appium:automationName': 'XCUITest',
      // Replace with your iOS app package (.app or .ipa).
      'appium:app': path.join(process.cwd(), 'app/ios/YourApp.app'),
      'appium:iosInstallTimeout': 180000,
      'appium:autoGrantPermissions': true
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
  ]
};

export { config };
