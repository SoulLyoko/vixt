import type { PluginDefinition, VixtApp, VixtPlugin } from './types'

/**
 * A helper function for creating Vixt plugins.
 * @example
 * ```ts
 * // src/plugins/my-plugin.ts
 * interface PluginOptions {
 *   enabled?: boolean
 * }
 *
 * declare module '@vixt/core/client' {
 *   interface VixtAppConfig {
 *     myPlugin?: PluginOptions
 *   }
 * }
 *
 * export default defineVixtPlugin<PluginOptions>({
 *   name: 'my-plugin',
 *   setup(vixt) {
 *     console.log(vixt) // { app, router, routes, pinia, appConfig }
 *   }
 * })
 * ```
 */
export function defineVixtPlugin(definition: PluginDefinition | VixtPlugin): VixtPlugin {
  if (typeof definition == 'function')
    return definition

  const pluginName = definition.name
  const pluginSetup = definition.setup || (() => {})
  return Object.assign(pluginSetup, { _name: pluginName })
}

/** Applies plugins to a Vixt app. */
export function applyPlugins(vixt: VixtApp, plugins: VixtPlugin[]) {
  for (const plugin of plugins) {
    typeof plugin === 'function' && plugin(vixt)
  }
}
