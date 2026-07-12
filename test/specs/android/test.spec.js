describe('test', () => {
  it('test', async () => {
    await driver.sendSms('4047935062', 'Hello from Appium!');

    // 1. Terminate and restart the Messages app to ensure a clean state
    const messagesPackage = 'com.google.android.apps.messaging';
    await browser.terminateApp(messagesPackage);
    await browser.activateApp(messagesPackage);

    // 2. Click the most recent conversation thread
    // Using the standard Google Messages conversation list resource ID
    const latestThread = await $(`id=com.google.android.apps.messaging:id/conversation_snippet`);
    await latestThread.waitForDisplayed({ timeout: 10000 });
    await latestThread.click();

    // 3. Locate all message bubbles inside the opened chat
    // Google Messages uses 'message_text' for the text view inside the bubble
    const messageBubbles = await $$(`id=com.google.android.apps.messaging:id/message_text`);
    await browser.waitUntil(async () => messageBubbles.length > 0, {
      timeout: 5000,
      timeoutMsg: 'No messages found in this thread'
    });

    // 4. Extract the text content from the very last message bubble
    const lastMessageIndex = messageBubbles.length - 1;
    const smsText = await messageBubbles[lastMessageIndex].getText();

    console.log(`----------------------------------------`);
    console.log(` Extracted SMS Content: "${smsText}"`);
    console.log(`----------------------------------------`);

    // Example: Regex to extract a 6-digit OTP verification code
    const otpMatch = smsText.match(/\b\d{6}\b/);
    if (otpMatch) {
      console.log(` Found Verification Code: ${otpMatch[0]}`);
    } else {
      console.log(' No 6-digit verification code found in the SMS.');
    }
    await driver.pause(3000);
  });
});
