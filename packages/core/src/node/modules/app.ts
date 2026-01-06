import type { AppHeadAttrs, AppOptions } from '../config'
import type { Vixt } from '../vixt'
import type { HtmlTagDescriptor } from 'vite'

import fs from 'fs-extra'
import path from 'pathe'
import { parseAst } from 'vite'

import { defineVixtModule } from '../module'

export function resolveHead(tag: string, attrs: AppHeadAttrs): HtmlTagDescriptor {
  const boydTags = ['script', 'noscript']
  const defaultInjectTo = boydTags.includes(tag) ? 'body' : undefined
  const { children, injectTo = defaultInjectTo, ..._attrs } = attrs
  return {
    tag,
    attrs: _attrs,
    children,
    injectTo,
  }
}

export function resolveLoadingTemplate(options: AppOptions, vixt: Vixt) {
  const { loadingTemplate } = options

  if (loadingTemplate && fs.existsSync(loadingTemplate))
    return fs.readFileSync(loadingTemplate, 'utf-8')

  // search for layers `<rootDir>/loading.html`
  for (const layer of vixt._layers) {
    const layerLoadingTemplate = path.resolve(layer.cwd!, 'loading.html')
    if (fs.existsSync(layerLoadingTemplate)) {
      return fs.readFileSync(layerLoadingTemplate, 'utf-8')
    }
  }
}

export function isEmptyCode(code?: string) {
  if (!code)
    return true
  try {
    return !parseAst(code, { jsx: true }).body.length
  }
  catch {
    return false
  }
}

const name = 'vixt:app'
export default defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults: {
    rootId: 'app',
    rootTag: 'div',
    baseURL: '/',
    css: [],
    transformEntryFile: true,
    transformIndexHtml: true,
  },
  setup(options, vixt) {
    const { rootDir, srcDir } = vixt.options
    const { entryFile, transformEntryFile, transformIndexHtml } = options

    const indexHtmlPath = path.resolve(rootDir!, 'index.html')
    if (transformIndexHtml && !fs.existsSync(indexHtmlPath))
      fs.outputFileSync(indexHtmlPath, '')

    const relativeEntryPath = `/${path.basename(srcDir!)}/${entryFile}`
    const absoluteEntryPath = path.resolve(srcDir!, entryFile!)
    if (transformEntryFile && !fs.existsSync(absoluteEntryPath))
      fs.outputFileSync(absoluteEntryPath, '')

    const order = 'pre'

    return {
      name,
      enforce: order,
      transform: {
        order,
        filter: { id: absoluteEntryPath },
        handler(code) {
          if (!transformEntryFile)
            return

          if (isEmptyCode(code))
            return options.entryCode
        },
      },
      transformIndexHtml: {
        order,
        handler(html = '') {
          if (!transformIndexHtml)
            return

          const { rootTag, rootId, head } = options
          const heads: [string, AppHeadAttrs[]][] = Object.entries(head ?? {})
          const tags = heads.map(([tag, attrs]) => attrs.map(attr => resolveHead(tag, attr))).flat()
          const loadingTemplate = resolveLoadingTemplate(options, vixt)
          return {
            html: `<!DOCTYPE html>\n${html}`,
            tags: [
              { tag: rootTag!, attrs: { id: rootId }, children: loadingTemplate, injectTo: 'body' },
              { tag: 'script', attrs: { type: 'module', src: relativeEntryPath }, injectTo: 'body' },
              ...tags,
            ],
          }
        },
      },
    }
  },
})
