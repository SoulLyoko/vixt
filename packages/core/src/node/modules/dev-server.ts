import type { DevServerOptions } from '../config'

import Ssl from '@vitejs/plugin-basic-ssl'
import path from 'pathe'

import { findUpWorkspaceDir, loadMode } from '../env'
import { defineVixtModule } from '../module'

const name = 'vixt:dev-server'
export default defineVixtModule<DevServerOptions>({
  meta: { name, configKey: 'devServer' },
  defaults(vixt) {
    const watchFiles: string[] = []

    const configFiles = vixt._layers.map(layer => layer.configFile!).filter(e => !e.includes('node_modules'))
    const modulesDirs = vixt._layers.map(layer => layer.config!.modulesDir!).filter(e => !e.includes('node_modules'))
    watchFiles.push(...configFiles, ...modulesDirs)

    const workspaceDir = findUpWorkspaceDir()
    if (workspaceDir) {
      const mode = loadMode()
      const envFiles = [`${workspaceDir}/.env`, `${workspaceDir}/.env.local`, `${workspaceDir}/.env.${mode}`, `${workspaceDir}/.env.${mode}.local`]
      watchFiles.push(...envFiles)
    }

    return {
      watch: watchFiles,
    }
  },
  setup(options) {
    const sslOptions = {
      enabled: !!options.https,
      ...typeof options.https === 'object' ? options.https : {},
    }

    const watchFiles = options.watch ?? []
    let timer: NodeJS.Timeout | undefined
    function schedule(fn: () => void) {
      clearTimeout(timer)
      timer = setTimeout(fn, 500)
    }

    return [
      {
        name,
        enforce: 'pre',
        config() {
          const { port, host, cors } = options
          return {
            server: { port, host, cors },
          }
        },
        configureServer(server) {
          server.watcher.add(watchFiles)
          server.watcher.on('all', (_, file) => {
            const match = watchFiles.some(e => path.normalize(file).match(e))
            match && schedule(() => server.restart())
          })
        },
      },
      sslOptions.enabled && Ssl(sslOptions),
    ]
  },
})
