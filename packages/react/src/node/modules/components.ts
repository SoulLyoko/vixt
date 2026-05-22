import type { ImportsMap } from 'unplugin-auto-import/types'

import { parse } from 'node:path'
import { cwd } from 'node:process'

import { defineVitePlugin } from '@vixt/core'
import fg from 'fast-glob'
import AutoImport from 'unplugin-auto-import/vite'
import { pascalCase } from 'unplugin-vue-components'

export interface ComponentResolverOptions {
  dirs?: string[]
  dts?: string | boolean
}

function getNameFromFilePath(filePath: string, dirs: string[]) {
  const parsedFilePath = parse(filePath)

  let strippedPath = ''
  for (const dir of dirs) {
    if (parsedFilePath.dir.startsWith(dir)) {
      strippedPath = parsedFilePath.dir.slice(dir.length)
      break
    }
  }
  const folders = strippedPath.slice(1).split('/').filter(Boolean)

  let filename = parsedFilePath.name
  if (filename === 'index')
    filename = ''

  const namespaced = [...folders, filename]
  filename = namespaced.filter(Boolean).join('-')

  return filename
}

export default defineVitePlugin<ComponentResolverOptions>((options) => {
  const { dirs = ['src/components'], dts = 'components.d.ts' } = options ?? {}

  const files = fg.sync(dirs.map(c => `${c}/**/*.(t|j)sx`), {
    ignore: ['node_modules', '.git'],
    onlyFiles: true,
    cwd: cwd(),
    absolute: true,
  })

  const imports: ImportsMap = {}
  files.forEach((componentPath) => {
    const componentName = pascalCase(getNameFromFilePath(componentPath, dirs))
    imports[componentPath] = [['default', componentName]]
  })

  return AutoImport({ imports, dts })
})
