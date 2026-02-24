import type { VixtOptions } from '@vixt/core'

import { defineVixtModule, resolveLayersDirs, VixtClientAutoImports } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

import ConfigPatch from './config-patch'

const name = 'vixt:preset-vitepress'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components = [], composables = [], constants = [], utils = [], stores = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir } = vixt.options

    const defaultOptions: VixtOptions = {
      components: {
        dts: `${buildTypesDir}/components.d.ts`,
        dirs: [...components].reverse(),
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.md\?md/],
      },
      imports: {
        include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md/, /\.md\?md/],
        imports: ['vue', '@vueuse/core', 'pinia', VixtClientAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [composables, constants, stores, utils].flat(),
        vueTemplate: true,
      },
      unocss: {},
      devtools: { enabled: false },
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    const plugins = [
      Components(options.components),
      AutoImport(options.imports!),
      UnoCSS(options.unocss),
      options.devtools?.enabled && VueDevTools(options.devtools),
      ConfigPatch(),
    ]

    return plugins
  },
})
