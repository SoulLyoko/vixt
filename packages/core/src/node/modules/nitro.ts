import type { NitroOptions } from '../config'
import type { Nitro } from 'nitro/types'

import { writeTypes as _writeTypes } from 'nitro/builder'
import { nitro } from 'nitro/vite'
import path from 'pathe'

import { defineVixtModule } from '../module'

let nitroCtx: Nitro | undefined
function setNitroCtx(ctx: Nitro) {
  nitroCtx = ctx
}
function writeTypes() {
  return nitroCtx && _writeTypes(nitroCtx)
}

export default defineVixtModule<NitroOptions>({
  meta: {
    name: 'vixt:nitro',
    configKey: 'nitro',
  },
  defaults(vixt) {
    return {
      enabled: false,
      scanDirs: vixt._layers.map((layer) => {
        const { serverDir = './server' } = layer.config?.nitro ?? {}
        return path.join(layer.cwd!, serverDir)
      }),
      serverDir: './server',
      typescript: {
        generatedTypesDir: vixt.options.buildTypesDir,
      },
      modules: [(nitro) => { nitro.hooks.hook('build:before', setNitroCtx) }],
    }
  },
  setup(options, vixt) {
    if (!options.enabled)
      return

    return [
      nitro(options),
      {
        name: 'vixt:nitro-types',
        configureServer(server) {
          writeTypes()
          const routesDirs = vixt._layers.map(e => `${e.cwd!}/server/routes`)
          const watcher = server.watcher
          watcher.add(routesDirs)
          watcher.on('all', (_, p) => {
            const matched = routesDirs.some(r => path.normalize(p).includes(path.normalize(r)))
            if (matched)
              writeTypes()
          })
        },
      },
      {
        name: 'vixt:config-outdir-for-unocss',
        config() {
          let publicDir = '.output/public'
          if (options.output?.publicDir)
            publicDir = options.output.publicDir
          else if (options.output?.dir)
            publicDir = path.join(options.output.dir, 'public')
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
