import type { Vixt } from '@vixt/core'

import fs from 'fs-extra'
import path from 'pathe'

export function generateAppConfig(vixt: Vixt) {
  const { buildImportsDir, srcDir, srcDirName } = vixt.options
  let appConfigsImportTemplate = ''
  let appConfigsMergeTemplate = ''
  let i = 0
  for (const layer of vixt._layers) {
    const appConfigPath = path.resolve(layer.cwd!, srcDirName!, 'app.config.ts')
    if (fs.existsSync(appConfigPath)) {
      const appConfigName = `__app_config_${i}`
      appConfigsImportTemplate += `import ${appConfigName} from '${appConfigPath}'\n`
      appConfigsMergeTemplate += `${appConfigName}, `
      i++
    }
  }

  const appConfigTemplate = `
import { defu } from 'defu'
${appConfigsImportTemplate}
const appConfig = defu(${appConfigsMergeTemplate}{})
function useAppConfig() {
  return appConfig
} 
export { useAppConfig }
`
  // generate for auto-import
  const mainTsPath = path.resolve(srcDir!, 'main.ts')
  fs.outputFileSync(path.resolve(buildImportsDir!, `app.config.ts`), `// @ts-nocheck\nexport { useAppConfig } from '${mainTsPath}'`)
  return appConfigTemplate
}
