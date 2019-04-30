const fs = require('fs');
const iconContent = require('../icon-content');

function auditArgs(filenames) {
  const fixtureDir = `${__dirname}/../../../tests/fixtures/icon-content`;

  const contentPerFilename = filenames.reduce((memo, filename) => {
    return Object.assign(memo, {
      [filename]: fs.readFileSync(`${fixtureDir}/${filename}`, 'utf8'),
    });
  }, {});

  return {filenames, contentPerFilename};
}

describe('folder-names audit', () => {
  it('has a name', () => {
    expect(iconContent.auditName).toEqual('icon-content');
  });

  it('has a filter that applies to icons only', () => {
    const filteredFilenames = [
      'icons/icon1.svg',
      'images/image1.svg',
      'illustrations/image1.svg',
    ].filter(iconContent.filter);

    expect(filteredFilenames).toEqual(['icons/icon1.svg']);
  });

  it('sets a pass status when there are no warnings', () => {
    expect(iconContent(auditArgs(['valid.svg']))).toEqual({
      summary: 'Found 0 icon svgs with unexpected content',
      status: 'pass',
      info: '',
    });
  });

  it('warns about icons that have an invalid xml namespace', () => {
    expect(iconContent(auditArgs(['invalid-xmlns.svg']))).toEqual({
      summary: 'Found 1 icon svgs with unexpected content',
      status: 'warn',
      info: `  invalid-xmlns.svg has 1 issues:
    Has xmlns of "undefined" on the <svg> element but expected "http://www.w3.org/2000/svg"`,
    });
  });

  it('warns about icons that have an invalid viewbox', () => {
    expect(iconContent(auditArgs(['invalid-viewbox.svg']))).toEqual({
      summary: 'Found 1 icon svgs with unexpected content',
      status: 'warn',
      info: `  invalid-viewbox.svg has 1 issues:
    Has a viewbox of "0 0 32 32" but expected "0 0 20 20" or "0 0 41 41"`,
    });
  });

  it('warns about icons that use invalid fill colors', () => {
    expect(iconContent(auditArgs(['invalid-fill.svg']))).toEqual({
      summary: 'Found 1 icon svgs with unexpected content',
      status: 'warn',
      info: `  invalid-fill.svg has 1 issues:
    Has elements that use a fill that is not "#637381" or "#212B36" or "#FFF":
      <path fill="#BADA55" d="M4 7l-3 3 9 9 3-3z" />
      <path fill="#BEEF99" d="M4 7l-3 3 9 9 3-3z" />`,
    });
  });

  it('warns about multiple problems in multiple files', () => {
    const args = auditArgs([
      'invalid-xmlns.svg',
      'invalid-viewbox.svg',
      'invalid-fill.svg',
      'invalid-everything.svg',
    ]);

    expect(iconContent(args)).toEqual({
      summary: 'Found 4 icon svgs with unexpected content',
      status: 'warn',
      info: `  invalid-xmlns.svg has 1 issues:
    Has xmlns of "undefined" on the <svg> element but expected "http://www.w3.org/2000/svg"
  invalid-viewbox.svg has 1 issues:
    Has a viewbox of "0 0 32 32" but expected "0 0 20 20" or "0 0 41 41"
  invalid-fill.svg has 1 issues:
    Has elements that use a fill that is not "#637381" or "#212B36" or "#FFF":
      <path fill="#BADA55" d="M4 7l-3 3 9 9 3-3z" />
      <path fill="#BEEF99" d="M4 7l-3 3 9 9 3-3z" />
  invalid-everything.svg has 3 issues:
    Has xmlns of "undefined" on the <svg> element but expected "http://www.w3.org/2000/svg"
    Has a viewbox of "undefined" but expected "0 0 20 20" or "0 0 41 41"
    Has elements that use a fill that is not "#637381" or "#212B36" or "#FFF":
      <path fill="#BADA55" d="M4 7l-3 3 9 9 3-3z" />
      <path fill="#BEEF99" d="M4 7l-3 3 9 9 3-3z" />`,
    });
  });
});
