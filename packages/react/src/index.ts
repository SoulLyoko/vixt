import { createVixtPlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

import presetReact from './modules/preset-react'
import virtualRootComponent from './modules/virtual-root-component'
import virtualSetupLayouts from './modules/virtual-setup-layouts'

export default createVixtPlugin({
  defaults: {
    modules: [presetReact, virtualRootComponent, virtualSetupLayouts],
    app: {
      entryFile: 'main.tsx',
      entryCode: fs.readFileSync(resolvePathSync('@vixt/react/client/entry'), 'utf-8'),
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
          jsxImportSource: 'react',
          types: ['@vixt/react/types', 'vite-plugin-pages/client-react'],
        },
      },
    },
  },
})
