// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
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
    icon({
      include: 'icons/polaris/*.svg',
      exclude: 'node_modules/**',
    }),
  ],
};

export default rollupConfig;
