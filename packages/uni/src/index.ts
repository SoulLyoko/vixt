import { createVixtPlugin } from '@vixt/core'

import { presetUni } from './modules'

export * from './modules'

const defaults = {
  modules: [presetUni],
  app: {
    transformMain(code: string) {
      code += `
import 'virtual:uno.css'
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { pages as routes } from 'virtual:uni-pages'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
  pinia.use(createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
    ...appConfig.piniaPersistedState,
  }))
  app.use(pinia)
  usePlugins({ app, routes, pinia, appConfig })
  
  return { app, Pinia }
}
`
      return code
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['@dcloudio/types', '@uni-helper/uni-app-types', '@uni-helper/vite-plugin-uni-pages/client'],
      },
      vueCompilerOptions: {
        plugins: ['@uni-helper/uni-app-types/volar-plugin'],
      },
    },
  },
}

export default createVixtPlugin({ defaults })
