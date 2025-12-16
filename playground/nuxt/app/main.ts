import type { RuntimeConfig } from 'nuxt/schema'
import type { App } from 'vue'

// @ts-ignore
import plugins from '#build/plugins'
import { applyPlugins, createNuxtApp } from 'nuxt/app'
import { createApp, createSSRApp, nextTick } from 'vue'

import RootComponent from './app.vue'
import '@unocss/reset/tailwind.css'

let vueAppPromise: Promise<App<Element>>
async function entry() {
  // @ts-ignore
  if (vueAppPromise) {
    return vueAppPromise
  }

  // @ts-ignore
  const nuxtConfig = __NUXT__ as { appId: string, ssr?: boolean, config: RuntimeConfig }

  const vueApp = nuxtConfig.ssr ? createSSRApp(RootComponent) : createApp(RootComponent)

  const nuxt = createNuxtApp({ vueApp })

  async function handleVueError(error: any) {
    await nuxt.callHook('app:error', error)
  }

  try {
    await applyPlugins(nuxt, plugins)
  }
  catch (err) {
    handleVueError(err)
  }

  try {
    await nuxt.hooks.callHook('app:created', vueApp)
    await nuxt.hooks.callHook('app:beforeMount', vueApp)
    vueApp.mount(`#${nuxtConfig.appId}`)
    await nuxt.hooks.callHook('app:mounted', vueApp)
    await nextTick()
  }
  catch (err) {
    handleVueError(err)
  }

  return vueApp
}

vueAppPromise = entry().catch((error: unknown) => {
  console.error('Error while mounting app:', error)
  throw error
})
