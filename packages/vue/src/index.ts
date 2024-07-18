import type { VixtOptions } from '@vixt/core'

import { createVixtPlugin } from '@vixt/core'

import { presetVue } from './modules'

export * from './modules'

const defaults: VixtOptions = {
  modules: [presetVue],
  app: {
    transformMain(code, vixt) {
      const { app } = vixt.options
      code += `
import 'virtual:uno.css' 
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const pinia = createPinia()
pinia.use(createPersistedState())

const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHistory('${app!.baseURL}'),
})

const app = createApp(App)
app.use(pinia).use(router)

Object.values(plugins).forEach((plugin) => typeof plugin === 'function' && plugin({ app, router, routes, pinia, appConfig }))

app.mount('#${app!.rootId}')
`
      return code
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vite-plugin-vue-layouts/client', 'unplugin-vue-router/client'],
      },
    },
  },
}

export default createVixtPlugin({ defaults })
