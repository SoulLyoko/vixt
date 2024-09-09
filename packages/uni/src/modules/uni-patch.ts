import { defineVitePlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

/** 增加小程序中vueuse的运行所需 */
export function vueusePolyfill(code: string, id: string) {
  if (!id.endsWith('@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js'))
    return code
  code += `
export const render = () => {}
export const TransitionGroup = {}
`
  return code
}

/** 移除路径中的'../' */
export function patchNormalizeNodeModules() {
  const matched = `str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules');`
  const replaced = `str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules').replace(/\\.\\.\\//g, '');`
  const codePath = resolvePathSync('@dcloudio/uni-cli-shared/dist/utils.js')
  let code = fs.readFileSync(codePath, 'utf8')
  if (code.includes(matched)) {
    code = code.replace(matched, replaced)
    fs.writeFileSync(codePath, code)
  }
}

export const uniPatch = defineVitePlugin(() => {
  patchNormalizeNodeModules()
  return {
    name: 'vixt:uni-patch',
    transform(code, id) {
      code = vueusePolyfill(code, id)
      return code
    },
  }
})
