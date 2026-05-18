import type { PageMetaDatum } from '@uni-helper/vite-plugin-uni-pages'
import type { App } from 'vue'

export interface UniVixtApp {
  /** Uni-app app instance */
  app: App
  /** Uni-app pages */
  routes: PageMetaDatum[]
}

declare module '@vixt/core/client' {
  interface VixtApp extends UniVixtApp { }
}
