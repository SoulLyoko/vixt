import type { VixtOptions } from '@vixt/core'
import type { TreeNode } from 'unplugin-vue-router'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineVixtModule, resolveLayersDirs, VixtClientAutoImports } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

const name = 'vixt:preset-vue'
export default defineVixtModule<VixtOptions>({
  meta: { name },
  async setup(_, vixt) {
    const { components = [], composables = [], constants = [], utils = [], stores = [], pages = [], layouts = [] } = resolveLayersDirs([...vixt._layers].reverse())
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
      imports: {
        imports: ['vue', '@vueuse/core', 'pinia', VueRouterAutoImports, VixtClientAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [composables, constants, stores, utils].flat(),
        vueTemplate: true,
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
      AutoImport(options.imports!),
      UnoCSS(options.unocss),
      options.devtools?.enabled && VueDevTools(options.devtools),
    ]

    return plugins
  },
})
