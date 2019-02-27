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
  if (node.internal.mediaType !== `text/yaml`) {
    return;
  }
  const {createNode, createParentChildLink} = actions;
  const content = await loadNodeContent(node);
  const parsedContent = jsYaml.load(content);

  function transformObject(obj, id, type) {
    const basename = path.basename(node.base, '.yml');

    const pathToSvg = node.absolutePath.replace(/\.yml$/, '.svg');
    const svgFileNode = getNodes().find(
      (fileNode) => fileNode.absolutePath === pathToSvg,
    );
    const reactname = _.upperFirst(_.camelCase(basename));

    const yamlNode = Object.assign(obj, {
      basename,
      reactname,
      id,
      children: [],
      parent: node.id,
      svgContent: fs.readFileSync(pathToSvg, 'utf8'),
      // eslint-disable-next-line camelcase
      svgFile___NODE: svgFileNode.id,
      descriptionHtml: marked(obj.description),
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    });

    createNode(yamlNode);
    createParentChildLink({parent: node, child: yamlNode});
  }

  transformObject(
    parsedContent,
    parsedContent.id ? parsedContent.id : createNodeId(`${node.id} >>> YAML`),
    _.upperFirst(_.camelCase(`${path.basename(node.dir)} Yaml`)),
  );
}

module.exports.onCreateNode = onCreateNode;
