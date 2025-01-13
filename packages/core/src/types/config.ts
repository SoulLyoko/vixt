import type { VixtModule } from './module'
import type { ConfigLayer, ConfigLayerMeta } from 'c12'
import type { ResolvedConfig } from 'vite'

export interface VixtOptions extends Record<string, any> {
  /**
   * @default process.cwd()
   */
  rootDir?: string
  /**
   * @default '<rootDir>/.vixt'
   */
  buildDir?: string
  /**
   * @default '<buildDir>/types'
   */
  buildTypesDir?: string
  /**
   * @default '<buildDir>/layers'
   */
  buildLayersDir?: string
  /**
   * @default '<buildDir>/imports'
   */
  buildImportsDir?: string
  /**
   * @default '<rootDir>/src'
   */
  srcDir?: string
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
  /** when layer is in node_modules, layer will copy to `<buildLayersDir>/<layerName>`, and change cwd */
  cwd?: string
}

export interface VixtAppConfig extends Record<string, any> {}
