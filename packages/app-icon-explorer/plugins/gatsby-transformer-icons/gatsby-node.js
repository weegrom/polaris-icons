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
    node.dir.includes('/polaris-icons-raw/icons/');

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

  const primaryStyleSvgPath = node.absolutePath.replace(
    /\.yml$/,
    `${primarySuffix}.svg`,
  );

  const styles = [
    dataForSvg(
      getNodes,
      primaryStyleName,
      primaryStyleSvgPath,
      metadata.deprecated_aliases.map((alias) => alias + primarySuffix),
    ),
  ];

  if (metadata.set === 'major') {
    const twotoneSuffix = '_twotone';
    const twotoneSvgPath = node.absolutePath.replace(
      /\.yml$/,
      `${twotoneSuffix}.svg`,
    );

    if (fs.existsSync(twotoneSvgPath)) {
      styles.push(
        dataForSvg(
          getNodes,
          'twotone',
          twotoneSvgPath,
          metadata.deprecated_aliases.map((alias) => alias + twotoneSuffix),
        ),
      );
    }
  }

  const yamlNode = {
    ...metadata,
    metadataFilename,
    metadataId: pascalCase(metadataFilename),
    id: createNodeId(`${node.id} Icon Metadata`),
    children: [],
    parent: node.id,
    descriptionHtml: marked(metadata.description),
    imageSize: sizeForSet(metadata.set),
    styles,
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
    major: [20, 20],
    minor: [20, 20],
    spot: [41, 41],
    payment: [40, 24],
  };

  return sizePerSet[set];
}

function dataForSvg(getNodes, styleName, pathToSvg, deprecatedAliases) {
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
