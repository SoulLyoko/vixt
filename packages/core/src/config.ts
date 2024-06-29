import type { LoadConfigOptions } from 'c12'
import type { VixtOptions } from './types'
import type { VixtConfigLayer } from '.'

import path from 'pathe'
import fs from 'fs-extra'
import { loadConfig } from 'c12'

export function defineVixtConfig(input: VixtOptions) {
  return input
}

export const buildDir = '.vixt'
export const buildTypesDir = `${buildDir}/types`
export function loadVixtConfig(opts?: LoadConfigOptions<VixtOptions>) {
  return loadConfig<VixtOptions>({
    name: 'vixt',
    ...opts,
    defaults: {
      buildDir,
      buildTypesDir,
      ...opts?.defaults,
    },
  })
}

export function resolveLayersDirs(layers?: VixtConfigLayer[]) {
  const dirs: Record<string, string[] | undefined> = {}
  for (const layer of layers?.filter(e => e.cwd) ?? []) {
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
