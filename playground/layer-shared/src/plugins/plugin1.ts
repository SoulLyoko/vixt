import { defineVixtPlugin } from 'vixt/client'

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    pluginConfig?: string
  }
}

export default defineVixtPlugin((vixtApp) => {
  console.log('vixtApp:', vixtApp.appConfig)
  console.log('layer-shared plugin1 loaded')

  // @ts-expect-error
  vixtApp.appConfig.pluginConfig = 0
})
