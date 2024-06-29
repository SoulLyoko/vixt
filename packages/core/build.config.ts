import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['vite', 'pathe', 'fs-extra', 'defu', 'pkg-types', 'mlly', 'c12'],
})
