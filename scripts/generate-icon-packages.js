// Generates polaris-icons's index.ts file based upon the svgs in polaris-icons-raw

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsYaml = require('js-yaml');

const iconBasePath = path.resolve(
  __dirname,
  '../packages/polaris-icons-raw/icons/polaris',
);

const preamble = `// DO NOT MANUALLY EDIT THIS FILE
// This file was automatically generated
// Run 'yarn run generate-icon-packages' from the root of the monorepo to generate a new version`;

const allSvgExports = glob
  .sync('*.yml', {cwd: iconBasePath})
  .reduce((memo, filename) => {
    const {packageName, exportStrings} = exportsForMetadata(filename);

    if (!memo[packageName]) {
      memo[packageName] = [];
    }

    memo[packageName].push(...exportStrings);

    return memo;
  }, {});

Object.entries(allSvgExports).forEach(([packageName, exportStrings]) => {
  const allSvgExportsString = exportStrings.join('\n\n');
  fs.writeFileSync(
    indexFilePath(packageName),
    `${preamble}\n\n${allSvgExportsString}\n`,
  );
});

function indexFilePath(packageName) {
  return path.resolve(__dirname, `../packages/${packageName}/src/index.ts`);
}

function exportsForMetadata(filename) {
  const metadata = jsYaml.safeLoad(
    fs.readFileSync(`${iconBasePath}/${filename}`, 'utf8'),
  );

  const packageName = metadata.public
    ? 'polaris-icons'
    : 'polaris-icons-internal';

  const exportStrings = findAllPresentStyles(filename).reduce(
    (memo, [exportName, exportFile, styleSuffix]) => {
      return memo.concat(
        [mainExportString(exportName, exportFile, metadata.deprecated)],
        (metadata.deprecated_aliases || [])
          .map((deprecatedAlias) => `${deprecatedAlias}${styleSuffix}`)
          .map((deprecatedBaseName) =>
            aliasExportString(exportName, exportFile, deprecatedBaseName),
          ),
      );
    },
    [],
  );

  return {packageName, exportStrings};
}

function findAllPresentStyles(filename) {
  const filenamePrefix = path.basename(filename, path.extname(filename));

  return glob
    .sync(`${filenamePrefix}{,*}.svg`, {cwd: iconBasePath})
    .map((svgFilename) => {
      const styleSuffix = svgFilename
        .slice(filenamePrefix.length)
        .replace(/\.svg$/, '');

      return [filenameToExportName(svgFilename), svgFilename, styleSuffix];
    });
}

function mainExportString(exportName, exportFile, isDeprecated) {
  return exportString(exportName, exportFile, isDeprecated ? '' : undefined);
}

function aliasExportString(exportName, exportFile, deprecatedBaseName) {
  return exportString(
    filenameToExportName(deprecatedBaseName),
    exportFile,
    exportName,
  );
}

/**
 * Capitalizes the first letter and any letter following a hyphen or underscore
 * and removes hyphens and underscores
 *
 * E.g. viewport-wide_major_monotone becomes ViewportWideMajorMonotone.
 */
function filenameToExportName(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/(?:^|[-_])([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 *
 * @param {*} exportedName
 * @param {*} filename
 * @param {undefined|string} replaceWith
 *   If undefined then the current export is not deprecated.
 *   If an empty string then the current export is deprected with no replacement.
 *   If a non-empty string then the current export is deprecated with a replacement.
 */
function exportString(exportedName, filename, replaceWith) {
  const replaceWithSuffix = replaceWith ? ` Use ${replaceWith} instead.` : '';
  const deprecatedNotice =
    replaceWith === undefined
      ? ''
      : `/** @deprecated ${exportedName} will be removed in the next major version.${replaceWithSuffix} */\n`;

  return `${deprecatedNotice}export {
  default as ${exportedName},
} from '@shopify/polaris-icons-raw/icons/polaris/${filename}';`;
}
