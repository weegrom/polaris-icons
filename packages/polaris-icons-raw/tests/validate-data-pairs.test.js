const path = require('path');
const glob = require('glob');

const allFiles = glob
  .sync(path.resolve(__dirname, '../icons/polaris/*.{svg,yml}'))
  .reduce((memo, filePath) => {
    const extname = path.extname(filePath);
    const basename = path.basename(filePath, extname);

    if (!memo.hasOwnProperty(basename)) {
      memo[basename] = {};
    }

    memo[basename][extname.slice(1)] = true;
    return memo;
  }, {});

Object.entries(allFiles).forEach(([basename, data]) => {
  describe(`Metadata and SVG Pairs: ${basename}`, () => {
    it(`has an svg file and a yml file`, () => {
      expect(data).toEqual({svg: true, yml: true});
    });
  });
});
