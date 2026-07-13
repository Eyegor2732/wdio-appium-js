import AddNoteScreen from "#androidScreens/add-note.screen.js";

describe('Add Notes', () => {
  const noteTitle = "Anime List";
  const noteBody = "Naruto\nOnePiece\nAOT";

  it('Skip tutorial', async () => {
    await AddNoteScreen.skipTutorialIfPresent();

    await expect(AddNoteScreen.addNoteTxt).toBeDisplayed({ timeout: 15000 });
  });

  it('add a note, save changes & verify note', async () => {
    await AddNoteScreen.skipTutorialIfPresent();

    // Keep reruns stable by removing a pre-existing note with the same title.
    const existingNote = AddNoteScreen.noteTitleByText(noteTitle);
    if (await AddNoteScreen.isElementDisplayed(existingNote, 3000)) {
      await existingNote.click();
      await AddNoteScreen.deleteCurrentNote();
    }

    await AddNoteScreen.openTextNoteEditor();
    await expect(AddNoteScreen.textEditing).toBeDisplayed();

    // add note title
    await AddNoteScreen.noteHeading.addValue(noteTitle);

    // add note body
    await AddNoteScreen.noteBody.addValue(noteBody);

    // save the changes
    await AddNoteScreen.saveNote();

    // assertion
    await expect(AddNoteScreen.noteTitleByText(noteTitle)).toBeDisplayed();

    // click on note title to view the note
    await AddNoteScreen.noteTitleByText(noteTitle).click();

    // assertion
    await expect(AddNoteScreen.editBtn).toBeDisplayed();
    await expect(AddNoteScreen.viewNote).toHaveText(noteBody);
  });

  it('Delete a note', async () => {
    if (!(await AddNoteScreen.isElementDisplayed(AddNoteScreen.menuBtn, 3000))) {
      if (await AddNoteScreen.isElementDisplayed(AddNoteScreen.noteTitleByText(noteTitle), 5000)) {
        await AddNoteScreen.noteTitleByText(noteTitle).click();
      }
    }

    await expect(AddNoteScreen.menuBtn).toBeDisplayed();
    await AddNoteScreen.menuBtn.click();

    await expect(AddNoteScreen.deleteOption).toBeDisplayed();
    await AddNoteScreen.deleteOption.click();

    await expect(AddNoteScreen.deleteAlertTitle).toBeDisplayed();
    await expect(AddNoteScreen.deleteAlertTitle).toHaveText("Delete", { ignoreCase: true });

    await expect(AddNoteScreen.deleteOkBtn).toBeDisplayed();
    await AddNoteScreen.deleteOkBtn.click();

    await expect(AddNoteScreen.addNoteTxt).toBeDisplayed();
    await expect(AddNoteScreen.noteTitleByText(noteTitle)).not.toBeDisplayed();
    await expect(AddNoteScreen.iconNavBtn).toBeDisplayed();
    await AddNoteScreen.iconNavBtn.click();

    await expect(AddNoteScreen.trashCanOption).toBeDisplayed();
    await AddNoteScreen.trashCanOption.click();

    await expect(AddNoteScreen.mainTitle).toHaveText("Trash Can");
    await expect(AddNoteScreen.trashItemTitleByText(noteTitle)).toBeDisplayed();
  });
});