import type { Vixt } from '@vixt/core'

import fs from 'fs-extra'
import path from 'pathe'

export function getAppComponentPath(vixt: Vixt) {
  for (const layer of vixt._layers) {
    const appComponentPath = path.resolve(layer.config!.srcDir!, 'App.vue')
    if (fs.existsSync(appComponentPath))
      return appComponentPath
  }
}

export function genarateAppComponent(vixt: Vixt) {
  const appComponentPath = getAppComponentPath(vixt) || '@vixt/core/client/App.vue'
  const appComponentTemplate = `import App from '${appComponentPath}'`
  return appComponentTemplate
}
