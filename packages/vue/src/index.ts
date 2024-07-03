import type { VixtOptions } from '@vixt/core'

import { createVixtPlugin } from '@vixt/core'

import { entryVue, presetVue } from './modules'

export * from './modules'

const defaults: VixtOptions = {
  modules: [entryVue, presetVue],
  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  typescript: {
    // references: ['types/typed-router.d.ts', 'types/components.d.ts', 'types/auto-imports.d.ts'],
    tsConfig: { compilerOptions: { types: ['vite-plugin-vue-layouts/client', 'unplugin-vue-router/client'] } },
    typeCheck: { vueTsc: true },
  },
}

export default createVixtPlugin({ defaults })
