import type { Vixt } from './vixt'
import type { PluginOption } from 'vite'

export type ModuleOptions = Record<string, any>
export interface ModuleMeta extends Record<string, any> {
  name?: string
  configKey?: string
}
export interface ModuleDefinition<T extends ModuleOptions = ModuleOptions> {
  meta?: ModuleMeta
  defaults?: Partial<T> | ((vixt: Vixt) => Partial<T>)
  setup?: (this: void, resolvedOptions: T, vixt: Vixt) => PluginOption | void
}
export interface VixtModule<T extends ModuleOptions = ModuleOptions> {
  (this: void, resolvedOptions: T, vixt: Vixt): PluginOption
  getOptions?: (inlineOptions: Partial<T>, Vixt: Vixt) => T
  getMeta?: () => ModuleMeta
}
