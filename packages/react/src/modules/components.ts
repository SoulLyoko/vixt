import type { Vixt } from '@vixt/core'
import type { ImportsMap } from 'unplugin-auto-import/types'

import { resolveLayersDirs } from '@vixt/core'
import fg from 'fast-glob'
import { pascalCase } from 'unplugin-vue-components'

export function componentsResolver(vixt: Vixt) {
  const { components = [] } = resolveLayersDirs([...vixt._layers].reverse())

  const root = vixt.options.rootDir
  const files = fg.sync(components.map(c => `${c}/**/*.(t|j)sx`), {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: root,
    absolute: true,
  })

  const imports: ImportsMap = {}
  files.forEach((componentPath) => {
    let componentName = componentPath.replace(/\/index\.(t|j)sx$/, '').replace(/\.(t|j)sx$/, '')
    for (const dir of components) {
      componentName = componentName.replace(dir, '')
    }
    componentName = pascalCase(componentName.replace(/\//g, '-'))
    imports[componentPath] = [['default', componentName]]
  })

  return imports
}
