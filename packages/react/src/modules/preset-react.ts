import type { PluginOptions, VixtOptions } from '@vixt/core'

import React from '@vitejs/plugin-react'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import { componentsResolver } from './components'
import { extendRoute } from './route-block'

declare module '@vixt/core' {
  interface VixtOptions {
    react?: PluginOptions<typeof React>
    /** https://github.com/hannoeru/vite-plugin-pages */
    pages?: PluginOptions<typeof Pages>
    /** https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
    layouts?: PluginOptions<typeof Layouts>
    /** https://github.com/unplugin/unplugin-auto-import */
    imports?: PluginOptions<typeof AutoImport>
    /** https://github.com/unocss/unocss */
    unocss?: PluginOptions<typeof UnoCSS>
  }
}

const name = 'vixt:preset-react'
export const presetReact = defineVixtModule<VixtOptions>({
  meta: { name },
  async setup(_, vixt) {
    const { constants = [], hooks = [], layouts = [], pages = [], stores = [], utils = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir, buildImportsDir } = vixt.options

    const defaultOptions: VixtOptions = {
      react: {},
      pages: {
        dirs: pages,
        extendRoute,
      },
      layouts: {
        layoutsDirs: layouts,
        pagesDirs: pages,
        extensions: ['jsx', 'tsx'],
        importMode: () => 'sync',
      },
      imports: {
        imports: ['react', 'react-router', 'ahooks', componentsResolver(vixt)],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [constants, hooks, stores, utils, buildImportsDir!].flat(),
      },
      unocss: {},
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    const plugins = [
      UnoCSS(options.unocss),
      React(options.react),
      Pages(options.pages),
      Layouts(options.layouts),
      AutoImport(options.imports!),
    ]

    return plugins
  },
})
