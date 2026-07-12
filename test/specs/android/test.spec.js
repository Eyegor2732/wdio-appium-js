describe('test', () => {
  it('test', async () => {
    await driver.sendSms('4047935062', 'Hello from Appium!');
    await driver.pause(3000);
  });

  it('should read SMS directly from Android database via ADB safely', async () => {
    // Append the SQL LIMIT clause inside the sort parameter string
    const adbCommand = 'content query --uri content://sms/inbox --projection body --sort "date DESC LIMIT 1"';

    const result = await browser.execute('mobile: shell', {
      command: adbCommand
    });

    console.log('----------------------------------------');
    console.log('ADB SMS Output:', result);
    console.log('----------------------------------------');
  });
});
