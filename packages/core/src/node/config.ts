import type { ExtractPluginOptions, VixtModule } from './module'
import type Ssl from '@vitejs/plugin-basic-ssl'
import type Legacy from '@vitejs/plugin-legacy'
import type { RawVueCompilerOptions } from '@vue/language-core'
import type { ConfigLayer, ConfigLayerMeta, LoadConfigOptions } from 'c12'
import type { TSConfig } from 'pkg-types'
import type { HtmlTagDescriptor, ServerOptions, UserConfig } from 'vite'
import type Analyzer from 'vite-bundle-analyzer'
import type Checker from 'vite-plugin-checker'

import { loadConfig } from 'c12'
import fs from 'fs-extra'
import { normalize, resolve } from 'pathe'

import { findUpWorkspaceDir } from './env'

export interface VixtOptions {
  /**
   * Vixt App configuration.
   */
  app?: AppOptions
  /**
   * Shared build configuration.
   */
  build?: BuildOptions
  /**
   * Define the root directory of your application.
   * @default process.cwd()
   */
  rootDir?: string
  /**
   * Define the monorepo workspace directory of your application.
   */
  workspaceDir?: string
  /**
   * Define the source directory of your application.
   * @default '<rootDir>/src'
   */
  srcDir?: string
  /**
   * Define the server directory of your application.
   * @default '<rootDir>/server'
   */
  serverDir?: string
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
   * @default '<buildDir>/imports'
   */
  buildImportsDir?: string
  /**
   * Define the directory of your Vixt modules.
   * @default '<srcDir>/modules'
   */
  modulesDir?: string
  /**
   * Define the directory of your Vixt plugins.
   * @default '<srcDir>/plugins'
   */
  pluginsDir?: string
  /**
   * Whether your app is running in development mode.
   * @default false
   */
  dev?: boolean
  /**
   * Whether your app is being unit tested.
   * @default false
   */
  test?: boolean
  /**
   * Set to `true` to enable debug mode.
   * @default false
   */
  debug?: boolean
  /**
   * Whether to enable rendering of HTML.
   * @default false
   */
  ssr?: boolean
  /**
   * You can improve your DX by defining additional aliases to access custom directories within your JavaScript and CSS.
   */
  alias?: AliasOptions
  /**
   * Configuration that will be passed directly to Vite.
   */
  appConfig?: Record<string, any>
  devServer?: DevServerOptions
  /** Vite config input */
  vite?: Omit<UserConfig, 'plugins'>
  /** layer meta */
  meta?: VixtConfigLayerMeta
  /** layers */
  extends?: string[]
  /** modules */
  modules?: VixtModule[]
  /** plugins */
  plugins?: string[]
  /** typescript */
  typescript?: TypescriptOptions
  /** custom options */
  [key: string]: any
}

export interface AppHeadAttrs {
  children?: string
  injectTo?: HtmlTagDescriptor['injectTo']
  [key: string]: string | boolean | undefined
}
export interface AppHead {
  title?: AppHeadAttrs[]
  link?: AppHeadAttrs[]
  meta?: AppHeadAttrs[]
  style?: AppHeadAttrs[]
  script?: AppHeadAttrs[]
  noscript?: AppHeadAttrs[]
}

export interface AppOptions {
  /**
   * The base path of your Nuxt application.
   * @default '/'
   */
  baseURL?: string
  /**
   * You can define the CSS files/modules/libraries you want to set globally.
   */
  css?: string[]
  /**
   * The entry file relative to <srcDir>
   * @default 'main.ts'(vue)
   * @default 'main.tsx'(react)
   * @example 'entry.ts'(relative to '/<srcDir>/entry.ts')
   */
  entryFile?: string
  /** The default entry code */
  entryCode?: string
  /**
   * Whether to enable generate and transform entry file
   * @default true
   */
  transformEntryFile?: boolean
  /**
   * Whether to enable transform and transform index.html
   * @default true
   */
  transformIndexHtml?: boolean
  /**
   * Set default configuration for `<head>`.
   */
  head?: AppHead
  /**
   * The path to an HTML file with the contents of which will be inserted into index.html.
   * Some good sources for spinners are [SpinKit](https://github.com/tobiasahlin/SpinKit) or [SVG Spinners](https://icones.js.org/collection/svg-spinners).
   */
  loadingTemplate?: string
  /**
   * Customize Vixt root element id.
   * @default 'app'
   */
  rootId?: string
  /**
   * Customize Vixt root element tag.
   * @default 'div'
   */
  rootTag?: string
}

export interface AliasOptions {
  [find: string]: string
}

export interface DevServerOptions extends Pick<ServerOptions, 'port' | 'host' | 'cors'> {
  /** https://github.com/vitejs/vite-plugin-basic-ssl */
  https?: boolean | ExtractPluginOptions<typeof Ssl> & { enabled?: boolean }
  /**
   * The watch property lets you define patterns that will restart the dev server when changed.
   */
  watch?: string[]
}

export interface BuildOptions {
  /** https://github.com/nonzzz/vite-bundle-analyzer */
  analyze?: boolean | ExtractPluginOptions<typeof Analyzer> & { enabled?: boolean }
  /** https://github.com/vitejs/vite/tree/main/packages/plugin-legacy */
  legacy?: boolean | ExtractPluginOptions<typeof Legacy> & { enabled?: boolean }
}

export interface TypescriptOptions {
  references?: (string | { path?: string, content?: string })[]
  tsConfig?: TSConfig & { vueCompilerOptions?: RawVueCompilerOptions }
  /** https://github.com/fi3ework/vite-plugin-checker */
  typeCheck?: ExtractPluginOptions<typeof Checker>
  /**
   * Generate a `*.vue` shim
   * @default false
   */
  shim?: boolean
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

export function defineVixtConfig(input: VixtOptions) {
  return input
}

export async function loadVixtConfig(opts?: LoadConfigOptions<VixtOptions>) {
  const result = await loadConfig<VixtOptions>({
    name: 'vixt',
    rcFile: false,
    ...opts,
  })

  const { config, cwd } = result
  // assign default dirs
  config.rootDir ??= cwd
  config.buildDir ??= resolve(config.rootDir!, '.vixt')
  config.buildTypesDir ??= resolve(config.buildDir, 'types')
  config.buildLayersDir ??= resolve(config.buildDir, 'layers')
  config.buildImportsDir ??= resolve(config.buildDir, 'imports')
  config.workspaceDir ??= findUpWorkspaceDir()
  config.srcDir ??= resolve(config.rootDir!, 'src')
  config.modulesDir ??= resolve(config.srcDir!, 'modules')
  config.pluginsDir ??= resolve(config.srcDir!, 'plugins')

  return result
}

export function applyLayers(layers: VixtConfigLayer[], config: VixtOptions) {
  const { rootDir } = config
  return layers.filter(e => e.cwd).map((layer) => {
    layer.config ??= {}
    layer.config.meta ??= {}

    const meta = layer.config.meta
    const layerName = meta.name || layer.cwd!.split('/').pop()!
    if (!isSamePath(layer.cwd!, resolve(rootDir!))) {
      meta.alias = `#/layers/${layerName}`
    }

    // copy to `<buildLayersDir>/<layerName>` when layer is in node_modules
    // if (layer.cwd?.includes('node_modules')) {
    //   const newCwd = resolve(buildLayersDir!, layerName)
    //   fs.removeSync(newCwd)
    //   fs.copySync(layer.cwd!, newCwd, {
    //     filter: (src) => {
    //       const nodeModulesPath = resolve(layer.cwd!, 'node_modules')
    //       const tsConfigPath = resolve(layer.cwd!, 'tsconfig.json')
    //       return !isSamePath(src, nodeModulesPath) && !isSamePath(src, tsConfigPath)
    //     },
    //   })
    //   layer.cwd = newCwd
    // }

    // assign layer `rootDir` and `srcDir`
    layer.config.rootDir ??= layer.cwd
    layer.config.srcDir ??= resolve(layer.config.rootDir!, 'src')
    layer.config.modulesDir ??= resolve(layer.config.srcDir!, 'modules')
    layer.config.pluginsDir ??= resolve(layer.config.srcDir!, 'plugins')

    return { ...layer, meta } as VixtConfigLayer
  })
}

export function isSamePath(a: string, b: string) {
  return normalize(a) === normalize(b)
}

export function resolveLayersDirs(layers: VixtConfigLayer[] = []) {
  const dirs: Record<string, string[] | undefined> = {}
  for (const layer of layers) {
    const srcPath = layer.config!.srcDir!
    const isExist = fs.existsSync(srcPath)
    const contents = isExist ? fs.readdirSync(srcPath) : []
    for (const content of contents) {
      const fileOrDirPath = resolve(srcPath, content)
      if (fs.statSync(fileOrDirPath).isDirectory()) {
        dirs[content] ??= []
        dirs[content]!.push(fileOrDirPath)
      }
    }
  }

  return dirs
}

export const VixtClientAutoImports: Record<string, string[]> = {
  '@vixt/core/client': ['defineAppConfig', 'defineVixtPlugin', 'useAppConfig', 'useVixtApp'],
}
