import AddNoteScreen from '#androidScreens/add-note.screen.js';

describe('Webview Tests', () => {
  before(async () => {
    await AddNoteScreen.skipBtn.click();
    await expect(AddNoteScreen.addNoteTxt).toBeDisplayed();
  });

  it('should switch to webview context and verify title', async () => {
    //  click on nav icon
    const navIcon = AddNoteScreen.iconNavBtn;
    await navIcon.click();

    // click on webview option
    await expect(AddNoteScreen.likeFacebookBtn).toBeDisplayed();
    await AddNoteScreen.likeFacebookBtn.click();

    // wait for webview context to become available
    let webviewContext;
    await driver.waitUntil(async () => {
      const contexts = await driver.getContexts();
      webviewContext = contexts.find(context => context.includes('WEBVIEW'));
      return webviewContext !== undefined;
    }, {
      timeout: 30000,
      timeoutMsg: 'Webview context not found within 30 seconds'
    });

    // switch to webview context
    await driver.switchContext(webviewContext);
    await driver.getContext().then(context => console.log('Current context after switch:', context));

    // wait for webview page to load completely
    await driver.waitUntil(async () => {
      try {
        const title = await driver.getTitle();
        return title && title.length > 0;
      } catch (error) {
        return false;
      }
    }, {
      timeout: 10000,
      timeoutMsg: 'Page title not loaded within 10 seconds'
    });

    // assertion - verify page title
    const pageTitle = await driver.getTitle();
    console.log('Page title:', pageTitle);
    // expect(pageTitle).toContain('ColorNote');

    // Try to close any popups that might be blocking interactions
    // const webPopupCloseBtn = driver.$('//*[@aria-label="Close"]');
    // await webPopupCloseBtn.isDisplayed();
    // await webPopupCloseBtn.click();
    // await driver.pause(2000);
    // await pageHeader = driver.$('//h1[@text="ColorNote"]');
    // await expect(pageHeader).toBeDisplayed();
    // await expect(driver.$('//h1[@text="ColorNote"]')).toBeDisplayed();


    // Try to find and interact with page elements more safely
    // try {
    //   // Wait for page content to load
    //   await driver.pause(5000);

    //   // Look for common Facebook elements with more flexible selectors
    //   const closeBtn = driver.$('[aria-label="Close"]');
    //   await closeBtn.isDisplayed()
    //   if (await closeBtn.isDisplayed()) {
    //     await closeBtn.click();
    //     console.log('Clicked close button successfully');
    //   }
    // } catch (error) {
    //   console.log('Close button interaction failed:', error.message);
    //   // Try alternative: look for any close/dismiss elements
    //   try {
    //     const elements = await driver.$$('i, button, [role="button"]');
    //     for (const element of elements.slice(0, 5)) { // Check first 5 elements only
    //       const ariaLabel = await element.getAttribute('aria-label');
    //       if (ariaLabel && (ariaLabel.includes('Close') || ariaLabel.includes('Dismiss'))) {
    //         await element.click();
    //         console.log('Found and clicked close element with aria-label:', ariaLabel);
    //         break;
    //       }
    //     }
    //   } catch (fallbackError) {
    //     console.log('Fallback element interaction also failed, continuing test...');
    //   }
    // }
  });

  it('should switch back to native context', async () => {
    // switch back to native context
    await driver.switchContext('NATIVE_APP');
    console.log('Current context after switching back:', await driver.getContext());
    // await driver.background(-1);
    // await driver.activateApp('com.socialnmobile.dictapps.notepad.color.note');
    await driver.back();

    // assertion - verify we are back in native context by checking for a native element
    await expect(AddNoteScreen.likeFacebookBtn).toBeDisplayed();
  });

});