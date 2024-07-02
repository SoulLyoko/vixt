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

export const rootDir = cwd()
export const buildDir = '.vixt'
export const buildTypesDir = `${buildDir}/types`
export async function loadVixtConfig(opts?: LoadConfigOptions<VixtOptions>) {
  const result = await loadConfig<VixtOptions>({
    name: 'vixt',
    rcFile: false,
    ...opts,
    defaults: {
      rootDir,
      buildDir,
      buildTypesDir,
      ...opts?.defaults,
    },
  })
  result.layers = result.layers?.filter(e => e.cwd)
  return result
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
