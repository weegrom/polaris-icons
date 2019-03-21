// Generates polaris-icons's index.ts file based upon the svgs in polaris-icons-raw

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsYaml = require('js-yaml');

const iconBasePath = path.resolve(
  __dirname,
  '../packages/polaris-icons-raw/icons/polaris',
);

const indexFilePath = path.resolve(
  __dirname,
  '../packages/polaris-icons/src/index.ts',
);

const preamble = `// DO NOT MANUALLY EDIT THIS FILE
// This file was automatically generated
// Run 'yarn run generate-icon-packages' from the root of the monorepo to generate a new version`;

const allSvgExportsString = glob
  .sync('*.svg', {cwd: iconBasePath})
  .filter(isPublicIcon)
  .map(filenameToExport)
  .join('\n\n');

fs.writeFileSync(indexFilePath, `${preamble}\n\n${allSvgExportsString}\n`);

function filenameToExport(filename) {
  const basename = path.basename(filename, path.extname(filename));

  return `export {
  default as ${exportName(basename)},
} from '@shopify/polaris-icons-raw/icons/polaris/${filename}';`;
}

/**
 * Capitalizes the first letter and any letter following a hyphen or underscore
 * and removes hyphens and underscores
 *
 * E.g. viewport-wide_major_monotone becomes ViewportWideMajorMonotone,
 */
function exportName(name) {
  return name.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
    return letter.toUpperCase();
  });
}

function isPublicIcon(name) {
  const metadata = jsYaml.safeLoad(
    fs.readFileSync(
      `${iconBasePath}/${path.basename(name, path.extname(name))}.yml`,
      'utf8',
    ),
  );
  return metadata.public;
}
