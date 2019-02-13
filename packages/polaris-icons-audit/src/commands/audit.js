const chalk = require('chalk');
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
        result,
      }));
    });

  const auditResults = await Promise.all(auditPromises);
  const output = auditResults.map(outputResult).join('\n\n\n');

  process.exitCode = auditResults.some(auditHasError) ? 1 : 0;
  console.log(output);
}

function auditHasError({result}) {
  return result.status === 'error';
}

function outputResult({name, result}) {
  const statusCol = statusColor(result.status);
  let rtn = chalk`{${statusCol} [${result.status}] ${name}}: ${result.summary}`;

  if (result.info && result.info.length) {
    rtn += `\n${result.info}`;
  }

  return rtn;
}

function statusColor(status) {
  const lookup = {
    pass: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
  };

  return lookup.hasOwnProperty(status) ? lookup[status] : 'red';
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
