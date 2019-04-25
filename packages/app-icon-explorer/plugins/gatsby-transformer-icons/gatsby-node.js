/* eslint-disable node/no-extraneous-require, camelcase */
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
    path.dirname(node.dir).endsWith('polaris-icons-raw/icons');

  if (!isIconMetadatafile) {
    return;
  }

  // Add default values for fields that may be omitted
  const metadata = {
    deprecated: false,
    deprecated_aliases: [],
    ...jsYaml.load(await loadNodeContent(node)),
  };
  const metadataFilename = path.basename(node.base, '.yml');

  const primaryStyleName = ['major', 'minor', 'spot'].includes(metadata.set)
    ? 'monotone'
    : 'image';

  const primarySuffix = metadata.set === 'major' ? '_monotone' : '';
  const twotoneSuffix = '_twotone';

  const primaryStyleSvgPath = node.absolutePath.replace(
    /\.yml$/,
    `${primarySuffix}.svg`,
  );
  const twotoneSvgPath = node.absolutePath.replace(
    /\.yml$/,
    `${twotoneSuffix}.svg`,
  );

  const yamlNode = {
    ...metadata,
    metadataFilename,
    metadataId: pascalCase(metadataFilename),
    id: createNodeId(`${node.id} Icon Metadata`),
    children: [],
    parent: node.id,
    descriptionHtml: marked(metadata.description),
    imageSize: sizeForSet(metadata.set),
    styles: [
      dataForSvg(
        getNodes,
        primaryStyleName,
        primaryStyleSvgPath,
        metadata.deprecated_aliases.map((alias) => alias + primarySuffix),
      ),
      dataForSvg(
        getNodes,
        'twotone',
        twotoneSvgPath,
        metadata.deprecated_aliases.map((alias) => alias + twotoneSuffix),
      ),
    ].filter(Boolean),
    internal: {
      contentDigest: createContentDigest(metadata),
      type: 'PolarisYaml',
    },
  };

  actions.createNode(yamlNode);
  actions.createParentChildLink({parent: node, child: yamlNode});
}

function sizeForSet(set) {
  const sizePerSet = {
    spot: [41, 41],
    payment: [40, 24],
  };

  return sizePerSet[set] ? sizePerSet[set] : [20, 20];
}

function dataForSvg(getNodes, styleName, pathToSvg, deprecatedAliases) {
  if (!fs.existsSync(pathToSvg)) {
    return undefined;
  }

  const svgFileNode = getNodes().find(
    (fileNode) => fileNode.absolutePath === pathToSvg,
  );

  return {
    styleName,
    importName: pascalCase(path.basename(svgFileNode.base, svgFileNode.ext)),
    deprecatedImportNames: deprecatedAliases.map(pascalCase),
    svgContent: fs.readFileSync(pathToSvg, 'utf8'),
    svgFile___NODE: svgFileNode.id,
  };
}

function pascalCase(string) {
  return _.upperFirst(_.camelCase(string));
}

module.exports.onCreateNode = onCreateNode;
