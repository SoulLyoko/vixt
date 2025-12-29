import fs from 'fs-extra'
import path from 'pathe'

import { resolveLayersDirs } from '../config'
import { defineVixtModule } from '../module'

const name = 'virtual:vixt:plugins'
const virtualModuleId = name
const resolvedVirtualModuleId = `\0${virtualModuleId}`
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    const { plugins: pluginsDirs = [] } = resolveLayersDirs(vixt._layers)
    let pluginsImportTemplate = ''
    let pluginsMergeTemplate = ''
    let i = 0

    for (const plugin of vixt.options.plugins ?? []) {
      const pluginName = `__plugin_${i}`
      pluginsImportTemplate += `import ${pluginName} from '${plugin}'\n`
      pluginsMergeTemplate += `${pluginName}, `
      i++
    }

    for (const pluginsDir of pluginsDirs.reverse()) {
      const files = fs.existsSync(pluginsDir) ? fs.readdirSync(pluginsDir) : []
      for (const f of files.filter(f => /[jt]sx?$/.test(f))) {
        const p = path.resolve(pluginsDir, f)
        const pluginName = `__plugin_${i}`
        pluginsImportTemplate += `import ${pluginName} from '${p}'\n`
        pluginsMergeTemplate += `${pluginName}, `
        i++
      }
    }

    return {
      name,
      resolveId(id) {
        if (id === virtualModuleId) {
          return resolvedVirtualModuleId
        }
      },
      load(id) {
        if (id === resolvedVirtualModuleId) {
          return `
${pluginsImportTemplate}
const plugins = [${pluginsMergeTemplate}]
export default plugins
`
        }
      },
    }
  },
})
