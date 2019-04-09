const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jsYaml = require('js-yaml');

const iconBasePath = path.resolve(
  __dirname,
  '../packages/polaris-icons-raw/icons/polaris',
);

const allDeprecationsString = glob
  .sync('*.yml', {cwd: iconBasePath})
  .reduce(
    (memo, filename) => memo.concat(deprecationsForMetadata(filename)),
    [],
  )
  .join('\n');

if (allDeprecationsString) {
  console.log(
    `The following deprecations and aliases were found.
If you are releasing a major version please consider removing them first.

${allDeprecationsString}`,
  );
} else {
  console.log('No depreacted icons or aliases were found');
}

function deprecationsForMetadata(filename) {
  const metadata = jsYaml.safeLoad(
    fs.readFileSync(`${iconBasePath}/${filename}`, 'utf8'),
  );

  const deprecations = [];

  if (metadata.deprecated) {
    deprecations.push(`"${filename}" is deprecated without a replacement`);
  }

  if (metadata.deprecated_aliases) {
    deprecations.push(
      ...metadata.deprecated_aliases.map((deprecatedAlias) => {
        return `"${filename}" contains a deprecated alias "${deprecatedAlias}"`;
      }),
    );
  }

  return deprecations;
}
