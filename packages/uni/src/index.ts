import { createVixtPlugin } from '@vixt/core'

import { appUni, presetUni, uniModules } from './modules'

export * from './modules'

const defaults = {
  modules: [uniModules, appUni, presetUni],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@dcloudio/types', '@uni-helper/uni-app-types', '@uni-helper/vite-plugin-uni-pages/client'],
      },
      vueCompilerOptions: {
        plugins: ['@uni-helper/uni-app-types/volar-plugin'],
      },
    },
  },
}

export default createVixtPlugin({ defaults })
