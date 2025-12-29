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

export function isEmptyCode(code?: string) {
  if (!code)
    return true
  try {
    return !parseAst(code, { jsx: true }).body.length
  }
  catch {
    return true
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

export function resolveEntryCode(options: AppOptions, vixt: Vixt) {
  const { entryCode, entryFile } = options
  // search for layers `<srcDir>/<entryFile>`
  for (const layer of vixt._layers) {
    const layerEntryPath = path.resolve(layer.config!.srcDir!, entryFile!)
    const isExits = fs.existsSync(layerEntryPath)
    const code = isExits && fs.readFileSync(layerEntryPath, 'utf-8')
    if (!isEmptyCode(code || ''))
      return code
  }
  // default entry
  return entryCode
}

const name = 'vixt:app'
export default defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults: {
    rootId: 'app',
    rootTag: 'div',
    baseURL: '/',
    css: [],
  },
  setup(options, vixt) {
    const { srcDir } = vixt.options
    const { entryFile, rootTag, rootId, head } = options

    const relativeEntryPath = `/${path.basename(srcDir!)}/${entryFile}`
    const absoluteEntryPath = path.resolve(srcDir!, entryFile!)

    const order = 'pre'

    return {
      name,
      enforce: order,
      load: {
        order,
        handler(id) {
          if (id === relativeEntryPath)
            return resolveEntryCode(options, vixt)
        },
      },
      transform: {
        order,
        handler(code, id) {
          if (id === absoluteEntryPath && isEmptyCode(code)) {
            return resolveEntryCode(options, vixt)
          }
        },
      },
      transformIndexHtml: {
        order,
        handler() {
          const heads: [string, AppHeadAttrs[]][] = Object.entries(head ?? {})
          const tags = heads.map(([tag, attrs]) => attrs.map(attr => resolveHead(tag, attr))).flat()
          const loadingTemplate = resolveLoadingTemplate(options, vixt)
          return [
            { tag: rootTag!, attrs: { id: rootId }, children: loadingTemplate, injectTo: 'body' },
            { tag: 'script', attrs: { type: 'module', src: relativeEntryPath }, injectTo: 'body' },
            ...tags,
          ]
        },
      },
    }
  },
})
