import 'virtual:vixt:css'
import 'virtual:uno.css'
import { applyPlugins, createVixtApp } from '@vixt/core/client'
import * as Pinia from 'pinia'
// @ts-expect-error virtual file
import appConfig from 'virtual:vixt:app-config'
// @ts-expect-error virtual file
import plugins from 'virtual:vixt:plugins'
import { createSSRApp } from 'vue'

// @ts-ignore
import RootComponent from '@/App.vue'

function createApp() {
  const app = createSSRApp(RootComponent)
  const vixt = createVixtApp({ app, appConfig })
  applyPlugins(vixt, plugins)
  return { app, Pinia }
}

export default createApp
