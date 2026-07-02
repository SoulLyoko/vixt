import type { UniLayoutsOptions } from './modules/uni-layouts'
import type { UniModulesOptions } from './modules/uni-modules'
import type Uni from '@dcloudio/vite-plugin-uni'
import type Components from '@uni-helper/vite-plugin-uni-components'
import type Pages from '@uni-helper/vite-plugin-uni-pages'
import type { ExtractPluginOptions } from '@vixt/core'

export interface UniVixtOptions {
  uni?: ExtractPluginOptions<typeof Uni>
  /** https://github.com/uni-helper/vite-plugin-uni-pages */
  uniPages?: ExtractPluginOptions<typeof Pages>
  /** https://github.com/uni-helper/vite-plugin-uni-layouts */
  uniLayouts?: UniLayoutsOptions
  /** https://github.com/uni-helper/vite-plugin-uni-components */
  uniComponents?: ExtractPluginOptions<typeof Components>
  /** Options for extends `uni-modules` */
  uniModules?: UniModulesOptions
}

declare module '@vixt/core' {
  interface VixtOptions extends UniVixtOptions { }
}
