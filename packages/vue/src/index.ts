import type { VixtOptions } from '@vixt/core'

import { createVixtPlugin } from '@vixt/core'

import { presetVue } from './modules'

export * from './modules'

const defaults: VixtOptions = {
  modules: [presetVue],
  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
    baseURL: '/',
    rootId: 'app',
    css: ['virtual:uno.css'],
    transformMain(code, vixt) {
      const { app } = vixt.options
      code += `
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
    // references: ['types/typed-router.d.ts', 'types/components.d.ts', 'types/auto-imports.d.ts'],
    tsConfig: { compilerOptions: { types: ['vite-plugin-vue-layouts/client', 'unplugin-vue-router/client'] } },
    typeCheck: { vueTsc: true },
  },
}

export default createVixtPlugin({ defaults })
