import type { VixtApp } from './app'

export interface PluginDefinition {
  name?: string
  setup?: (this: void, vixt: VixtApp) => any
}
export interface VixtPlugin {
  (this: void, vixt: VixtApp): any
  /** @internal */
  _name?: string
}

export function defineVixtPlugin(definition: PluginDefinition | VixtPlugin): VixtPlugin {
  if (typeof definition == 'function')
    return definition

  const pluginName = definition.name
  const pluginSetup = definition.setup || (() => {})
  return Object.assign(pluginSetup, { _name: pluginName })
}

export function applyPlugins(vixt: VixtApp, plugins: VixtPlugin[]) {
  for (const plugin of plugins) {
    typeof plugin === 'function' && plugin(vixt)
  }
}
