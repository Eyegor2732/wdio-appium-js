import AddNoteScreen from "#androidScreens/add-note.screen.js";

describe('Add Notes', () => {
  const noteTitle = "Anime List";
  const noteBody = "Naruto\nOnePiece\nAOT";

  it('Skip tutorial', async () => {
    await AddNoteScreen.skipBtn.click();

    await expect(AddNoteScreen.addNoteTxt).toBeDisplayed();
  });

  it('add a note, save changes & verify note', async () => {
    await AddNoteScreen.addNoteTxt.click();
    await AddNoteScreen.textOption.click();
    await expect(AddNoteScreen.textEditing).toBeDisplayed();

    // add note title
    await AddNoteScreen.noteHeading.addValue(noteTitle);

    // add note body
    await AddNoteScreen.noteBody.addValue(noteBody);

    // save the changes
    await AddNoteScreen.saveNote();

    // assertion
    await expect(AddNoteScreen.noteTitle).toHaveText(noteTitle);

    // click on note title to view the note
    await AddNoteScreen.noteTitle.click();

    // assertion
    await expect(AddNoteScreen.editBtn).toBeDisplayed();
    await expect(AddNoteScreen.viewNote).toHaveText(noteBody);
  });

  it('Delete a note', async () => {
    await expect(AddNoteScreen.menuBtn).toBeDisplayed();
    await AddNoteScreen.menuBtn.click();

    await expect(AddNoteScreen.deleteOption).toBeDisplayed();
    await AddNoteScreen.deleteOption.click();

    await expect(AddNoteScreen.deleteAlertTitle).toBeDisplayed();
    await expect(AddNoteScreen.deleteAlertTitle).toHaveText("Delete", { ignoreCase: true });

    await expect(AddNoteScreen.deleteOkBtn).toBeDisplayed();
    await AddNoteScreen.deleteOkBtn.click();

    await expect(AddNoteScreen.addNoteTxt).toBeDisplayed();
    await expect(AddNoteScreen.noteTitle).not.toBeDisplayed();
    await expect(AddNoteScreen.iconNavBtn).toBeDisplayed();
    await AddNoteScreen.iconNavBtn.click();

    await expect(AddNoteScreen.trashCanOption).toBeDisplayed();
    await AddNoteScreen.trashCanOption.click();

    await expect(AddNoteScreen.mainTitle).toHaveText("Trash Can");
    await expect(AddNoteScreen.trashItemTitle).toHaveText(noteTitle);
  });
});