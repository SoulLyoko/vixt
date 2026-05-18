import type { ExtractPluginOptions } from '@vixt/core'
import type Components from 'unplugin-vue-components/vite'
import type VueDevTools from 'vite-plugin-vue-devtools'
import type { SiteConfig } from 'vitepress'

export interface VitepressVixtOptions {
  /** https://github.com/antfu/unplugin-vue-components */
  components?: ExtractPluginOptions<typeof Components>
  /** https://github.com/webfansplz/vite-plugin-vue-devtools */
  devtools?: ExtractPluginOptions<typeof VueDevTools> & { enabled?: boolean }
}

declare module '@vixt/core' {
  interface VixtOptions extends VitepressVixtOptions { }
}

declare module 'vite' {
  interface UserConfig {
    vitepress?: SiteConfig
  }
}
