import type { AppOptions } from '@vixt/core'

import { defineVixtModule } from '@vixt/core'
import path from 'pathe'

import { generateMainTs } from './main'

const name = 'vixt:app-vitepress'
const defaults: AppOptions = {
  css: [],
}
export const appVitepress = defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults,
  setup(options, vixt) {
    let mainTsCode: string
    const mainTsPath = path.resolve('.vitepress/theme/index.ts')
    return {
      name,
      configResolved() {
        mainTsCode = generateMainTs(options, vixt)
      },
      transform: {
        order: 'pre',
        handler(_, id) {
          if (id !== mainTsPath)
            return
          return mainTsCode
        },
      },
    }
  },
})
