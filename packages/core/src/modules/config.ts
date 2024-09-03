import path from 'pathe'

import { defineVixtModule } from '../module'
import { loadWorkspaceEnv } from '../env'

const name = 'vixt:config'
export const config = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    return {
      name,
      enforce: 'pre',
      config() {
        const { rootDir, buildDir, srcDir } = vixt.options
        const defaultAlias: Record<string, string> = {
          '@': srcDir!,
          '~': srcDir!,
          '@@': rootDir!,
          '~~': rootDir!,
        }
        // layers alias
        for (const layer of vixt._layers) {
          if (layer.meta?.alias) {
            defaultAlias[layer.meta.alias] = layer.cwd!
          }
        }
        // buildDir alias
        defaultAlias['#'] = buildDir!
        return {
          root: rootDir,
          resolve: {
            alias: defaultAlias,
          },
        }
      },
      configResolved(config) {
        Object.assign(config.env, { ...loadWorkspaceEnv(config.mode, config.envPrefix), ...config.env })
        vixt.options.vite = config
      },
      configureServer(server) {
        // restart server when `vixt.config.ts` changed
        const configFiles = vixt._layers.map(layer => path.resolve(layer.cwd!, 'vixt.config.ts'))
        server.watcher.add(configFiles)
        server.watcher.on('change', (file) => {
          if (configFiles.includes(path.normalize(file))) {
            server.restart()
          }
        })
      },
    }
  },
})
