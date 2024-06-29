import type { PluginOption } from 'vite'
import type { Vixt } from './vixt'

export type PluginOptions<Options = any> = (Options extends (...args: any[]) => any ? Parameters<Options>[0] : Options)

export type ModuleOptions = Record<string, any>
export interface ModuleMeta extends Record<string, any> {
  name?: string
  configKey?: string
}
export interface ModuleDefinition<T extends ModuleOptions = ModuleOptions> {
  meta?: ModuleMeta
  defaults?: T | ((vixt: Vixt) => T)
  setup?: (this: void, resolvedOptions: T, vixt: Vixt) => PluginOption
}
export interface VixtModule<T extends ModuleOptions = ModuleOptions> {
  (this: void, inlineOptions: T, vixt: Vixt): PluginOption
  getOptions?: (inlineOptions?: T, Vixt?: Vixt) => T
  getMeta?: () => ModuleMeta
}
