import type { VixtAppConfig } from '../../types'
import type { Pinia } from 'pinia'
import type { App } from 'vue'
import type { Router, RouteRecord } from 'vue-router'

export interface VixtApp {
  app: App
  router: Router
  routes: RouteRecord[]
  pinia: Pinia
  appConfig: VixtAppConfig
}
