import type Uni from '@dcloudio/vite-plugin-uni'
import type Components from '@uni-helper/vite-plugin-uni-components'
import type Layouts from '@uni-helper/vite-plugin-uni-layouts'
import type Pages from '@uni-helper/vite-plugin-uni-pages'
import type { ExtractPluginOptions } from '@vixt/core'
import type UnoCSS from 'unocss/vite'
import type AutoImport from 'unplugin-auto-import/vite'

declare module '@vixt/core' {
  interface VixtOptions {
    uni?: ExtractPluginOptions<typeof Uni>
    /** https://github.com/uni-helper/vite-plugin-uni-pages */
    uniPages?: ExtractPluginOptions<typeof Pages>
    /** https://github.com/uni-helper/vite-plugin-uni-layouts */
    uniLayouts?: ExtractPluginOptions<typeof Layouts>
    /** https://github.com/uni-helper/vite-plugin-uni-components */
    uniComponents?: ExtractPluginOptions<typeof Components>
    /** https://github.com/antfu/unplugin-auto-import */
    imports?: ExtractPluginOptions<typeof AutoImport>
    /** https://github.com/antfu/unocss */
    unocss?: ExtractPluginOptions<typeof UnoCSS>
  }
}
