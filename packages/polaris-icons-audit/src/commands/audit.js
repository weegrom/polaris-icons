const glob = require('glob');
const audits = require('../audits');

async function handler(options) {
  const {baseDir, reports = ''} = options;
  const onlyShowReports = reports.length > 0 ? reports.split(',') : [];
  const showAllReports = onlyShowReports.length === 0;

  const dependents = glob.sync('**/*.svg', {cwd: baseDir});

  const auditPromises = audits
    .filter((auditFn) => {
      return showAllReports || onlyShowReports.includes(auditFn.auditName);
    })
    .map((auditFn) => {
      const filterFn = auditFn.filter ? auditFn.filter : () => true;
      const filenames = dependents.filter(filterFn);

      return Promise.resolve(
        auditFn({
          baseDir,
          filenames,
        }),
      ).then((result) => ({
        name: auditFn.auditName,
        type: auditFn.type,
        result,
      }));
    });

  const auditResults = await Promise.all(auditPromises);
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
  command: 'audit <baseDir>',
  describe: 'audit svgs in a given folder',
  builder: {
    reports: {
      type: 'string',
      describe: 'A comma-separated list of report names to run',
    },
  },
  handler,
};
