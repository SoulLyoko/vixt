import type { CustomBlock, ParsedJSX } from 'vite-plugin-pages'

// @ts-ignore
import extractComments from 'extract-comments'
import fs from 'fs-extra'
import { parse as YAMLParser } from 'yaml'

const routeJSXReg = /^\s+(route)\s+/gm

function parseJSX(code: string): ParsedJSX[] {
  return extractComments(code).slice(0, 1).filter((comment: ParsedJSX) => routeJSXReg.test(comment.value) && comment.value.includes(':') && comment.loc.start.line === 1)
}

function parseYamlComment(code: ParsedJSX[], path: string): CustomBlock {
  return code.reduce((memo, item) => {
    const { value } = item
    const v = value.replace(routeJSXReg, '')
    try {
      const yamlResult = YAMLParser(v)

      return {
        ...memo,
        ...yamlResult,
      }
    }
    catch (err: any) {
      throw new Error(`Invalid YAML format of comment in ${path}\n${err.message}`)
    }
  }, {})
}

export function extendRoute(route: any) {
  if (!route.element)
    return

  const codePath = route.element.startsWith('/') ? route.element.slice(1) : route.element
  const code = fs.readFileSync(codePath, 'utf-8')
  const jsx = parseJSX(code)
  const block = parseYamlComment(jsx, codePath)
  return {
    ...route,
    ...block,
  }
}
