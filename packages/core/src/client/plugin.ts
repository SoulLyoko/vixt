import type { Plugin as VuePlugin } from 'vue'
import type { PluginDefinition, VixtPlugin } from './types'

export function defineVuePlugin<Options = any[]>(plugin: VuePlugin<Options>) {
  return plugin
}

export function defineVixtPlugin(definition: PluginDefinition | VixtPlugin): VixtPlugin {
  if (typeof definition == 'function')
    return defineVixtPlugin({ setup: definition })

  return vixt => definition.setup?.(vixt)
}
