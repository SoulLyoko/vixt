import type { App } from 'vue'

import { applyPlugins, createError, createNuxtApp } from 'nuxt/app'
import { createApp, createSSRApp, nextTick } from 'vue'

// This file must be imported first as we set globalThis.$fetch via this import
import '#build/fetch'
import '#build/global-polyfills.mjs'
import '#build/css'
import {
  appId,
  appSpaLoaderAttrs,
  multiApp,
  spaLoadingTemplateOutside,
  vueAppRootContainer,
} from '#build/nuxt.config.mjs'
// @ts-expect-error virtual file
import plugins from '#build/plugins'
import RootComponent from '#build/root-component.mjs'

let vueAppPromise: Promise<App<Element>>

async function entry() {
  // @ts-ignore
  if (vueAppPromise) {
    return vueAppPromise
  }

  const isSSR = Boolean(
    (multiApp ? window.__NUXT__?.[appId] : window.__NUXT__)?.serverRendered ??
    (multiApp
      ? (document.querySelector(`[data-nuxt-data="${appId}"]`) as HTMLElement)
      : document.getElementById('__NUXT_DATA__')
    )?.dataset.ssr === 'true',
  )
  const vueApp = isSSR ? createSSRApp(RootComponent) : createApp(RootComponent)

  const nuxt = createNuxtApp({ vueApp })

  async function handleVueError(error: any) {
    await nuxt.callHook('app:error', error)
    nuxt.payload.error ||= createError(error as any)
  }
  // marker so nuxt-root.vue can skip re-invoking the default handler from
  // its onErrorCaptured (which already calls `app:error` via showError)
  ;(handleVueError as any).__nuxt_default = true

  vueApp.config.errorHandler = handleVueError
  // If the errorHandler is not overridden by the user, we unset it after the app is hydrated
  nuxt.hook('app:suspense:resolve', () => {
    if (vueApp.config.errorHandler === handleVueError) {
      vueApp.config.errorHandler = undefined
    }
  })

  if (spaLoadingTemplateOutside && !isSSR && appSpaLoaderAttrs.id) {
    // Remove spa loader if present
    nuxt.hook('app:suspense:resolve', () => {
      document.getElementById(appSpaLoaderAttrs.id)?.remove()
    })
  }

  try {
    await applyPlugins(nuxt, plugins)
  } catch (err) {
    handleVueError(err)
  }

  try {
    await nuxt.hooks.callHook('app:created', vueApp)
    await nuxt.hooks.callHook('app:beforeMount', vueApp)
    vueApp.mount(vueAppRootContainer)
    await nuxt.hooks.callHook('app:mounted', vueApp)
    await nextTick()
  } catch (err) {
    handleVueError(err)
  }

  return vueApp
}

vueAppPromise = entry().catch((error: unknown) => {
  console.error('Error while mounting app:', error)
  throw error
})
