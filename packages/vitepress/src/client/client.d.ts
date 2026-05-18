import type { EnhanceAppContext, Theme } from 'vitepress'

export interface VitepressVixtAppConfig {
  Layout?: Theme['Layout']
  extends?: Theme['extends']
}

export interface VitepressVixtApp extends EnhanceAppContext {}

declare module '@vixt/core/client' {
  interface VixtAppConfig extends VitepressVixtAppConfig { }
  interface VixtApp extends VitepressVixtApp { }
}
