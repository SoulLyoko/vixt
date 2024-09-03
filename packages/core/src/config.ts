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

export async function loadVixtConfig(opts?: LoadConfigOptions<VixtOptions>) {
  const rootDir = path.resolve(cwd())
  const buildDirName = '.vixt'
  const buildDir = path.resolve(rootDir, buildDirName)
  const buildTypesDir = path.resolve(buildDir, 'types')
  const buildLayersDir = path.resolve(buildDir, 'layers')
  const buildImportsDir = path.resolve(buildDir, 'imports')
  const srcDirName = 'src'
  const srcDir = path.resolve(rootDir, srcDirName)
  const result = await loadConfig<VixtOptions>({
    name: 'vixt',
    rcFile: false,
    ...opts,
    defaults: {
      rootDir,
      buildDirName,
      buildDir,
      buildTypesDir,
      buildLayersDir,
      buildImportsDir,
      srcDirName,
      srcDir,
      ...opts?.defaults,
    },
  })
  return result
}

export function applyLayers(layers: VixtConfigLayer[], config: VixtOptions) {
  const { rootDir, buildLayersDir } = config
  return layers.map((layer) => {
    const meta = layer.config?.meta ?? {}
    const layerName = meta.name || layer.cwd!.split('/').pop()!
    if (!isSamePath(layer.cwd!, path.resolve(rootDir!)))
      meta.alias = `#/layers/${layerName}`
    // copy to `<buildLayersDir>/<layerName>` when layer is in node_modules
    if (layer.cwd?.includes('node_modules')) {
      const newCwd = path.resolve(buildLayersDir!, layerName)
      fs.copySync(layer.cwd!, newCwd, {
        filter: (src) => {
          const nodeModulesPath = path.resolve(layer.cwd!, 'node_modules')
          const tsConfigPath = path.resolve(layer.cwd!, 'tsconfig.json')
          return !isSamePath(src, nodeModulesPath) && !isSamePath(src, tsConfigPath)
        },
      })
      layer.cwd = newCwd
    }
    // meta.relative = path.join(path.relative(srcDir!, path.resolve(layer.cwd!, srcDirName!)))
    return { ...layer, meta }
  })
}

export function isSamePath(a: string, b: string) {
  return path.normalize(a) === path.normalize(b)
}

export function resolveLayersDirs(layers: VixtConfigLayer[] = [], config: VixtOptions) {
  const { srcDirName } = config
  const dirs: Record<string, string[] | undefined> = {}
  for (const layer of layers) {
    const contents = fs.readdirSync(path.resolve(layer.cwd!, srcDirName!))
    for (const content of contents) {
      const fileOrDirPath = path.resolve(layer.cwd!, srcDirName!, content)
      if (fs.statSync(fileOrDirPath).isDirectory()) {
        dirs[content] ??= []
        dirs[content]!.push(fileOrDirPath)
      }
    }
  }

  return dirs
}
