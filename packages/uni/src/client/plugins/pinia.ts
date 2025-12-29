import { defineVixtPlugin } from '@vixt/core/client'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineVixtPlugin({
  name: 'vixt:pinia',
  setup(vixt) {
    const { app, appConfig } = vixt
    const pinia = createPinia()
    pinia.use(createPersistedState({
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
      },
      ...appConfig.piniaPersistedState,
    }))
    app.use(pinia)
    vixt.pinia = pinia
  },
})
