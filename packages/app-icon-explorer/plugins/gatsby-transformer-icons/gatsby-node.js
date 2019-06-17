/* eslint-disable import/no-extraneous-dependencies, babel/camelcase */
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

  // Add default values for fields that may be omitted
  const metadata = {
    deprecated: false,
    deprecated_aliases: [],
    ...jsYaml.load(await loadNodeContent(node)),
  };
  const metadataFilename = path.basename(node.base, '.yml');

  const monotoneSuffix = metadata.set === 'major' ? '_monotone' : '';
  const twotoneSuffix = '_twotone';

  const monotoneSvgPath = node.absolutePath.replace(
    /\.yml$/,
    `${monotoneSuffix}.svg`,
  );
  const twotoneSvgPath = node.absolutePath.replace(
    /\.yml$/,
    `${twotoneSuffix}.svg`,
  );

  // Use camelCase
  metadata.deprecatedAliases = metadata.deprecated_aliases;
  delete metadata.deprecated_aliases;

  const yamlNode = {
    ...metadata,
    metadataFilename,
    metadataId: pascalCase(metadataFilename),
    id: createNodeId(`${node.id} Icon Metadata`),
    children: [],
    parent: node.id,
    descriptionHtml: marked(metadata.description),
    styles: {
      monotone: dataForSvg(
        getNodes,
        monotoneSvgPath,
        metadata.deprecatedAliases.map((alias) => alias + monotoneSuffix),
      ),
      twotone: dataForSvg(
        getNodes,
        twotoneSvgPath,
        metadata.deprecatedAliases.map((alias) => alias + twotoneSuffix),
      ),
    },
    internal: {
      contentDigest: createContentDigest(metadata),
      type: 'PolarisYaml',
    },
  };

  actions.createNode(yamlNode);
  actions.createParentChildLink({parent: node, child: yamlNode});
}

function dataForSvg(getNodes, pathToSvg, deprecatedAliases) {
  if (!fs.existsSync(pathToSvg)) {
    return undefined;
  }

  const svgFileNode = getNodes().find(
    (fileNode) => fileNode.absolutePath === pathToSvg,
  );

  return {
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
