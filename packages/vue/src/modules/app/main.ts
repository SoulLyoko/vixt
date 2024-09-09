import type { AppOptions } from './types'
import type { Vixt } from '@vixt/core'

import fs from 'fs-extra'
import path from 'pathe'

import { genarateAppComponent } from './app-component'
import { generateAppConfig } from './app-config'
import { generateCss } from './css'
import { generatePlugins } from './plugins'

export function generateMainTs(options: AppOptions, vixt: Vixt) {
  const { buildDir, buildDirName, srcDir } = vixt.options

  const mainTsPath = path.resolve(srcDir!, 'main.ts')
  if (!fs.existsSync(mainTsPath))
    fs.outputFileSync(mainTsPath, `// Generated by Vixt\n// This file transform from '${buildDirName}/main.ts'\n`)

  const appComponentTemplate = genarateAppComponent(vixt)
  const cssTemplate = generateCss(options)
  const appConfigTemplate = generateAppConfig(vixt)
  const pluginsTemplate = generatePlugins(vixt)

  const code = `// Generated by Vixt
// This file transform to '${srcDir}/main.ts'
// @ts-nocheck
${appComponentTemplate}
${cssTemplate}
${appConfigTemplate}
${pluginsTemplate}

import 'virtual:uno.css' 
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const pinia = createPinia()
pinia.use(createPersistedState(appConfig.piniaPersistedState))

const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory('${options!.baseURL}'),
  ...appConfig.router,
})

const app = createApp(App)
app.use(pinia).use(router)
usePlugins({ app, router, routes, pinia, appConfig })

app.mount('#${options!.rootId}')
`

  fs.outputFileSync(path.resolve(buildDir!, 'main.ts'), code)
  return code
}
