class AddNoteScreen {
  async isElementDisplayed(element, timeout = 2000) {
    try {
      await element.waitForDisplayed({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  get skipBtn() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]');
  }

  get addNoteTxt() {
    return $('//*[@text="Add note"]');
  }

  get textOption() {
    return $('//*[@text="Text"]');
  }

  get textEditing() {
    return $('//*[@text="Editing"]');
  }

  get noteHeading() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]');
  }

  get noteBody() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]');
  }

  get editBtn() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]');
  }

  get viewNote() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]');
  }

  get noteTitle() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
  }

  noteTitleByText(title) {
    return $(`//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title" and @text="${title}"]`);
  }

  get backButton() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/back_btn"]');
  }

  // Presses the system back button, which works even when the in-app back_btn
  // is not rendered (e.g. on API 34 emulators in CI).
  async pressBack() {
    await driver.back();
  }

  // Navigates back one screen, handling the soft keyboard correctly.
  // On CI the keyboard stays open after text input — driver.back() would only
  // dismiss the keyboard, not navigate. So we hide the keyboard explicitly first,
  // then use the in-app back_btn if visible, falling back to driver.back().
  async navigateBack() {
    try {
      await driver.hideKeyboard();
    } catch {
      // Keyboard wasn't showing — safe to ignore.
    }

    // Prefer the in-app back button when visible — it's the most reliable way
    // to trigger ColorNote's save-and-exit flow.
    if (await this.backButton.isExisting()) {
      await this.backButton.click();
    } else {
      await driver.back();
    }
  }

  get menuBtn() {
    return $('~More') // Accessibility ID;
  }

  get deleteOption() {
    return $('//*[@text="Delete"]');
  }

  get deleteAlertTitle() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/alertTitle"]');
  }

  get deleteOkBtn() {
    return $('//*[@text="OK"]');
  }

  get iconNavBtn() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]');
  }

  get trashCanOption() {
    return $('//*[@text="Trash Can"]');
  }

  get mainTitle() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/main_title"]');
  }

  get trashItemTitle() {
    return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
  }

  trashItemTitleByText(title) {
    return $(`//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title" and @text="${title}"]`);
  }

  get likeFacebookBtn() {
    return $('//*[@text="Like us on Facebook"]');
  }

  async saveNote() {
    // First navigate back: hides keyboard if open, then exits the editor.
    // Lands on the read-only note view — wait for it before continuing.
    await this.navigateBack();
    await this.viewNote.waitForDisplayed({ timeout: 20000 });

    // Second navigate back: exits the note view and returns to the home list.
    await this.navigateBack();
  }

  async deleteCurrentNote() {
    await this.menuBtn.waitForDisplayed({ timeout: 10000 });
    await this.menuBtn.click();

    await this.deleteOption.waitForDisplayed({ timeout: 10000 });
    await this.deleteOption.click();

    await this.deleteOkBtn.waitForDisplayed({ timeout: 10000 });
    await this.deleteOkBtn.click();

    await this.addNoteTxt.waitForDisplayed({ timeout: 10000 });
  }

  async dismissAnrIfPresent() {
    // On CI emulators the "System UI not responding" ANR dialog can appear on top
    // of the app. The dialog has a "Wait" button — click it to dismiss.
    try {
      const waitBtn = await $('//*[@resource-id="android:id/aerr_wait" or @text="Wait"]');
      if (await waitBtn.isExisting()) {
        await waitBtn.click();
        // Give the system a moment to recover after dismissing the dialog.
        await driver.pause(2000);
      }
    } catch {
      // No ANR dialog present — nothing to do.
    }
  }

  async skipTutorialIfPresent() {
    // Wait for either the tutorial skip button or the home screen — whichever appears first.
    // On CI cold-launch the app can take >12s to render any UI, so we poll both simultaneously.
    // Also dismiss any ANR dialogs that may be blocking the UI on each poll iteration.
    try {
      await driver.waitUntil(
        async () => {
          await this.dismissAnrIfPresent();
          return (await this.skipBtn.isExisting()) || (await this.addNoteTxt.isExisting());
        },
        { timeout: 60000, interval: 1000 }
      );
    } catch {
      // Neither appeared in 60s; fall through so the assertion in the test gives a clear failure.
    }

    if (await this.skipBtn.isExisting()) {
      await this.skipBtn.click();
      // Wait for the home screen after dismissing the tutorial.
      await this.addNoteTxt.waitForDisplayed({ timeout: 20000 });
    }
  }

  async openTextNoteEditor() {
    if (await this.isElementDisplayed(this.addNoteTxt, 10000)) {
      await this.addNoteTxt.click();
    }

    if (await this.isElementDisplayed(this.textOption, 3000)) {
      await this.textOption.click();
    }
  }
}

export default new AddNoteScreen();