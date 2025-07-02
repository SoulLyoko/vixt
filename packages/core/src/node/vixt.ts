import type { VixtConfigLayer, VixtOptions } from './config'
import type { VixtModule } from './module'
import type { LoadConfigOptions } from 'c12'

import { cac } from 'cac'
import defu from 'defu'
import fs from 'fs-extra'

import { applyLayers, config, typescript } from '.'
import { loadVixtConfig } from './config'
import { applyLayerModules, defineVitePlugin } from './module'

export interface Vixt {
  options: VixtOptions
  _layers: VixtConfigLayer[]
  _modules: VixtModule[]
}

export async function loadVixt(opts?: LoadConfigOptions<VixtOptions>) {
  const result = await loadVixtConfig(defu(opts, {
    defaults: {
      modules: [config, typescript],
    },
  }))

  const parsedArgv = cac().parse()
  const isForce = !!parsedArgv.options.force
  if (isForce) {
    // remove buildDir
    fs.removeSync(result.config.buildDir!)
  }
  else {
    // remove layers
    fs.removeSync(result.config.buildLayersDir!)
  }

  // apply layers
  result.layers = applyLayers(result.layers ?? [], result.config)

  // apply modules
  const layerModules = await applyLayerModules(result.layers ?? [])

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
