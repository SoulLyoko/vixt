import type { VixtOptions } from '@vixt/core'

import React from '@vitejs/plugin-react'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import { componentsResolver } from './components'
import { extendRoute } from './route-block'

const name = 'vixt:preset-react'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components = [], layouts = [], pages = [] } = resolveLayersDirs([...vixt._layers].reverse())

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
        imports: ['react', 'react-router', 'ahooks', componentsResolver({ dirs: components })],
      },
      unocss: {},
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    const plugins = [
      UnoCSS(options.unocss),
      React(options.react),
      Pages(options.pages),
      Layouts(options.layouts),
    ]

    return plugins
  },
})
