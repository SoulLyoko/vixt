import type { NitroOptions } from '../types'

import { nitro } from 'nitro/vite'
import path from 'pathe'

import { defineVixtModule } from '../module'

export default defineVixtModule<NitroOptions>({
  meta: {
    name: 'vixt:nitro',
    configKey: 'nitro',
  },
  defaults(vixt) {
    return {
      enabled: false,
      scanDirs: vixt._layers.map(layer => {
        const { serverDir = './server' } = layer.config?.nitro ?? {}
        return path.join(layer.cwd!, serverDir)
      }),
      serverDir: './server',
    }
  },
  setup(options) {
    if (!options.enabled) return

    return [
      nitro(options),
      {
        name: 'vixt:config-outdir-for-unocss',
        config() {
          let publicDir = '.output/public'
          if (options.output?.publicDir) publicDir = options.output.publicDir
          else if (options.output?.dir) publicDir = path.join(options.output.dir, 'public')
          return {
            build: {
              outDir: publicDir,
            },
          }
        },
      },
    ]
  },
})
