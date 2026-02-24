import { createVixtPlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

import presetVue from './modules/preset-vue'
import virtualRootComponent from './modules/virtual-root-component'

const plugins = ['@vixt/vue/client/plugins/pinia', '@vixt/vue/client/plugins/router']

export default createVixtPlugin({
  defaults: {
    modules: [presetVue, virtualRootComponent],
    plugins,
    app: {
      entryFile: 'main.ts',
      entryCode: fs.readFileSync(resolvePathSync('@vixt/vue/client/entry'), 'utf-8'),
      head: {
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        ],
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          types: ['@vixt/vue/types', 'vue-router/auto', 'vite-plugin-vue-layouts/client'],
        },
        vueCompilerOptions: {
          plugins: ['vue-router/volar/sfc-typed-router', 'vue-router/volar/sfc-route-blocks'],
        },
      },
    },
    vite: {
      optimizeDeps: {
        exclude: plugins,
      },
    },
  },
})
