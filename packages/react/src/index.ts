import type { VixtOptions } from '@vixt/core'

import { createVixtPlugin } from '@vixt/core'

import { app, presetReact } from './modules'

export * from './modules'

const defaults: VixtOptions = {
  modules: [app, presetReact],
  typescript: {
    tsConfig: {
      compilerOptions: {
        jsxImportSource: 'react',
        types: ['vite-plugin-pages/client-react'],
      },
    },
  },
}

export default createVixtPlugin({ defaults })
