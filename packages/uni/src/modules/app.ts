import type { AppOptions } from '@vixt/core'

import { defineVixtModule, generateIndexHtml } from '@vixt/core'
import path from 'pathe'

import { generateMainTs } from './main'

const name = 'vixt:app-uni'
const defaults: AppOptions = {
  rootId: 'app',
  rootTag: 'div',
  baseURL: '/',
  entryFile: 'main.ts',
  css: [],
  head: {
    meta: [
      { charset: 'utf-8' },
    ],
  },
}
export const appUni = defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults,
  setup(options, vixt) {
    let indexHtmlCode: string
    let mainTsCode: string
    const mainTsPath = path.resolve(vixt.options.srcDir!, 'main.ts')
    return {
      name,
      configResolved() {
        indexHtmlCode = generateIndexHtml(options, vixt)
        mainTsCode = generateMainTs(options, vixt)
      },
      transformIndexHtml: {
        order: 'pre',
        handler() {
          return indexHtmlCode
        },
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
