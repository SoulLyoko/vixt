import type { VixtOptions } from '@vixt/core'

import React from '@vitejs/plugin-react'
import { defineVixtModule, resolveLayersDirs, VixtClientAutoImports } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import { componentsResolver } from './components'
import { extendRoute } from './route-block'

const name = 'vixt:preset-react'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components = [], constants = [], hooks = [], layouts = [], pages = [], stores = [], utils = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir } = vixt.options

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
        imports: ['react', 'react-router', 'ahooks', componentsResolver({ dirs: components }), VixtClientAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [constants, hooks, stores, utils].flat(),
        exclude: [],
        include: [],
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
