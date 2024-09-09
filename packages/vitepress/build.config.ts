import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: ['defu', 'pathe', 'fs-extra', 'vite', 'vitepress'],
})
