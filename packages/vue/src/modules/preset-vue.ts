import type { PluginOptions, VixtOptions } from '@vixt/core'

import defu from 'defu'
import Vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import UnoCSS from 'unocss/vite'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'

declare module '@vixt/core'{
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
    devtools?: PluginOptions<typeof VueDevTools>
  }
}

export const presetVue = defineVixtModule<VixtOptions>({
  async setup(_, vixt) {
    const { components, composables = [], constants = [], utils = [], stores = [], pages, layouts } = resolveLayersDirs(vixt._layers)
    const { buildTypesDir } = vixt.options
    const defaultOptions: VixtOptions = {
      vue: {},
      router: { dts: `${buildTypesDir}/typed-router.d.ts`, routesFolder: pages },
      layouts: { layoutsDirs: layouts, pagesDirs: pages },
      components: {
        dts: `${buildTypesDir}/components.d.ts`,
        dirs: components,
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        allowOverrides: true,
      },
      imports: {
        imports: ['vue', '@vueuse/core', 'pinia', VueRouterAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [...composables, ...constants, ...stores, ...utils],
        vueTemplate: true,
      },
      unocss: {},
      devtools: {},
    }

    const options = defu(vixt.options, defaultOptions)

    const plugins = [
      VueRouter(options.router),
      Vue(options.vue),
      Layouts(options.layouts),
      Components(options.components),
      AutoImport(options.imports),
      UnoCSS(options.unocss),
      VueDevTools(options.devtools),
    ]

    return plugins
  },
})
