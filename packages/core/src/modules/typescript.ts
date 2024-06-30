import type { ResolvedConfig } from 'vite'
import type { TSConfig } from 'pkg-types'
import type { Vixt } from '../types'

import fs from 'fs-extra'
import path from 'pathe'
import defu from 'defu'
// import Checker from 'vite-plugin-checker'

import { defineVixtModule } from '../module'

// @ts-ignore
declare module '@vixt/core' {
  interface VixtOptions {
    typescript?: TypescriptOptions
  }
}

export interface TypescriptOptions {
  references?: (string | { path?: string, content?: string })[]
  tsConfig?: TSConfig
  /** https://github.com/fi3ework/vite-plugin-checker */
  // typeCheck?: Parameters<typeof Checker>[0] | false
}

function generateDts(options: TypescriptOptions, vixt: Vixt, config: ResolvedConfig) {
  const { root } = config
  const { buildDir } = vixt.options
  const vixtDts = options.references?.map((reference) => {
    if (typeof reference === 'string') {
      return `/// <reference path="${reference}" />`
    }
    else if (typeof reference === 'object' && reference.path && reference.content) {
      fs.outputFileSync(path.resolve(root, buildDir!), reference.content ?? '')
      return `/// <reference path="${reference.path}" />`
    }
    else {
      return ''
    }
  }).concat('export {}').join('\n')

  const vixtDtsPath = path.resolve(root, buildDir!, 'vixt.d.ts')
  fs.outputFileSync(vixtDtsPath, vixtDts!)
}

function generateTsConfig(options: TypescriptOptions, vixt: Vixt, config: ResolvedConfig) {
  const { root } = config
  const { buildDir } = vixt.options
  const tsConfigPath = path.resolve(root, buildDir!, 'tsconfig.json')
  const layersDirs = vixt._layers.filter(e => e.cwd).map(e => e.cwd)
  const tsConfig = defu(options.tsConfig, { include: layersDirs })
  fs.outputFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2))
}

function generateEnvDts(options: TypescriptOptions, vixt: Vixt, config: ResolvedConfig) {
  const { env, root } = config
  const { buildDir } = vixt.options
  const values = Object.entries(env)
    .map(([key, value]) => `/** ${key}=${value} */\n  ${key}: ${typeof value}`)
    .join('\n  ')
  const envDts = `interface ImportMeta {
  readonly env: ImportMetaEnv
}
interface ImportMetaEnv {
  ${values}
}
`
  const envDtsPath = path.resolve(root, buildDir!, 'types', 'vite-env.d.ts')
  fs.outputFileSync(envDtsPath, envDts!)
}

function genarateShims(options: TypescriptOptions, vixt: Vixt, config: ResolvedConfig) {
  const { root } = config
  const { buildDir } = vixt.options
  const shimsDts = `
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
`
  const shimsDtsPath = path.resolve(root, buildDir!, 'types', 'shims.d.ts')
  fs.outputFileSync(shimsDtsPath, shimsDts!)
}

const name = 'vixt:typescript'
const defaults: TypescriptOptions = {
  references: ['./types/vite-env.d.ts', './types/shims.d.ts'],
  tsConfig: {
    extends: '@vue/tsconfig/tsconfig.dom.json',
    compilerOptions: {
      paths: {
        '@': ['../src'],
        '@/*': ['../src/*'],
        '~': ['../src'],
        '~/*': ['../src/*'],
      },
      types: ['vite/client'],
    },
    include: [
      './**/*',
    ],
  },
  // typeCheck: { vueTsc: true, enableBuild: false, overlay: { initialIsOpen: false } },
}
export const typescript = defineVixtModule<TypescriptOptions>({
  meta: { name, configKey: 'typescript' },
  defaults,
  setup(options, vixt) {
    return [
      {
        name,
        configResolved(config) {
          generateDts(options, vixt, config)
          generateTsConfig(options, vixt, config)
          generateEnvDts(options, vixt, config)
          genarateShims(options, vixt, config)
        },
      },
      // options.typeCheck && Checker(options.typeCheck),
    ]
  },
})
