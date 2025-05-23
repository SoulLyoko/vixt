import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    '@dcloudio/vite-plugin-uni',
    'defu',
    'fs-extra',
    'local-pkg',
    'mlly',
    'pathe',
    'pinia',
    'pinia-plugin-persistedstate',
    'unocss/vite',
    'unplugin-auto-import',
    'unplugin-auto-import/vite',
    'vite',
    'vue',
  ],
})
