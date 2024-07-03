import { createVixtPlugin } from '@vixt/core'

import { entryUni, presetUni } from './modules'

export * from './modules'

const defaults = {
  modules: [entryUni, presetUni],
  app: {
    head: {
      link: [{ rel: 'icon', href: '/static/favicon.ico' }],
    },
    main: 'src/main.ts',
  },
  typescript: {
    // references: ['types/uni-pages.d.ts', 'types/components.d.ts', 'types/auto-imports.d.ts'],
    tsConfig: {
      compilerOptions: {
        types: ['@dcloudio/types', '@uni-helper/uni-app-types', '@uni-helper/vite-plugin-uni-pages/client'],
      },
      vueCompilerOptions: {
        plugins: ['@uni-helper/uni-app-types/volar-plugin'],
      },
    },
    typeCheck: { vueTsc: true },
  },
}

export default createVixtPlugin({ defaults })
