import type { Theme } from 'vitepress'

import 'virtual:vixt:css'
import 'uno.css'
import { applyPlugins, createVixtApp } from '@vixt/core/client'
// @ts-expect-error virtual file
import appConfig from 'virtual:vixt:app-config'
// @ts-expect-error virtual file
import plugins from 'virtual:vixt:plugins'
import DefaultTheme from 'vitepress/theme'

export default <Theme>{
  extends: DefaultTheme,
  enhanceApp(ctx) {
    const vixt = createVixtApp({ ...ctx, appConfig })

    try {
      applyPlugins(vixt, plugins)
    }
    catch (err) {
      console.error(err)
    }
  },
}
