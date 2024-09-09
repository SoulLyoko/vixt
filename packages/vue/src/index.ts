import type { VixtOptions } from '@vixt/core'

import { createVixtPlugin } from '@vixt/core'

import { appVue, presetVue } from './modules'

export * from './modules'

const defaults: VixtOptions = {
  modules: [appVue, presetVue],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vite-plugin-vue-layouts/client', 'unplugin-vue-router/client'],
      },
    },
  },
}

export default createVixtPlugin({ defaults })
