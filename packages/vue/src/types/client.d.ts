import type { Pinia } from 'pinia'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'
import type { Router, RouteRecord, RouterOptions } from 'vue-router'

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    router?: Partial<RouterOptions>
    /** https://github.com/prazdevs/pinia-plugin-persistedstate */
    piniaPersistedState?: PersistedStateOptions
  }

  interface VixtApp {
    app: App
    router: Router
    routes: RouteRecord[]
    pinia: Pinia
    appConfig: VixtAppConfig
  }
}
