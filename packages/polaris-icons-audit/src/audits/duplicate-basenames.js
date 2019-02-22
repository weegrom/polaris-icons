const path = require('path');
const tryRequire = require('try-require');

// If @shopify/polaris-icons is available to be required, check them too
const polarisIcons = tryRequire('@shopify/polaris-icons') || {};

function audit({filenames}) {
  const iconSuffixRegex = /([-_]major|[-_]minor|[-_]spot|Major|Minor|Spot)$/;

  const polarisIconsFilenames = Object.keys(polarisIcons).map((importKey) => {
    return `@shopify/polaris-icons/${importKey}.svg`;
  });
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

  const duplicatedDependentsByBasename = Object.keys(
    dependentsByBasename,
  ).reduce((memo, filename) => {
    if (dependentsByBasename[filename].length > 1) {
      memo[filename] = dependentsByBasename[filename];
    }
    return memo;
  }, {});

  const duplicatedBasenames = Object.keys(duplicatedDependentsByBasename);
  const duplicatedBasenamesCount = duplicatedBasenames.length;

  return {
    summary: `Found ${duplicatedBasenamesCount} basenames shared by multiple files`,
    status: duplicatedBasenamesCount > 0 ? 'warning' : 'pass',
    info: duplicatedBasenames
      .map((basename) => {
        const count = duplicatedDependentsByBasename[basename].length;

        const filesStr = duplicatedDependentsByBasename[basename]
          .map((file) => `    ${file}`)
          .join('\n');

        return `  ${basename} is used in ${count} files:\n${filesStr}`;
      })
      .join('\n'),
  };
}

audit.auditName = 'duplicate-basenames';
module.exports = audit;
