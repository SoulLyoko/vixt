import type { ImportsMap } from 'unplugin-auto-import/types'

import { cwd } from 'node:process'

import { defineVitePlugin } from '@vixt/core'
import fg from 'fast-glob'
import AutoImport from 'unplugin-auto-import/vite'
import { pascalCase } from 'unplugin-vue-components'

export interface ComponentResolverOptions {
  dirs?: string[]
  dts?: string | boolean
}

export default defineVitePlugin<ComponentResolverOptions>((options) => {
  const { dirs = ['src/components'], dts = 'components.d.ts' } = options ?? {}

  const files = fg.sync(dirs.map(c => `${c}/**/*.(t|j)sx`), {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: cwd(),
    absolute: true,
  })

  const imports: ImportsMap = {}
  files.forEach((componentPath) => {
    let componentName = componentPath.replace(/\/index\.(t|j)sx$/, '').replace(/\.(t|j)sx$/, '')
    for (const dir of dirs) {
      componentName = componentName.replace(dir, '')
    }
    componentName = pascalCase(componentName.replace(/\//g, '-'))
    imports[componentPath] = [['default', componentName]]
  })

  return AutoImport({ imports, dts })
})
