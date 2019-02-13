const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');
const {svgOptions} = require('@shopify/images/optimize');
const polarisIcons = require('@shopify/polaris-icons');

const svgo = new SVGO(svgOptions());

const VIEWBOX_REGEX = /viewBox="([^"]*)"/;
const SVG_REGEX = /(<svg[^>]*>|<\/svg>)/g;
const FILL_REGEX = /fill="[^"]*"/g;

async function audit({filenames, baseDir}) {
  const polarisIconsContentsPerFilename = Object.keys(polarisIcons).reduce(
    (memo, importKey) => {
      memo[`@shopify/polaris-icons/${importKey}.svg`] = polarisIcons[importKey];
      return memo;
    },
    {},
  );
  filenames.unshift(...Object.keys(polarisIconsContentsPerFilename));

  const contentsPerFilenamePromises = filenames.map((filename) => {
    return filename.startsWith('@shopify/polaris-icons')
      ? Promise.resolve(polarisIconsContentsPerFilename[filename])
      : optimizedSvgFile(path.join(baseDir, filename));
  });
  const contentsPerFilename = await Promise.all(contentsPerFilenamePromises);

  const dependentsByHash = filenames.reduce((memo, filename, i) => {
    const fileContents = contentsPerFilename[i];
    const contentHash = md5String(JSON.stringify(fileContents));

    if (!memo.hasOwnProperty(contentHash)) {
      memo[contentHash] = [];
    }
    memo[contentHash].push(filename);

    return memo;
  }, {});

  const duplicatedDependentsByHash = Object.keys(dependentsByHash).reduce(
    (memo, filename) => {
      if (dependentsByHash[filename].length > 1) {
        memo[filename] = dependentsByHash[filename];
      }
      return memo;
    },
    {},
  );

  const duplicatedHashes = Object.keys(duplicatedDependentsByHash);
  const duplicatedHashesCount = duplicatedHashes.length;

  return {
    summary: `Found ${duplicatedHashesCount} content hashes that are shared by multiple files`,
    status: duplicatedHashesCount > 0 ? 'error' : 'pass',
    info: duplicatedHashes
      .map((hash) => {
        const count = duplicatedDependentsByHash[hash].length;

        const filesStr = duplicatedDependentsByHash[hash]
          .map((file) => `    ${file}`)
          .join('\n');

        return `  ${hash} matches content used in ${count} files:\n${filesStr}`;
      })
      .join('\n'),
  };
}

function md5String(string) {
  return crypto
    .createHash('md5')
    .update(string)
    .digest('hex');
}

async function optimizedSvgFile(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const result = await svgo.optimize(source);

  const finalSource = result.data.replace(FILL_REGEX, (fill) => {
    return fill.includes('#FFF') ? 'fill="currentColor"' : '';
  });

  const vb = VIEWBOX_REGEX.exec(finalSource);
  const viewBox = vb ? vb[1] : '';
  return {
    viewBox,
    body: finalSource.replace(SVG_REGEX, ''),
  };
}

audit.auditName = 'duplicate-content';
module.exports = audit;
