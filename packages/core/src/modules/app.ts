import type { TransformResult } from 'vite'
import type { Vixt } from '../types'

import { cwd } from 'node:process'

import path from 'pathe'
import fs from 'fs-extra'

import { defineVixtModule } from '../module'
import { buildDir } from '../config'

// @ts-ignore
declare module '@vixt/core' {
  interface VixtOptions {
    app?: AppOptions
  }
}

type Property = Record<string, string>
export interface AppHead {
  meta?: Property[]
  link?: Property[]
  style?: Property[]
  script?: Property[]
  title?: Property[]
  noscript?: Property[]
}

export interface AppOptions {
  head?: AppHead
  /**
   * @default BASE_URL=/
   */
  baseURL?: string
  /**
   * @default '#app'
   */
  rootId?: string
  /**
   * @default 'div'
   */
  rootTag?: string
  /**
   * @default '<buildDir>/main.ts'
   */
  main?: string
  transformMain?: (vixt: Vixt) => Promise<TransformResult | string | null | void> | TransformResult | string | null | void
  css?: string[]
  /**
   * @default './loading.html'
   */
  loadingTemplate?: string
}

function resolveHeadTag(tag: string, attrs: Record<string, string>) {
  const attrsStr = Object.entries(attrs).filter(([k]) => k !== 'children').map(([k, v]) => `${k}="${v}"`).join(' ')
  return attrs?.children ? `<${tag} ${attrsStr}>${attrs.children}</${tag}>` : `<${tag} ${attrsStr} />`
}

function generateIndexHtml(options: AppOptions, vixt: Vixt) {
  const { buildDir, rootDir } = vixt.options

  const { head = {}, rootTag, rootId, main, loadingTemplate: loading = '' } = options || {}

  const headTemplate = (Object.entries(head) as [string, any[]][]).filter(([k]) => k !== 'noscript')
    .map(([tag, attrs]) => (attrs).map(e => resolveHeadTag(tag, e)))
    .flat()
    .join('\n')
  const noscriptTemplate = (Object.entries(head) as [string, any[]][]).filter(([k]) => k === 'noscript')
    .map(([tag, attrs]) => (attrs).map(e => resolveHeadTag(tag, e)))
    .flat()
    .join('\n')

  let loadingTemplate = ''
  if (/^\.|\//.test(loading)) {
    const loadingTemplatePath = path.resolve(rootDir!, loading)
    if (fs.existsSync(loadingTemplatePath)) {
      loadingTemplate = fs.readFileSync(loadingTemplatePath, 'utf-8')
    }
  }
  else if (loading) {
    loadingTemplate = loading
  }

  const code = `
<!doctype html>
<html>
  <head>
${headTemplate}
  </head>
  <body>
    <${rootTag} id="${rootId}">
${loadingTemplate}
    </${rootTag}>
    <script type="module" src="${main}"></script>
${noscriptTemplate}
  </body>
</html>
`
  fs.outputFileSync(path.resolve(rootDir!, `${buildDir}/index.html`), code)
  return code
}

const name = 'vixt:app'
const defaults: AppOptions = {
  rootId: 'app',
  rootTag: 'div',
  baseURL: '/',
  loadingTemplate: './loading.html',
  main: `${buildDir}/main.ts`,
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    noscript: [{ children: 'This website requires JavaScript to function properly. Please enable JavaScript to continue.' }],
  },
}
export const app = defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults,
  setup(options, vixt) {
    generateIndexHtml(options, vixt)
    return {
      name,
      transformIndexHtml: {
        order: 'pre',
        handler() {
          const { buildDir } = vixt.options
          return fs.readFileSync(path.resolve(cwd(), `${buildDir}/index.html`), { encoding: 'utf-8' })
        },
      },
      transform: {
        order: 'pre',
        handler(code, id) {
          if (!id.includes(options.main!))
            return
          return options.transformMain?.(vixt)
        },
      },

    }
  },
})
