const fs = require('fs');
const path = require('path');
const madge = require('madge');

async function handler(options) {
  const {baseDir, tsConfig, out} = options;

  const result = await madge(baseDir, {
    tsConfig,
    fileExtensions: ['js', 'jsx', 'ts', 'tsx', 'svg', 'scss', 'json'],
    excludeRegExp: [/^node_modules/],
  });

  const skipped = result.warnings().skipped;
  if (skipped.length) {
    const isSingular = skipped.length === 1;
    process.stderr.write(
      `Skipped ${skipped.length} ${isSingular ? 'file' : 'files'}:\n`,
    );

    skipped.forEach((file) => {
      process.stderr.write(`  ${file}\n`);
    });
  }

  const resultString = JSON.stringify(
    {baseDir: path.resolve(baseDir), tree: result.tree},
    null,
    2,
  );
  if (out) {
    fs.writeFileSync(out, `${resultString}\n`);
    console.log(`Wrote data to file: ${out}`);
  } else {
    console.log(resultString);
  }
}

module.exports = {
  command: 'collect <baseDir>',
  describe: 'collect information for a directory',
  builder: {
    'ts-config': {
      alias: 't',
      requiresArg: true,
      describe: 'path to the TS config',
    },
    out: {
      alias: 'o',
      requiresArg: true,
      describe: 'Path to store file output',
    },
  },
  handler,
};
