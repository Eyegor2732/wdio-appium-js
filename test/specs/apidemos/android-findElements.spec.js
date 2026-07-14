// io.appium.android.apis/.ApiDemos

describe('Android Elements Test', () => {
  const appPackage = 'io.appium.android.apis';

  beforeEach(async () => {
    // Always relaunch to ApiDemos home before each test so CI state is deterministic.
    await driver.startActivity(appPackage, '.ApiDemos');
    await driver.$('~App').waitForExist({ timeout: 20000 });
  });

  afterEach(async () => {
    await driver.relaunchActiveApp();
  });

  it('Find element by Accessibility ID', async () => {

    // find element by Accessibility ID
    const appOption = driver.$('~App');

    // assertion
    await expect(appOption).toBeExisting();

    // click on the element
    await appOption.click();
    // depth++;

    // assertion
    const actionBarOption = driver.$('~Action Bar');
    await expect(actionBarOption).toBeExisting();

  });

  it('Find element by Class Name', async () => {
    // find element by Class Name
    const classNames = driver.$$('android.widget.TextView');

    // Find element with text "App"
    const appOption = classNames.find(async (name) => {
      return ((await name.getText()) === 'App');
    });

    // Ensure we found the element
    expect(appOption).not.toBeNull();

    // click on the element
    await appOption.click();
    // depth++;

    // assertion
    const actionBarOption = driver.$('~Action Bar');
    await expect(actionBarOption).toBeExisting();
  });

  it('Find element by XPath', async () => {
    // find element by XPath
    const appOption = driver.$('//*[@content-desc="App"]');

    // assertion
    await expect(appOption).toBeExisting();

    // click on the element
    await appOption.click();

    // assertion
    const alertDialogsOption = driver.$('//*[@text="Alert Dialogs"]');
    await expect(alertDialogsOption).toBeExisting();

    // click on the element
    await alertDialogsOption.click();
    // depth++;

    // assertion
    const appAlertDialogs = driver.$('//*[@text="App/Alert Dialogs"]');
    await expect(appAlertDialogs).toBeExisting({ wait: 5000 });

    // assertion
    const listDialogOption = driver.$('//*[contains(@resource-id, "select_button")]');
    await expect(listDialogOption).toBeExisting({ wait: 5000 });

    // click on the element
    await listDialogOption.click();
    // depth++;

    // assertion
    const commandTwoOption = driver.$('//*[@text="Command two"]');
    await expect(commandTwoOption).toHaveText('Command two');

    // click on the element
    await commandTwoOption.click();
    // depth++;

    // assertion
    // const commandTwoResult = driver.$('//*[@class="android.widget.TextView"]');
    const commandTwoResult = driver.$('//android.widget.TextView');
    await expect(commandTwoResult).toHaveText('You selected: 1 , Command two');
  });

  it('Find element by Android UIAutomator', async () => {
    // find element by Android UIAutomator
    const appOption = driver.$('android=new UiSelector().text("App")');

    // assertion
    await expect(appOption).toBeExisting();

    // click on the element
    await appOption.click();
    // depth++;

    // assertion
    const alertDialogsOption = driver.$('android=new UiSelector().textContains("Alert")');
    await expect(alertDialogsOption).toBeExisting();

    // click on the element
    await alertDialogsOption.click();
    // depth++;

    // assertion
    const listDialogOption = driver.$('android=new UiSelector().resourceIdMatches(".*select_button")');
    await expect(listDialogOption).toBeExisting({ wait: 5000 });

    // click on the element
    await listDialogOption.click();
    // depth++;

    // assertion
    const commandTwoOption = driver.$('android=new UiSelector().text("Command two")');
    await expect(commandTwoOption).toHaveText('Command two');

    // click on the element
    await commandTwoOption.click();
    // depth++;

    // assertion
    const commandTwoResult = driver.$('android=new UiSelector().resourceId("android:id/message")');
    await expect(commandTwoResult).toHaveText('You selected: 1 , Command two');
  });

  it('Exercise input field', async () => {
    // find element by Accessibility ID
    const viewsOption = driver.$('~Views');
    // click on the element
    await viewsOption.click();
    // depth++;

    // assertion
    const autoCompleteOption = driver.$('~Auto Complete');
    await expect(autoCompleteOption).toBeExisting();

    // click on the element
    await autoCompleteOption.click();
    // depth++;

    // assertion
    const screenTopOption = driver.$('~1. Screen Top');
    await expect(screenTopOption).toBeExisting();

    // click on the element
    await screenTopOption.click();
    // depth++;

    // assertion
    const inputField = driver.$('//*[@resource-id="io.appium.android.apis:id/edit"]');
    await expect(inputField).toBeExisting();
    await expect(inputField).toHaveText('');

    // input text
    const inputText = 'Uzbekistan';
    await inputField.setValue(inputText);

    // assertion    
    await expect(inputField).toHaveText(inputText);
  });

});
