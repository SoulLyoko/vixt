import type { Pinia } from 'pinia'
import type { PluginOptions as PersistedStateOptions } from 'pinia-plugin-persistedstate'

import { defineVixtPlugin } from '@vixt/core/client'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

declare module '@vixt/core/client' {
  interface VixtAppConfig {
    /** https://github.com/prazdevs/pinia-plugin-persistedstate */
    piniaPersistedState?: PersistedStateOptions
  }
  interface VixtApp {
    /** Pinia instance */
    pinia: Pinia
  }
}

export default defineVixtPlugin({
  name: 'vixt:pinia',
  setup(vixt) {
    const { app, appConfig } = vixt
    const pinia = createPinia()
    pinia.use(createPersistedState(appConfig.piniaPersistedState))
    app.use(pinia)
    vixt.pinia = pinia
  },
})
