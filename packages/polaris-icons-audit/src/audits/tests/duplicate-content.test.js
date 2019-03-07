const fs = require('fs');
const React = require('react');
const polarisIcons = require('@shopify/polaris-icons');
const duplicateBasenames = require('../duplicate-content');

jest.mock('@shopify/polaris-icons', () => ({}));

function generateContentObject(filenames) {
  const fixtureDir = `${__dirname}/../../../tests/fixtures/duplicate-content`;

  return filenames.reduce((memo, filename) => {
    return Object.assign(memo, {
      [filename]: fs.readFileSync(`${fixtureDir}/${filename}`, 'utf8'),
    });
  }, {});
}

describe('duplicate-content audit', () => {
  beforeAll(() => {
    setPolarisIconsMockData({});
  });

  it('has a name', () => {
    expect(duplicateBasenames.auditName).toEqual('duplicate-content');
  });

  it('sets a pass status when there are no warnings', () => {
    const filenames = ['icon1.svg', 'icon2.svg'];
    const contentPerFilename = generateContentObject(filenames);

    expect(duplicateBasenames({filenames, contentPerFilename})).toEqual({
      summary: 'Found 0 content hashes shared by multiple files',
      status: 'pass',
      info: '',
    });
  });

  it('warns when there is duplicate content', () => {
    const filenames = ['icon1.svg', 'icon2.svg', 'icon3.svg', 'icon4.svg'];
    const contentPerFilename = generateContentObject(filenames);

    expect(duplicateBasenames({filenames, contentPerFilename})).toEqual({
      summary: 'Found 2 content hashes shared by multiple files',
      status: 'error',
      info: `  842c10e94df137b85999d5e25816fdd1 matches content used in 2 files:
    icon1.svg
    icon3.svg
  bc6cf0094c273a93406db7f5333668ee matches content used in 2 files:
    icon2.svg
    icon4.svg`,
    });
  });

  describe('when @shopify/polaris-icons has content', () => {
    function MockIcon(props) {
      return React.createElement(
        'svg',
        props,
        // eslint-disable-next-line id-length
        React.createElement('path', {d: 'M4 7l-3 3 9 9 3-3z'}),
      );
    }

    beforeAll(() => {
      setPolarisIconsMockData({MockIcon});
    });

    it('compares against polaris-icon content', () => {
      const filenames = ['icon1.svg'];
      const contentPerFilename = generateContentObject(filenames);
      expect(duplicateBasenames({filenames, contentPerFilename})).toEqual({
        summary: 'Found 1 content hashes shared by multiple files',
        status: 'error',
        info: `  842c10e94df137b85999d5e25816fdd1 matches content used in 2 files:
    @shopify/polaris-icons/MockIcon.svg
    icon1.svg`,
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
