import 'virtual:vixt:css'
import 'virtual:uno.css'
import { applyPlugins, createVixtApp } from '@vixt/core/client'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-expect-error virtual file
import appConfig from 'virtual:vixt:app-config'
// @ts-expect-error virtual file
import plugins from 'virtual:vixt:plugins'
// @ts-expect-error virtual file
import RootComponent from 'virtual:vixt:root-component'

async function entry() {
  const app = createRoot(document.getElementById(appConfig.rootId || 'app')!)
  const vixt = createVixtApp({ app, appConfig })

  try {
    await applyPlugins(vixt, plugins)
  }
  catch (err) {
    console.error(err)
  }

  app.render(createElement(RootComponent))

  return app
}

entry()

export default entry
