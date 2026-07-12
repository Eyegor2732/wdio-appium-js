describe('test', () => {
  it('test', async () => {
    await driver.sendSms('4047935062', 'Hello from Appium!');
    await driver.pause(3000);
  });
});
