import type { PluginOptions, VixtOptions } from '@vixt/core'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'

import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import Layouts from '@uni-helper/vite-plugin-uni-layouts'
import Pages from '@uni-helper/vite-plugin-uni-pages'
import { defineVixtModule, patchUnocss, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { uniPatch } from './uni-patch'
import { uniVueUseResolver } from './uni-use'

declare module '@vixt/core' {
  interface VixtOptions {
    uni?: PluginOptions<typeof Uni>
    /** https://github.com/uni-helper/vite-plugin-uni-pages */
    uniPages?: PluginOptions<typeof Pages>
    /** https://github.com/uni-helper/vite-plugin-uni-layouts */
    uniLayouts?: PluginOptions<typeof Layouts>
    /** https://github.com/uni-helper/vite-plugin-uni-components */
    uniComponents?: PluginOptions<typeof Components>
    /** https://github.com/antfu/unplugin-auto-import */
    imports?: PluginOptions<typeof AutoImport>
    /** https://github.com/antfu/unocss */
    unocss?: PluginOptions<typeof UnoCSS>
  }
}

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    /** https://github.com/prazdevs/pinia-plugin-persistedstate */
    piniaPersistedState?: PersistedStateOptions
  }
}

const name = 'vixt:preset-uni'
export const presetUni = defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components = [], composables = [], constants = [], utils = [], stores = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir, buildImportsDir } = vixt.options
    const defaultOptions: VixtOptions = {
      uni: {},
      uniPages: { dts: `${buildTypesDir}/uni-pages.d.ts` },
      uniLayouts: {},
      uniComponents: {
        dts: `${buildTypesDir}/components.d.ts`,
        dirs: [...components].reverse(),
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
      },
      imports: {
        imports: ['vue', 'uni-app', 'pinia', uniVueUseResolver()],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [composables, constants, stores, utils, buildImportsDir!].flat(),
        vueTemplate: true,
      },
      unocss: {},
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    patchUnocss()

    const modules = [
      Pages(options.uniPages),
      Layouts(options.uniLayouts),
      Components(options.uniComponents),
      AutoImport(options.imports!),
      UnoCSS(options.unocss),
      uniPatch(),
      // @ts-expect-error
      Uni.default(options.uni),
    ]

    return modules
  },
})
