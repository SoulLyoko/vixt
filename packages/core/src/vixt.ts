import type { Vixt, VixtOptions } from './types'
import type { LoadConfigOptions } from 'c12'

import { cac } from 'cac'
import defu from 'defu'
import fs from 'fs-extra'

import { applyLayers, config, typescript } from '.'
import { loadVixtConfig } from './config'
import { applyLayerModules, defineVitePlugin } from './module'

export async function loadVixt(opts?: LoadConfigOptions<VixtOptions>) {
  const result = await loadVixtConfig(defu(opts, {
    defaults: {
      modules: [config, typescript],
    },
  }))

  // remove buildDir
  const parsedArgv = cac().parse()
  const isForce = !!parsedArgv.options.force
  if (isForce) {
    fs.removeSync(result.config.buildDir!)
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
