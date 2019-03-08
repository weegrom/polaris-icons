const unified = require('unified');
const parse = require('rehype-parse');
const {select, selectAll} = require('hast-util-select');

function audit({filenames, contentPerFilename}) {
  const resultsPerFilename = filenames.reduce((memo, filename) => {
    const iconSource = contentPerFilename[filename];
    const data = {
      iconSource,
      iconAst: unified()
        .use(parse, {fragment: true, space: 'svg'})
        .parse(iconSource),
    };

    const problematicResults = [
      testHasNamespace(data),
      testHasExpectedViewbox(data),
      testHasExpectedFillColors(data),
    ].filter((result) => Boolean(result));

    return Object.assign(
      memo,
      problematicResults.length ? {[filename]: problematicResults} : {},
    );
  }, {});

  const resultsPerFilenameCount = Object.keys(resultsPerFilename).length;

  return {
    summary: `Found ${resultsPerFilenameCount} icon svgs with unexpected content`,
    status: resultsPerFilenameCount > 0 ? 'warn' : 'pass',
    info: Object.entries(resultsPerFilename)
      .map(([filename, results]) => {
        const count = results.length;
        const filesStr = results.map((result) => `    ${result}`).join('\n');

        return `  ${filename} has ${count} issues:\n${filesStr}`;
      })
      .join('\n'),
  };
}

function testHasNamespace({iconAst}) {
  const xmlns = select(':root', iconAst).properties.xmlns;
  const isProblem = xmlns !== 'http://www.w3.org/2000/svg';

  return isProblem ? 'Has no xmlns attribute on the <svg> element' : '';
}

function testHasExpectedViewbox({iconAst}) {
  const expectedViewboxes = ['0 0 20 20', '0 0 41 41'];

  const viewBox = select(':root', iconAst).properties.viewBox;
  const isProblem = !expectedViewboxes.includes(viewBox);

  return isProblem
    ? `Has a viewbox of "${viewBox}" but expected "0 0 20 20" or "0 0 41 41"`
    : '';
}

function testHasExpectedFillColors({iconAst, iconSource}) {
  const expectedFillColors = ['#212B36', '#212b36', '#FFF', '#fff'];

  const nodesWithInvalidFill = selectAll('[fill]', iconAst).filter((node) => {
    return !expectedFillColors.includes(node.properties.fill);
  });

  const nodeStrs = nodeSources(nodesWithInvalidFill, iconSource);
  const problems = nodeStrs.map((nodeStr) => `      ${nodeStr}`).join('\n');

  return problems
    ? `Has elements that use a fill that is not "#212B36" or "#FFF":\n${problems}`
    : '';
}

function nodeSources(nodes, iconSource) {
  return nodes.map((node) =>
    iconSource.substr(
      node.position.start.offset,
      node.position.end.offset - node.position.start.offset,
    ),
  );
}

audit.auditName = 'icon-content';
audit.filter = (filename) => /(^|\/)icons\/.+\.svg$/.exec(filename);
module.exports = audit;
