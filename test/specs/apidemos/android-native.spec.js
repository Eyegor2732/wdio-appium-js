describe('Android Native Festure Test', () => {

  afterEach(async () => {
    await driver.relaunchActiveApp();
  });

  it('Access an Activity Directly', async () => {
    /*
      * To start an activity directly, we can use the `startActivity` method. 
      * This method takes two parameters: the package name and the activity name.
      * The package name is the unique identifier of the app, and the activity name is 
      * the specific screen or functionality we want to access.
      * 
      * To find the package name and activity name, we can use the following ADB command:
      * adb shell dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'
      * This command will return the current focused activity and its package name.
      * 
      * or using Appium Inspector:
      * Commands > Execute Commands > Execute Script
      * Enter the following:    
      * executeScript: mobile: getCurrentActivity
      * jsonArguments: Leave empty or use {} (no arguments needed).
      * 
      * For example, if we want to access the Alert Dialog Samples activity in the ApiDemos app, 
      * we can use the following code:
     */
    //package: 'io.appium.android.apis'
    //activity: '.app.AlertDialogSamples'

    // start the activity directly
    // Note: The activity name can be specified in two formats:
    // 1. With a leading dot (e.g., '.app.AlertDialogSamples') - This is a shorthand notation that assumes the activity is part of the specified package.
    // 2. With the full package name (e.g., 'io.appium.android.apis.app.AlertDialogSamples') - This is the fully qualified name of the activity.
    // await driver.startActivity(packageName, activityName); or
    // await driver.startActivity(packageName, packageName + activityName);

    await driver.startActivity('io.appium.android.apis', '.app.AlertDialogSamples');
    // await driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.app.AlertDialogSamples');  // or the previous string format

    // pause for a moment to see the activity
    await driver.pause(3000);

    // assertion
    const alertDialogOption = driver.$('~List dialog');
    await expect(alertDialogOption).toBeExisting();
  });

  it('Working with Dialog Boxes', async () => {
    // start the activity directly
    await driver.startActivity('io.appium.android.apis', '.app.AlertDialogSamples');
    await driver.pause(3000);

    // assertion
    const okCancelDialogWithMessageOption = driver.$('~OK Cancel dialog with a message');
    await expect(okCancelDialogWithMessageOption).toBeExisting();

    // click on the "OK Cancel dialog with a message" option
    await okCancelDialogWithMessageOption.click();

    // assertion
    const alertBox = driver.$('//*[@resource-id="android:id/parentPanel"]');
    await expect(alertBox).toBeExisting();
    const alertTitle = driver.$('//*[@resource-id="android:id/alertTitle"]');
    await expect(alertTitle)
      .toHaveText('Lorem ipsum dolor sit aie consectetur adipiscing\nPlloaso mako nuto siwuf cakso dodtos anr koop.');

    // get the alert message

    console.log('Alert Message:', await driver.getAlertText() || 'No alert message found');
    // await driver.acceptAlert();

    // dismiss aler tby clicking the "Cancel" button
    const cancelButton = alertBox.$('//*[@text="Cancel"]');
    await cancelButton.click();

    // assertion
    await expect(alertBox).not.toBeExisting();
    const listDialogOption = driver.$('~List dialog');
    await expect(listDialogOption).toBeExisting();
  });

  it('Vertical Scrolling', async () => {
    // find element by Accessibility ID
    const appOption = driver.$('~App');

    // assertion
    await expect(appOption).toBeExisting();

    // click on the element
    await appOption.click();

    // assertion
    const activityOption = driver.$('~Activity');
    await expect(activityOption).toBeExisting();

    // click on the element
    await activityOption.click();

    // assertion
    const customTitleOption = driver.$('~Custom Title');
    await expect(customTitleOption).toBeExisting();

    // Scroll to find the "Secure Surfaces" option
    try {
      await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Secure Surfaces"))');
    } catch (error) {
      console.error('Element "Secure Surfaces" not found after scrolling:', error.message);
      throw error;
    }

    const secureSurfacesOption = driver.$('~Secure Surfaces');
    await expect(secureSurfacesOption).toBeExisting();

    // click on the element
    await secureSurfacesOption.click();

    // assertion
    const secureDialogOption = driver.$('~Secure Dialog');
    await expect(secureDialogOption).toBeExisting();
  });

  it('Horizontal Scrolling', async () => {
    // start the activity directly
    await driver.startActivity('io.appium.android.apis', '.view.Gallery1');
    await driver.pause(2000);

    // assertion
    const galleryTitle = driver.$('//*[@text="Views/Gallery/1. Photos"]');
    await expect(galleryTitle).toBeExisting();

    // scroll horizontally 
    try {
      await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
    } catch (error) {
      console.error('Failed to scroll horizontally forward:', error.message);
      throw error;
    }

    await driver.pause(2000);

    try {
      await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');
    } catch (error) {
      console.error('Failed to scroll horizontally backward:', error.message);
      throw error;
    }

    await driver.pause(2000);

    // scroll horizontally to the end of the gallery
    try {
      await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollToEnd(1, 5)');
    } catch (error) {
      console.error('Failed to scroll horizontally to the end of the gallery:', error.message);
      throw error;
    }
    await driver.pause(2000);

    // // Scroll horizontally to find the "Earth" option
    // try {
    //   await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollIntoView(new UiSelector().description("Earth"))');
    // } catch (error) {
    //   console.error('Element "Earth" not found after horizontal scrolling:', error.message);
    //   throw error;
    // }

    // driver.pause(2000);
  });

  it('Exercise Dialog Boxes', async () => {
    // start the activity directly
    await driver.startActivity('io.appium.android.apis', '.view.DateWidgets1');
    await driver.pause(2000);

    // assertion
    const dateDisplay = driver.$('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]');
    await expect(dateDisplay).toBeExisting();

    // get the original date
    const originalDate = await dateDisplay.getText();
    console.log('Original Date:', originalDate);

    // assert change date button exists and click on it
    const changeDateButton = driver.$('~change the date');
    await expect(changeDateButton).toBeExisting();
    await changeDateButton.click();

    // assertion
    const datePicker = driver.$('//*[@resource-id="android:id/datePicker"]');
    await expect(datePicker).toBeExisting();

    // scroll to the next month in the date picker
    try {
      await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
    } catch (error) {
      console.error('Failed to scroll horizontally forward:', error.message);
      throw error;
    }

    // assert the tens day is visible and click on it
    const tenthDay = datePicker.$('//*[@text="10"]');
    await expect(tenthDay).toBeExisting();
    await tenthDay.click();

    // assert the "OK" button is visible and click on it
    const okButton = driver.$('//*[@text="OK"]');
    await expect(okButton).toBeExisting();
    await okButton.click();

    // get the updated date
    const updatedDate = await dateDisplay.getText();
    console.log('Updated Date:', updatedDate);

    // assert the date has been updated
    expect(updatedDate).toContain('-10-');
    expect(updatedDate).not.toEqual(originalDate);
  });

});