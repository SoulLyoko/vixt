import type { AppOptions } from './types'

import { defineVixtModule } from '@vixt/core'
import path from 'pathe'

import { generateIndexHtml, generateMainTs } from '.'

export * from './app-component'
export * from './app-config'
export * from './css'
export * from './html'
export * from './main'
export * from './plugins'
export * from './types'

const name = 'vixt:app'
const defaults: AppOptions = {
  rootId: 'app',
  rootTag: 'div',
  baseURL: '/',
  css: [],
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
}
export const appVue = defineVixtModule<AppOptions>({
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
