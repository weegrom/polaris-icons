const path = require('path');

function audit({filenames, dependentsByFile}) {
  const [indexSvgs, elsewhereSvgs, neverSvgs] = filenames.reduce(
    (memo, filename) => {
      const filenameDir = path.dirname(filename);

      if (dependentsByFile[filename].length === 0) {
        memo[2][filename] = [];
        return memo;
      }

      dependentsByFile[filename].forEach((dependent) => {
        const isImportedIntoIndex =
          filenameDir === path.dirname(dependent) &&
          path.basename(dependent, path.extname(dependent)) === 'index';

        const bucket = isImportedIntoIndex ? 0 : 1;
        if (!memo[bucket].hasOwnProperty(filename)) {
          memo[bucket][filename] = [];
        }
        memo[bucket][filename].push(dependent);
      });

      return memo;
    },
    [{}, {}, {}],
  );

  const indexCount = Object.keys(indexSvgs).length;
  const elsewhereCount = Object.keys(elsewhereSvgs).length;
  const neverCount = Object.keys(neverSvgs).length;

  const filenamesCount = filenames.length;

  return {
    summary: `Found ${filenamesCount} icons/*.svg files, ${indexCount} are imported into an index, ${elsewhereCount} are imported elsewhere, ${neverCount} are never imported`,
    info: [formatDependents(elsewhereSvgs), formatNotFound(neverSvgs)].join(
      '\n\n',
    ),
  };
}

function formatDependents(dependentsPerFile) {
  return Object.keys(dependentsPerFile)
    .reduce((memo, filename) => {
      const dependentsStr = dependentsPerFile[filename]
        .map(
          (dependent) =>
            `    ${path.relative(path.dirname(filename), dependent)}`,
        )
        .join('\n');

      memo.push(`  ${filename} is imported by:\n${dependentsStr}`);
      return memo;
    }, [])
    .join('\n\n');
}

function formatNotFound(dependentsPerFile) {
  return Object.keys(dependentsPerFile)
    .reduce((memo, filename) => {
      memo.push(`  ${filename} is never imported`);
      return memo;
    }, [])
    .join('\n\n');
}

audit.auditName = 'imported-by-index';
audit.type = 'info';
audit.filter = (filename) => filename.split('/').slice(-2)[0] === 'icons';
module.exports = audit;
