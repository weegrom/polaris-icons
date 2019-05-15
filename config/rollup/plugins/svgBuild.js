import fs from 'fs';
import path from 'path';
import convert from '@svgr/core';
import {svgOptions} from '@shopify/images/optimize';
import {createFilter} from 'rollup-pluginutils';
import SvgoBuilder from 'svgo';

/**
 * A rollup plugin that acts upon SVG files. It will:
 *
 * - Run our SVGO optimisation config over the svg contents
 * - Write the svg to the specified `outputFolder`, for people that wish to use
 *   the raw icons
 * - Pass the optimized svg into SVGr and return the result so that rollup can
 *   inline the result into js output, for people who wish to import React
 *   components from the index file
 */
export default function svgrPlugin(options = {}) {
  const filter = createFilter(options.include || '**/*.svg', options.exclude);

  const svgoConfig = svgOptions();
  if (options.replaceFill) {
    svgoConfig.plugins.push({
      replaceFillAttibute: replaceFillAttributeSvgoPlugin(options.replaceFill),
    });
  }

  const svgo = new SvgoBuilder(svgoConfig);
  const optimizedSvgs = [];

  return {
    name: 'svgBuild',
    async transform(source, id) {
      if (!filter(id) || id.slice(-4) !== '.svg') {
        return null;
      }

      const rawSvg = fs.readFileSync(id, 'utf8');
      const optimizedSvg = (await svgo.optimize(rawSvg, {path: id})).data;

      optimizedSvgs.push({id, optimizedSvg});

      const svgrState = {filePath: id, caller: {name: 'svgBuild'}};
      const jsCode = await convert(optimizedSvg, {}, svgrState);

      return {
        code: jsCode,
        ast: {
          type: 'Program',
          sourceType: 'module',
          start: 0,
          end: null,
          body: [],
        },
        map: {mappings: ''},
      };
    },
    buildEnd() {
      if (!fs.existsSync(options.outputFolder)) {
        fs.mkdirSync(options.outputFolder);
      }

      optimizedSvgs.forEach(({id, optimizedSvg}) => {
        fs.writeFileSync(
          `${options.outputFolder}/${path.basename(id)}`,
          optimizedSvg,
        );
      });
    },
  };
}

/**
 * An SVGO plugin that applies a transform function to every fill attribute
 * in an SVG. This lets you replace fill colors or remove them entirely.
 */
function replaceFillAttributeSvgoPlugin(options) {
  return {
    type: 'perItem',
    name: 'replaceFillAttibute',
    description: 'replaces fill attributes using a user-defined function',
    params: options,
    fn(item, {transform}) {
      if (!item.isElem()) {
        return;
      }

      const fillAttr = item.attr('fill');
      if (!fillAttr) {
        return;
      }

      const transformedFill = transform(fillAttr.value);
      if (transformedFill === '') {
        item.removeAttr('fill');
      } else {
        fillAttr.value = transformedFill;
      }
    },
  };
}
