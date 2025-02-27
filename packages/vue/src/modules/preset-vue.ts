import type { PluginOptions, VixtOptions } from '@vixt/core'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { TreeNode } from 'unplugin-vue-router'
import type { RouterOptions } from 'vue-router'

import Vue from '@vitejs/plugin-vue'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'

declare module '@vixt/core' {
  interface VixtOptions {
    vue?: PluginOptions<typeof Vue>
    /** https://github.com/posva/unplugin-vue-router */
    router?: PluginOptions<typeof VueRouter>
    /** https://github.com/JohnCampionJr/vite-plugin-vue-layouts */
    layouts?: PluginOptions<typeof Layouts>
    /** https://github.com/antfu/unplugin-vue-components */
    components?: PluginOptions<typeof Components>
    /** https://github.com/antfu/unplugin-auto-import */
    imports?: PluginOptions<typeof AutoImport>
    /** https://github.com/antfu/unocss */
    unocss?: PluginOptions<typeof UnoCSS>
    /** https://github.com/webfansplz/vite-plugin-vue-devtools */
    devtools?: PluginOptions<typeof VueDevTools> & { enabled?: boolean }
  }
}

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    router?: Partial<RouterOptions>
    /** https://github.com/prazdevs/pinia-plugin-persistedstate */
    piniaPersistedState?: PersistedStateOptions
  }
}

export const presetVue = defineVixtModule<VixtOptions>({
  async setup(_, vixt) {
    const { components = [], composables = [], constants = [], utils = [], stores = [], pages = [], layouts = [] } = resolveLayersDirs(vixt._layers)
    const { buildTypesDir, buildImportsDir } = vixt.options
    const defaultOptions: VixtOptions = {
      vue: {},
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

          for (const pageDir of pages) {
            const matched = overrides.keys().find(e => e.match(pageDir))
            if (matched) {
              node.components.set('default', matched)
              return
            }
          }
        },
      },
      layouts: { layoutsDirs: [...layouts].reverse(), pagesDirs: pages },
      components: {
        dts: `${buildTypesDir}/components.d.ts`,
        dirs: components,
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
      },
      imports: {
        imports: ['vue', '@vueuse/core', 'pinia', VueRouterAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [...composables, ...constants, ...stores, ...utils, buildImportsDir!],
        vueTemplate: true,
      },
      unocss: {},
      devtools: { enabled: false },
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    const plugins = [
      VueRouter(options.router),
      Vue(options.vue),
      Layouts(options.layouts),
      Components(options.components),
      AutoImport(options.imports),
      UnoCSS(options.unocss),
      options.devtools?.enabled && VueDevTools(options.devtools),
    ]

    return plugins
  },
})
