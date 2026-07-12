class AddNoteScreen {
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

  get likeFacebookBtn() {
    return $('//*[@text="Like us on Facebook"]');
  }

  async saveNote() {
    await this.backButton.click();
    await this.backButton.click();
  }
}

export default new AddNoteScreen();