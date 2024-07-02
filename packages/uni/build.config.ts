import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['@dcloudio/vite-plugin-uni', 'defu', 'mlly', 'fs-extra', 'pathe', 'vite'],
})
