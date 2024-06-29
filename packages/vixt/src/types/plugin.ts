import type { VixtApp } from './vixt'

export interface PluginDefinition {
  name?: string
  setup?: (this: void, vixt: VixtApp) => any
}
export interface VixtPlugin {
  (this: void, vixt: VixtApp): any
}
