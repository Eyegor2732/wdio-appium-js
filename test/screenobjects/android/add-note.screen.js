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
    // First back: exits the note editor and lands on the read-only note view.
    // Wait for view_note to confirm the transition completed before pressing back
    // again — on CI the emulator is slow and firing both backs immediately causes
    // the second one to get lost mid-transition.
    await this.pressBack();
    await this.viewNote.waitForDisplayed({ timeout: 15000 });

    // Second back: exits the note view and returns to the home list.
    await this.pressBack();
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

  async skipTutorialIfPresent() {
    // Wait for either the tutorial skip button or the home screen — whichever appears first.
    // On CI cold-launch the app can take >12s to render any UI, so we poll both simultaneously.
    try {
      await driver.waitUntil(
        async () => (await this.skipBtn.isExisting()) || (await this.addNoteTxt.isExisting()),
        { timeout: 30000, interval: 500 }
      );
    } catch {
      // Neither appeared in 30s; fall through so the assertion in the test gives a clear failure.
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