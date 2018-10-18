// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import svgo from 'rollup-plugin-svgo';

export default {
  input: 'js/index.ts',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    typescript({
      module: 'ESNext',
    }),
    svgo(),
  ],
};