import type { VixtOptions } from './config'
import type { ConfigLayer, ConfigLayerMeta, LoadConfigOptions, ResolvedConfig } from 'c12'

export interface VixtConfigLayerMeta extends ConfigLayerMeta {
  /** layer name */
  name?: string
  /** layer alias */
  alias?: string
}

export interface VixtConfigLayer extends ConfigLayer<VixtOptions, VixtConfigLayerMeta> {
  /** when layer is in node_modules, layer will copy to `<buildLayersDir>/<layerName>`, and change cwd */
  cwd?: string
}

export interface LoadVixtConfigOptions extends LoadConfigOptions<VixtOptions, VixtConfigLayerMeta> { }
export interface ResolvedVixtConfig extends ResolvedConfig<VixtOptions, VixtConfigLayerMeta> { }
