// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import icon from '../../config/rollup/plugins/icon';

const rollupConfig = {
  input: 'js/index.ts',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [
    typescript({
      module: 'ESNext',
      useTsconfigDeclarationDir: true,
    }),
    resolve(),
    icon(),
  ],
};

export default rollupConfig;
