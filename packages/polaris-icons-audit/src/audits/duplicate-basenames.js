const path = require('path');
const tryRequire = require('try-require');

// If @shopify/polaris-icons is available to be required, check them too
const polarisIcons = tryRequire('@shopify/polaris-icons') || {};

function audit({filenames}) {
  const iconSuffixRegex = /[-_]?(major|minor|spot)(?:[-_]?(monotone|twotone))?$/i;

  const polarisIconsFilenames = Object.keys(polarisIcons).map(
    (importKey) => `@shopify/polaris-icons/${importKey}.svg`,
  );
  filenames.unshift(...polarisIconsFilenames);

  const dependentsByBasename = filenames.reduce((memo, filename) => {
    const baseFilename = path
      .basename(filename, path.extname(filename))
      .replace(iconSuffixRegex, '')
      .toLowerCase();

    if (!memo.hasOwnProperty(baseFilename)) {
      memo[baseFilename] = [];
    }
    memo[baseFilename].push(filename);

    return memo;
  }, {});

  const duplicatedDependentsByBasename = Object.entries(
    dependentsByBasename,
  ).reduce((memo, [basename, dependents]) => {
    if (dependents.length > 1) {
      memo[basename] = dependents;
    }
    return memo;
  }, {});

  const duplicatedBasenamesCount = Object.keys(duplicatedDependentsByBasename)
    .length;

  return {
    summary: `Found ${duplicatedBasenamesCount} basenames shared by multiple files`,
    status: duplicatedBasenamesCount > 0 ? 'warning' : 'pass',
    info: Object.entries(duplicatedDependentsByBasename)
      .map(([basename, duplicatedDependents]) => {
        const count = duplicatedDependents.length;

        const filesStr = duplicatedDependents
          .map((file) => `    ${file}`)
          .join('\n');

        return `  ${basename} is used in ${count} files:\n${filesStr}`;
      })
      .join('\n'),
  };
}

audit.auditName = 'duplicate-basenames';
module.exports = audit;
