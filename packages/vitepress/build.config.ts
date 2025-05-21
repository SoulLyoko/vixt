import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    'defu',
    'pathe',
    'fs-extra',
    'pinia',
    'pinia-plugin-persistedstate',
    'unocss/vite',
    'unplugin-auto-import',
    'unplugin-auto-import/vite',
    'unplugin-vue-components',
    'unplugin-vue-components/vite',
    'unplugin-vue-router',
    'vite',
    'vite-plugin-vue-devtools',
    'vitepress',
  ],
})
