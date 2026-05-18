import type { App } from 'vue'
import type { Router, RouteRecord, RouterOptions } from 'vue-router'

export interface VueVixtAppConfig {
  /** https://router.vuejs.org/api/interfaces/RouterOptions.html */
  router?: Partial<RouterOptions>
}

export interface VueVixtApp {
  /** Vue app instance */
  app: App
  /** Router instance */
  router: Router
  /** Router routes */
  routes: RouteRecord[]
}

declare module '@vixt/core/client' {
  interface VixtAppConfig extends VueVixtAppConfig { }
  interface VixtApp extends VueVixtApp { }
}
