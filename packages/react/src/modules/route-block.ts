/**
 * Support route block in react
 * @link https://github.com/hannoeru/vite-plugin-pages?tab=readme-ov-file#jsxtsx-yaml-format-comments-for-route-datain-vue
 * @link https://github.com/hannoeru/vite-plugin-pages/blob/main/src/customBlock.ts
 */
import type { CustomBlock, ParsedJSX, ReactRoute } from 'vite-plugin-pages'

// @ts-expect-error
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

function getRouteBlock(path: string) {
  const code = fs.readFileSync(path, 'utf-8')
  const parsedJSX = parseJSX(code)
  const block = parseYamlComment(parsedJSX, path)
  return block
}

export function extendRoute(route: ReactRoute) {
  if (!route.element)
    return

  const codePath = route.element.startsWith('/') ? route.element.slice(1) : route.element
  const block = getRouteBlock(codePath)

  return { ...route, ...block }
}
