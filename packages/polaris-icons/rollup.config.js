// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import customTypes from '../../config/rollup/plugins/customTypes';
import svgBuild from '../../config/rollup/plugins/svgBuild';

const WHITE_REGEX = /^#fff(?:fff)?$/i;

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
    svgBuild({
      include: '../polaris-icons-raw/**/*.svg',
      outputFolder: './images',
      replaceFill: {
        transform: (fill) => (WHITE_REGEX.test(fill) ? 'currentColor' : ''),
      },
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
