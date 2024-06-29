import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['@dcloudio/vite-plugin-uni', 'defu', 'fs-extra', 'pathe', 'vite'],
})
