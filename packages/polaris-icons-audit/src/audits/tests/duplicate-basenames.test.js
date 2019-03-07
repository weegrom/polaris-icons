const polarisIcons = require('@shopify/polaris-icons');
const duplicateBasenames = require('../duplicate-basenames');

jest.mock('@shopify/polaris-icons', () => ({}));

describe('duplicate-basenames audit', () => {
  beforeAll(() => {
    setPolarisIconsMockData({});
  });

  it('has a name', () => {
    expect(duplicateBasenames.auditName).toEqual('duplicate-basenames');
  });

  it('sets a pass status when there are no warnings', () => {
    const filenames = ['foo/icons/icon1.svg', 'foo/icons/icon2.svg'];

    expect(duplicateBasenames({filenames})).toEqual({
      summary: 'Found 0 basenames shared by multiple files',
      status: 'pass',
      info: '',
    });
  });

  it('warns when there are duplicate basenames', () => {
    const filenames = [
      'foo/icons/Icon1.svg',
      'foo/icons/icon2.svg',
      'foo/images/icon1.svg',
      'bar/icons/Icon3.svg',
      'bar/ham/icon3.svg',
      'foo/bar/baz/icons/icon1.svg',
      'baz/icons/add.svg',
    ];

    expect(duplicateBasenames({filenames})).toEqual({
      summary: 'Found 2 basenames shared by multiple files',
      status: 'warning',
      info: `  icon1 is used in 3 files:
    foo/icons/Icon1.svg
    foo/images/icon1.svg
    foo/bar/baz/icons/icon1.svg
  icon3 is used in 2 files:
    bar/icons/Icon3.svg
    bar/ham/icon3.svg`,
    });
  });

  it('ignores the  -major, -minor and -spot suffixes when comparing', () => {
    const filenames = [
      'foo/icons/icon1.svg',
      'foo/icons/icon1-major.svg',
      'foo/icons/icon1-minor.svg',
      'foo/icons/icon1-spot.svg',
      'bar/icons/icon1Major.svg',
      'bar/icons/icon1Minor.svg',
      'bar/icons/icon1Spot.svg',
      'baz/icons/icon1_major.svg',
      'baz/icons/icon1_minor.svg',
      'baz/icons/icon1_spot.svg',
      'qux/icons/icon1MajorMonotone.svg',
      'qux/icons/icon1MajorTwotone.svg',
      'zug/icons/icon2.svg',
    ];

    expect(duplicateBasenames({filenames})).toEqual({
      summary: 'Found 1 basenames shared by multiple files',
      status: 'warning',
      info: `  icon1 is used in 12 files:
    foo/icons/icon1.svg
    foo/icons/icon1-major.svg
    foo/icons/icon1-minor.svg
    foo/icons/icon1-spot.svg
    bar/icons/icon1Major.svg
    bar/icons/icon1Minor.svg
    bar/icons/icon1Spot.svg
    baz/icons/icon1_major.svg
    baz/icons/icon1_minor.svg
    baz/icons/icon1_spot.svg
    qux/icons/icon1MajorMonotone.svg
    qux/icons/icon1MajorTwotone.svg`,
    });
  });

  describe('when @shopify/polaris-icons has content', () => {
    beforeAll(() => {
      setPolarisIconsMockData({Icon1: () => ({})});
    });

    it('compares against polaris-icons names', () => {
      const filenames = ['foo/icons/icon1.svg'];

      expect(duplicateBasenames({filenames})).toEqual({
        summary: 'Found 1 basenames shared by multiple files',
        status: 'warning',
        info: `  icon1 is used in 2 files:
    @shopify/polaris-icons/Icon1.svg
    foo/icons/icon1.svg`,
      });
    });
  });
});

// polarisIcons must be a reference to the mock object, we need to empty that
// object and repopulate it, thus keeping the reference intact, instead of
// reassigning it and thus making the variable reference a new object
function setPolarisIconsMockData(newData) {
  Object.keys(polarisIcons).forEach((key) => {
    delete polarisIcons[key];
  });

  Object.assign(polarisIcons, newData);
}
