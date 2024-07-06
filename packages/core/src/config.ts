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
  result.layers = result.layers?.filter(e => e.cwd).map((e) => {
    if (e.cwd !== rootDir) {
      const layerRootDir = e.cwd!.split('/').pop()!
      const newCwd = path.resolve(rootDir, buildLayersDir, layerRootDir)
      fs.copySync(e.cwd!, newCwd, { filter: (src) => {
        const nodeModulesPath = path.resolve(e.cwd!, 'node_modules')
        const tsConfigPath = path.resolve(e.cwd!, 'tsconfig.json')
        return !isSamePath(src, nodeModulesPath) && !isSamePath(src, tsConfigPath)
      } })
      return { ...e, relatedCwd: e.cwd, cwd: newCwd }
    }
    return e
  })
  return result
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
