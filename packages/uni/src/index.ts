import { createVixtPlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

import presetUni from './modules/preset-uni'
import uniModules from './modules/uni-modules'

export default createVixtPlugin({
  defaults: {
    modules: [presetUni, uniModules],
    plugins: ['@vixt/uni/client/plugins/pinia', '@vixt/uni/client/plugins/router'],
    app: {
      entryFile: 'main.ts',
      entryCode: fs.readFileSync(resolvePathSync('@vixt/uni/client/entry'), 'utf-8'),
      head: {
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        ],
      },
    },
    typescript: {
      tsConfig: {
        compilerOptions: {
          types: ['@vixt/uni/types', '@dcloudio/types', '@uni-helper/uni-app-types'],
        },
        vueCompilerOptions: {
          plugins: ['@uni-helper/uni-app-types/volar-plugin'],
        },
      },
    },
    vite: {
      optimizeDeps: {
        exclude: ['@vixt/uni/client/entry', '@vixt/uni/client/plugins/pinia', '@vixt/uni/client/plugins/router'],
      },
    },
  },
})
