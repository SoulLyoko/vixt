import type { ResolvedConfig } from 'vite'
import type { ConfigLayer, ConfigLayerMeta } from 'c12'
import type { VixtModule } from './module'

export interface VixtOptions extends Record<string, any> {
  /**
   * @default process.cwd()
   */
  rootDir?: string
  /**
   * @default '.vixt'
   */
  buildDir?: string
  /**
   * @default '.vixt/types'
   */
  buildTypesDir?: string
  /**
   * @default '.vixt/layers'
   */
  buildLayersDir?: string
  /** modules */
  modules?: VixtModule[]
  /** use on configResolved */
  vite?: ResolvedConfig
  meta?: VixtConfigLayerMeta
  /** layers */
  extends?: string[]
}

export interface VixtConfigLayerMeta extends ConfigLayerMeta {
  /** layer name */
  name?: string
  /** layer alias */
  alias?: string
}

export interface VixtConfigLayer extends ConfigLayer<VixtOptions, VixtConfigLayerMeta> {
  /** layer path before copy when layer in node_modules */
  relatedCwd?: string
  /** layer path after copy to buildLayersDir when layer in node_modules */
  cwd?: string
}
