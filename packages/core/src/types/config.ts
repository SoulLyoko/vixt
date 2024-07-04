import type { ResolvedConfig } from 'vite'
import type { ConfigLayer } from 'c12'
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
  /** layers */
  extends?: string[]
  /** modules */
  modules?: VixtModule[]
  /** use on configResolved */
  vite?: ResolvedConfig
}

export interface VixtConfigLayer extends ConfigLayer<VixtOptions> {}
