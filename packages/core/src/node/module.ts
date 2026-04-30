import type { ResolvedVixtConfig } from './types/layer'
import type { ModuleDefinition, ModuleOptions, VixtModule } from './types/module'
import type { Vixt } from './types/vixt'
import type { PluginOption } from 'vite'

import defu from 'defu'
import fs from 'fs-extra'
import { createJiti } from 'jiti'
import { pathToFileURL } from 'mlly'
import path from 'pathe'

import { resolveLayersDirs } from './config'

/**
 * A helper function for creating Vite plugins.
 * @example
 * ```ts
 * import { defineVitePlugin } from 'vixt'
 *
 * interface PluginOptions {
 *   enabled?: boolean
 * }
 *
 * export const myVitePlugin = defineVitePlugin<PluginOptions>((options) => {
 *   console.log(options)
 *   return {
 *     name: 'my-vite-plugin',
 *     configResolved(config) {
 *       console.log(config)
 *     }
 *   }
 * })
 * ```
 */
export function defineVitePlugin<Options = any>(pluginFn: (options?: Options) => PluginOption) {
  return pluginFn
}

/**
 * Define a Vixt module.
 * @example
 * ```ts
 * // src/modules/my-module.ts
 * import { defineVixtModule } from 'vixt'
 *
 * interface ModuleOptions {
 *   enabled?: boolean
 * }
 *
 * declare module 'vixt' {
 *   interface VixtOptions {
 *     myModuleOptions?: ModuleOptions
 *   }
 * }
 *
 * const name = 'my-module'
 * export default defineVixtModule<ModuleOptions>({
 *   meta: { name },
 *   defaults: { enabled: true },
 *   setup(options, vixt) {
 *     console.log(options) // { enabled: true }
 *     return {
 *       name,
 *       configResolved(config) {
 *         console.log(config)
 *       }
 *     } // return one or more vite plugins
 *   }
 * })
 * ```
 */
export function defineVixtModule<T extends ModuleOptions = ModuleOptions>(definition: ModuleDefinition<T> | VixtModule<T>) {
  if (typeof definition == 'function')
    return defineVixtModule({ setup: definition })

  const module = definition

  function getOptions(inlineOptions: Partial<T>, vixt: Vixt) {
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

export function installModule<T extends ModuleOptions = ModuleOptions>(module: VixtModule<T>, inlineOptions: any, vixt: Vixt) {
  return module(inlineOptions, vixt)
}

export async function applyLayerModules({ config, layers = [] }: ResolvedVixtConfig): Promise<VixtModule[]> {
  const { modules: modulesDirs = [] } = resolveLayersDirs(layers)
  const modules: VixtModule[] = []
  const jiti = createJiti(config.rootDir!, { moduleCache: false })
  for (const m of modulesDirs.reverse()) {
    if (fs.existsSync(m)) {
      const files = fs.readdirSync(m)
      for (const f of files) {
        try {
          const fileURL = pathToFileURL(path.resolve(m, f))
          const module = await jiti.import(fileURL, { default: true }) as VixtModule
          modules.push(module)
        }
        catch { }
      }
    }
  }

  return modules
}
