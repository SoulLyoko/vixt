import type { PluginOptions, VixtOptions } from '@vixt/core'

import { defineVixtModule, patchUnocss, resolveLayersDirs } from '@vixt/core'
import defu from 'defu'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueDevTools from 'vite-plugin-vue-devtools'

declare module '@vixt/core' {
  interface VixtOptions {
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
const name = 'vixt:preset-vitepress'
export const presetVitepress = defineVixtModule<VixtOptions>({
  meta: { name },
  async setup(_, vixt) {
    const { components = [], composables = [], constants = [], utils = [], stores = [] } = resolveLayersDirs([...vixt._layers].reverse())
    const { buildTypesDir, buildImportsDir } = vixt.options
    const defaultOptions: VixtOptions = {
      components: {
        dts: `${buildTypesDir}/components.d.ts`,
        dirs: [...components].reverse(),
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      },
      imports: {
        include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md/, /\.md\?md/],
        imports: ['vue', '@vueuse/core', 'pinia', VueRouterAutoImports],
        dts: `${buildTypesDir}/auto-imports.d.ts`,
        dirs: [composables, constants, stores, utils, buildImportsDir!].flat(),
        vueTemplate: true,
      },
      unocss: {},
      devtools: { enabled: false },
    }

    const options = vixt.options = defu(vixt.options, defaultOptions)

    patchUnocss()

    const plugins = [
      Components(options.components),
      AutoImport(options.imports!),
      UnoCSS(options.unocss),
      options.devtools?.enabled && VueDevTools(options.devtools),
    ]

    return plugins
  },
})
