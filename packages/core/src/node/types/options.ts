import type { ExtractPluginOptions } from './vixt'
import type Ssl from '@vitejs/plugin-basic-ssl'
import type Legacy from '@vitejs/plugin-legacy'
import type { RawVueCompilerOptions } from '@vue/language-core'
import type { NitroPluginConfig } from 'nitro/vite'
import type { TSConfig } from 'pkg-types'
import type AutoImport from 'unplugin-auto-import/vite'
import type { HtmlTagDescriptor, ServerOptions } from 'vite'
import type Analyzer from 'vite-bundle-analyzer'
import type Checker from 'vite-plugin-checker'

export interface AliasOptions {
  [find: string]: string
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
   * The base path of your Vixt application.
   * @default '/'
   * @example
   * ```ts
   * export default defineVixtConfig({
   *   app: {
   *     baseURL: '/prefix/',
   *   },
   * })
   * ```
   */
  baseURL?: string
  /**
   * You can define the CSS files/modules/libraries you want to set globally.
   * @example
   * ```ts
   * export default defineVixtConfig({
   *   css: [
   *     // CSS file in the project
   *     '~/styles/main.css',
   *     // SCSS file in the project
   *     '~/styles/main.scss',
   *   ],
   * })
   * ```
   */
  css?: string[]
  /**
   * The entry file relative to `<srcDir>`
   * @default
   * 'main.ts' // in vue
   * 'main.tsx' // in react
   * 'index.ts' // in vitepress
   * @example 'entry.ts' // relative to '/<srcDir>/entry.ts'
   */
  entryFile?: string
  /** The default entry code */
  entryCode?: string
  /**
   * Set default configuration for `<head>`.
   * @default
   * ```json
   * {
   *   "meta": [
   *     { "charset": "utf-8" },
   *     { "name": "viewport", "content": "width=device-width, initial-scale=1" }
   *   ]
   * }
   * ```
   * @example
   * ```ts
   * export default defineVixtConfig({
   *   app: {
   *     head: {
   *       meta: [
   *         // <meta name="viewport" content="width=device-width, initial-scale=1">
   *         { name: 'viewport', content: 'width=device-width, initial-scale=1' }
   *       ],
   *       script: [
   *         // <script src="https://awesome-lib.js"></script>
   *         { src: 'https://awesome-lib.js' }
   *       ],
   *       link: [
   *         // <link rel="stylesheet" href="https://awesome-lib.css">
   *         { rel: 'stylesheet', href: 'https://awesome-lib.css' }
   *       ],
   *       style: [
   *         // <style type="text/css">:root { color: red }</style>
   *         { children: ':root { color: red }', type: 'text/css' }
   *       ],
   *       noscript: [
   *         // <noscript>JavaScript is required</noscript>
   *         { children: 'JavaScript is required' }
   *       ],
   *       title: [
   *         // <title>Website Title</title>
   *         { children: 'Website Title' }
   *       ]
   *     }
   *   }
   * })
   * ```
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
}

export interface BuildOptions {
  /**
   * Set to true to enable bundle analysis, or pass an object with `enabled: true` and options: [vite-bundle-analyzer](https://github.com/nonzzz/vite-bundle-analyzer)
   */
  analyze?: boolean | ExtractPluginOptions<typeof Analyzer> & { enabled?: boolean }
  /**
   * Set to true to enable legacy mode, or pass an object with `enabled: true` and options: [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)
   */
  legacy?: boolean | ExtractPluginOptions<typeof Legacy> & { enabled?: boolean }
}

export interface DevServerOptions extends Pick<ServerOptions, 'port' | 'host' | 'cors'> {
  /**
   * Whether to enable HTTPS by using [@vitejs/plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl).
   * @default false
   */
  https?: boolean | ExtractPluginOptions<typeof Ssl> & { enabled?: boolean }
  /**
   * The watch property lets you define patterns that will restart the dev server when changed.
   */
  watch?: string[]
}

export interface ImportsOptions extends ExtractPluginOptions<typeof AutoImport> { }

export interface NitroOptions extends Omit<NitroPluginConfig, 'serverDir'> {
  enabled?: boolean
  serverDir?: Exclude<NitroPluginConfig['serverDir'], boolean>
}

export interface TypescriptOptions {
  references?: (string | { path?: string, content?: string })[]
  /**
   * You can extend the generated TypeScript configurations (.vixt/tsconfig.json) using this option.
   */
  tsConfig?: TSConfig & {
    /**
     * @default '@vue/tsconfig/tsconfig.dom.json'
     */
    extends?: string | string[]
    vueCompilerOptions?: RawVueCompilerOptions
  }
  /**
   * Enable build-time or dev-server type checking.
   * @see https://github.com/fi3ework/vite-plugin-checker
   * @example
   * ```ts
   * export default defineVixtConfig({
   *   typescript: {
   *     typeCheck: {
   *       vueTsc: true // for Vue
   *       typescript: true // for React
   *     },
   *   },
   * })
   * ```
   */
  typeCheck?: ExtractPluginOptions<typeof Checker>
  /**
   * Generate a `*.vue` shim
   * @default false
   */
  shim?: boolean
}
