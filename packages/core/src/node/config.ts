import type { VixtOptions } from './types/config'
import type { LoadVixtConfigOptions, ResolvedVixtConfig, VixtConfigLayer } from './types/layer'

import { loadConfig } from 'c12'
import fs from 'fs-extra'
import { normalize, resolve } from 'pathe'

import { findUpWorkspaceDir } from './env'

/**
 * Define the Vixt config.
 * @example
 * ```ts
 * // vixt.config.ts
 * import { defineVixtConfig } from 'vixt'
 *
 * export default defineVixtConfig({
 *   // Vixt配置
 * })
 * ```
 */
export function defineVixtConfig(input: VixtOptions) {
  return input
}

export async function loadVixtConfig(opts?: LoadVixtConfigOptions): Promise<ResolvedVixtConfig> {
  const result = await loadConfig<VixtOptions>({
    name: 'vixt',
    rcFile: false,
    ...opts,
  })

  const { config, cwd } = result
  // assign default dirs
  config.rootDir ??= cwd
  config.buildDir ??= resolve(config.rootDir!, '.vixt')
  config.buildTypesDir ??= resolve(config.buildDir, 'types')
  config.buildLayersDir ??= resolve(config.buildDir, 'layers')
  config.workspaceDir ??= findUpWorkspaceDir()
  config.srcDir ??= resolve(config.rootDir!, 'src')
  config.modulesDir ??= resolve(config.srcDir!, 'modules')
  config.pluginsDir ??= resolve(config.srcDir!, 'plugins')

  return result
}

export function applyLayers({ config, layers = [] }: ResolvedVixtConfig) {
  const { rootDir, buildLayersDir, copyLayers = true } = config
  return layers.filter(e => e.cwd).map((layer) => {
    layer.config ??= {}
    layer.config.meta ??= {}

    const meta = layer.config.meta
    const layerName = meta.name || layer.cwd!.split('/').pop()!
    if (!isSamePath(layer.cwd!, resolve(rootDir!))) {
      meta.alias = `#/layers/${layerName}`
    }

    // FIXME: required to copy when layer is installed from git
    if (copyLayers && layer.cwd?.includes('node_modules')) {
      const newCwd = resolve(buildLayersDir!, layerName)
      fs.removeSync(newCwd)
      fs.copySync(layer.cwd!, newCwd, {
        filter: (src) => {
          const nodeModulesPath = resolve(layer.cwd!, 'node_modules')
          const tsConfigPath = resolve(layer.cwd!, 'tsconfig.json')
          return !isSamePath(src, nodeModulesPath) && !isSamePath(src, tsConfigPath)
        },
      })
      layer.cwd = newCwd
    }

    if (isSamePath(layer.cwd!, resolve(rootDir!))) {
      layer.config.rootDir ??= config.rootDir
      layer.config.srcDir ??= config.srcDir
      layer.config.modulesDir ??= config.modulesDir
      layer.config.pluginsDir ??= config.pluginsDir
    }

    // assign layer `rootDir` and `srcDir`
    layer.config.rootDir ??= layer.cwd
    layer.config.srcDir ??= resolve(layer.config.rootDir!, 'src')
    layer.config.modulesDir ??= resolve(layer.config.srcDir!, 'modules')
    layer.config.pluginsDir ??= resolve(layer.config.srcDir!, 'plugins')

    return { ...layer, meta } as VixtConfigLayer
  })
}

export function isSamePath(a: string, b: string) {
  return normalize(a) === normalize(b)
}

export function resolveLayersDirs(layers: VixtConfigLayer[] = []) {
  const dirs: Record<string, string[] | undefined> = {}
  for (const layer of layers) {
    const srcPath = layer.config!.srcDir!
    const isExist = fs.existsSync(srcPath)
    const contents = isExist ? fs.readdirSync(srcPath) : []
    for (const content of contents) {
      const fileOrDirPath = resolve(srcPath, content)
      if (fs.statSync(fileOrDirPath).isDirectory()) {
        dirs[content] ??= []
        dirs[content]!.push(fileOrDirPath)
      }
    }
  }

  return dirs
}
