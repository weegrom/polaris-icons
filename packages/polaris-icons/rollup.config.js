// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import icon from '../../config/rollup/plugins/icon';

const rollupConfig = {
  input: 'js/index.ts',
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
  plugins: [
    typescript({
      module: 'ESNext',
      useTsconfigDeclarationDir: true,
      cacheRoot: './build/cache/rts2'
    }),
    resolve(),
    icon(),
  ],
};

export default rollupConfig;
