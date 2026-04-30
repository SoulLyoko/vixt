import type { VixtConfigLayerMeta } from './layer'
import type { VixtModule } from './module'
import type { AliasOptions, AppOptions, BuildOptions, DevServerOptions, ImportsOptions, NitroOptions, TypescriptOptions } from './options'
import type { UserConfig } from 'vite'

export interface VixtConfig {
  /**
   * You can improve your DX by defining additional aliases to access custom directories within your JavaScript and CSS.
   * @default
   * ```json
   * {
   *   "@": "/<rootDir>/<srcDir>",
   *   "~": "/<rootDir>/<srcDir>",
   *   "~~": "/<rootDir>",
   *   "@@": "/<rootDir>",
   *   "#": "/<rootDir>/<buildDir>"
   * }
   * ```
   */
  alias?: AliasOptions
  /**
   * Vixt App configuration.
   */
  app?: AppOptions
  /**
   * Additional app configuration.
   */
  appConfig?: Record<string, any>
  /**
   * Shared build configuration.
   */
  build?: BuildOptions
  /**
   * Define the directory where your built files will be placed.
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
   * Whether to copy layers from `node_modules` to `.vixt/layers`
   * @default true
   * @experimental
   */
  copyLayers?: boolean
  /**
   * Set to `true` to enable debug mode.
   * @default false
   */
  debug?: boolean
  /**
   * Whether your app is running in development mode.
   * @default false
   */
  dev?: boolean
  /**
   * Set CORS options for the dev server, the `port`, `host`, `cors` options will be passed to `vite.server`
   */
  devServer?: DevServerOptions
  /**
   * Extend project from multiple local or remote sources.
   */
  extends?: string[]
  /**
   * Configure how Vixt auto-imports composables into your application.
   */
  imports?: ImportsOptions
  /**
   * Custom meta for layer.
   */
  meta?: VixtConfigLayerMeta
  /**
   * Modules are Vixt extensions which can extend its core functionality and add endless integrations.
   */
  modules?: VixtModule[]
  /**
   * Define the directory of your Vixt modules.
   * @default '<srcDir>/modules'
   */
  modulesDir?: string
  /**
   * Configuration for Nitro.
   */
  nitro?: NitroOptions
  /**
   * An array of vixt app plugins.
   */
  plugins?: string[]
  /**
   * Define the directory of your Vixt plugins.
   * @default '<srcDir>/plugins'
   */
  pluginsDir?: string
  /**
   * Define the root directory of your application.
   * @default process.cwd()
   */
  rootDir?: string
  /**
   * Whether to enable rendering of HTML.
   */
  ssr?: boolean
  /**
   * Define the source directory of your application.
   * @default '<rootDir>/src'
   */
  srcDir?: string
  /**
   * Whether your app is being unit tested.
   * @default false
   */
  test?: boolean
  /**
   * Configuration for TypeScript integration.
   */
  typescript?: TypescriptOptions
  /**
   * Configuration that will be passed directly to Vite.
   */
  vite?: Omit<UserConfig, 'plugins'>
  /**
   * Define the monorepo workspace directory of your application.
   */
  workspaceDir?: string
}

/**
 * This is a global declared interface for module `@vixt/core`,
 * it includes some properties that declared in `VueVixtOptions`, `ReactVixtOptions`, etc.,
 * see {@link VixtConfig} to view the common options.
 */
export interface VixtOptions extends VixtConfig {
  /** custom options */
  [key: string]: any
}
