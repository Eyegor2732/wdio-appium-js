describe('test', () => {
  it('test', async () => {
    await driver.sendSms('1234567890', 'Hello from Appium!');
    await driver.pause(3000);
  });

  it('should wait and read SMS directly from Android database via ADB', async () => {
    const adbCommand = 'content query --uri content://sms/inbox --projection body --sort "date DESC LIMIT 1"';
    let result = 'No result found.';
    const maxAttempts = 10; // Try for up to 10 seconds

    for (let i = 0; i < maxAttempts; i++) {
      result = await browser.execute('mobile: shell', { command: adbCommand });

      // If the database returns actual text instead of "No result found."
      if (result && !result.includes('No result found.')) {
        break;
      }

      console.log(`[Attempt ${i + 1}/${maxAttempts}] SMS not arrived yet. Retrying in 1s...`);
      await browser.pause(1000);
    }

    console.log('----------------------------------------');
    console.log('Final ADB SMS Output:', result);
    console.log('----------------------------------------');

    // Fail the test gracefully if it never arrives
    if (result.includes('No result found.')) {
      throw new Error('Timeout: SMS never arrived in the database.');
    }
  });
});
