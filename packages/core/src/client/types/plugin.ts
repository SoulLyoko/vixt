import type { VixtApp } from './app'

export interface PluginDefinition {
  name?: string
  setup?: (this: void, vixt: VixtApp) => any
}
export interface VixtPlugin {
  (this: void, vixt: VixtApp): any
  /** @internal */
  _name?: string
}
