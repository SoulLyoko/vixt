import { defineVixtPlugin } from 'vixt/client'

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    pluginConfig?: string
  }
}

export default defineVixtPlugin((vixtApp) => {
  console.log('vixtApp:', vixtApp.appConfig)
  console.log('layer-shared1 plugin loaded')

  // @ts-expect-error
  vixtApp.appConfig.pluginConfig = 0
})
