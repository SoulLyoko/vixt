import type { App } from 'vue'
import type { RouteRecord, Router } from 'vue-router'
import type { Pinia } from 'pinia'

export interface VixtApp {
  app: App
  router: Router
  routes: RouteRecord[]
  pinia: Pinia
}
