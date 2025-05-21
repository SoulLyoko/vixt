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
  const { buildDir } = vixt.options
  const defaultAppComponentPath = path.resolve(buildDir!, `App.vue`)

  // generate App.vue in .vixt
  fs.outputFileSync(defaultAppComponentPath, `<template>
  <RouterView />
</template>
`)
  const appComponentPath = getAppComponentPath(vixt) || defaultAppComponentPath
  const appComponentTemplate = `import App from '${appComponentPath}'`
  return appComponentTemplate
}
