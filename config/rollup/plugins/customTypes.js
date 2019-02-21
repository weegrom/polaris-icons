import {writeFileSync} from 'fs';
import {createFilter} from 'rollup-pluginutils';
import {parse, traverse} from '@babel/core';

function generateTypesFile(iconExports) {
  return iconExports
    .map(
      (exportName) =>
        `export declare const ${exportName}: React.SFC<React.SVGProps<SVGSVGElement>>;`,
    )
    .join('\n');
}

export default function icon(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const iconExports = [];

  return {
    name: 'shopify-icon',

    transform(source, id) {
      if (filter(id)) {
        const ast = parse(source, {filename: id});

        traverse(ast, {
          ExportNamedDeclaration(path) {
            const exportDeclarationName = path.node.specifiers
              .filter((obj) => obj.local.name === 'default')
              .map((obj) => obj.exported.name);
            iconExports.push(...exportDeclarationName);
          },
        });
      }

      return null;
    },
    buildEnd() {
      const typesFileContent = generateTypesFile(iconExports);
      writeFileSync('index.d.ts', typesFileContent);
    },
  };
}
