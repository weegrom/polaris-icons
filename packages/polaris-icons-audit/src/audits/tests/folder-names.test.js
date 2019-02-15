const folderNames = require('../folder-names');

describe('folder-names audit', () => {
  it('has a name', () => {
    expect(folderNames.auditName).toEqual('folder-names');
  });

  it('counts files in folders', () => {
    const filenames = [
      'foo/icons/icon1.svg',
      'foo/icons/icon2.svg',
      'foo/images/image1.svg',
      'bar/icons/icon3.svg',
      'bar/ham/icon3.svg',
      'foo/bar/baz/icons/icon1.svg',
    ];

    expect(folderNames({filenames})).toEqual({
      summary: 'Found 6 svgs, placed into 3 folders',
      status: 'info',
      info: `  4 svgs found within a "icons" folder
  1 svgs found within a "images" folder
  1 svgs found within a "ham" folder`,
    });
  });
});
