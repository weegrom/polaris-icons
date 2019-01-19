const path = require('path');

function audit({filenames}) {
  const iconSuffixRegex = /-(major|minor|spot)$/;

  const dependentsByBasename = filenames.reduce((memo, filename) => {
    const baseFilename = path
      .basename(filename, path.extname(filename))
      .replace(iconSuffixRegex, '');

    if (!(baseFilename in memo)) {
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
    summary: `Found ${duplicatedBasenamesCount} basenames that are shared by multiple files`,
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
audit.type = 'info';
module.exports = audit;
