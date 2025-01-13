import type { Vixt } from '@vixt/core'

import fs from 'fs-extra'
import path from 'pathe'

export function generatePlugins(vixt: Vixt) {
  let pluginsImportTemplate = ''
  let pluginsMergeTemplate = ''
  let i = 0
  for (const layer of [...vixt._layers].reverse()) {
    const pluginsDir = path.resolve(layer.config!.srcDir!, 'plugins')
    const files = fs.existsSync(pluginsDir) ? fs.readdirSync(pluginsDir) : []
    for (const f of files) {
      const p = path.resolve(pluginsDir, f)
      const pluginName = `__plugin_${i}`
      pluginsImportTemplate += `import ${pluginName} from '${p}'\n`
      pluginsMergeTemplate += `${pluginName}, `
      i++
    }
  }

  const pluginsTemplate = `
${pluginsImportTemplate}
const plugins = [${pluginsMergeTemplate}]
function usePlugins(options) {
  for (const plugin of plugins) {
    typeof plugin === 'function' && plugin(options)
  }
}
`
  return pluginsTemplate
}
