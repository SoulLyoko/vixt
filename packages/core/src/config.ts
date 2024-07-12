import type { LoadConfigOptions } from 'c12'
import type { VixtOptions } from './types'
import type { VixtConfigLayer } from '.'

import { cwd } from 'node:process'

import path from 'pathe'
import fs from 'fs-extra'
import { loadConfig } from 'c12'

export function defineVixtConfig(input: VixtOptions) {
  return input
}

export const rootDir = path.resolve(cwd())
export const buildDir = '.vixt'
export const buildTypesDir = `${buildDir}/types`
export const buildLayersDir = `${buildDir}/layers`
export async function loadVixtConfig(opts?: LoadConfigOptions<VixtOptions>) {
  const result = await loadConfig<VixtOptions>({
    name: 'vixt',
    rcFile: false,
    ...opts,
    defaults: {
      rootDir,
      buildDir,
      buildTypesDir,
      buildLayersDir,
      ...opts?.defaults,
    },
  })
  result.layers = mapLayers(result.layers?.filter(e => e.cwd) ?? [])
  return result
}

function mapLayers(layers: VixtConfigLayer[]) {
  return layers.map((layer) => {
    const meta = layer.config?.meta ?? {}
    const layerName = meta.name || layer.cwd!.split('/').pop()!
    meta.name && (meta.alias = `#/layers/${meta.name}`)
    // when layer is in node_modules, copy to `<buildLayersDir>/<layerName>`
    if (layer.cwd?.includes('node_modules')) {
      const newCwd = path.resolve(rootDir, buildLayersDir, layerName)
      fs.copySync(layer.cwd!, newCwd, {
        filter: (src) => {
          const nodeModulesPath = path.resolve(layer.cwd!, 'node_modules')
          const tsConfigPath = path.resolve(layer.cwd!, 'tsconfig.json')
          return !isSamePath(src, nodeModulesPath) && !isSamePath(src, tsConfigPath)
        },
      })
      layer.cwd = newCwd
    }
    meta.relative = path.join('./', path.relative(`${rootDir}/src`, layer.cwd!))
    return { ...layer, meta }
  })
}

function isSamePath(a: string, b: string) {
  return path.resolve(a) === path.resolve(b)
}

export function resolveLayersDirs(layers: VixtConfigLayer[] = []) {
  const dirs: Record<string, string[] | undefined> = {}
  for (const layer of layers) {
    const contents = fs.readdirSync(path.resolve(layer.cwd!, 'src'))
    for (const content of contents) {
      const fileOrDirPath = path.resolve(layer.cwd!, 'src', content)
      if (fs.statSync(fileOrDirPath).isDirectory()) {
        dirs[content] ??= []
        dirs[content]!.push(fileOrDirPath)
      }
    }
  }

  return dirs
}
