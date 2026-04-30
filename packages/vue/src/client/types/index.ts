import type { Pinia } from 'pinia'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'
import type { Router, RouteRecord, RouterOptions } from 'vue-router'

export interface VueVixtAppConfig {
  /** https://router.vuejs.org/api/interfaces/RouterOptions.html */
  router?: Partial<RouterOptions>
  /** https://github.com/prazdevs/pinia-plugin-persistedstate */
  piniaPersistedState?: PersistedStateOptions
}

export interface VueVixtApp {
  /** Vue app instance */
  app: App
  /** Router instance */
  router: Router
  /** Router routes */
  routes: RouteRecord[]
  /** Pinia instance */
  pinia: Pinia
}

declare module '@vixt/core/client' {
  interface VixtAppConfig extends VueVixtAppConfig { }
  interface VixtApp extends VueVixtApp { }
}
