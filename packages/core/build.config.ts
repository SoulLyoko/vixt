import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: ['src/index.ts', 'src/client/index.ts'],
  externals: ['vite', 'pathe', 'fs-extra', 'defu', 'pkg-types', 'mlly', 'c12', 'tsx/esm', 'vue', 'vue-router', 'pinia', 'cac', '@vue/language-core'],
})
