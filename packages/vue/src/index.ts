import type { VixtOptions } from '@vixt/core'

import { createVixtPlugin } from '@vixt/core'

import { entry, presetVue } from './modules'

const defaults: VixtOptions = {
  modules: [entry, presetVue],
  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  typescript: {
    references: ['types/typed-router.d.ts', 'types/components.d.ts', 'types/auto-imports.d.ts', 'types/vite-env.d.ts'],
    tsConfig: { compilerOptions: { types: ['vite-plugin-vue-layouts/client', 'unplugin-vue-router/client'] } },
  },
}

export default createVixtPlugin({ defaults })
