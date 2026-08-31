import type { VixtOptions } from '@vixt/core'

import React from '@vitejs/plugin-react'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import Components from './components'
import { extendRoute } from './route-block'

const name = 'vixt:preset-react'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const {
      components = [],
      layouts = [],
      pages = [],
    } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir } = vixt.options

    const defaultOptions: VixtOptions = {
      react: {},
      pages: {
        dirs: pages,
        importPath: 'absolute',
        extendRoute,
      },
      layouts: {
        layoutsDirs: layouts,
        pagesDirs: pages,
        extensions: ['jsx', 'tsx'],
        importMode: () => 'sync',
      },
    }

    const options = (vixt.options = defu(vixt.options, defaultOptions))

    const componentsPlugin = Components({
      dirs: components,
      dts: `${buildTypesDir}/components.d.ts`,
    })
    if (vixt.options._prepare) {
      // @ts-ignore
      componentsPlugin.buildStart()
    }

    const plugins = [
      React(options.react),
      Pages(options.pages),
      Layouts(options.layouts),
      componentsPlugin,
    ]

    return plugins
  },
})
