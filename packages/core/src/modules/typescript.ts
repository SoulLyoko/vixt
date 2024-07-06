import type { TSConfig } from 'pkg-types'
import type { Vixt } from '../types'

import fs from 'fs-extra'
import path from 'pathe'
import defu from 'defu'
import Checker from 'vite-plugin-checker'

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
  typeCheck?: Parameters<typeof Checker>[0]
}

function generateVixtDts(options: TypescriptOptions, vixt: Vixt) {
  const { buildDir, rootDir } = vixt.options
  const codePath = path.resolve(rootDir!, buildDir!, 'vixt.d.ts')
  const code = options.references?.map((reference) => {
    if (typeof reference === 'string') {
      return `/// <reference path="${reference}" />`
    }
    else if (typeof reference === 'object' && reference.path && reference.content) {
      fs.outputFileSync(path.resolve(rootDir!, buildDir!), reference.content ?? '')
      return `/// <reference path="${reference.path}" />`
    }
    else {
      return ''
    }
  }).concat('export {}').join('\n')
  code && fs.outputFileSync(codePath, code)
}

function generateTsConfig(options: TypescriptOptions, vixt: Vixt) {
  const { buildDir, rootDir } = vixt.options
  const codePath = path.resolve(rootDir!, buildDir!, 'tsconfig.json')
  const layersDirs = vixt._layers.map(e => e.cwd)
  const tsConfig = defu(options.tsConfig, { include: layersDirs })
  const code = JSON.stringify(tsConfig, null, 2)
  fs.outputFileSync(codePath, code)
}

function generateEnvDts(options: TypescriptOptions, vixt: Vixt, env: Record<string, any>) {
  const { buildTypesDir, rootDir } = vixt.options
  const codePath = path.resolve(rootDir!, buildTypesDir!, 'vite-env.d.ts')
  const values = Object.entries(env)
    .map(([key, value]) => `/** ${key}=${value} */\n  ${key}: ${typeof value}`)
    .join('\n  ')
  const code = `interface ImportMeta {
  readonly env: ImportMetaEnv
}
interface ImportMetaEnv {
  ${values}
}
`
  fs.outputFileSync(codePath, code)
}

function genarateShims(options: TypescriptOptions, vixt: Vixt) {
  const { buildTypesDir, rootDir } = vixt.options
  const code = `
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
`
  const codePath = path.resolve(rootDir!, buildTypesDir!, 'shims.d.ts')
  fs.outputFileSync(codePath, code)
}

function genarateGlobalComponents(options: TypescriptOptions, vixt: Vixt) {
  const { buildTypesDir, rootDir } = vixt.options
  const codePath = path.resolve(rootDir!, buildTypesDir!, 'global-components.d.ts')
  const code = `
import type { GlobalComponents as _GlobalComponents } from '@vue/runtime-core'

declare module 'vue'{
  interface GlobalComponents extends _GlobalComponents {}
}
`
  fs.outputFileSync(codePath, code)
}

const name = 'vixt:typescript'
const defaults: TypescriptOptions = {
  // references: ['types/vite-env.d.ts', 'types/shims.d.ts', 'types/global-components.d.ts'],
  tsConfig: {
    extends: '@vue/tsconfig/tsconfig.dom.json',
    compilerOptions: {
      paths: {
        '@': ['../src'],
        '@/*': ['../src/*'],
        '~': ['../src'],
        '~/*': ['../src/*'],
        '#': ['.'],
        '#/*': ['./*'],
      },
      types: ['vite/client'],
    },
    include: [
      './**/*',
    ],
  },
  typeCheck: { enableBuild: false, overlay: { initialIsOpen: false } },
}
export const typescript = defineVixtModule<TypescriptOptions>({
  meta: { name, configKey: 'typescript' },
  defaults,
  setup(options, vixt) {
    return [
      {
        name,
        configResolved(config) {
          generateVixtDts(options, vixt)
          generateTsConfig(options, vixt)
          generateEnvDts(options, vixt, config.env)
          genarateShims(options, vixt)
          genarateGlobalComponents(options, vixt)
        },
      },
      Checker(options.typeCheck ?? {}),
    ]
  },
})
