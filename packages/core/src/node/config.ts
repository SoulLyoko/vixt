import type { AppOptions } from './app'
import type { VixtModule } from './module'
import type { ConfigLayer, ConfigLayerMeta, LoadConfigOptions } from 'c12'
import type { ResolvedConfig } from 'vite'

import { loadConfig } from 'c12'
import fs from 'fs-extra'
import { normalize, resolve } from 'pathe'

export interface VixtOptions extends Record<string, any> {
  /**
   * @default process.cwd()
   */
  rootDir?: string
  /**
   * @default '<rootDir>/.vixt'
   */
  buildDir?: string
  /**
   * @default '<buildDir>/types'
   */
  buildTypesDir?: string
  /**
   * @default '<buildDir>/layers'
   */
  buildLayersDir?: string
  /**
   * @default '<buildDir>/imports'
   */
  buildImportsDir?: string
  /**
   * @default '<rootDir>/src'
   */
  srcDir?: string
  /** modules */
  modules?: VixtModule[]
  /** use on configResolved */
  vite?: ResolvedConfig
  meta?: VixtConfigLayerMeta
  /** layers */
  extends?: string[]
  app?: AppOptions
}

export interface VixtConfigLayerMeta extends ConfigLayerMeta {
  /** layer name */
  name?: string
  /** layer alias */
  alias?: string
}

export interface VixtConfigLayer extends ConfigLayer<VixtOptions, VixtConfigLayerMeta> {
  /** when layer is in node_modules, layer will copy to `<buildLayersDir>/<layerName>`, and change cwd */
  cwd?: string
}

export function defineVixtConfig(input: VixtOptions) {
  return input
}

export async function loadVixtConfig(opts?: LoadConfigOptions<VixtOptions>) {
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
  config.buildImportsDir ??= resolve(config.buildDir, 'imports')
  config.srcDir ??= resolve(config.rootDir!, 'src')

  return result
}

export function applyLayers(layers: VixtConfigLayer[], config: VixtOptions) {
  const { rootDir, buildLayersDir } = config
  return layers.filter(e => e.cwd).map((layer) => {
    const meta = layer.config?.meta ?? {}
    const layerName = meta.name || layer.cwd!.split('/').pop()!

    if (!isSamePath(layer.cwd!, resolve(rootDir!))) {
      meta.alias = `#/layers/${layerName}`
    }

    // copy to `<buildLayersDir>/<layerName>` when layer is in node_modules
    if (layer.cwd?.includes('node_modules')) {
      const newCwd = resolve(buildLayersDir!, layerName)
      fs.copySync(layer.cwd!, newCwd, {
        filter: (src) => {
          const nodeModulesPath = resolve(layer.cwd!, 'node_modules')
          const tsConfigPath = resolve(layer.cwd!, 'tsconfig.json')
          return !isSamePath(src, nodeModulesPath) && !isSamePath(src, tsConfigPath)
        },
      })
      layer.cwd = newCwd
    }

    // assign layer `rootDir` and `srcDir`
    layer.config ??= {}
    layer.config.rootDir ??= layer.cwd
    layer.config.srcDir ??= resolve(layer.config.rootDir!, 'src')

    return { ...layer, meta }
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
