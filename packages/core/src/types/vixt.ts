import type { VixtConfigLayer, VixtOptions } from './config'
import type { VixtModule } from './module'

export interface Vixt {
  options: VixtOptions
  _layers: VixtConfigLayer[]
  _modules: VixtModule[]
}
