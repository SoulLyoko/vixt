import { mergeConfig } from 'vite'

import { loadEnv } from '../env'
import { defineVixtModule } from '../module'

const name = 'vixt:vite'
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    let env: Record<string, string>
    return {
      name,
      enforce: 'pre',
      config(config) {
        const { rootDir, app } = vixt.options
        env = loadEnv(config.mode, config.envDir, config.envPrefix)
        const defineEnv = Object.fromEntries(
          Object.entries(env)
            .filter(([k]) => !['MODE', 'DEV', 'PROD'].includes(k))
            .map(([k, v]) => [`import.meta.env.${k}`, JSON.stringify(v)]),
        )

        return mergeConfig(vixt.options.vite ?? {}, {
          root: rootDir,
          base: app?.baseURL,
          define: defineEnv,
        })
      },
    }
  },
})
