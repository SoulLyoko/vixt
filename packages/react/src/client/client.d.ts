import type { Root } from 'react-dom/client'
import type { RouteObject } from 'react-router'

export interface ReactVixtAppConfig { }

export interface ReactVixtApp {
  /** React app root */
  app: Root
  /** Router routes */
  routes: RouteObject[]
}

declare module '@vixt/core/client' {
  interface VixtAppConfig extends ReactVixtAppConfig { }
  interface VixtApp extends ReactVixtApp { }
}
