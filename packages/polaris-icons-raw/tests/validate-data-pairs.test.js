const path = require('path');
const glob = require('glob');

const nameRegex = /(.+_(?:major|minor|spot))(?:_(monotone|twotone))?(?:\.(svg|yml))/;

const allFiles = glob
  .sync(path.resolve(__dirname, '../icons/*/*.{svg,yml}'))
  .reduce((memo, filePath) => {
    const [, name, style = 'monotone', extension] =
      nameRegex.exec(path.basename(filePath)) || [];

    const key =
      extension === 'yml'
        ? extension
        : [extension, style].filter(Boolean).join('.');

    if (!memo.hasOwnProperty(name)) {
      memo[name] = {};
    }

    memo[name][key] = true;
    return memo;
  }, {});

Object.entries(allFiles).forEach(([basename, data]) => {
  describe(`Metadata and SVG Pairs: ${basename}`, () => {
    it(`has an svg file and a yml file`, () => {
      const expectedData = {yml: true, 'svg.monotone': true};

      if (basename.includes('_major')) {
        expectedData['svg.twotone'] = true;
      }

      expect(data).toEqual(expectedData);
    });
  });
});
