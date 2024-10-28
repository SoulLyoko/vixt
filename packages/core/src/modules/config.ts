import { findUpSync } from 'find-up'
import path from 'pathe'

import { loadEnv } from '../env'
import { defineVixtModule } from '../module'

const name = 'vixt:config'
export const config = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    let env: Record<string, string>
    return {
      name,
      enforce: 'pre',
      config(config) {
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

        env = loadEnv(config.mode, config.envDir, config.envPrefix)
        const defineEnv = Object.fromEntries(
          Object.entries(env)
            .filter(([k]) => !['MODE', 'DEV', 'PROD'].includes(k))
            .map(([k, v]) => [`import.meta.env.${k}`, JSON.stringify(v)]),
        )

        return {
          root: rootDir,
          resolve: {
            alias: defaultAlias,
          },
          define: defineEnv,
        }
      },
      configResolved(config) {
        Object.assign(config.env, { ...env, ...config.env })
        vixt.options.vite = config
      },
      configureServer(server) {
        const mode = server.config.mode
        const watchFiles: string[] = []
        const configFiles = vixt._layers.map(layer => path.resolve(layer.cwd!, 'vixt.config.ts'))
        const modulesDirs = vixt._layers.map(layer => path.resolve(layer.cwd!, vixt.options.srcDirName!, 'modules'))
        watchFiles.push(...configFiles, ...modulesDirs)
        const workspaceManifestLocation = findUpSync(['pnpm-workspace.yaml', 'pnpm-workspace.yml'])
        if (workspaceManifestLocation) {
          const workspaceDir = path.dirname(workspaceManifestLocation)
          const envFiles = [`${workspaceDir}/.env`, `${workspaceDir}/.env.local`, `${workspaceDir}/.env.${mode}`, `${workspaceDir}/.env.${mode}.local`]
          watchFiles.push(...envFiles)
        }
        server.watcher.add(watchFiles)
        server.watcher.on('all', (_, file) => {
          const match = watchFiles.some(e => path.normalize(file).match(e))
          if (match)
            server.restart()
        })
      },
    }
  },
})
