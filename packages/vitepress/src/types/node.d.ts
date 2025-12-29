import type { ExtractPluginOptions } from '@vixt/core'
import type UnoCSS from 'unocss/vite'
import type AutoImport from 'unplugin-auto-import/vite'
import type Components from 'unplugin-vue-components/vite'
import type VueDevTools from 'vite-plugin-vue-devtools'
import type { SiteConfig } from 'vitepress'

declare module '@vixt/core' {
  interface VixtOptions {
    /** https://github.com/antfu/unplugin-vue-components */
    components?: ExtractPluginOptions<typeof Components>
    /** https://github.com/antfu/unplugin-auto-import */
    imports?: ExtractPluginOptions<typeof AutoImport>
    /** https://github.com/antfu/unocss */
    unocss?: ExtractPluginOptions<typeof UnoCSS>
    /** https://github.com/webfansplz/vite-plugin-vue-devtools */
    devtools?: ExtractPluginOptions<typeof VueDevTools> & { enabled?: boolean }
  }
}

declare module 'vite' {
  interface UserConfig {
    vitepress?: SiteConfig
  }
}
