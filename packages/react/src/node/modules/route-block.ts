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

export function parseJSX(code: string): ParsedJSX[] {
  return extractComments(code)
    .slice(0, 1)
    .filter(
      (comment: ParsedJSX) =>
        routeJSXReg.test(comment.value) &&
        comment.value.includes(':') &&
        comment.loc.start.line === 1,
    )
}

export function parseYamlComment(code: ParsedJSX[], path: string): CustomBlock {
  return code.reduce((memo, item) => {
    const { value } = item
    const v = value.replace(routeJSXReg, '')
    try {
      const yamlResult = YAMLParser(v)

      return {
        ...memo,
        ...yamlResult,
      }
    } catch (err: any) {
      throw new Error(`Invalid YAML format of comment in ${path}\n${err.message}`)
    }
  }, {})
}

export function getRouteBlock(path: string) {
  const content = fs.readFileSync(path, 'utf-8')
  const parsedJSX = parseJSX(content)

  if (!parsedJSX.length) return

  const result = parseYamlComment(parsedJSX, path)

  return result
}

export function extendRoute(route: ReactRoute) {
  if (!route.element) return

  const block = getRouteBlock(route.element)

  return { ...route, ...block }
}
