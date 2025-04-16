import type { Vixt } from '@vixt/core'

import path from 'node:path'

import { defineVixtModule, resolveLayersDirs } from '@vixt/core'
import fs from 'fs-extra'

declare module '@vixt/core' {
  interface VixtOptions {
    uniModules?: ModuleOptions
  }
}

export interface ModuleOptions {
  include?: string[]
  exclude?: string[]
}

function copyUniModules(_: any, vixt: Vixt) {
  const { srcDir, uniModules: { include, exclude } = {} } = vixt.options
  const { uni_modules = [] } = resolveLayersDirs(vixt._layers)
  const srcUniModulesPath = path.join(srcDir!, 'uni_modules')
  uni_modules.forEach((uniModulesPath) => {
    fs.readdirSync(uniModulesPath)
      .filter((dir) => {
        if (include?.length)
          return include.includes(dir)
        if (exclude?.length)
          return !exclude.includes(dir)
        return true
      })
      .forEach((dir) => {
        const srcPath = path.join(uniModulesPath, dir)
        const destPath = path.join(srcUniModulesPath, dir)
        if (fs.statSync(srcPath).isDirectory() && srcPath !== destPath) {
          fs.removeSync(destPath)
          fs.copySync(srcPath, destPath)
          fs.writeFileSync(path.join(destPath, '.gitignore'), '*', 'utf-8')
        }
      })
  })
}

const name = 'vixt:uni-modules'
export const uniModules = defineVixtModule({
  meta: { name },
  setup(_, vixt) {
    copyUniModules(_, vixt)
  },
})
