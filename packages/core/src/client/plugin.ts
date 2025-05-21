import type { VixtApp } from './app'

export interface PluginDefinition {
  name?: string
  setup?: (this: void, vixt: VixtApp) => any
}
export interface VixtPlugin {
  (this: void, vixt: VixtApp): any
}

export function defineVixtPlugin(definition: PluginDefinition | VixtPlugin): VixtPlugin {
  if (typeof definition == 'function')
    return defineVixtPlugin({ setup: definition })

  return vixt => definition.setup?.(vixt)
}
