import 'virtual:vixt:css'
import 'virtual:uno.css'
import { applyPlugins, createVixtApp } from '@vixt/core/client'
// @ts-expect-error virtual file
import appConfig from 'virtual:vixt:app-config'
// @ts-expect-error virtual file
import plugins from 'virtual:vixt:plugins'
// @ts-expect-error virtual file
import RootComponent from 'virtual:vixt:root-component.vue'
import { createApp } from 'vue'

async function entry() {
  const app = createApp(RootComponent)
  const vixt = createVixtApp({ app, appConfig })

  try {
    await applyPlugins(vixt, plugins)
  }
  catch (err) {
    console.error(err)
  }

  app.mount(`#${vixt.appConfig.rootId || 'app'}`)

  return app
}

entry()

export default entry
