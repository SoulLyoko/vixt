import type { Pinia } from 'pinia'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'
import type { EnhanceAppContext, Theme } from 'vitepress'

export interface VitepressVixtAppConfig {
  Layout?: Theme['Layout']
  extends?: Theme['extends']
  /** https://github.com/prazdevs/pinia-plugin-persistedstate */
  piniaPersistedState?: PersistedStateOptions
}

export interface VitepressVixtApp extends EnhanceAppContext {
  /** Pinia instance */
  pinia: Pinia
}

declare module '@vixt/core/client' {
  interface VixtAppConfig extends VitepressVixtAppConfig { }
  interface VixtApp extends VitepressVixtApp { }
}
