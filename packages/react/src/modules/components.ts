import type { ImportsMap } from 'unplugin-auto-import/types'

import { cwd } from 'node:process'

import fg from 'fast-glob'
import { pascalCase } from 'unplugin-vue-components'

export interface ComponentResolverOptions {
  dirs?: string[]
}

export function componentsResolver(options: ComponentResolverOptions = {}) {
  const { dirs = ['src/components'] } = options

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

  return imports
}
