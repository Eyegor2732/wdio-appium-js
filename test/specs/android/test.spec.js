describe('test', () => {
  it('test', async () => {
    await driver.sendSms('4047935062', 'Hello from Appium!');
    await driver.pause(3000);
  });

  it('should read SMS directly from Android database via ADB', async () => {
    // Queries the content provider for the body of the last received message
    const adbCommand = 'content query --uri content://sms/inbox --projection body --sort "date DESC" --limit 1';

    const result = await browser.execute('mobile: shell', {
      command: adbCommand
    });

    console.log('ADB SMS Output:', result);
  });
});
