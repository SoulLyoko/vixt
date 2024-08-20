import type { LoadConfigOptions } from 'c12'
import type { Vixt, VixtOptions } from './types'

import defu from 'defu'

import { applyLayerModules, defineVitePlugin } from './module'
import { loadVixtConfig } from './config'
import { alias, app, config, typescript } from '.'

export async function loadVixt(opts?: LoadConfigOptions<VixtOptions>) {
  const result = await loadVixtConfig(defu(opts, {
    defaults: {
      modules: [alias, app, config, typescript],
    },
  }))

  const layerModules = await applyLayerModules(result.layers ?? [], result.config)

  const vixt: Vixt = {
    options: result.config,
    _layers: result.layers ?? [],
    _modules: [...result.config.modules ?? [], ...layerModules],
  }

  return vixt
}

export function createVixtPlugin(loadOptions: LoadConfigOptions<VixtOptions>) {
  return defineVitePlugin<VixtOptions>(async (vixtOptions) => {
    const vixt = await loadVixt(defu({ defaults: vixtOptions }, loadOptions))

    const plugins = vixt._modules.map(module => module({}, vixt))

    return plugins
  })
}
