import type { PluginOptions, VixtOptions } from '@vixt/core'
import type { TreeNode } from 'unplugin-vue-router'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineVixtModule, patchUnocss, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

import { genarateGlobalComponents } from './global-components'

declare module '@vixt/core' {
  interface VixtOptions {
    vue?: PluginOptions<typeof Vue>
    vueJsx?: PluginOptions<typeof VueJsx>
    /** https://github.com/posva/unplugin-vue-router */
    router?: PluginOptions<typeof VueRouter>
    /** https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
    layouts?: PluginOptions<typeof Layouts>
    /** https://github.com/unplugin/unplugin-vue-components */
    components?: PluginOptions<typeof Components>
    /** https://github.com/unplugin/unplugin-auto-import */
    imports?: PluginOptions<typeof AutoImport>
    /** https://github.com/unocss/unocss */
    unocss?: PluginOptions<typeof UnoCSS>
    /** https://github.com/webfansplz/vite-plugin-vue-devtools */
    devtools?: PluginOptions<typeof VueDevTools> & { enabled?: boolean }
  }
}

const name = 'vixt:preset-vue'
export const presetVue = defineVixtModule<VixtOptions>({
  meta: { name },
  async setup(_, vixt) {
    const { components = [], composables = [], constants = [], utils = [], stores = [], pages = [], layouts = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir, buildImportsDir } = vixt.options
    const defaultOptions: VixtOptions = {
      vue: {},
      vueJsx: {},
      router: {
        dts: `${buildTypesDir}/typed-router.d.ts`,
        routesFolder: pages,
        /** Fix overrides priority */
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
        imports: ['vue', '@vueuse/core', 'pinia', VueRouterAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [composables, constants, stores, utils, buildImportsDir!].flat(),
        vueTemplate: true,
      },
      unocss: {},
      devtools: { enabled: false },
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    genarateGlobalComponents(vixt)

    patchUnocss()

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
