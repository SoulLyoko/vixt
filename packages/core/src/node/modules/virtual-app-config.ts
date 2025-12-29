import fs from 'fs-extra'
import path from 'pathe'

import { defineVixtModule } from '../module'

const name = 'virtual:vixt:app-config'
const virtualModuleId = name
const resolvedVirtualModuleId = `\0${virtualModuleId}`
export default defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    let appConfigsImportTemplate = ''
    let appConfigsMergeTemplate = ''
    let i = 0
    for (const layer of vixt._layers) {
      const appConfigPath = path.resolve(layer.config!.srcDir!, 'app.config.ts')
      if (fs.existsSync(appConfigPath)) {
        const appConfigName = `__app_config_${i}`
        appConfigsImportTemplate += `import ${appConfigName} from '${appConfigPath}'\n`
        appConfigsMergeTemplate += `${appConfigName}, `
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
          const { baseURL = '/', rootId = 'app' } = vixt.options.app ?? {}
          return `
import { defu } from 'defu'
${appConfigsImportTemplate}
const appConfig = defu(${appConfigsMergeTemplate}{ baseURL: '${baseURL}', rootId: '${rootId}' })
export default appConfig
`
        }
      },
    }
  },
})
