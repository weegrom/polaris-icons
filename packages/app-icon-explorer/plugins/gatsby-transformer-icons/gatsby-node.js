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

  function transformObject(obj, id, type, pathToSvg, style) {
    const basename = `${path.basename(node.base, '.yml')}_${style}`;

    const svgFileNode = getNodes().find(
      (fileNode) => fileNode.absolutePath === pathToSvg,
    );
    const reactname = _.upperFirst(_.camelCase(basename));

    const yamlNode = {
      ...obj,
      basename,
      reactname,
      id,
      children: [],
      parent: node.id,
      style,
      svgContent: fs.readFileSync(pathToSvg, 'utf8'),
      // eslint-disable-next-line camelcase
      svgFile___NODE: svgFileNode.id,
      descriptionHtml: marked(obj.description),
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    };

    createNode(yamlNode);
    createParentChildLink({parent: node, child: yamlNode});
  }

  const monotoneSvgPath = node.absolutePath.replace(
    /\.yml$/,
    parsedContent.set === 'major' ? '_monotone.svg' : '.svg',
  );

  if (fs.existsSync(monotoneSvgPath)) {
    transformObject(
      parsedContent,
      createNodeId(`${node.id} >>> Monotone YAML`),
      _.upperFirst(_.camelCase(`${path.basename(node.dir)} Yaml`)),
      monotoneSvgPath,
      'monotone',
    );
  }

  const twotoneSvgPath = node.absolutePath.replace(/\.yml$/, '_twotone.svg');

  if (fs.existsSync(twotoneSvgPath)) {
    transformObject(
      parsedContent,
      createNodeId(`${node.id} >>> Twotone YAML`),
      _.upperFirst(_.camelCase(`${path.basename(node.dir)} Yaml`)),
      twotoneSvgPath,
      'twotone',
    );
  }
}

module.exports.onCreateNode = onCreateNode;
