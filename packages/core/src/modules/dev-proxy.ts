import type { ProxyOptions } from 'vite'

import defu from 'defu'

import { defineVixtModule } from '..'

// @ts-ignore
declare module '@vixt/core' {
  interface VixtOptions {
    devProxy?: DevProxyOptions
  }
}

export interface DevProxyOptions {
  /**
   * 环境变量的 key
   * @default 'VITE_PROXY'
   */
  key?: string
}

/**
 * @param list [prefix,target,rewrite?][]
 */
export function transformProxy(list: string) {
  return Object.fromEntries<ProxyOptions>(
    JSON.parse(list).map(([prefix, target, rewrite]: [string, string, boolean]) => {
      const option: ProxyOptions = {
        target,
        changeOrigin: true,
        ws: true,
        secure: /^https:\/\//.test(target),
      }
      if (rewrite)
        option.rewrite = (path: string) => path.replace(new RegExp(`^${prefix}`), '')
      return [prefix, option]
    }),
  )
}

const name = 'vixt:dev-proxy'
/** 为 vite 开发服务添加代理配置 */
export const devProxy = defineVixtModule<DevProxyOptions>({
  meta: { name, configKey: 'devProxy' },
  defaults: { key: 'VITE_PROXY' },
  setup(options) {
    return {
      name,
      configResolved(config) {
        const { env } = config
        const proxyList = env[options.key!]
        if (proxyList) {
          const proxy = transformProxy(proxyList)
          config.server.proxy = defu(proxy, config.server.proxy)
          config.preview.proxy = defu(proxy, config.server.proxy)
        }
      },
    }
  },
})
