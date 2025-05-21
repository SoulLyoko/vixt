import type { Root } from 'react-dom/client'
import type { RouteObject } from 'react-router'

declare module '@vixt/core/client' {
  interface VixtAppConfig { }

  interface VixtApp {
    app: Root
    routes: RouteObject[]
    appConfig: VixtAppConfig
  }
}
