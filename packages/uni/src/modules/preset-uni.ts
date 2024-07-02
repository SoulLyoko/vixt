import type { PluginOptions, VixtOptions } from '@vixt/core'

import defu from 'defu'
import Uni from '@dcloudio/vite-plugin-uni'
import Pages from '@uni-helper/vite-plugin-uni-pages'
import Layouts from '@uni-helper/vite-plugin-uni-layouts'
import Components from '@uni-helper/vite-plugin-uni-components'
import { uniuseAutoImports } from '@uni-helper/uni-use'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'

import { uniPatch } from '.'

declare module '@vixt/core'{
  interface VixtOptions {
    uni?: PluginOptions<typeof Uni>
    /** https://github.com/uni-helper/vite-plugin-uni-pages */
    pages?: PluginOptions<typeof Pages>
    /** https://github.com/uni-helper/vite-plugin-uni-layouts */
    layouts?: any
    /** https://github.com/uni-helper/vite-plugin-uni-components */
    components?: PluginOptions<typeof Components>
    /** https://github.com/antfu/unplugin-auto-import */
    imports?: PluginOptions<typeof AutoImport>
    /** https://github.com/antfu/unocss */
    unocss?: PluginOptions<typeof UnoCSS>
  }
}

const name = 'vixt:preset-uni'
export const presetUni = defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components, composables = [], constants = [], utils = [], stores = [] } = resolveLayersDirs(vixt._layers)
    const typesDir = `${vixt.options.buildDir}/types`
    const defaultOptions: VixtOptions = {
      uni: {},
      pages: { dts: `${typesDir}/uni-pages.d.ts` },
      layouts: {},
      components: {
        dts: `${typesDir}/components.d.ts`,
        dirs: components,
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        allowOverrides: true,
        version: 2.7,
      },
      imports: {
        imports: [
          'vue',
          'uni-app',
          'pinia',
          {
            '@vueuse/core': [
              // already imported by uni-use
              ['tryOnScopeDispose', ''],
              ['useNetwork', ''],
              ['useOnline', ''],
              ['usePreferredDark', ''],
              ['useStorage', ''],
              ['useStorageAsync', ''],
            ],
          },
          uniuseAutoImports(),
        ],
        dts: `${typesDir}/auto-imports.d.ts`,
        dirs: [...composables, ...constants, ...stores, ...utils],
        vueTemplate: true,
      },
      unocss: {},
    }

    const options = defu(vixt.options, defaultOptions)

    const modules = [
      Pages(options.pages),
      Layouts(options.layouts),
      Components(options.components),
      AutoImport(options.imports),
      UnoCSS(options.unocss),
      // @ts-expect-error
      Uni.default(options.uni),
      uniPatch(),
    ]

    return modules
  },
})
