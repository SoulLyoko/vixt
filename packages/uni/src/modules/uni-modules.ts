import type { Vixt } from '@vixt/core'

import { defineVixtModule, isSamePath, resolveLayersDirs } from '@vixt/core'
import fs from 'fs-extra'
import path from 'pathe'

declare module '@vixt/core' {
  interface VixtOptions {
    uniModules?: ModuleOptions
  }
}

export interface ModuleOptions {
  include?: string[]
  exclude?: string[]
}

function copyUniModules(options: ModuleOptions, vixt: Vixt) {
  const { srcDir } = vixt.options
  const { include, exclude } = options ?? {}
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
        // const srcPkgVersion = fs.readJSONSync(path.join(srcPath, 'package.json'), { throws: false })?.version
        // const destPkgVersion = fs.readJSONSync(path.join(destPath, 'package.json'), { throws: false })?.version
        // if (srcPath !== destPath && srcPkgVersion !== destPkgVersion) {
        if (srcPath !== destPath) {
          try {
            fs.emptyDirSync(destPath)
            fs.copySync(srcPath, destPath)
            fs.writeFileSync(path.join(destPath, '.gitignore'), '*', 'utf-8')
          }
          catch (e) {
            console.error(`Error copying ${srcPath} to ${destPath}:\n`, e)
          }
        }
      })
  })
}

const name = 'vixt:uni-modules'
export const uniModules = defineVixtModule({
  meta: { name, configKey: 'uniModules' },
  setup(options, vixt) {
    copyUniModules(options, vixt)

    return {
      name,
      configureServer(server) {
        const { uni_modules = [] } = resolveLayersDirs(vixt._layers.filter(e => !isSamePath(e.cwd!, vixt.options.rootDir!)))
        server.watcher.add(uni_modules)
        server.watcher.on('all', (_, file) => {
          const match = uni_modules.some(e => path.normalize(file).match(e))
          if (match)
            copyUniModules(options, vixt)
        })
      },
    }
  },
})
