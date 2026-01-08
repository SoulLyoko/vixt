import type { VixtOptions } from '@vixt/core'

import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import Layouts from '@uni-helper/vite-plugin-uni-layouts'
import Pages from '@uni-helper/vite-plugin-uni-pages'
import { defineVixtModule, resolveLayersDirs, VixtClientAutoImports } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { uniPatch } from './uni-patch'
import { uniVueUseResolver } from './uni-use'

const name = 'vixt:preset-uni'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components = [], composables = [], constants = [], utils = [], stores = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir } = vixt.options

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
        imports: ['vue', 'uni-app', 'pinia', uniVueUseResolver(), VixtClientAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [composables, constants, stores, utils].flat(),
        exclude: [],
        include: [],
        vueTemplate: true,
      },
      unocss: {},
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    const modules = [
      Pages(options.uniPages),
      Layouts(options.uniLayouts),
      Components(options.uniComponents),
      AutoImport(options.imports!),
      UnoCSS(options.unocss),
      uniPatch(),
      // @ts-expect-error
      (Uni?.default ?? Uni)(options.uni),
    ]

    return modules
  },
})
