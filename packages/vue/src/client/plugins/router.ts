import { defineVixtPlugin } from '@vixt/core/client'
// @ts-expect-error virtual file
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

export default defineVixtPlugin({
  name: 'vixt:router',
  setup(vixt) {
    const { app, appConfig } = vixt
    const router = createRouter({
      routes: setupLayouts(routes),
      history: createWebHistory(appConfig.baseURL),
      ...appConfig.router,
    })
    app.use(router)
    vixt.routes = routes
    vixt.router = router
  },
})
