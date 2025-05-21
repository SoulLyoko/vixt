import type { Pinia } from 'pinia'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { EnhanceAppContext } from 'vitepress'

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    /** https://github.com/prazdevs/pinia-plugin-persistedstate */
    piniaPersistedState?: PersistedStateOptions
  }

  interface VixtApp extends EnhanceAppContext {
    pinia: Pinia
    appConfig: VixtAppConfig
  }
}
