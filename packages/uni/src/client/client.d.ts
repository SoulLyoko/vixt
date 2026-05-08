import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'
import type { Pinia } from 'pinia'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

export interface UniVixtAppConfig {
  /** https://github.com/prazdevs/pinia-plugin-persistedstate */
  piniaPersistedState?: PersistedStateOptions
}

export interface UniVixtApp {
  /** Uni-app app instance */
  app: App
  /** Uni-app pages */
  routes: PageMetaDatum[]
  /** Pinia instance */
  pinia: Pinia
}

declare module '@vixt/core/client' {
  interface VixtAppConfig extends UniVixtAppConfig { }
  interface VixtApp extends UniVixtApp { }
}
