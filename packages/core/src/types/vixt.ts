import type { VixtModule } from './module'
import type { VixtConfigLayer, VixtOptions } from './config'

export interface Vixt {
  options: VixtOptions
  _layers: VixtConfigLayer[]
  _modules: VixtModule[]
}
