/* eslint-disable node/no-extraneous-require */
const fs = require('fs');
const path = require('path');

const jsYaml = require('js-yaml');
const _ = require('lodash');
const marked = require('marked');

// Fork of https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-yaml

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  getNodes,
}) {
  const isIconMetadatafile =
    node.internal.mediaType === 'text/yaml' &&
    node.dir.endsWith('polaris-icons-raw/icons/polaris');

  if (!isIconMetadatafile) {
    return;
  }

  const metadata = jsYaml.load(await loadNodeContent(node));
  const basename = path.basename(node.base, '.yml');

  const monotoneSvgPath = node.absolutePath.replace(
    /\.yml$/,
    metadata.set === 'major' ? '_monotone.svg' : '.svg',
  );
  const twotoneSvgPath = node.absolutePath.replace(/\.yml$/, '_twotone.svg');

  const yamlNode = {
    ...metadata,
    basename,
    reactname: _.upperFirst(_.camelCase(basename)),
    id: createNodeId(`${node.id} Icon Metadata`),
    children: [],
    parent: node.id,
    descriptionHtml: marked(metadata.description),
    styles: {
      monotone: dataForSvg(getNodes, monotoneSvgPath),
      twotone: dataForSvg(getNodes, twotoneSvgPath),
    },
    internal: {
      contentDigest: createContentDigest(metadata),
      type: 'PolarisYaml',
    },
  };

  actions.createNode(yamlNode);
  actions.createParentChildLink({parent: node, child: yamlNode});
}

function dataForSvg(getNodes, pathToSvg) {
  if (!fs.existsSync(pathToSvg)) {
    return undefined;
  }

  const svgFileNode = getNodes().find(
    (fileNode) => fileNode.absolutePath === pathToSvg,
  );

  return {
    svgContent: fs.readFileSync(pathToSvg, 'utf8'),
    // eslint-disable-next-line camelcase
    svgFile___NODE: svgFileNode.id,
  };
}

module.exports.onCreateNode = onCreateNode;
