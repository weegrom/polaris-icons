const fs = require('fs');
const path = require('path');
const glob = require('glob');
const unified = require('unified');
const parse = require('rehype-parse');
const {select, selectAll} = require('hast-util-select');

const nameRegex = /(?<=_)(major|minor|spot)(?:_(monotone|twotone))?(?=\.svg)/;

const allIconFiles = glob
  .sync(path.resolve(__dirname, '../icons/polaris/*.svg'))
  .map((absoluteIconPath) => {
    // We don't care about the first item, only the groups matches
    const [, set, style] = nameRegex.exec(absoluteIconPath) || [];

    const iconSource = fs.readFileSync(absoluteIconPath, 'utf-8');

    return {
      iconPath: path.relative(`${__dirname}/../..`, absoluteIconPath),
      iconSource,
      iconAst: unified()
        .use(parse, {fragment: true, space: 'svg'})
        .parse(iconSource),
      expectedViewbox: expectedViewboxForSet(set),
      expectedFillColors: expectedFillsForStyle(style),
    };
  });

allIconFiles.forEach(
  ({iconPath, iconSource, iconAst, expectedViewbox, expectedFillColors}) => {
    describe(`SVG Contents: packages/${iconPath}`, () => {
      it(`has an xml namespace`, () => {
        const xmlns = select(':root', iconAst).properties.xmlns;
        expect(xmlns).toEqual('http://www.w3.org/2000/svg');
      });

      it(`has a viewbox of "${expectedViewbox}"`, () => {
        const viewBox = select(':root', iconAst).properties.viewBox;
        expect(viewBox).toEqual(expectedViewbox);
      });

      it('has no groups (<g>) or masks (<mask>)', () => {
        const groupNodes = selectAll('g, mask', iconAst);

        expect(nodeSources(groupNodes, iconSource)).toEqual([]);
      });

      it('tags are self-closing whenever possible', () => {
        const allNodes = selectAll('*', iconAst);
        const allNodeStrings = nodeSources(allNodes, iconSource);

        allNodes.forEach((node, i) => {
          if (node.children.length === 0) {
            expect(allNodeStrings[i].includes(`</${node.tagName}>`)).toBe(
              false,
            );
          }
        });
      });

      it('only has <path>s, <polygon>s and <circle>s with an explict fill color', () => {
        const nodesWithUndefinedFill = selectAll(
          'path:not([fill]), circle:not([fill]), polygon:not([fill])',
          iconAst,
        );

        expect(nodeSources(nodesWithUndefinedFill, iconSource)).toEqual([]);
      });

      it('only has <path>s that only use the [d, fill, fill-rule] attributes', () => {
        const allowedAttributes = ['d', 'fill', 'fillRule'];

        const nodesWithDisallowedAttributes = selectAll('path', iconAst).filter(
          (node) => {
            const propIsAllowed = (prop) => !allowedAttributes.includes(prop);
            return Object.keys(node.properties).some(propIsAllowed);
          },
        );

        expect(nodeSources(nodesWithDisallowedAttributes, iconSource)).toEqual(
          [],
        );
      });

      it('only has <polygon>s that only use the [fill, points] attributes', () => {
        const allowedAttributes = ['fill', 'points'];

        const nodesWithDisallowedAttributes = selectAll(
          'polygon',
          iconAst,
        ).filter((node) => {
          const propIsAllowed = (prop) => !allowedAttributes.includes(prop);
          return Object.keys(node.properties).some(propIsAllowed);
        });

        expect(nodeSources(nodesWithDisallowedAttributes, iconSource)).toEqual(
          [],
        );
      });

      it('only has <circle>s that only use the [cx, cy, r, fill, fill-rule] attributes', () => {
        const allowedAttributes = ['cx', 'cy', 'r', 'fill', 'fillRule'];

        const nodesWithDisallowedAttributes = selectAll(
          'circle',
          iconAst,
        ).filter((node) => {
          const propIsAllowed = (prop) => !allowedAttributes.includes(prop);
          return Object.keys(node.properties).some(propIsAllowed);
        });

        expect(nodeSources(nodesWithDisallowedAttributes, iconSource)).toEqual(
          [],
        );
      });

      const expectedFillsString = expectedFillColors.join(',');
      it(`has no nodes that use fill colors other than [${expectedFillsString}]`, () => {
        const nodesWithInvalidFill = selectAll('[fill]', iconAst).filter(
          (node) => {
            return !expectedFillColors.includes(node.properties.fill);
          },
        );

        expect(nodeSources(nodesWithInvalidFill, iconSource)).toEqual([]);
      });
    });
  },
);

function expectedViewboxForSet(set) {
  const viewboxPerSet = {
    major: '0 0 20 20',
    minor: '0 0 20 20',
    spot: '0 0 41 41',
  };

  return viewboxPerSet[set];
}

function expectedFillsForStyle(style = 'monotone') {
  const fillsPerStyle = {
    monotone: ['#212B36', '#212b36'],
    twotone: ['#212B36', '#212b36', '#FFF', '#fff'],
  };

  return fillsPerStyle[style];
}

function nodeSources(nodes, iconSource) {
  return nodes.map((node) =>
    iconSource.substr(
      node.position.start.offset,
      node.position.end.offset - node.position.start.offset,
    ),
  );
}
