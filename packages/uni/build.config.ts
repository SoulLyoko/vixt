import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    '@dcloudio/vite-plugin-uni',
    '@vue/compiler-sfc',
    'defu',
    'fs-extra',
    'local-pkg',
    'mlly',
    'pathe',
    'pinia-plugin-persistedstate',
    'unocss/vite',
    'unplugin-auto-import',
    'unplugin-auto-import/vite',
    'vite',
  ],
})
