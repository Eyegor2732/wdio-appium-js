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
    await this.backButton.click();
    await this.backButton.click();
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
    if (await this.isElementDisplayed(this.skipBtn, 12000)) {
      await this.skipBtn.click();
      // Wait for home screen to appear after dismissing tutorial.
      await this.isElementDisplayed(this.addNoteTxt, 10000);
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