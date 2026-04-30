import type { VixtOptions } from '@vixt/core'
import type { TreeNode } from 'vue-router/unplugin'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import VueRouter from 'vue-router/vite'

const name = 'vixt:preset-vue'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  setup(_, vixt) {
    const { components = [], pages = [], layouts = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir } = vixt.options

    const defaultOptions: VixtOptions = {
      vue: {},
      vueJsx: {},
      router: {
        dts: `${buildTypesDir}/typed-router.d.ts`,
        routesFolder: pages,
        // Fix overrides priority
        extendRoute(route) {
          // @ts-ignore
          const node: TreeNode['value'] = route.node.value
          // @ts-ignore
          const overrides: Map<string, object> = node._overrides
          if (overrides.size <= 1)
            return

          for (const pageDir of [...pages].reverse()) {
            const matched = [...overrides.keys()].find(e => e.match(pageDir))
            if (matched) {
              node.components.set('default', matched)
              return
            }
          }
        },
      },
      layouts: { layoutsDirs: layouts, pagesDirs: pages },
      components: {
        dts: `${buildTypesDir}/components.d.ts`,
        dirs: [...components].reverse(),
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
      },
      unocss: {},
      devtools: { enabled: false },
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    const plugins = [
      VueRouter(options.router),
      Vue(options.vue),
      VueJsx(options.vueJsx),
      Layouts(options.layouts),
      Components(options.components),
      UnoCSS(options.unocss),
      options.devtools?.enabled && VueDevTools(options.devtools),
    ]

    return plugins
  },
})
