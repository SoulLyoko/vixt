import type { ResolvedConfig } from 'vite'

import { defineVitePlugin } from '@vixt/core'
import fs from 'fs-extra'
import { resolvePathSync } from 'mlly'
import path from 'pathe'
import { normalizePath } from 'vite'

/** 移除路径中的'../' */
export function overrideNormalizeNodeModules() {
  const matched = `str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules');`
  const replaced = `str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules').replace(/\\.\\.\\//g, '');`
  const codePath = resolvePathSync('@dcloudio/uni-cli-shared/dist/utils.js')
  let code = fs.readFileSync(codePath, 'utf-8')
  if (code.includes(matched)) {
    code = code.replace(matched, replaced)
    fs.writeFileSync(codePath, code)
  }
}

/**
 * fix `@uni-helper/vite-plugin-uni-pages` client types
 * @see https://github.com/uni-helper/vite-plugin-uni-pages/blob/v0.3.24/packages/core/client.d.ts#L4
 */
export function overrideUniPagesTypes() {
  const matched = `  import type { SubPackage } from './src/config/types/index'\n  import type { PageMetaDatum } from './src/types'`
  const replaced = `  import type { PageMetaDatum, SubPackage } from '@uni-helper/vite-plugin-uni-pages'`
  const codePath = path.resolve(
    resolvePathSync('@uni-helper/vite-plugin-uni-pages'),
    '../../client.d.ts',
  )
  let code = codePath && fs.readFileSync(codePath, 'utf-8')
  if (code.includes(matched)) {
    code = code.replace(matched, replaced)
    fs.outputFileSync(codePath, code)
  }
}

/** 增加小程序中vueuse的运行所需 */
export function transformMpRuntime(code: string, id: string) {
  if (!id.endsWith('@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js')) return code
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
  if (!id.endsWith('@dcloudio/uni-h5-vue/dist/vue.runtime.esm.js')) return code
  code = code.replace(`def(children, "_", type);`, `def(children, "_", type, true);`)
  return code
}

/** 修复app运行白屏，原因是pinia调用了@vue/devtools-kit的setupDevToolsPlugin */
export function transformPinia(code: string, id: string) {
  if (!id.endsWith('pinia/dist/pinia.mjs')) return code
  code = code.replace(
    `import { setupDevtoolsPlugin } from '@vue/devtools-api';`,
    `function setupDevtoolsPlugin() {};`,
  )
  return code
}

/**
 * fix `@uni-helper/vite-plugin-uni-components` load slowly
 * @see https://github.com/uni-helper/vite-plugin-uni-components/blob/v0.2.6/packages/core/src/index.ts#L27
 */
export function modifyUniComponentsConfig(config: ResolvedConfig) {
  if (JSON.stringify(config.build.watch) === '{}') config.build.watch = null
}

/**
 * 兼容 unocss^66.1.0 小程序平台的css文件后缀名
 * @see https://github.com/dcloudio/uni-app/pull/5605/files
 * @fixed 官方已修复
 */
// export function modifyAdjustCssExtnameConfig(config: ResolvedConfig) {
//   const plugin = config.plugins.find(p => p.name === 'uni:adjust-css-extname')
//   if (plugin && typeof plugin.generateBundle === 'function') {
//     const handler = plugin.generateBundle
//     plugin.generateBundle = { order: 'post', handler }
//   }
// }

/**
 * fix unocss^66.1.0 hot reload fail `[unocss:global:build:scan] Could not load xxx/src/__uno.css`
 * @see https://github.com/unocss/unocss/issues/4616
 * @see https://github.com/unocss/unocss/pull/4737
 * @fixed 官方已修复
 */
// export function modifyUnocssGlobalBuildScanConfig(config: ResolvedConfig) {
//   const plugin = config.plugins.find(p => p.name === 'unocss:global:build:scan')
//   if (plugin) {
//     plugin.shouldTransformCachedModule = ({ code }) => code.includes('virtual:uno.css')
//   }
// }

export default defineVitePlugin(() => {
  overrideNormalizeNodeModules()
  overrideUniPagesTypes()

  return {
    name: 'vixt:uni-patch',
    transform(code, id) {
      id = normalizePath(id)
      code = transformMpRuntime(code, id)
      code = transformH5Runtime(code, id)
      code = transformPinia(code, id)
      return code
    },
    configResolved(config: any) {
      modifyUniComponentsConfig(config)
      // modifyAdjustCssExtnameConfig(config)
      // modifyUnocssGlobalBuildScanConfig(config)
    },
  }
})
