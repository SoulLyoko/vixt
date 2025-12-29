import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'
import type { Pinia } from 'pinia'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    /** https://github.com/prazdevs/pinia-plugin-persistedstate */
    piniaPersistedState?: PersistedStateOptions
  }

  interface VixtApp {
    app: App
    routes: PageMetaDatum[]
    pinia: Pinia
    appConfig: VixtAppConfig
  }
}
