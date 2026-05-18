import type Vue from '@vitejs/plugin-vue'
import type VueJsx from '@vitejs/plugin-vue-jsx'
import type { ExtractPluginOptions } from '@vixt/core'
import type Components from 'unplugin-vue-components/vite'
import type VueDevTools from 'vite-plugin-vue-devtools'
import type Layouts from 'vite-plugin-vue-layouts'
import type VueRouter from 'vue-router/vite'

export interface VueVixtOptions {
  /** https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue */
  vue?: ExtractPluginOptions<typeof Vue>
  /** https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx */
  vueJsx?: ExtractPluginOptions<typeof VueJsx>
  /** https://router.vuejs.org/file-based-routing/ */
  router?: ExtractPluginOptions<typeof VueRouter>
  /** https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
  layouts?: ExtractPluginOptions<typeof Layouts>
  /** https://github.com/unplugin/unplugin-vue-components */
  components?: ExtractPluginOptions<typeof Components>
  /** https://github.com/webfansplz/vite-plugin-vue-devtools */
  devtools?: ExtractPluginOptions<typeof VueDevTools> & { enabled?: boolean }
}

declare module '@vixt/core' {
  interface VixtOptions extends VueVixtOptions { }
}
