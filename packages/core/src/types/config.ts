import type { UserConfig as ViteConfig } from 'vite'
import type { ConfigLayer } from 'c12'
import type { VixtModule } from './module'

export interface VixtOptions extends Record<string, any> {
  /**
   * @default '.vixt'
   */
  buildDir?: string
  /**
   * @default '.vixt/types'
   */
  buildTypesDir?: string
  /** layers */
  extends?: string[]
  /** modules */
  modules?: VixtModule[]
  vite?: ViteConfig
}

export interface VixtConfigLayer extends ConfigLayer<VixtOptions> {}
