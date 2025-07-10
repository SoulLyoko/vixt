import { defineVitePlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'

/** 增加小程序中vueuse的运行所需 */
export function transformMpRuntime(code: string, id: string) {
  if (!id.endsWith('@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js'))
    return code
  code += `
export const render = () => {}
export const TransitionGroup = {}
`
  return code
}

/**
 * 修复h5报错`Cannot assign to read only property '_' of object '#<Object>'`
 * @see https://ask.dcloud.net.cn/question/194973
 */
export function transformH5Runtime(code: string, id: string) {
  if (!id.endsWith('@dcloudio/uni-h5-vue/dist/vue.runtime.esm.js'))
    return code
  code = code.replace(`def(children, "_", type);`, `def(children, "_", type, true);`)
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
      code = transformMpRuntime(code, id)
      code = transformH5Runtime(code, id)
      return code
    },
  }
})
