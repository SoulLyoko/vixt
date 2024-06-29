import { createVixtPlugin } from '@vixt/core'

import { entry, presetUni } from './modules'

const defaults = {
  modules: [entry, presetUni],
  app: {
    head: {
      link: [{ rel: 'icon', href: '/static/favicon.ico' }],
    },
    main: 'src/main.ts',
  } as any,
  typescript: {
    references: ['types/uni-pages.d.ts', 'types/components.d.ts', 'types/auto-imports.d.ts', 'types/vite-env.d.ts'],
    tsConfig: { compilerOptions: { types: ['@dcloudio/types', '@uni-helper/vite-plugin-uni-pages/client'] } },
  },
}

export default createVixtPlugin({ defaults })
