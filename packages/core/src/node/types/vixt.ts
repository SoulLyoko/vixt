import type { VixtOptions } from './config'
import type { VixtConfigLayer } from './layer'
import type { VixtModule } from './module'

export interface Vixt {
  options: VixtOptions
  _layers: VixtConfigLayer[]
  _modules: VixtModule[]
}

export type ExtractPluginOptions<Options = any> = (Options extends (...args: any[]) => any ? Parameters<Options>[0] : Options)
