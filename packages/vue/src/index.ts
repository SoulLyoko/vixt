import { createVixtPlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

import presetVue from './modules/preset-vue'
import virtualRootComponent from './modules/virtual-root-component'

export default createVixtPlugin({
  defaults: {
    modules: [presetVue, virtualRootComponent],
    plugins: ['@vixt/vue/client/plugins/pinia', '@vixt/vue/client/plugins/router'],
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
          types: ['@vixt/vue/types', 'vite-plugin-vue-layouts/client', 'unplugin-vue-router/client'],
        },
      },
    },
  },
})
