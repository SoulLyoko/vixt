import type { VixtConfigLayer, VixtOptions } from './config'
import type { VixtModule } from './module'
import type { LoadConfigOptions } from 'c12'

import { env } from 'node:process'

import defu from 'defu'
import fs from 'fs-extra'

import { applyLayers, loadVixtConfig } from './config'
import { loadCLIOptions } from './env'
import { applyLayerModules, defineVitePlugin, installModule } from './module'
import { builtinModules } from './modules'

export interface Vixt {
  options: VixtOptions
  _layers: VixtConfigLayer[]
  _modules: VixtModule[]
}

export async function loadVixt(opts?: LoadConfigOptions<VixtOptions>) {
  const result = await loadVixtConfig(opts)

  const cliOptions = loadCLIOptions()

  // remove buildDir
  cliOptions.force && fs.removeSync(result.config.buildDir!)

  // assign vixt.options.debug
  result.config.debug = !!cliOptions.debug

  // assign vixt.options.dev
  result.config.dev = env.NODE_ENV !== 'production'

  // apply layers
  result.layers = applyLayers(result)

  // apply modules
  const layerModules = await applyLayerModules(result)

  const vixt: Vixt = {
    options: result.config,
    _layers: result.layers ?? [],
    _modules: [...builtinModules, ...result.config.modules ?? [], ...layerModules],
  }

  return vixt
}

export function createVixtPlugin(loadOptions: LoadConfigOptions<VixtOptions>) {
  return defineVitePlugin<VixtOptions>(async (vixtOptions) => {
    const vixt = await loadVixt(defu({ defaults: vixtOptions }, loadOptions))

    const plugins = vixt._modules.map(module => installModule(module, {}, vixt))

    return plugins
  })
}
