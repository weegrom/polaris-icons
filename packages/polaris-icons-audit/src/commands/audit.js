const {readFileSync} = require('fs');
const audits = require('../audits');

function handler(options) {
  const {inFile, reports = ''} = options;
  const onlyShowReports = reports.length > 0 ? reports.split(',') : [];
  const showAllReports = onlyShowReports.length === 0;

  const {baseDir, tree} = JSON.parse(readFileSync(inFile, 'utf-8'));

  const dependents = depdendsTree(tree, (file) => file.endsWith('.svg'));

  const auditResults = audits
    .filter((auditFn) => {
      return showAllReports || onlyShowReports.includes(auditFn.auditName);
    })
    .map((auditFn) => {
      let filteredDependents = dependents;

      if (auditFn.filter) {
        filteredDependents = Object.keys(dependents).reduce((memo, name) => {
          if (auditFn.filter(name)) {
            memo[name] = dependents[name];
          }

          return memo;
        }, {});
      }

      return {
        name: auditFn.auditName,
        type: auditFn.type,
        result: auditFn({
          baseDir,
          filenames: Object.keys(filteredDependents),
          dependentsByFile: filteredDependents,
        }),
      };
    });

  const output = auditResults.map(outputResult).join('\n\n\n');
  console.log(output);
}

function depends(tree, id) {
  return Object.keys(tree).filter((dep) => tree[dep].includes(id));
}

function depdendsTree(tree, filter = () => true) {
  return Object.keys(tree)
    .filter(filter)
    .reduce((memo, id) => {
      memo[id] = depends(tree, id);
      return memo;
    }, {});
}

function outputResult({name, type, result}) {
  let rtn = `[${type}] ${name}: ${result.summary}`;

  if (result.info && result.info.length) {
    rtn += `\n${result.info}`;
  }

  return rtn;
}

module.exports = {
  command: 'audit <inFile>',
  describe: 'audit info gathered by collect command',
  builder: {
    reports: {
      type: 'string',
      describe: 'A comma-separated list of report names to run',
    },
  },
  handler,
};
