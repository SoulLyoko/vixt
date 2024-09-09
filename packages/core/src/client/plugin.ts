import type { PluginDefinition, VixtPlugin } from './types'
import type { Plugin as VuePlugin } from 'vue'

export function defineVuePlugin<Options = any[]>(plugin: VuePlugin<Options>) {
  return plugin
}

export function defineVixtPlugin(definition: PluginDefinition | VixtPlugin): VixtPlugin {
  if (typeof definition == 'function')
    return defineVixtPlugin({ setup: definition })

  return vixt => definition.setup?.(vixt)
}
