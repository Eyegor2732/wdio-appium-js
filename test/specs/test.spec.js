// Example: test/specs/test.spec.js
describe('Create note on both platforms', () => {
  const selectors = {
    addButton: {
      android: 'id=com.socialnmobile.dictapps.notepad.color.note:id/main_btn1',
      ios: '~Add'
    },
    titleInput: {
      android: 'id=com.socialnmobile.dictapps.notepad.color.note:id/edit_title',
      ios: '~Title'
    }
  };

  function byPlatform(key) {
    if (browser.isAndroid) return selectors[key].android;
    if (browser.isIOS) return selectors[key].ios;
    throw new Error('Unsupported platform');
  }

  it('creates a note', async () => {
    await $(byPlatform('addButton')).click();
    await $(byPlatform('titleInput')).setValue('Cross-platform note');

    // Shared assertion pattern
    await expect($(byPlatform('titleInput'))).toHaveText('Cross-platform note');
  });
});