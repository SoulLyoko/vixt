import type { TypescriptOptions } from '../config'
import type { Vixt } from '../vixt'

import fs from 'fs-extra'
import path from 'pathe'
import Checker from 'vite-plugin-checker'

import { defineVixtModule } from '../module'

function generateTsConfig(options: TypescriptOptions, vixt: Vixt) {
  const { buildDir } = vixt.options
  const codePath = path.resolve(buildDir!, 'tsconfig.json')
  const code = JSON.stringify(options.tsConfig, null, 2)
  fs.outputFileSync(codePath, code)
}

function generateVixtDts(options: TypescriptOptions, vixt: Vixt) {
  const { buildDir } = vixt.options
  const codePath = path.resolve(buildDir!, 'vixt.d.ts')
  const code = options.references?.map((reference) => {
    if (typeof reference === 'string') {
      return `/// <reference path="${reference}" />`
    }
    else if (typeof reference === 'object' && reference.path && reference.content) {
      fs.outputFileSync(path.resolve(buildDir!, reference.path), reference.content)
      return `/// <reference path="${reference.path}" />`
    }
    else {
      return ''
    }
  }).concat('export {}').join('\n')
  code && fs.outputFileSync(codePath, code)
}

function genarateShim(options: TypescriptOptions, vixt: Vixt) {
  if (!options.shim)
    return
  const { buildTypesDir } = vixt.options
  const code = `
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
`
  const codePath = path.resolve(buildTypesDir!, 'vue-shim.d.ts')
  fs.outputFileSync(codePath, code)
}

function generateEnvDts(env: Record<string, any>, vixt: Vixt) {
  const { buildTypesDir } = vixt.options
  const codePath = path.resolve(buildTypesDir!, 'vite-env.d.ts')
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

const name = 'vixt:typescript'
export default defineVixtModule<TypescriptOptions>({
  meta: { name, configKey: 'typescript' },
  defaults(vixt: Vixt) {
    const { rootDir, alias } = vixt.options

    const paths: Record<string, string[]> = {}
    for (const [ak, av] of Object.entries(alias ?? {})) {
      const exists = fs.existsSync(av)
      const stats = exists ? fs.statSync(av) : null
      paths[ak] = [av]
      if (stats?.isDirectory())
        paths[`${ak}/*`] = [`${av}/*`]
    }

    const layersDirs = vixt._layers.map(e => e.cwd!)
    const include = ['./**/*', ...layersDirs]

    return {
      tsConfig: {
        extends: '@vue/tsconfig/tsconfig.dom.json',
        compilerOptions: {
          baseUrl: rootDir,
          paths,
          types: ['vite/client'],
        },
        include,
      },
      typeCheck: {
        enableBuild: false,
        overlay: { initialIsOpen: false },
      },
    }
  },
  setup(options, vixt) {
    return [
      {
        name,
        configResolved(config) {
          generateTsConfig(options, vixt)
          generateVixtDts(options, vixt)
          genarateShim(options, vixt)
          generateEnvDts(config.env, vixt)
        },
      },
      Checker(options.typeCheck ?? {}),
    ]
  },
})
