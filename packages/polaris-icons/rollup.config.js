// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import svgr from '@svgr/rollup';
import {svgOptions} from '@shopify/images/optimize';
import customTypes from '../../config/rollup/plugins/customTypes';

const rollupConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'index.js',
      format: 'cjs',
    },
    {
      file: 'index.es.js',
      format: 'esm',
    },
  ],
  external: ['react'],
  onwarn: (warning, warn) => {
    // Unresolved imports means Rollup couldn't find an import, possibly because
    // we made a typo in the file name. Fail the build in that case so we know
    // when the library is no longer self-contained or we have bad imports
    if (warning.code === 'UNRESOLVED_IMPORT') {
      throw new Error(warning.message);
    }

    // Use default for everything else
    warn(warning);
  },
  plugins: [
    svgr({
      include: '../polaris-icons-raw/**/*.svg',
      exclude: 'node_modules/**',
      svgoConfig: svgOptions(),
      replaceAttrValues: {
        '#FFF': 'currentColor',
        '#fff': 'currentColor',
        '#637381': '{undefined}',
        '#212B36': '{undefined}',
        '#212b36': '{undefined}',
      },
      babel: false,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      envName: 'production',
    }),
    resolve({
      only: ['@shopify/polaris-icons-raw'],
    }),
    customTypes({
      include: 'src/index.ts',
    }),
  ],
};

export default rollupConfig;
