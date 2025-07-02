import type { AppOptions } from '@vixt/core'

import { defineVixtModule, generateIndexHtml } from '@vixt/core'
import path from 'pathe'

import { generateMainFile } from './main'

const name = 'vixt:app-react'
const defaults: AppOptions = {
  rootId: 'app',
  rootTag: 'div',
  baseURL: '/',
  entryFile: 'main.tsx',
  css: [],
  head: {
    meta: [
      { charset: 'utf-8' },
    ],
  },
}
export const app = defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults,
  setup(options, vixt) {
    let indexHtmlCode: string
    let mainTsCode: string
    const mainTsPath = path.resolve(vixt.options.srcDir!, 'main.tsx')
    return {
      name,
      configResolved() {
        indexHtmlCode = generateIndexHtml(options, vixt)
        mainTsCode = generateMainFile(options, vixt)
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
