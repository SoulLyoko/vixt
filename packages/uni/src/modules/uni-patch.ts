import type { ResolvedConfig } from 'vite'

import { defineVitePlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'
import { normalizePath } from 'vite'

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

/**
 * 兼容 unocss^66.1.0 小程序平台的css文件后缀名
 * @see https://github.com/dcloudio/uni-app/pull/5605/files
 */
export function patchAdjustCssExtname(config: ResolvedConfig) {
  const plugin = config.plugins.find(p => p.name === 'uni:adjust-css-extname')
  if (plugin && typeof plugin.generateBundle === 'function') {
    const handler = plugin.generateBundle
    plugin.generateBundle = { order: 'post', handler }
  }
}

/**
 * fix unocss^66.1.0 hot reload fail `[unocss:global:build:scan] Could not load xxx/src/__uno.css`
 * @see https://github.com/unocss/unocss/issues/4616
 * @see https://github.com/unocss/unocss/pull/4737
 */
export function patchUnocssGlobalBuildScan(config: ResolvedConfig) {
  const plugin = config.plugins.find(p => p.name === 'unocss:global:build:scan')
  if (plugin)
    plugin.shouldTransformCachedModule = ({ id }) => id.endsWith('main.ts')
}

/**
 * fix `@uni-helper/vite-plugin-uni-components` load slowly
 * @see https://github.com/uni-helper/vite-plugin-uni-components/blob/main/packages/core/src/index.ts#L27
 */
export function patchUniComponents(config: ResolvedConfig) {
  if (JSON.stringify(config.build.watch) === '{}')
    config.build.watch = null
}

export const uniPatch = defineVitePlugin(() => {
  patchNormalizeNodeModules()

  return [
    {
      name: 'vixt:uni-patch-runtime',
      transform(code, id) {
        id = normalizePath(id)
        code = transformMpRuntime(code, id)
        code = transformH5Runtime(code, id)
        return code
      },
    },
    {
      name: 'vixt:uni-patch-uni-components',
      configResolved(config) {
        patchUniComponents(config)
      },
    },
    {
      name: 'vixt:uni-patch-unocss-global-build-scan',
      apply: 'build',
      enforce: 'pre',
      configResolved(config) {
        patchUnocssGlobalBuildScan(config)
      },
    },
    {
      name: 'vixt:uni-patch-adjust-css-extname',
      enforce: 'post',
      configResolved(config) {
        patchAdjustCssExtname(config)
      },
    },
  ]
})
