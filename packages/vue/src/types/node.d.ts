import type Vue from '@vitejs/plugin-vue'
import type VueJsx from '@vitejs/plugin-vue-jsx'
import type { ExtractPluginOptions } from '@vixt/core'
import type UnoCSS from 'unocss/vite'
import type AutoImport from 'unplugin-auto-import/vite'
import type Components from 'unplugin-vue-components/vite'
import type VueDevTools from 'vite-plugin-vue-devtools'
import type Layouts from 'vite-plugin-vue-layouts'
import type VueRouter from 'vue-router/vite'

declare module '@vixt/core' {
  interface VixtOptions {
    vue?: ExtractPluginOptions<typeof Vue>
    vueJsx?: ExtractPluginOptions<typeof VueJsx>
    /** https://router.vuejs.org/file-based-routing/ */
    router?: ExtractPluginOptions<typeof VueRouter>
    /** https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
    layouts?: ExtractPluginOptions<typeof Layouts>
    /** https://github.com/unplugin/unplugin-vue-components */
    components?: ExtractPluginOptions<typeof Components>
    /** https://github.com/unplugin/unplugin-auto-import */
    imports?: ExtractPluginOptions<typeof AutoImport>
    /** https://github.com/unocss/unocss */
    unocss?: ExtractPluginOptions<typeof UnoCSS>
    /** https://github.com/webfansplz/vite-plugin-vue-devtools */
    devtools?: ExtractPluginOptions<typeof VueDevTools> & { enabled?: boolean }
  }
}
