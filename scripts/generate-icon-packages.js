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
  .concat(aliasExports())
  .join('\n\n');

fs.writeFileSync(indexFilePath, `${preamble}\n\n${allSvgExportsString}\n`);

function filenameToExport(filename) {
  return exportString(
    exportName(path.basename(filename, path.extname(filename))),
    filename,
  );
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

function exportString(exportedName, filename) {
  return `export {
  default as ${exportedName},
} from '@shopify/polaris-icons-raw/icons/polaris/${filename}';`;
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

function aliasExports() {
  const aliases = [
    ['ArrowUpDownMinor', 'select_minor.svg'],
    ['ColorMajorMonotone', 'colors_major_monotone.svg'],
    ['SidebarMajorMonotone', 'sidebar-left_major_monotone.svg'],
  ];

  return aliases.map(([exportedName, filename]) => {
    const useInstead = exportName(
      path.basename(filename, path.extname(filename)),
    );
    const deprecatedNotice = `/** @deprecated ${exportedName} will be removed in the next major verison. Use ${useInstead} instead */`;

    return `${deprecatedNotice}\n${exportString(exportedName, filename)}`;
  });
}
