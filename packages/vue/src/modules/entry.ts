import type { ResolvedConfig } from 'vite'
import type { AppOptions, Vixt, VixtConfigLayer } from '@vixt/core'

import path from 'pathe'
import fs from 'fs-extra'
import { defineVixtModule, resolveLayersDirs } from '@vixt/core'

function resolveLayersPlugins(layers: VixtConfigLayer[], from: string) {
  const { plugins = [] } = resolveLayersDirs(layers)
  return plugins.map((pluginPath) => {
    const pluginsDir = path.relative(from, pluginPath)
    return `${pluginsDir}/*.ts`
  })
}

function generateMainTs(options: AppOptions, vixt: Vixt, config: ResolvedConfig) {
  const { buildDir } = vixt.options
  const { rootId } = options
  const layersPluginsPath = resolveLayersPlugins(vixt._layers, path.join(config.root, buildDir!))
  const baseURL = options?.baseURL ?? config.env.BASE_URL ?? '/'
  const cssTemplate = options?.css?.map(e => `import '${e}'`).join('\n')

  const code = `/** generate by vixt:entry */
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from '@/App.vue'

${cssTemplate}

const pinia = createPinia()
pinia.use(createPersistedState())

const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory('${baseURL}'),
})

const app = createApp(App)
app.use(pinia).use(router)
// install all plugins under 'plugins/'
const plugins = import.meta.glob(${JSON.stringify(layersPluginsPath)}, { import: 'default', eager: true })
// @ts-ignore
Object.values(plugins).forEach((plugin) => typeof plugin === 'function' && plugin({ app, router, routes, pinia }))

app.mount('#${rootId}')
`

  fs.outputFileSync(path.resolve(config.root, `${buildDir}/main.ts`), code)
  return code
}

const name = 'vixt:entry'
const defaults: AppOptions = {
  rootId: 'app',
  css: ['virtual:uno.css'],
}
export const entry = defineVixtModule<AppOptions>({
  meta: { name, configKey: 'app' },
  defaults,
  setup(options, vixt) {
    return {
      name: 'vixt:entry',
      configResolved(config) {
        generateMainTs(options, vixt, config)
      },
    }
  },
})
