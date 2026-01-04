import type { ProxifiedFunctionCall } from 'magicast'

import fs from 'fs-extra'
import { builders, parseExpression, parseModule } from 'magicast'
import path from 'pathe'

import { defineVixtModule } from '../module'

const name = 'virtual:vixt:app-config'
const virtualModuleId = name
const resolvedVirtualModuleId = `\0${virtualModuleId}`
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    return {
      name,
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id !== resolvedVirtualModuleId)
          return

        const { baseURL = '/', rootId = 'app' } = vixt.options.app ?? {}

        const code = parseModule('import { defu } from "defu"')
        const defuCall = builders.functionCall('defu') as ProxifiedFunctionCall

        let i = 0
        for (const layer of vixt._layers) {
          const appConfigPath = path.resolve(layer.config!.srcDir!, 'app.config.ts')
          if (fs.existsSync(appConfigPath)) {
            const appConfigName = `__app_config_${i++}`
            code.imports.$append({ local: appConfigName, imported: 'default', from: appConfigPath })
            defuCall.$args.push(parseExpression(appConfigName))
          }
        }

        defuCall.$args.push({ baseURL, rootId })
        code.exports.default = defuCall

        return code.generate()
      },
    }
  },
})
