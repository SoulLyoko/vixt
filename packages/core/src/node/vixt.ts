import type { VixtOptions } from './types/config'
import type { Vixt } from './types/vixt'
import type { LoadConfigOptions } from 'c12'

import defu from 'defu'

import { applyLayers, loadVixtConfig } from './config'
import { applyLayerModules, defineVitePlugin, installModule } from './module'
import { builtinModules } from './modules'

export async function loadVixt(opts: LoadConfigOptions<VixtOptions> = {}) {
  const result = await loadVixtConfig(opts)

  // apply layers
  result.layers = applyLayers(result)

  // apply modules
  const layerModules = await applyLayerModules(result)

  const vixt: Vixt = {
    options: result.config,
    _layers: result.layers ?? [],
    _modules: [...builtinModules, ...(result.config.modules ?? []), ...layerModules],
  }

  return vixt
}

export function createVixtPlugin(loadOptions: LoadConfigOptions<VixtOptions>) {
  return defineVitePlugin<VixtOptions>(async vixtOptions => {
    const vixt = await loadVixt(defu({ defaults: vixtOptions }, loadOptions))

    const plugins = vixt._modules.map(module => installModule(module, {}, vixt))

    return plugins
  })
}
