import fs from 'fs-extra'
import { parseExpression, parseModule } from 'magicast'
import path from 'pathe'

import { resolveLayersDirs } from '../config'
import { defineVixtModule } from '../module'

const name = 'virtual:vixt:plugins'
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

        const { plugins: pluginsDirs = [] } = resolveLayersDirs(vixt._layers)

        const code = parseModule('')
        const pluginsArray = parseExpression<Array<any>>('[]')

        let i = 0
        function addPlugin(from: string) {
          const pluginName = `__plugin_${i++}`
          code.imports.$append({ local: pluginName, imported: 'default', from })
          pluginsArray.push(parseExpression(pluginName))
        }

        for (const pluginPath of vixt.options.plugins ?? []) {
          addPlugin(pluginPath)
        }

        for (const pluginsDir of pluginsDirs.reverse()) {
          const files = fs.existsSync(pluginsDir) ? fs.readdirSync(pluginsDir) : []
          for (const file of files.filter(f => /[jt]sx?$/.test(f))) {
            const pluginPath = path.resolve(pluginsDir, file)
            addPlugin(pluginPath)
          }
        }

        code.exports.default = pluginsArray

        return code.generate()
      },
    }
  },
})
