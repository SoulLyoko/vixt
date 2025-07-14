import type { VixtConfigLayer } from './config'
import type { Vixt } from './vixt'
import type { PluginOption } from 'vite'

import defu from 'defu'
import fs from 'fs-extra'
import { pathToFileURL } from 'mlly'
import 'tsx/esm'
import path from 'pathe'

import { resolveLayersDirs } from './config'

export type PluginOptions<Options = any> = (Options extends (...args: any[]) => any ? Parameters<Options>[0] : Options)

export type ModuleOptions = Record<string, any>
export interface ModuleMeta extends Record<string, any> {
  name?: string
  configKey?: string
}
export interface ModuleDefinition<T extends ModuleOptions = ModuleOptions> {
  meta?: ModuleMeta
  defaults?: T | ((vixt: Vixt) => T)
  setup?: (this: void, resolvedOptions: T, vixt: Vixt) => PluginOption | void
}
export interface VixtModule<T extends ModuleOptions = ModuleOptions> {
  (this: void, inlineOptions: T, vixt: Vixt): PluginOption
  getOptions?: (inlineOptions?: T, Vixt?: Vixt) => T
  getMeta?: () => ModuleMeta
}

export function defineVitePlugin<Options = any>(pluginFn: (options?: Options) => PluginOption) {
  return pluginFn
}

export function defineVixtModule<T extends ModuleOptions>(definition: ModuleDefinition<T> | VixtModule<T>): VixtModule<T> {
  if (typeof definition == 'function')
    return defineVixtModule({ setup: definition })

  const module = definition

  function getOptions(inlineOptions: T, vixt: Vixt) {
    const configKey = module.meta?.configKey || module.meta?.name
    const configOptions = configKey ? vixt.options[configKey] : {}
    const defaultOptions = typeof module.defaults === 'function' ? module.defaults(vixt) : module.defaults
    const resolvedOptions = defu(inlineOptions, configOptions, defaultOptions)
    if (configKey) {
      vixt.options[configKey] = resolvedOptions
    }
    return resolvedOptions as T
  }

  function normalizedModule(inlineOptions: T, vixt: Vixt) {
    const options = getOptions(inlineOptions, vixt)
    return module.setup?.(options, vixt)
  }

  normalizedModule.getMeta = () => module.meta
  normalizedModule.getOptions = getOptions

  return normalizedModule as VixtModule<T>
}

export function installModule(module: VixtModule, inlineOptions: any, vixt: Vixt) {
  return module(inlineOptions, vixt)
}

export async function applyLayerModules(layers: VixtConfigLayer[]): Promise<VixtModule[]> {
  const { modules: modulesDirs = [] } = resolveLayersDirs(layers)
  const modules: VixtModule[] = []
  for (const m of modulesDirs.reverse()) {
    if (fs.existsSync(m)) {
      const files = fs.readdirSync(m)
      for (const f of files) {
        const p = path.resolve(m, f)
        try {
          const module = await import(/* @vite-ignore */pathToFileURL(p)).then(m => m.default)
          modules.push(module)
        }
        catch (error) {
          console.error('[LoadVixtModule Error]:', error)
        }
      }
    }
  }

  return modules
}
