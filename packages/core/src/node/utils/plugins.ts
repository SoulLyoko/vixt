import type { Vixt } from '../vixt'

import fs from 'fs-extra'
import path from 'pathe'

import { resolveLayersDirs } from '../config'

export function generatePlugins(vixt: Vixt) {
  const { plugins: pluginsDirs = [] } = resolveLayersDirs(vixt._layers)
  let pluginsImportTemplate = ''
  let pluginsMergeTemplate = ''
  let i = 0

  for (const pluginsDir of pluginsDirs.reverse()) {
    const files = fs.existsSync(pluginsDir) ? fs.readdirSync(pluginsDir) : []
    for (const f of files.filter(f => /(?:t|j)sx?$/.test(f))) {
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
